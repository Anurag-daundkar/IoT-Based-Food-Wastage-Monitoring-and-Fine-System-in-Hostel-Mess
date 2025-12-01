import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import userAggregates from "./routes/userAggregates.js";
import syncRoutes from "./routes/syncRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import { initGridFS } from './config/gridfs.js';
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { initializeFirebase, processWasteAndCalculateFine } from './services/firebaseWasteProcessor.js';

dotenv.config();
connectDB();

// Initialize GridFS (use same MONGO_URI and DB name if provided)
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const mongoDbName = process.env.MONGO_DB || process.env.MONGO_DB_NAME || 'smart-sentinel';
initGridFS(mongoUri, mongoDbName).catch(err => {
  console.error('Failed to initialize GridFS:', err);
  process.exit(1);
});


const app = express();

app.use(cors());
app.use(express.json());

// Ensure uploads directory exists and serve it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

app.get("/", (req, res) => {
  res.send("Smart Sentinel Backend Running ✅");
});

app.use("/api/auth", authRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/users', userAggregates);
app.use('/api/sync', syncRoutes);
app.use('/api/complaints', complaintRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  
  // Initialize Firebase and start waste processor
  try {
    initializeFirebase();
    await processWasteAndCalculateFine();
    console.log('🔥 Waste processor service started');
  } catch (error) {
    console.error('⚠️ Waste processor failed to start:', error);
  }
});
