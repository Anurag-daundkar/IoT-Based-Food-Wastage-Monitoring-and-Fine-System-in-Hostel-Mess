#!/usr/bin/env node

/**
 * Test the new clean sync system
 */

import { syncLogin } from '../utils/syncLogin.js';
import { syncLogout } from '../utils/syncLogout.js';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
await connectDB();

const testNewSync = async () => {
  console.log('🧪 Testing New Clean Sync System\n');

  try {
    // Get a test user
    const user = await User.findOne({});
    if (!user) {
      console.log('❌ No users found in MongoDB');
      console.log('Please create a user first');
      return;
    }

    const testStudentId = user.studentId;
    console.log(`📊 Testing with student: ${testStudentId}`);

    // Test 1: Login sync (MongoDB → Firebase)
    console.log('\n1️⃣ Testing Login Sync (MongoDB → Firebase)');
    const loginResult = await syncLogin(testStudentId);
    
    if (loginResult.success) {
      console.log('✅ Login sync successful');
      console.log('Message:', loginResult.message);
    } else {
      console.log('❌ Login sync failed:', loginResult.error);
    }

    // Test 2: Logout sync (Firebase → MongoDB)
    console.log('\n2️⃣ Testing Logout Sync (Firebase → MongoDB)');
    const logoutResult = await syncLogout(testStudentId);
    
    if (logoutResult.success) {
      console.log('✅ Logout sync successful');
      console.log('Message:', logoutResult.message);
    } else {
      console.log('❌ Logout sync failed:', logoutResult.error);
    }

    console.log('\n🎉 New sync system test completed!');
    console.log('\n📋 API Endpoints:');
    console.log('POST /api/sync/login - MongoDB → Firebase');
    console.log('POST /api/sync/logout - Firebase → MongoDB');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    process.exit(0);
  }
};

testNewSync();
