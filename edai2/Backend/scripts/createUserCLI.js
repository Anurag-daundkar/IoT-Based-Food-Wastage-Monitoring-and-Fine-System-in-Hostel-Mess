import readline from 'readline';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';
import User from '../models/User.js';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (q) => new Promise((res) => rl.question(q, res));

async function main() {
  try {
    await connectDB();

    console.log('\n== Create One-Time User Credentials ==\n');

    const name = (await question('Name (optional): ')).trim();
    const email = (await question('Email: ')).trim().toLowerCase();
    const password = (await question('Password: ')).trim();
    let role = (await question('Role [admin|student] (default student): ')).trim().toLowerCase();
    if (!role) role = 'student';
    if (!email || !password) {
      console.error('Email and password are required. Exiting.');
      process.exit(1);
    }

    const exists = await User.findOne({ email });
    if (exists) {
      console.log(`User with email ${email} already exists. No changes made.`);
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashed, role });

    console.log(`\nCreated user: ${user.email} (id: ${user._id}, role: ${user.role})`);
    console.log('You can now login with these credentials.');

    rl.close();
    process.exit(0);
  } catch (err) {
    console.error('Error creating user:', err.message || err);
    rl.close();
    process.exit(1);
  }
}

main();
