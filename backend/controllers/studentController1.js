const FoodMenu = require("../models/FoodMenuModel");
const FoodSelection = require("../models/FoodSelectionModel");
const Complaint = require("../models/ComplaintModel");
const Announcement = require("../models/AnnouncementModel");
const Student = require("../models/StudentModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const isPasswordCorrect = await student.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ studentId: student._id }, JWT_SECRET);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Try again after sometime" });
  }
};

const viewMenu = async (req, res) => {
  try {
    const menu = await FoodMenu.find();
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const selectMeal = async (req, res) => {
  const { mealType, foodItem } = req.body;
  const studentId = req.studentId;
  try {
    const existingSelection = await FoodSelection.findOne({
      studentId,
      mealType,
    });

    if (existingSelection) {
      return res.status(400).json({
        message: "You have already selected a meal for this meal type",
      });
    }

    const foodMenu = await FoodMenu.findOne({ mealType, foodItem });

    if (!foodMenu) {
      return res
        .status(404)
        .json({ message: "Food item not found in the menu" });
    }
    await foodMenu.save();

    const selection = new FoodSelection({ studentId, mealType, foodItem });
    await selection.save();

    res.status(201).json({
      message: "Meal selected successfully",
      selectionId: selection._id,
    });
  } catch (error) {
    // console.log("Error");
    res.status(500).json({ message: "Try Again After SomeTime" });
  }
};

const raiseComplaint = async (req, res) => {
  const { complaintText } = req.body;
  studentId = req.studentId;
  try {
    const complaint = new Complaint({ studentId, complaintText });
    await complaint.save();
    res.status(201).json({
      message: "Complaint raised successfully",
      complaintId: complaint._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const receiveAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  loginStudent,
  viewMenu,
  selectMeal,
  raiseComplaint,
  receiveAnnouncements,
};
