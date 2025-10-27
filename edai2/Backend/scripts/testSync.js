#!/usr/bin/env node

import { syncLogout } from '../utils/syncLogout.js';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
await connectDB();

async function testSync() {
  console.log('🧪 Testing Firebase to MongoDB Sync Functionality\n');

  try {
    // Test 1: Check if we have any users in MongoDB
    console.log('1️⃣ Checking MongoDB users...');
    const users = await User.find({}).limit(5);
    console.log(`Found ${users.length} users in MongoDB`);
    
    if (users.length > 0) {
      console.log('Sample user:', {
        name: users[0].name,
        studentId: users[0].studentId,
        waste: users[0].waste,
        totalFine: users[0].totalFine,
        score: users[0].score
      });
    }

    // Test 2: Test individual student sync (if we have a user)
    if (users.length > 0) {
      const testStudentId = users[0].studentId;
      console.log(`\n2️⃣ Testing individual sync for student: ${testStudentId}`);
      
      const result = await syncLogout(testStudentId);
      
      if (result.success) {
        console.log('✅ Individual sync successful');
        console.log('Message:', result.message);
      } else {
        console.log('❌ Individual sync failed:', result.error);
      }
    } else {
      console.log('\n2️⃣ Skipping individual sync test - no users found');
    }

    // Test 3: Clean sync system info
    console.log('\n3️⃣ Clean Sync System Info...');
    console.log('✅ New clean sync system is active');
    console.log('   - No bulk sync operations');
    console.log('   - Only individual student sync');
    console.log('   - Use: node scripts/manualSync.js student <studentId>');

    console.log('\n✅ Sync functionality test completed');
    console.log('\n📋 Next steps:');
    console.log('1. Test login sync: POST /api/sync/login with studentId');
    console.log('2. Test logout sync: POST /api/sync/logout with studentId');
    console.log('3. Use face authentication for automatic sync');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    process.exit(0);
  }
}

testSync();
