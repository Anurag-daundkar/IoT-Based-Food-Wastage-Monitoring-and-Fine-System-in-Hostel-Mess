import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    subject: { type: String, required: true, trim: true },
    category: { type: String, enum: ["general", "suggestion", "complaint", "doubt", "technical", "other"], required: true },
    priority: { type: String, enum: ["low", "medium", "high", "urgent"], default: "low" },
    description: { type: String, required: true, maxlength: 1000 },
    anonymous: { type: Boolean, default: false },
    status: { type: String, enum: ["pending", "in_progress", "resolved"], default: "pending" },
    source: { type: String, enum: ["student", "public"], default: "student" },
    contactName: { type: String, default: null },
    contactEmail: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
