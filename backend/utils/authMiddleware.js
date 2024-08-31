const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Student = require("../models/Student");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const verifyAdmin = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.isAdmin) {
      req.isAdmin = true;
      return next();
    }
    return res.status(403).json({ message: "Not Admin" });
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

const verifyStudent = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.studentId = decoded.studentId;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
};

const authenticateAdmin = (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ isAdmin: true }, JWT_SECRET);
    return res.status(200).json({ message: "Admin login successful", token });
  } else {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }
};

module.exports = {
  verifyAdmin,
  verifyStudent,
  authenticateAdmin,
};
