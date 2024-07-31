// backend/models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
  },
  mealSelection: {
    breakfast: {
      type: String,
      default: '',
    },
    lunch: {
      type: String,
      default: '',
    },
    dinner: {
      type: String,
      default: '',
    },
  },
});

module.exports = mongoose.model('Student', studentSchema);
