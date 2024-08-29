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
  removeComplaint,
  removeStudent

} = require('../controllers/adminController');
const authMiddleware = require('../utils/authMiddleware');
const validateRequest = require('../utils/validateRequest');
const FoodSelection = require('../models/FoodSelection');


router.post(
    '/login',
    validateRequest,
    loginAdmin
  );
  
// Add New Student
router.post(
  '/add-student',
  
  validateRequest,
  authMiddleware.verifyAdmin,
  addStudent
);

// Add Food Item to Menu
router.post(
  '/add-food-item',
  validateRequest,
  authMiddleware.verifyAdmin,
  addFoodItem
);

router.post('/remove-food-item/:id',authMiddleware.verifyAdmin, removeFoodItem);

router.post('/remove-complaint/:id',authMiddleware.verifyAdmin, removeComplaint);
router.post('/remove-student/:id',authMiddleware.verifyAdmin, removeStudent);

router.get('/view-students',authMiddleware.verifyAdmin,viewstudents);

router.get('/view-count',authMiddleware.verifyAdmin,viewcount);

router.get('/view-menu',authMiddleware.verifyAdmin,viewMenu);
// View Food Selections
router.get('/selected-food',authMiddleware.verifyAdmin, async (req, res) => {
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
    res.status(500).send(error);
  }
});

// View Complaints
router.get('/complaints',authMiddleware.verifyAdmin,viewComplaints);


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
