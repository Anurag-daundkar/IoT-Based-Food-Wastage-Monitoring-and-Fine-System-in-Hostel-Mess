import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';
import connectDB from '../config/db.js';

dotenv.config();

async function seed() {
  try {
    await connectDB();

    const passwordPlain = process.env.SEED_PASSWORD || 'Password123';
    const hashed = bcrypt.hashSync(passwordPlain, 10);

    const users = [
      {
        name: 'Admin Test',
        email: 'admin@example.com',
        password: hashed,
        role: 'admin',
      },
      {
        name: 'Student Test',
        email: 'student@example.com',
        password: hashed,
        role: 'student',
      },
    ];

    for (const u of users) {
      const exists = await User.findOne({ email: u.email });
      if (exists) {
        console.log(`User ${u.email} already exists, skipping.`);
        continue;
      }
      await User.create(u);
      console.log(`Created user ${u.email}`);
    }

    console.log('Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
