const Student = require('../models/student');
exports.getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id }).populate('userId', 'username');

    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateMealSelection = async (req, res) => {
  const { breakfast, lunch, dinner } = req.body;

  try {
    const student = await Student.findOne({ userId: req.user.id });

    if (student) {
      student.mealSelection = { breakfast, lunch, dinner };
      await student.save();

      res.json({ message: 'Meal selection updated successfully' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
