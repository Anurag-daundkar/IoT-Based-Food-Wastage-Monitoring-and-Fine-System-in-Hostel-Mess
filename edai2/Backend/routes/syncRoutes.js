import express from 'express';
import { handleLoginSync, handleLogoutSync } from '../controllers/syncController.js';

const router = express.Router();

// Login sync: MongoDB → Firebase
router.post('/login', handleLoginSync);

// Logout sync: Firebase → MongoDB  
router.post('/logout', handleLogoutSync);

export default router;
