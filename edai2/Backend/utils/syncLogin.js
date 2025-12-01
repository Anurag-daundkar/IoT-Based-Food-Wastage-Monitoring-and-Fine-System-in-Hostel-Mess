/**
 * MongoDB → Firebase Sync for Login
 * Syncs current month data from MongoDB to Firebase when student logs in
 */
/**
 * MongoDB → Firebase Sync for Login (clean)
 * Writes the current user's root metrics and current-month object to `lastDetected`.
 * The `lastDetected.month` object mirrors the MongoDB month entry.
 */

import admin from 'firebase-admin';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

let firebaseApp = null;

const initializeFirebase = () => {
  if (firebaseApp) return firebaseApp;

  let serviceAccount = null;
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (err) {
      console.error('Invalid Firebase JSON:', err);
      return null;
    }
  }

  if (!serviceAccount) {
    console.error('Missing Firebase credentials');
    return null;
  }

  try {
    if (!admin.apps || admin.apps.length === 0) {
      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL
      });
    } else {
      firebaseApp = admin.app();
    }
  } catch (err) {
    console.error('Firebase initialization failed:', err);
    return null;
  }

  return firebaseApp;
};

const safeNum = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export const syncLogin = async (studentId) => {
  try {
    const app = initializeFirebase();
    if (!app) throw new Error('Firebase not initialized');

    const user = await User.findOne({ studentId });
    if (!user) throw new Error(`Student ${studentId} not found in MongoDB`);

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const mongoMonthlyData = Array.isArray(user.monthlyData) ? user.monthlyData : [];
    let currentMonthData = mongoMonthlyData.find(md => md.year === currentYear && md.month === currentMonth);

    // If missing, create from user root values
    if (!currentMonthData) {
      currentMonthData = {
        year: currentYear,
        month: currentMonth,
        waste: safeNum(user.waste),
        weight: safeNum(user.weight),
        finesCollected: 0,
        finesPending: safeNum(user.pendingFine),
        totalFines: safeNum(user.totalFine),
        score: safeNum(user.score)
      };
      mongoMonthlyData.push(currentMonthData);
      user.monthlyData = mongoMonthlyData;
      await user.save();
    }

    // Ensure current month totalFines = finesCollected + finesPending
    try {
      const newTotalFines = safeNum(currentMonthData.finesCollected) + safeNum(currentMonthData.finesPending);
      if (safeNum(currentMonthData.totalFines) !== newTotalFines) {
        currentMonthData.totalFines = newTotalFines;
        // write back into array
        const idx = mongoMonthlyData.findIndex(md => md.year === currentYear && md.month === currentMonth);
        if (idx !== -1) mongoMonthlyData[idx] = currentMonthData;
        user.monthlyData = mongoMonthlyData;
        await user.save();
      }
    } catch (e) {
      console.warn('syncLogin: could not recompute totalFines for month', e?.message);
    }

    // Build lastDetected object mirroring MongoDB
    const userObj = user.toObject ? user.toObject() : user;
    const lastDetected = {
      detectedAt: new Date().toISOString(),
      fullName: userObj.name,
      id: String(userObj.studentId),
      picture: userObj.photo ? `/api/images/${userObj.photo}` : null,
      // indicate a face was detected and authenticated







      // check: true,
      check: false,








      // root-level metrics follow MongoDB root fields
      waste: safeNum(userObj.waste),
      totalFine: safeNum(userObj.totalFine),
      pendingFine: safeNum(userObj.pendingFine),
      score: safeNum(userObj.score),
      weight: safeNum(userObj.weight),
      // month object mirrors monthlyData entry
      month: {
        year: currentMonthData.year,
        month: currentMonthData.month,
        waste: safeNum(currentMonthData.waste),
        weight: safeNum(currentMonthData.weight),
        finesCollected: safeNum(currentMonthData.finesCollected),
        finesPending: safeNum(currentMonthData.finesPending),
        totalFines: safeNum(currentMonthData.totalFines),
        score: safeNum(currentMonthData.score)
      }
    };

    const db = admin.database();
    const lastDetectedRef = db.ref('lastDetected');

    // Write the lastDetected node (replace) so UI sees the exact state
    await lastDetectedRef.set(lastDetected);
    console.log(`✅ Login: wrote lastDetected for ${studentId}`, lastDetected);

    return { success: true, studentId, month: `${currentYear}-${currentMonth}` };
  } catch (err) {
    console.error(`❌ Login sync error for ${studentId}:`, err);
    return { success: false, error: err.message };
  }
};

