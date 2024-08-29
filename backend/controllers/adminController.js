const Student = require('../models/Student');
const Announcement = require('../models/Announcement');
const Complaint = require('../models/Complaint');
const FoodMenu = require('../models/FoodMenu');
const FoodSelection = require('../models/FoodSelection');
const { authenticateAdmin } = require('../utils/authMiddleware');

// Admin Login
const loginAdmin = (req, res) => {
  authenticateAdmin(req, res);
};

// Add New Student
const addStudent = async (req, res) => {
  const { name, email, phone, roomNumber, password } = req.body;
  try {
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const student = new Student({ name, email, phone, roomNumber, password });
    await student.save();
    res.status(201).json({ message: 'Student added successfully', studentId: student._id });
  } catch (error) {
    res.status(500).json({message: 'Try again later' });
  }
};

// Add Food Item to Menu
const addFoodItem = async (req, res) => {
  const { mealType, foodItem, items,url } = req.body;

  try {
    const foodMenu = new FoodMenu({ mealType, foodItem, items ,url});
    await foodMenu.save();
    res.status(201).json({ message: 'Food item added successfully', menuId: foodMenu._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const viewstudents =async (req, res) => {
  try {
    const selections = await Student.find().populate();
    res.status(200).json(selections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const viewMenu = async (req, res) => {
  try {
    const selections = await FoodMenu.find().populate();
    res.status(200).json(selections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const viewcount = async (req, res) => {
  try {
    const selections = await FoodMenu.find().populate('count');
    res.status(200).json(selections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View Food Selections

const viewFoodSelections = async (req, res) => {
  try {
    const selections = await FoodSelection.find().populate('studentId', 'name');
    res.status(200).json(selections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View Complaints
const viewComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('studentId', 'name');
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message:'Error cant fetch' });
  }
};

// Update Complaint Status
const updateComplaintStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    complaint.status = status;
    await complaint.save();
    res.status(200).json({ message: 'Complaint status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Make Announcements
const makeAnnouncement = async (req, res) => {
  const { title, content } = req.body;

  try {
    const announcement = new Announcement({ title, content });
    await announcement.save();
    res.status(201).json({ message: 'Announcement made successfully', announcementId: announcement._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeFoodItem = async (req, res) => {
  const { id } = req.params;

  try {
    const foodItem = await FoodMenu.findByIdAndDelete(id);
    console.log(foodItem);
    if (!foodItem) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    res.status(200).json({ message: 'Food item removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  loginAdmin,
  addStudent,
  addFoodItem,
  viewFoodSelections,
  viewComplaints,
  updateComplaintStatus,
  makeAnnouncement,
  viewMenu,
  viewstudents,
  removeFoodItem,
  viewcount,
};
