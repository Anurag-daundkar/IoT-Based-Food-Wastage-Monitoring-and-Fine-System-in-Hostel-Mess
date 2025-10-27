import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

let client;
let bucket;

export async function initGridFS(mongoUri, dbName) {
  client = new MongoClient(mongoUri);
  await client.connect();
  const db = client.db(dbName);
  bucket = new GridFSBucket(db, { bucketName: 'images' });
  console.log('✅ GridFS initialized');
  return { client, bucket };
}

export function getBucket() {
  if (!bucket) throw new Error('GridFS bucket not initialized');
  return bucket;
}

export async function uploadFromBuffer(filename, buffer, contentType, metadata = {}) {
  const uploadStream = bucket.openUploadStream(filename, { metadata, contentType });
  return new Promise((resolve, reject) => {
    uploadStream.end(buffer);
    uploadStream.on('finish', () => resolve(uploadStream.id));
    uploadStream.on('error', (err) => reject(err));
  });
}

export function downloadStreamById(id) {
  return bucket.openDownloadStream(new ObjectId(id));
}
