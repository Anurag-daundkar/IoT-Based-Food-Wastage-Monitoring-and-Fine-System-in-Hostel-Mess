import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { MongoClient, GridFSBucket, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const FACE_AUTH_URI = process.env.FACE_AUTH_URI || process.env.MONGO_URI || "mongodb://127.0.0.1:27017/faceauth";
const FACE_AUTH_DB = process.env.FACE_AUTH_DB || process.env.MONGO_DB || "faceauth";

async function uploadImageToFaceAuth(buffer, originalname, mimetype, metadata = {}) {
  const client = new MongoClient(FACE_AUTH_URI);
  await client.connect();
  const db = client.db(FACE_AUTH_DB);
  const bucket = new GridFSBucket(db, { bucketName: "images" });

  const filename = `${Date.now()}-${originalname}`;
  const uploadStream = bucket.openUploadStream(filename, { metadata, contentType: mimetype });

  return new Promise((resolve, reject) => {
    uploadStream.end(buffer);
    uploadStream.on("finish", () => {
      const id = uploadStream.id;
      client.close().catch(() => {});
      resolve({ id, filename });
    });
    uploadStream.on("error", (err) => {
      client.close().catch(() => {});
      reject(err);
    });
  });
}

async function insertFaceAuthUser({ fullName, userId, email, imageRef }) {
  const client = new MongoClient(FACE_AUTH_URI);
  await client.connect();
  const db = client.db(FACE_AUTH_DB);
  try {
    const doc = {
      fullName,
      userId,
      email,
      image: imageRef || null,
      createdAt: new Date(),
    };
    await db.collection("users").insertOne(doc);
  } finally {
    await client.close().catch(() => {});
  }
}

// Signup controller
export const signup = async (req, res) => {
  try {
    const { name, email, password, role, studentId, college, roomNumber } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const hashed = await bcrypt.hash(password, 10);

    // If a photo was uploaded via multer (memory storage), upload it to face-auth GridFS
    let photoId = null;
    let photoFilename = null;
    if (req.file && req.file.buffer) {
      try {
        const result = await uploadImageToFaceAuth(req.file.buffer, req.file.originalname, req.file.mimetype, { fullName: name, userId: studentId });
        photoId = result.id.toString();
        photoFilename = result.filename;
      } catch (err) {
        console.error("Face-auth GridFS upload failed:", err);
        // continue without failing signup
      }
    }

    // Create user in primary database (Mongoose)
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "student",
      studentId,
      college,
      roomNumber,
      photo: photoId,
    });

    // Insert a minimal record into face-auth users collection
    try {
      await insertFaceAuthUser({ fullName: name, userId: studentId, email, imageRef: photoId ? { id: photoId, filename: photoFilename, contentType: req.file?.mimetype } : null });
    } catch (err) {
      console.error("Failed to insert into face-auth users collection:", err);
      // do not fail the main signup
    }

    const token = generateToken({ id: user._id, role: user.role });

    const photoUrl = photoId ? `${req.protocol}://${req.get("host")}/api/images/${photoId}` : null;

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      studentId: user.studentId,
      college: user.college,
      roomNumber: user.roomNumber,
      photo: photoUrl,
      waste: user.waste,
      totalFine: user.totalFine,
      pendingFine: user.pendingFine,
      score: user.score,
    };

    return res.status(201).json({ message: "User registered successfully", token, user: userResponse });
  } catch (error) {
    console.error("Error in signup:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let isMatch = false;

    if (user.password.startsWith("$2")) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      isMatch = password === user.password;
      if (isMatch) {
        const hashed = await bcrypt.hash(password, 10);
        user.password = hashed;
        await user.save();
      }
    }

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ id: user._id, role: user.role });
    return res.status(200).json({ message: "Login successful", token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    
    if (!user) return res.status(404).json({ message: "User not found" });

    const photoUrl = user.photo ? `${req.protocol}://${req.get("host")}/api/images/${user.photo}` : null;

    return res.status(200).json({ id: user._id, name: user.name, email: user.email, role: user.role, studentId: user.studentId, college: user.college, roomNumber: user.roomNumber, photo: photoUrl, waste: user.waste, totalFine: user.totalFine, pendingFine: user.pendingFine, score: user.score, monthlyData: user.monthlyData || [] });
  } catch (error) {
    console.error("Error in getProfile:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');

    const computed = students.map((u) => {
      const m = Array.isArray(u.monthlyData) ? u.monthlyData : [];
      const wasteSum = m.reduce((s, md) => s + (Number(md.waste) || 0), 0);
      const weightSum = m.reduce((s, md) => s + (Number(md.weight) || 0), 0);
      const totalFines = m.reduce((s, md) => s + (Number(md.totalFines) || 0), 0);
      const pendingFine = m.reduce((s, md) => s + (Number(md.finesPending) || 0), 0);
      const finesCollected = m.reduce((s, md) => s + (Number(md.finesCollected) || 0), 0);
      const scoreAvg = m.length
        ? Math.round(m.reduce((s, md) => s + (Number(md.score) || 0), 0) / m.length)
        : (Number(u.score) || 0);

      return {
        id: u._id,
        name: u.name,
        email: u.email,
        role: u.role,
        studentId: u.studentId,
        college: u.college,
        roomNumber: u.roomNumber,
        photo: u.photo,
        // root fields computed from monthly data
        waste: wasteSum,
        weight: weightSum,
        totalFine: totalFines,
        pendingFine,
        finesCollected,
        score: scoreAvg,
        monthlyData: m,
      };
    });

    return res.status(200).json(computed);
  } catch (error) {
    console.error('Error in getAllStudents:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await User.findOne({ studentId, role: 'student' }).select('-password');
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const m = Array.isArray(student.monthlyData) ? student.monthlyData : [];
    const wasteSum = m.reduce((s, md) => s + (Number(md.waste) || 0), 0);
    const weightSum = m.reduce((s, md) => s + (Number(md.weight) || 0), 0);
    const totalFines = m.reduce((s, md) => s + (Number(md.totalFines) || 0), 0);
    const pendingFine = m.reduce((s, md) => s + (Number(md.finesPending) || 0), 0);
    const scoreAvg = m.length
      ? Math.round(m.reduce((s, md) => s + (Number(md.score) || 0), 0) / m.length)
      : (Number(student.score) || 0);

    const photoUrl = student.photo ? `${req.protocol}://${req.get('host')}/api/images/${student.photo}` : null;

    return res.status(200).json({
      id: student._id,
      name: student.name,
      email: student.email,
      studentId: student.studentId,
      college: student.college,
      roomNumber: student.roomNumber,
      photo: photoUrl,
      waste: wasteSum,
      weight: weightSum,
      totalFine: totalFines,
      pendingFine,
      score: scoreAvg,
      monthlyData: m,
    });
  } catch (error) {
    console.error('Error in getStudentById:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a student from edai2 and face-auth databases
export const deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!studentId) return res.status(400).json({ message: "Student ID is required" });

    // Find the student in primary DB
    const student = await User.findOne({ studentId, role: "student" });
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Best-effort delete from face-auth DB
    const client = new MongoClient(FACE_AUTH_URI);
    try {
      await client.connect();
      const db = client.db(FACE_AUTH_DB);
      // Remove face-auth user document
      await db.collection("users").deleteMany({ userId: studentId });
      // Delete image from face-auth GridFS if we have an id
      if (student.photo) {
        try {
          const bucket = new GridFSBucket(db, { bucketName: "images" });
          const oid = (() => { try { return new ObjectId(String(student.photo)); } catch { return null; } })();
          if (oid) await bucket.delete(oid);
        } catch (e) {
          // ignore image delete errors
        }
      }
    } catch (e) {
      console.error("Face-auth delete error:", e.message);
    } finally {
      await client.close().catch(() => {});
    }

    // Delete from primary DB
    await User.deleteOne({ _id: student._id });

    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error in deleteStudent:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// 🔹 Helper function to get or create monthly data for a student
export const getOrCreateMonthlyData = async (userId, year, month) => {
  const user = await User.findById(userId);
  if (!user) return null;

  let monthData = user.monthlyData?.find(
    data => data.year === year && data.month === month
  );

  if (!monthData) {
    // Create new monthly data entry
    monthData = {
      year,
      month,
      waste: 0,
      finesCollected: 0,
      finesPending: 0,
      totalFines: user.totalFine || 0,
      score: user.score || 0
    };
    
    if (!user.monthlyData) user.monthlyData = [];
    user.monthlyData.push(monthData);
    await user.save();
  }

  return monthData;
};

// 🔹 Add waste data for a student (admin function)
export const addWasteData = async (req, res) => {
  try {
    const { studentId, wasteAmount, fineAmount } = req.body;
    
    if (!studentId || !wasteAmount) {
      return res.status(400).json({ message: "Student ID and waste amount are required" });
    }

    const student = await User.findOne({ studentId, role: "student" });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    // Get or create monthly data
    const monthData = await getOrCreateMonthlyData(student._id, year, month);
    
    // Update waste data
    monthData.waste += wasteAmount;
    
    // Update fine data if provided
    if (fineAmount && fineAmount > 0) {
      monthData.finesPending += fineAmount;
      student.totalFine = (student.totalFine || 0) + fineAmount;
      student.pendingFine = (student.pendingFine || 0) + fineAmount;
    }

    // Update legacy fields for backward compatibility
    student.waste = (student.waste || 0) + wasteAmount;

    await student.save();

    res.status(200).json({
      message: "Waste data added successfully",
      student: {
        id: student._id,
        name: student.name,
        studentId: student.studentId,
        currentMonthWaste: monthData.waste,
        totalWaste: student.waste,
        totalFine: student.totalFine,
        pendingFine: student.pendingFine
      }
    });
  } catch (error) {
    console.error("Error in addWasteData:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🔹 Mark fine as paid (admin function)
// Move ALL pending fines (across all months) into CURRENT month's finesCollected,
// then set finesPending = 0 for ALL months and recompute aggregates.
export const markFineAsPaid = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!studentId) return res.status(400).json({ message: "Student ID is required" });

    const student = await User.findOne({ studentId, role: 'student' });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 1-12

    // Work directly on this student's monthlyData so that a single save() persists everything
    let monthly = Array.isArray(student.monthlyData) ? student.monthlyData : [];

    // Ensure current month entry exists on *this* student document
    let currentMonthData = monthly.find((m) => m.year === year && m.month === month);
    if (!currentMonthData) {
      currentMonthData = {
        year,
        month,
        waste: 0,
        weight: 0,
        finesCollected: 0,
        finesPending: 0,
        totalFines: 0,
        score: student.score || 0,
      };
      monthly.push(currentMonthData);
      student.monthlyData = monthly;
    }

    // Sum all pending fines across months
    const totalPendingAcrossMonths = monthly.reduce(
      (sum, m) => sum + (Number(m.finesPending) || 0),
      0
    );

    // Add that total into the current month's collected fines
    currentMonthData.finesCollected =
      (Number(currentMonthData.finesCollected) || 0) + totalPendingAcrossMonths;

    // Reset pending fines for all months and recompute each month's totalFines
    monthly = monthly.map((m) => {
      const finesCollected = Number(m.finesCollected) || 0;
      // after payment, nothing is pending
      return {
        ...m.toObject?.() ?? m,
        finesPending: 0,
        totalFines: finesCollected, // total for that month is now equal to collected
      };
    });

    student.monthlyData = monthly;

    // Recompute root aggregates for fines based on updated monthly data
    student.pendingFine = 0;
    student.totalFine = monthly.reduce(
      (sum, m) => sum + (Number(m.totalFines) || 0),
      0
    );

    await student.save();

    return res.status(200).json({
      message: 'Fine marked as paid successfully',
      student: {
        id: student._id,
        name: student.name,
        studentId: student.studentId,
        totalFine: student.totalFine,
        pendingFine: 0,
        paidThisMonth: currentMonthData.finesCollected,
      },
    });
  } catch (error) {
    console.error('Error in markFineAsPaid:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 🔹 Send warning email to student
export const sendWarningEmail = async (req, res) => {
  try {
    const { studentId } = req.params;
    
    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    const student = await User.findOne({ studentId, role: "student" });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // For now, we'll just log the warning (you can integrate with email service later)
    console.log(`Warning sent to ${student.name} (${student.email}):`);
    console.log(`- Pending Fine: ₹${student.pendingFine}`);
    console.log(`- Total Waste: ${student.waste} kg`);
    console.log(`- Current Score: ${student.score}`);

    res.status(200).json({
      message: "Warning sent successfully",
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        pendingFine: student.pendingFine,
        waste: student.waste,
        score: student.score
      }
    });
  } catch (error) {
    console.error("Error in sendWarningEmail:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🔹 Get monthly analytics data for admin dashboard (monthly waste sums, root waste = sum of months)
export const getMonthlyAnalytics = async (req, res) => {
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // 1-12

    // Build last 6 months [oldest..newest]
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(currentYear, currentMonth - 1 - i, 1);
      months.push({
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        monthName: d.toLocaleString('default', { month: 'short' })
      });
    }

    // Fetch needed fields
    const students = await User.find({ role: 'student' }).select('name studentId monthlyData waste');

    // Compute per-student rootWaste as sum of monthlyData.waste
    const studentComputed = students.map((s) => {
      const m = Array.isArray(s.monthlyData) ? s.monthlyData : [];
      const rootWasteComputed = m.reduce((sum, md) => sum + (Number(md.waste) || 0), 0);
      return { s, rootWasteComputed };
    });

    // Build monthly analytics: sum monthlyData.waste for each month
    const monthlyAnalytics = months.map(({ year, month, monthName }) => {
      let monthlyTotalWaste = 0; // sum of this month's waste across students
      let totalFinesCollected = 0;
      const topStudents = [];

      for (const { s } of studentComputed) {
        const md = Array.isArray(s.monthlyData)
          ? s.monthlyData.find((m) => m.year === year && m.month === month)
          : null;
        if (!md) continue;

        const waste = Number(md.waste) || 0;
        const finesCollected = Number(md.finesCollected) || 0;
        const finesPending = Number(md.finesPending) || 0;

        monthlyTotalWaste += waste;
        totalFinesCollected += finesCollected;

        if (waste > 0) {
          topStudents.push({
            id: String(s._id),
            name: s.name,
            studentId: s.studentId,
            waste,
            fines: finesCollected + finesPending,
          });
        }
      }

      topStudents.sort((a, b) => b.waste - a.waste);

      return {
        year,
        month,
        monthName,
        totalWaste: monthlyTotalWaste,
        totalFinesCollected,
        topStudents: topStudents.slice(0, 5),
      };
    });

    // Summary total waste = sum of each student's rootWasteComputed
    const summaryTotalWaste = studentComputed.reduce((sum, r) => sum + r.rootWasteComputed, 0);

    const currentMonthData = monthlyAnalytics.find((m) => m.year === currentYear && m.month === currentMonth);

    res.status(200).json({
      monthlyData: monthlyAnalytics,
      currentMonthTopStudents: currentMonthData?.topStudents || [],
      summary: {
        totalWaste: summaryTotalWaste,
        totalFinesCollected: monthlyAnalytics.reduce((s, m) => s + (m.totalFinesCollected || 0), 0),
        currentMonth: currentMonthData || null,
      },
    });
  } catch (error) {
    console.error('Error in getMonthlyAnalytics:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
