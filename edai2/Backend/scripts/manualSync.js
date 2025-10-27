#!/usr/bin/env node

import { syncLogout } from '../utils/syncLogout.js';
import connectDB from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
await connectDB();

const args = process.argv.slice(2);
const command = args[0];

async function main() {
  try {
    switch (command) {
      case 'student':
        const studentId = args[1];
        if (!studentId) {
          console.error('❌ Student ID is required');
          console.log('Usage: node manualSync.js student <studentId>');
          process.exit(1);
        }
        
        console.log(`🔄 Syncing student: ${studentId}`);
        const result = await syncLogout(studentId);
        
        if (result.success) {
          console.log('✅ Sync completed successfully');
          console.log('Message:', result.message);
        } else {
          console.error('❌ Sync failed:', result.error);
          process.exit(1);
        }
        break;

      case 'all':
        console.log('❌ Bulk sync is not supported in the new clean sync system');
        console.log('Use individual student sync instead');
        process.exit(1);
        break;

      default:
        console.log('📖 Manual Sync Tool');
        console.log('');
        console.log('Usage:');
        console.log('  node manualSync.js student <studentId>  - Sync specific student (Firebase → MongoDB)');
        console.log('');
        console.log('Examples:');
        console.log('  node manualSync.js student 12311587');
        break;
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

main();
