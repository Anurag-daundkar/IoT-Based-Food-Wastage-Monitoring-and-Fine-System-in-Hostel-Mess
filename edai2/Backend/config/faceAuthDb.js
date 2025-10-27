import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const faceAuthUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/faceauth";
const faceAuthDbName = "faceauth";

let faceAuthClient;
let faceAuthDb;

export async function connectFaceAuthDb() {
  try {
    faceAuthClient = new MongoClient(faceAuthUri);
    await faceAuthClient.connect();
    faceAuthDb = faceAuthClient.db(faceAuthDbName);
    console.log('✅ Face Auth MongoDB Connected');
    return { client: faceAuthClient, db: faceAuthDb };
  } catch (error) {
    console.error('❌ Error connecting to Face Auth MongoDB:', error);
    throw error;
  }
}

export function getFaceAuthDb() {
  if (!faceAuthDb) throw new Error('Face Auth MongoDB not initialized');
  return faceAuthDb;
}