import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import {
  signup,
  login,
  getProfile,
  getAllStudents,
  getStudentById,
  getMonthlyAnalytics,
  addWasteData,
  markFineAsPaid,
  sendWarningEmail,
  deleteStudent,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer (memory storage) so we can upload directly to GridFS
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed"));
  }
  cb(null, true);
};
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter });

const router = express.Router();

// Public routes
router.post("/signup", upload.single("photo"), signup);
router.post("/login", login);

// Protected routes (require authentication)
router.get("/profile", protect, getProfile);

// Protected/admin routes
router.get("/students", getAllStudents);
router.get("/students/:studentId", getStudentById);
router.delete("/students/:studentId", deleteStudent);
router.get("/analytics/monthly", getMonthlyAnalytics);
router.post("/waste/add", addWasteData);
router.put("/students/:studentId/markPaid", markFineAsPaid); // ✅ Mark fine as paid
router.post("/students/:studentId/sendWarning", sendWarningEmail); // ✅ Send warning email

export default router;
