import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/smartsentinel";
    
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Admin credentials
    const adminData = {
      name: "Anurag Daundkar",
      email: "anurag.daundkar231@vit.edu",
      password: "Welcome#2112",
      role: "admin",
      waste: 0,
      totalFine: 0,
      pendingFine: 0,
      score: 100,
      monthlyData: [
        {
          year: 2025,
          month: 10,  // Current month
          waste: 0,
          finesCollected: 0,
          finesPending: 0,
          totalFines: 0,
          score: 100
        }
      ]
    };

    // Hash password
    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    adminData.password = hashedPassword;

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("⚠️ Admin user already exists with this email");
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create(adminData);

    console.log("✅ Admin user created successfully");
    console.log("Email:", adminData.email);
    console.log("⚠️ Please login with your provided password");

  } catch (error) {
    console.error("❌ Error creating admin:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

createAdmin();