import admin from 'firebase-admin';
import User from '../models/User.js';

// Initialize Firebase Admin SDK
let firebaseApp = null;

export const initializeFirebase = () => {
  if (firebaseApp) return firebaseApp;

  try {
    // Use service account if available, otherwise use environment variables
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
      : {
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        };

    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://smart-dustbin-d4009-default-rtdb.firebaseio.com/',
    });

    console.log('✅ Firebase Admin initialized for waste processing');
    return firebaseApp;
  } catch (error) {
    console.error('❌ Firebase Admin initialization failed:', error);
    throw error;
  }
};

/**
 * Process waste measurement and calculate fines
 * This function is called when lastDetected/month/weight is updated
 */
export const processWasteAndCalculateFine = async () => {
  try {
    const db = admin.database();
    
    // Listen for changes to lastDetected/month/weight
    const weightRef = db.ref('/lastDetected/month/weight');
    
    weightRef.on('value', async (snapshot) => {
      const measuredWeight = snapshot.val();
      
      if (!measuredWeight || measuredWeight <= 0) {
        console.log('⏭️ No valid weight to process');
        return;
      }

      console.log(`📊 Processing waste: ${measuredWeight}g`);

      try {
        // Get lastDetected data
        const lastDetectedSnapshot = await db.ref('/lastDetected').once('value');
        const lastDetected = lastDetectedSnapshot.val();

        if (!lastDetected || !lastDetected.id) {
          console.log('⚠️ No student ID found in lastDetected');
          return;
        }

        const studentId = lastDetected.id;
        const currentMonth = lastDetected.month || {};

        // Get threshold value
        const thresholdSnapshot = await db.ref('/Threshold/value').once('value');
        const threshold = thresholdSnapshot.val() || 100; // Default 100g

        console.log(`🎯 Threshold: ${threshold}g, Measured: ${measuredWeight}g`);

        // Calculate fine if exceeds threshold
        let calculatedFine = 0;
        if (measuredWeight > threshold) {
          const excess = measuredWeight - threshold;
          calculatedFine = excess * 10; // ₹10 per gram excess
          console.log(`💰 Fine calculated: ₹${calculatedFine} (excess: ${excess}g)`);
        } else {
          console.log('✅ Within threshold, no fine');
        }

        // Update waste in month object
        const updatedWaste = (currentMonth.waste || 0) + measuredWeight;
        const updatedFinesPending = (currentMonth.finesPending || 0) + calculatedFine;

        // Prepare updated month object
        const updatedMonth = {
          ...currentMonth,
          waste: updatedWaste,
          finesPending: updatedFinesPending,
          weight: measuredWeight, // Keep for reference
        };

        // Update Firebase lastDetected/month
        await db.ref('/lastDetected/month').update({
          waste: updatedWaste,
          finesPending: updatedFinesPending,
          weight: measuredWeight,
        });

        console.log(`✅ Firebase updated - Waste: ${updatedWaste}g, Pending Fine: ₹${updatedFinesPending}`);

        // Update student record in Firebase
        const studentRef = db.ref(`/students/${studentId}`);
        const studentSnapshot = await studentRef.once('value');
        const studentData = studentSnapshot.val() || {};

        // Update monthly data
        const monthlyData = studentData.monthlyData || [];
        const currentMonthIndex = monthlyData.findIndex(
          (m) => m.year === updatedMonth.year && m.month === updatedMonth.month
        );

        if (currentMonthIndex >= 0) {
          monthlyData[currentMonthIndex] = {
            ...monthlyData[currentMonthIndex],
            waste: updatedWaste,
            finesPending: updatedFinesPending,
          };
        } else {
          monthlyData.push({
            year: updatedMonth.year,
            month: updatedMonth.month,
            waste: updatedWaste,
            finesPending: updatedFinesPending,
            finesCollected: currentMonth.finesCollected || 0,
            totalFines: (currentMonth.totalFines || 0) + calculatedFine,
            score: currentMonth.score || 100,
          });
        }

        // Calculate aggregated totals
        const totalWaste = monthlyData.reduce((sum, m) => sum + (m.waste || 0), 0);
        const totalPendingFine = monthlyData.reduce((sum, m) => sum + (m.finesPending || 0), 0);

        await studentRef.update({
          monthlyData,
          waste: totalWaste,
          pendingFine: totalPendingFine,
        });

        console.log(`✅ Student ${studentId} Firebase record updated`);

        // Now sync to MongoDB
        await syncToMongoDB(studentId, {
          waste: totalWaste,
          pendingFine: totalPendingFine,
          monthlyData,
        });

        // Reset weight in Firebase to prevent reprocessing
        await db.ref('/lastDetected/month/weight').set(0);
        console.log('🔄 Weight reset to 0 for next transaction');

      } catch (error) {
        console.error('❌ Error processing waste:', error);
      }
    });

    console.log('👂 Listening for waste measurements...');
  } catch (error) {
    console.error('❌ Failed to setup waste processor:', error);
    throw error;
  }
};

/**
 * Sync Firebase data to MongoDB
 */
const syncToMongoDB = async (studentId, data) => {
  try {
    // Find user in MongoDB
    const user = await User.findOne({ studentId: studentId });

    if (!user) {
      console.log(`⚠️ User ${studentId} not found in MongoDB`);
      return;
    }

    // Update user data
    user.waste = data.waste || 0;
    user.pendingFine = data.pendingFine || 0;

    // Update monthly data if provided
    if (data.monthlyData && Array.isArray(data.monthlyData)) {
      user.monthlyData = data.monthlyData.map(m => ({
        year: m.year,
        month: m.month,
        waste: m.waste || 0,
        finesPending: m.finesPending || 0,
        finesCollected: m.finesCollected || 0,
        totalFines: m.totalFines || 0,
        score: m.score || 100,
      }));
    }

    await user.save();
    console.log(`✅ MongoDB synced for student ${studentId}`);
  } catch (error) {
    console.error('❌ MongoDB sync error:', error);
  }
};

/**
 * Stop listening to Firebase changes
 */
export const stopWasteProcessor = () => {
  if (firebaseApp) {
    const db = admin.database();
    db.ref('/lastDetected/month/weight').off();
    console.log('🛑 Waste processor stopped');
  }
};
