const Complaint = require('../models/complaint');
exports.createComplaint = async (req, res) => {
  const { message } = req.body;

  try {
    const complaint = await Complaint.create({
      studentId: req.user.id,
      message,
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
