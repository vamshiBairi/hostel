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
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
  ],
  validateRequest,
  loginStudent
);

// View Food Menu
router.get('/view-menu', viewMenu);

// Select Meal
router.post(
  '/select-meal',
  [
    check('mealType', 'Meal type is required').isIn(['breakfast', 'lunch', 'dinner']),
    check('foodItem', 'Food item is required').not().isEmpty(),
  ],
  validateRequest,
  
  selectMeal
);

// Raise Complaint
router.post(
  '/raise-complaint',
  [
    check('complaintText', 'Complaint text is required').not().isEmpty(),
  ],
  validateRequest,
  authMiddleware.verifyStudent,
  raiseComplaint
);

// Receive Announcements
router.get('/announcements', receiveAnnouncements);

module.exports = router;
