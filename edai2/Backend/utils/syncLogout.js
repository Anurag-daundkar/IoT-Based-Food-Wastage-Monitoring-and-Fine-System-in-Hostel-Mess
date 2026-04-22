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

// Small helper to wait before reading Firebase, giving hardware time to update.
// Delay is configurable via SYNC_LOGOUT_DELAY_MS (in milliseconds).
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

  const waste = safeNum(month.waste);
  const weight = safeNum(month.weight);
  const finesCollected = safeNum(month.finesCollected);
  const finesPending = safeNum(month.finesPending ?? month.pendingFine);

  // If totalFines is not explicitly stored, derive it from collected + pending
  let totalFines = month.totalFines ?? month.totalFine;
  totalFines = safeNum(
    totalFines !== undefined && totalFines !== null
      ? totalFines
      : finesCollected + finesPending
  );

  return {
    year: safeNum(month.year) || undefined,
    month: safeNum(month.month) || undefined,
    waste,
    weight,
    finesCollected,
    finesPending,
    totalFines,
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

    // Snapshot of current Mongo month values BEFORE we read Firebase.
    const mongoMonthlyDataBefore = Array.isArray(user.monthlyData) ? user.monthlyData : [];
    const originalMonth = mongoMonthlyDataBefore.find(
      (m) => m.year === currentYear && m.month === currentMonth
    );
    const originalWaste = safeNum(originalMonth?.waste);
    const originalFinesPending = safeNum(originalMonth?.finesPending);
    const originalTotalFines = safeNum(originalMonth?.totalFines);

    // Base delay to give hardware (Sem5_Edai2) time to close lid,
    // measure weight, and push updates to Firebase.
    const baseDelayMs = Number(process.env.SYNC_LOGOUT_DELAY_MS || 6000);
    if (baseDelayMs > 0) {
      await wait(baseDelayMs);
    }

    // Then, poll Firebase a few times waiting for month values to differ
    // from the original Mongo values. This avoids racing with hardware.
    const maxAttempts = Number(process.env.SYNC_LOGOUT_MAX_ATTEMPTS || 5);
    const pollIntervalMs = Number(process.env.SYNC_LOGOUT_POLL_INTERVAL_MS || 1000);

    let monthFromLD = null;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const snapshot = await lastDetectedRef.once('value');
      const lastDetected = snapshot.val() || {};
      const candidate = normalizeMonthFromLastDetected(lastDetected.month);

      if (!candidate) {
        // If structure is missing, no point in polling further.
        break;
      }

      // If we don't have an original month, any valid candidate is acceptable.
      const changedWaste = originalMonth
        ? safeNum(candidate.waste) !== originalWaste
        : true;
      const changedFines = originalMonth
        ? safeNum(candidate.finesPending) !== originalFinesPending ||
          safeNum(candidate.totalFines) !== originalTotalFines
        : true;

      // If hardware has updated either waste or fines, or this is the last attempt,
      // use this candidate and stop polling.
      if (changedWaste || changedFines || attempt === maxAttempts - 1) {
        monthFromLD = candidate;
        break;
      }

      if (pollIntervalMs > 0) {
        await wait(pollIntervalMs);
      }
    }

    if (!monthFromLD) {
      throw new Error('lastDetected.month is missing, invalid, or never diverged from Mongo values in time');
    }

    // 🔹 STRICT behavior per requirement:
    // "just place that data inside that month of firebase to mongodb's current month's data"
    // So we only care about lastDetected.month, not root overrides.

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
