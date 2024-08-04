const mongoose = require('mongoose');

const foodSelectionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner'],
    required: true,
  },
  foodItem: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('FoodSelection', foodSelectionSchema);
