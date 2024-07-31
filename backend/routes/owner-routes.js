const express = require('express');
const { getAllMealSelections, getAllComplaints } = require('../controllers/ownercontroller');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();
router.use(protect);
router.use(authorize(['owner']));

router.get('/meals', getAllMealSelections);
router.get('/complaints', getAllComplaints);

module.exports = router;
