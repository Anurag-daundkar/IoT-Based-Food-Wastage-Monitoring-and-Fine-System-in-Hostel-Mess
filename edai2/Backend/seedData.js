import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smartsentinel');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create sample students with monthly data
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const sampleStudents = [
      {
        name: 'Anurag Daundkar',
        email: 'anurag.daundkar231@vit.edu',
        password: 'password123',
        role: 'student',
        studentId: 'ST2024001',
        college: 'Computer Science',
        roomNumber: 'A-204',
        totalFine: 850,
        pendingFine: 150,
        score: 75,
        monthlyData: [
          {
            year: currentYear,
            month: currentMonth - 1,
            waste: 45.2,
            finesCollected: 200,
            finesPending: 0,
            totalFines: 700,
            score: 78
          },
          {
            year: currentYear,
            month: currentMonth,
            waste: 38.5,
            finesCollected: 100,
            finesPending: 150,
            totalFines: 850,
            score: 75
          }
        ]
      },
      {
        name: 'Piyush Budhwant',
        email: 'piyush.budhwant@vit.edu',
        password: 'password123',
        role: 'student',
        studentId: 'ST2024002',
        college: 'Information Technology',
        roomNumber: 'B-105',
        totalFine: 750,
        pendingFine: 100,
        score: 82,
        monthlyData: [
          {
            year: currentYear,
            month: currentMonth - 1,
            waste: 42.1,
            finesCollected: 150,
            finesPending: 0,
            totalFines: 650,
            score: 80
          },
          {
            year: currentYear,
            month: currentMonth,
            waste: 35.8,
            finesCollected: 50,
            finesPending: 100,
            totalFines: 750,
            score: 82
          }
        ]
      },
      {
        name: 'Krushna Chandre',
        email: 'krushna.chandre@vit.edu',
        password: 'password123',
        role: 'student',
        studentId: 'ST2024003',
        college: 'Electronics',
        roomNumber: 'C-302',
        totalFine: 650,
        pendingFine: 0,
        score: 88,
        monthlyData: [
          {
            year: currentYear,
            month: currentMonth - 1,
            waste: 38.0,
            finesCollected: 100,
            finesPending: 0,
            totalFines: 550,
            score: 85
          },
          {
            year: currentYear,
            month: currentMonth,
            waste: 32.5,
            finesCollected: 100,
            finesPending: 0,
            totalFines: 650,
            score: 88
          }
        ]
      },
      {
        name: 'Shashank Akhade',
        email: 'shashank.akhade@vit.edu',
        password: 'password123',
        role: 'student',
        studentId: 'ST2024004',
        college: 'Mechanical',
        roomNumber: 'D-201',
        totalFine: 600,
        pendingFine: 50,
        score: 90,
        monthlyData: [
          {
            year: currentYear,
            month: currentMonth - 1,
            waste: 35.0,
            finesCollected: 50,
            finesPending: 0,
            totalFines: 550,
            score: 88
          },
          {
            year: currentYear,
            month: currentMonth,
            waste: 28.5,
            finesCollected: 0,
            finesPending: 50,
            totalFines: 600,
            score: 90
          }
        ]
      },
      {
        name: 'Mayur Ingale',
        email: 'mayur.ingale@vit.edu',
        password: 'password123',
        role: 'student',
        studentId: 'ST2024005',
        college: 'Civil',
        roomNumber: 'E-103',
        totalFine: 550,
        pendingFine: 0,
        score: 92,
        monthlyData: [
          {
            year: currentYear,
            month: currentMonth - 1,
            waste: 32.0,
            finesCollected: 50,
            finesPending: 0,
            totalFines: 500,
            score: 90
          },
          {
            year: currentYear,
            month: currentMonth,
            waste: 25.8,
            finesCollected: 50,
            finesPending: 0,
            totalFines: 550,
            score: 92
          }
        ]
      }
    ];

    // Create students
    for (const studentData of sampleStudents) {
      const student = new User(studentData);
      await student.save();
      console.log(`Created student: ${student.name}`);
    }

    // Create admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@vit.edu',
      password: 'admin123',
      role: 'admin',
      studentId: 'ADMIN001',
      college: 'Administration',
      roomNumber: 'Admin Office'
    });
    await admin.save();
    console.log('Created admin user');

    console.log('✅ Sample data seeded successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('Admin: admin@vit.edu / admin123');
    console.log('Students:');
    sampleStudents.forEach(student => {
      console.log(`${student.name}: ${student.email} / password123`);
    });

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

seedData();
