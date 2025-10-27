/**
 * Sync Controller
 * Handles login and logout sync operations
 */

import { syncLogin } from '../utils/syncLogin.js';
import { syncLogout } from '../utils/syncLogout.js';

export const handleLoginSync = async (req, res) => {
  try {
    const { studentId } = req.body;
    
    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: 'Student ID is required'
      });
    }

    const result = await syncLogin(studentId);
    
    if (result.success) {
      res.status(200).json({
        success: true,
        message: 'Login sync completed successfully',
        data: result
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Login sync failed',
        error: result.error
      });
    }
  } catch (error) {
    console.error('Error in login sync controller:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login sync',
      error: error.message
    });
  }
};

export const handleLogoutSync = async (req, res) => {
  try {
    const { studentId } = req.body;
    
    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: 'Student ID is required'
      });
    }

    const result = await syncLogout(studentId);
    
    if (result.success) {
      res.status(200).json({
        success: true,
        message: 'Logout sync completed successfully',
        data: result
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Logout sync failed',
        error: result.error
      });
    }
  } catch (error) {
    console.error('Error in logout sync controller:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during logout sync',
      error: error.message
    });
  }
};
