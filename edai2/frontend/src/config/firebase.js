// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBNCtRP31RiEN9uPGOBPHdDrmN8YvnJKSY",
  authDomain: "smart-dustbin-d4009.firebaseapp.com",
  databaseURL: "https://smart-dustbin-d4009-default-rtdb.firebaseio.com",
  projectId: "smart-dustbin-d4009",
  storageBucket: "smart-dustbin-d4009.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { app, database, auth };