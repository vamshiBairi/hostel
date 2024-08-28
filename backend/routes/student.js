const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {
  loginStudent,
  viewMenu,
  selectMeal,
  raiseComplaint,
  receiveAnnouncements,
} = require('../controllers/studentController');
const authMiddleware = require('../utils/authMiddleware');
const validateRequest = require('../utils/validateRequest');

// Student Login
router.post(
  '/login',
  
  validateRequest,
  loginStudent
);

// View Food Menu
router.get('/view-menu', authMiddleware.verifyStudent, viewMenu);

// Select Meal
  router.post(
    '/select-meal',
    authMiddleware.verifyStudent,
    validateRequest,
    
    selectMeal
  );

// Raise Complaint
router.post(
  '/raise-complaint',
  
  validateRequest,
  authMiddleware.verifyStudent,
  raiseComplaint
);

// Receive Announcements
router.get('/announcements',authMiddleware.verifyStudent, receiveAnnouncements);

module.exports = router;
