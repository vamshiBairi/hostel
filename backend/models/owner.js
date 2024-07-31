// backend/models/Owner.js
const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  hostelName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Owner', ownerSchema);
