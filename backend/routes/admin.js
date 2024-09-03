const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  addStudent,
  addFoodItem,
  viewComplaints,
  updateComplaintStatus,
  makeAnnouncement,
  viewMenu,
  viewstudents,
  removeFoodItem,
  viewcount,
  removeComplaint,
  removeStudent,
} = require("../controllers/adminController");
const authMiddleware = require("../utils/authMiddleware");
const validateRequest = require("../utils/validateRequest");
const FoodSelection = require("../models/FoodSelectionModel");

router.post("/login", validateRequest, loginAdmin);

router.post(
  "/add-student",

  validateRequest,
  authMiddleware.verifyAdmin,
  addStudent
);

router.post(
  "/add-food-item",
  validateRequest,
  authMiddleware.verifyAdmin,
  addFoodItem
);

router.get("/view-students", authMiddleware.verifyAdmin, viewstudents);

router.get("/view-count", authMiddleware.verifyAdmin, viewcount);

router.get("/view-menu", authMiddleware.verifyAdmin, viewMenu);
router.get("/complaints", authMiddleware.verifyAdmin, viewComplaints);
router.get("/selected-food", authMiddleware.verifyAdmin, async (req, res) => {
  try {
    const foodSelectionSummary = await FoodSelection.aggregate([
      {
        $group: {
          _id: { mealType: "$mealType", foodItem: "$foodItem" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.mealType": 1, count: -1 },
      },
    ]);

    res.json(foodSelectionSummary);
  } catch (error) {
    console.error("Failed to fetch food selection summary", error);
    res.status(500).send(error);
  }
});

router.put(
  "/update-complaint-status/:id",
  validateRequest,
  authMiddleware.verifyAdmin,
  updateComplaintStatus
);

router.post(
  "/make-announcement",
  validateRequest,
  authMiddleware.verifyAdmin,
  makeAnnouncement
);

router.post(
  "/remove-food-item/:id",
  authMiddleware.verifyAdmin,
  removeFoodItem
);

router.post(
  "/remove-complaint/:id",
  authMiddleware.verifyAdmin,
  removeComplaint
);

router.post("/remove-student/:id", authMiddleware.verifyAdmin, removeStudent);

router.post(
  "/refresh-food-selection",
  authMiddleware.verifyAdmin,
  async (req, res) => {
    try {
      await FoodSelection.deleteMany({});
      res.send("Food selection data has been refreshed.");
    } catch (error) {
      console.error("Failed to refresh food selection data", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
