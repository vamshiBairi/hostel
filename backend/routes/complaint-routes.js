const express = require('express');
const { createComplaint } = require('../controllers/complaintcontroller');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();
router.use(protect);
router.use(authorize(['student']));
router.post('/', createComplaint);

module.exports = router;
