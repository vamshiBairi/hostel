const express = require('express');
const { getStudentProfile, updateMealSelection } = require('../controllers/studentcontroller');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.use(authorize(['student']));

router.get('/profile', getStudentProfile);
router.put('/meal', updateMealSelection);

module.exports = router;
