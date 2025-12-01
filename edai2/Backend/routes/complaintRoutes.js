import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createComplaint, createPublicComplaint, listComplaints, updateComplaintStatus, myComplaints } from "../controllers/complaintController.js";

const router = express.Router();

// Public submission (no auth required)
router.post("/public", createPublicComplaint);

// Student submission
router.post("/", protect, createComplaint);

// Student: view my own submissions
router.get("/mine", protect, myComplaints);

// Admin: list all (with filters)
router.get("/", protect, listComplaints);

// Admin: update status
router.patch("/:id/status", protect, updateComplaintStatus);

export default router;
