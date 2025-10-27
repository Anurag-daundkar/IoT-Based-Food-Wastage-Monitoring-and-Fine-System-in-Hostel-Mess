/**
 * Firebase → MongoDB Sync for Logout (clean)
 * Reads `lastDetected`, applies its metrics to MongoDB user (root + current-month),
 * saves user, then writes final state back to `lastDetected` (so UI sees canonical data).
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

// Normalize month object from lastDetected to Mongo monthlyData shape
const normalizeMonthFromLastDetected = (month) => {
  if (!month) return null;
  return {
    year: safeNum(month.year) || undefined,
    month: safeNum(month.month) || undefined,
    waste: safeNum(month.waste),
    weight: safeNum(month.weight),
    finesCollected: safeNum(month.finesCollected),
    finesPending: safeNum(month.finesPending ?? month.pendingFine),
    totalFines: safeNum(month.totalFines ?? month.totalFine),
    score: safeNum(month.score)
  };
};

export const syncLogout = async (studentId) => {
  try {
    const app = initializeFirebase();
    if (!app) throw new Error('Firebase not initialized');

    const user = await User.findOne({ studentId });
    if (!user) throw new Error(`Student ${studentId} not found in MongoDB`);

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const db = admin.database();
    const lastDetectedRef = db.ref('lastDetected');
    const snapshot = await lastDetectedRef.once('value');
    const lastDetected = snapshot.val() || {};

    // Prefer root-level values from lastDetected, fall back to month values
    const monthFromLD = normalizeMonthFromLastDetected(lastDetected.month || lastDetected);

    // Apply root-level updates (use lastDetected root fields if present)
    const rootUpdates = {};
    if (lastDetected.waste !== undefined) rootUpdates.waste = safeNum(lastDetected.waste);
    if (lastDetected.totalFine !== undefined) rootUpdates.totalFine = safeNum(lastDetected.totalFine);
    if (lastDetected.pendingFine !== undefined) rootUpdates.pendingFine = safeNum(lastDetected.pendingFine);
    if (lastDetected.score !== undefined) rootUpdates.score = safeNum(lastDetected.score);
    if (lastDetected.weight !== undefined) rootUpdates.weight = safeNum(lastDetected.weight);

    // If root values missing, use month values
    if (Object.keys(rootUpdates).length === 0 && monthFromLD) {
      if (monthFromLD.waste !== undefined) rootUpdates.waste = monthFromLD.waste;
      if (monthFromLD.totalFines !== undefined) rootUpdates.totalFine = monthFromLD.totalFines;
      if (monthFromLD.finesPending !== undefined) rootUpdates.pendingFine = monthFromLD.finesPending;
      if (monthFromLD.score !== undefined) rootUpdates.score = monthFromLD.score;
      if (monthFromLD.weight !== undefined) rootUpdates.weight = monthFromLD.weight;
    }

    // Apply to user document
    Object.assign(user, rootUpdates);

    // Update monthlyData in MongoDB using normalized month metrics
    const mongoMonthlyData = Array.isArray(user.monthlyData) ? user.monthlyData : [];
    const monthEntry = monthFromLD || {
      year: currentYear,
      month: currentMonth,
      waste: safeNum(lastDetected.waste),
      weight: safeNum(lastDetected.weight),
      finesCollected: 0,
      finesPending: safeNum(lastDetected.pendingFine),
      totalFines: safeNum(lastDetected.totalFine),
      score: safeNum(lastDetected.score)
    };

    // Ensure year/month set
    monthEntry.year = monthEntry.year || currentYear;
    monthEntry.month = monthEntry.month || currentMonth;

    const idx = mongoMonthlyData.findIndex(md => md.year === monthEntry.year && md.month === monthEntry.month);
    if (idx !== -1) {
      // Merge fields (preserve any other fields)
      mongoMonthlyData[idx] = { ...mongoMonthlyData[idx], ...monthEntry };
    } else {
      mongoMonthlyData.push(monthEntry);
    }

    user.monthlyData = mongoMonthlyData;
    await user.save();

    // Write back final canonical state into lastDetected
    const userObj = user.toObject ? user.toObject() : user;
    const currentMonthData = mongoMonthlyData.find(md => md.year === currentYear && md.month === currentMonth) || {};

    const finalLastDetected = {
      detectedAt: new Date().toISOString(),
      fullName: userObj.name,
      id: String(userObj.studentId),
      picture: userObj.photo ? `/api/images/${userObj.photo}` : null,
      waste: safeNum(userObj.waste),
      totalFine: safeNum(userObj.totalFine),
      pendingFine: safeNum(userObj.pendingFine),
      score: safeNum(userObj.score),
      weight: safeNum(userObj.weight),
      month: {
        year: currentMonthData.year || currentYear,
        month: currentMonthData.month || currentMonth,
        waste: safeNum(currentMonthData.waste),
        weight: safeNum(currentMonthData.weight),
        finesCollected: safeNum(currentMonthData.finesCollected),
        finesPending: safeNum(currentMonthData.finesPending),
        totalFines: safeNum(currentMonthData.totalFines),
        score: safeNum(currentMonthData.score)
      }
    };

    await lastDetectedRef.set(finalLastDetected);
    console.log('✅ Logout: synced and wrote lastDetected for', studentId, finalLastDetected);

    return { success: true, studentId, month: `${currentYear}-${currentMonth}` };
  } catch (err) {
    console.error(`❌ Logout sync error for ${studentId}:`, err);
    return { success: false, error: err.message };
  }
};
