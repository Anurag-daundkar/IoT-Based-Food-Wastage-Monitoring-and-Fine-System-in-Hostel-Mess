import Complaint from "../models/Complaint.js";
import User from "../models/User.js";

// Student creates a complaint/feedback (authenticated)
export const createComplaint = async (req, res) => {
  try {
    const { subject, category, priority = "low", description, anonymous = false } = req.body || {};

    if (!subject || !category || !description) {
      return res.status(400).json({ message: "subject, category and description are required" });
    }

    const studentId = req.user?.id || null;

    const complaint = await Complaint.create({
      subject,
      category,
      priority,
      description,
      anonymous: !!anonymous,
      student: anonymous ? null : studentId,
      status: "pending",
      source: "student",
    });

    return res.status(201).json(complaint);
  } catch (err) {
    console.error("createComplaint error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Public creates a complaint/feedback (unauthenticated, landing page)
export const createPublicComplaint = async (req, res) => {
  try {
    const { subject, category = "general", priority = "low", description, name, email } = req.body || {};
    if (!subject || !category || !description) {
      return res.status(400).json({ message: "subject, category and description are required" });
    }

    const complaint = await Complaint.create({
      subject,
      category,
      priority,
      description,
      anonymous: false,
      student: null,
      status: "pending",
      source: "public",
      contactName: name || null,
      contactEmail: email || null,
    });

    return res.status(201).json(complaint);
  } catch (err) {
    console.error("createPublicComplaint error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Admin lists complaints with optional filters
export const listComplaints = async (req, res) => {
  try {
    if (req.user?.role !== "admin") return res.status(403).json({ message: "Admin only" });

    const { status, category, priority, q } = req.query || {};
    const filter = {};
    if (status) filter.status = status; // expected: pending | in_progress | resolved
    if (category) filter.category = category;
    if (priority) filter.priority = priority;
    if (q) filter.$or = [
      { subject: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } }
    ];

    const complaints = await Complaint.find(filter)
      .sort({ createdAt: -1 })
      .populate("student", "name email studentId college roomNumber");

    return res.json(complaints);
  } catch (err) {
    console.error("listComplaints error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Admin updates status of a complaint
export const updateComplaintStatus = async (req, res) => {
  try {
    if (req.user?.role !== "admin") return res.status(403).json({ message: "Admin only" });

    const { id } = req.params;
    const { status } = req.body || {};
    const allowed = ["pending", "in_progress", "resolved"];
    if (!allowed.includes(status)) return res.status(400).json({ message: "Invalid status" });

    const updated = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("student", "name email studentId college roomNumber");

    if (!updated) return res.status(404).json({ message: "Not found" });
    return res.json(updated);
  } catch (err) {
    console.error("updateComplaintStatus error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Student can view their own submissions (non-anonymous ones)
export const myComplaints = async (req, res) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });
    const mine = await Complaint.find({ student: req.user.id }).sort({ createdAt: -1 });
    return res.json(mine);
  } catch (err) {
    console.error("myComplaints error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
