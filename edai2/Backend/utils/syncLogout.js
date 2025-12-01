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

    // 🔹 STRICT behavior per requirement:
    // "just place that data inside that month of firebase to mongodb's current month's data"
    // So we only care about lastDetected.month, not root overrides.
    const monthFromLD = normalizeMonthFromLastDetected(lastDetected.month);
    if (!monthFromLD) {
      throw new Error('lastDetected.month is missing or invalid in Firebase');
    }

    // Ensure the month entry uses the current year/month (from Firebase or from server time)
    monthFromLD.year = monthFromLD.year || currentYear;
    monthFromLD.month = monthFromLD.month || currentMonth;

    // Update MongoDB monthlyData: replace current month's data with lastDetected.month
    const mongoMonthlyData = Array.isArray(user.monthlyData) ? user.monthlyData : [];
    const idx = mongoMonthlyData.findIndex(
      (md) => md.year === monthFromLD.year && md.month === monthFromLD.month
    );
    if (idx !== -1) {
      // Replace only the tracked fields for that month with Firebase values
      mongoMonthlyData[idx] = {
        ...mongoMonthlyData[idx],
        waste: monthFromLD.waste,
        weight: monthFromLD.weight,
        finesCollected: monthFromLD.finesCollected,
        finesPending: monthFromLD.finesPending,
        totalFines: monthFromLD.totalFines,
        score: monthFromLD.score,
        year: monthFromLD.year,
        month: monthFromLD.month,
      };
    } else {
      mongoMonthlyData.push(monthFromLD);
    }

    // Recompute root aggregates from monthlyData after replacing current month
    user.monthlyData = mongoMonthlyData;
    user.waste = mongoMonthlyData.reduce((sum, m) => sum + safeNum(m.waste), 0);
    user.totalFine = mongoMonthlyData.reduce((sum, m) => sum + safeNum(m.totalFines), 0);
    user.pendingFine = mongoMonthlyData.reduce((sum, m) => sum + safeNum(m.finesPending), 0);
    user.score = mongoMonthlyData.length
      ? Math.round(
          mongoMonthlyData.reduce((sum, m) => sum + safeNum(m.score), 0) /
            mongoMonthlyData.length
        )
      : safeNum(user.score);

    await user.save();

    // Write back final canonical state into lastDetected
    const userObj = user.toObject ? user.toObject() : user;
    const currentMonthData = mongoMonthlyData.find(md => md.year === currentYear && md.month === currentMonth) || {};

    const finalLastDetected = {
      detectedAt: new Date().toISOString(),
      fullName: userObj.name,
      id: String(userObj.studentId),
      picture: userObj.photo ? `/api/images/${userObj.photo}` : null,
      // mark face not detected after logout
      check: false,
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
