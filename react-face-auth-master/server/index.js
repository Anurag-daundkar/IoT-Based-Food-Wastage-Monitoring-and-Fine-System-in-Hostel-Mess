require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId, GridFSBucket } = require("mongodb");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/faceauth";
const databaseName = process.env.MONGO_DB || "faceauth";

let mongoClient;
let db;
let bucket;

async function connectMongo() {
  mongoClient = new MongoClient(mongoUri);
  await mongoClient.connect();
  db = mongoClient.db(databaseName);
  bucket = new GridFSBucket(db, { bucketName: "images" });
  console.log("Connected to MongoDB");
}

// Use memory storage; we'll write to GridFS manually
const upload = multer({ storage: multer.memoryStorage() });

// Health
app.get("/api/health", (req, res) => res.json({ ok: true }));

// Upload a user image (multipart/form-data: image, fullName, userId)
app.post("/api/users", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "image is required" });
    }
    const filename = `${Date.now()}-${file.originalname}`;
    const metadata = {
      fullName: req.body.fullName || null,
      userId: req.body.userId || null,
    };
    const uploadStream = bucket.openUploadStream(filename, {
      metadata,
      contentType: file.mimetype,
    });
    uploadStream.end(file.buffer);
    uploadStream.on("error", (e) => {
      return res.status(500).json({ error: "upload failed" });
    });
    uploadStream.on("finish", () => {
      return res.status(201).json({
        id: uploadStream.id,
        filename: filename,
        contentType: file.mimetype,
        metadata: metadata,
        url: `/api/images/${uploadStream.id}`,
      });
    });
  } catch (e) {
    return res.status(500).json({ error: "server error" });
  }
});

// List images (basic)
app.get("/api/users", async (req, res) => {
  const files = await db.collection("images.files").find({}).toArray();
  res.json(
    files.map((f) => ({
      id: f._id,
      filename: f.filename,
      uploadDate: f.uploadDate,
      length: f.length,
      contentType: f.contentType,
      metadata: f.metadata,
      url: `/api/images/${f._id}`,
    }))
  );
});

// Stream image by id
app.get("/api/images/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const files = await db.collection("images.files").find({ _id: id }).toArray();
    if (!files || files.length === 0) return res.status(404).send("Not found");
    res.set("Content-Type", files[0].contentType || "application/octet-stream");
    const downloadStream = bucket.openDownloadStream(id);
    downloadStream.on("error", () => res.status(404).end());
    downloadStream.pipe(res);
  } catch (e) {
    res.status(400).json({ error: "invalid id" });
  }
});

const PORT = process.env.PORT || 5174;

connectMongo()
  .then(() => {
    app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to start server", err);
    process.exit(1);
  });


