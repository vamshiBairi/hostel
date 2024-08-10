const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const {
    loginAdmin,  
  addStudent,
  addFoodItem,
  viewFoodSelections,
  viewComplaints,
  updateComplaintStatus,
  makeAnnouncement,
  viewMenu,
  viewstudents,
  removeFoodItem,
  viewcount,

} = require('../controllers/adminController');
const authMiddleware = require('../utils/authMiddleware');
const validateRequest = require('../utils/validateRequest');
const FoodSelection = require('../models/FoodSelection');


router.post(
    '/login',
    [
      check('username', 'Username is required').not().isEmpty(),
      check('password', 'Password is required').not().isEmpty(),
    ],
    validateRequest,
    loginAdmin
  );
  
// Add New Student
router.post(
  '/add-student',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
  validateRequest,
  authMiddleware.verifyAdmin,
  addStudent
);

// Add Food Item to Menu
router.post(
  '/add-food-item',
  [
    check('mealType', 'Meal type is required').isIn(['breakfast', 'lunch', 'dinner']),
    check('foodItem', 'Food item is required').not().isEmpty(),
  ],
  validateRequest,
  authMiddleware.verifyAdmin,
  addFoodItem
);

router.delete('/remove-food-item/:id', authMiddleware.verifyAdmin, removeFoodItem);

router.get('/view-students',viewstudents);

router.get('/view-count',authMiddleware.verifyAdmin,viewcount);

router.get('/view-menu',authMiddleware.verifyAdmin,viewMenu);
// View Food Selections
router.get('/selected-food', async (req, res) => {
  try {
    const foodSelectionSummary = await FoodSelection.aggregate([
      {
        $group: {
          _id: { mealType: "$mealType", foodItem: "$foodItem" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.mealType": 1, count: -1 }
      }
    ]);

    res.json(foodSelectionSummary);
  } catch (error) {
    console.error('Failed to fetch food selection summary', error);
    res.status(500).send('Internal Server Error');
  }
});

// View Complaints
router.get('/complaints', authMiddleware.verifyAdmin,viewComplaints);


// Update Complaint Status
router.put(
  '/update-complaint-status/:id',
  [check('status', 'Status is required').isIn(['Pending', 'In Progress', 'Resolved'])],
  validateRequest,
  authMiddleware.verifyAdmin,
  updateComplaintStatus
);

// Make Announcements
router.post(
  '/make-announcement',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty(),
  ],
  validateRequest,
  authMiddleware.verifyAdmin,
  makeAnnouncement
);

router.post('/refresh-food-selection',authMiddleware.verifyAdmin, async (req, res) => {
  try {
    await FoodSelection.deleteMany({});
    res.send('Food selection data has been refreshed.');
  } catch (error) {
    console.error('Failed to refresh food selection data', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
