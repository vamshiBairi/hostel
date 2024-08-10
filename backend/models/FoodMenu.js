const mongoose = require('mongoose');

const foodMenuSchema = new mongoose.Schema({
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner'],
    required: true,
  },
  foodItem: {
    type: String,
    required: true,
  },
  items: [{
    type: String,
    required: true,
  }],
  url:{
    type:String,
  }
});

module.exports = mongoose.model('FoodMenu', foodMenuSchema);
