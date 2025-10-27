import express from 'express';
import multer from 'multer';
import { uploadFromBuffer, downloadStreamById, initGridFS } from '../config/gridfs.js';
import path from 'path';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Multer memory storage for small images
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

// Upload image to GridFS
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'image is required' });
    const filename = `${Date.now()}-${req.file.originalname}`;
    const id = await uploadFromBuffer(filename, req.file.buffer, req.file.mimetype, req.body || {});
    res.status(201).json({ id, filename, url: `/api/images/${id}` });
  } catch (err) {
    console.error('Image upload error:', err);
    res.status(500).json({ error: 'upload failed' });
  }
});

// Stream image by id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const stream = downloadStreamById(id);
    stream.on('error', (e) => {
      res.status(404).end();
    });
    stream.pipe(res);
  } catch (err) {
    res.status(400).json({ error: 'invalid id' });
  }
});

export default router;
