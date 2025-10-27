import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    studentId: { type: String },
    college: { type: String },
    roomNumber: { type: String },
    photo: { type: String },
    // Legacy fields (keep for backward compatibility)
    waste: { type: Number, default: 0 },
    weight: { type: Number, default: 0 }, // Total weight thrown by student
    totalFine: { type: Number, default: 0 },
    pendingFine: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    // Monthly tracking data
    monthlyData: [{
      year: { type: Number, required: true },
      month: { type: Number, required: true }, // 1-12
      waste: { type: Number, default: 0 },
      weight: { type: Number, default: 0 }, // Weight thrown this month
      finesCollected: { type: Number, default: 0 }, // Fines paid this month
      finesPending: { type: Number, default: 0 }, // Fines pending this month
      totalFines: { type: Number, default: 0 }, // Cumulative total fines
      score: { type: Number, default: 0 }
    }]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
