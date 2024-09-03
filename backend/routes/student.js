const express = require("express");
const router = express.Router();
const {
  loginStudent,
  viewMenu,
  selectMeal,
  raiseComplaint,
  receiveAnnouncements,
} = require("../controllers/studentController1");
const authMiddleware = require("../utils/authMiddleware");
const validateRequest = require("../utils/validateRequest");

router.post(
  "/login",
  validateRequest,
  loginStudent
);

router.get("/view-menu", authMiddleware.verifyStudent, viewMenu);

router.post(
  "/select-meal",
  authMiddleware.verifyStudent,
  validateRequest,
  selectMeal
);

router.post(
  "/raise-complaint",
  validateRequest,
  authMiddleware.verifyStudent,
  raiseComplaint
);

router.get(
  "/announcements",
  authMiddleware.verifyStudent,
  receiveAnnouncements
);

module.exports = router;
