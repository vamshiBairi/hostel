const Student = require('../models/student');
const Complaint = require('../models/complaint');

exports.getAllMealSelections = async (req, res) => {
  try {
    const students = await Student.find({}).populate('userId', 'username');

    const mealSelections = students.map((student) => ({
      name: student.name,
      roomNumber: student.roomNumber,
      mealSelection: student.mealSelection,
    }));

    res.json(mealSelections);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({}).populate('studentId', 'name roomNumber');

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
