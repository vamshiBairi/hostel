
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/databaseinit');


dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://goodday-hostels.vercel.app', // Allow only your frontend's domain
  methods: 'GET,POST,PUT,DELETE', // Specify the allowed methods
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

console.log("Backend started");

const adminRoutes = require('./routes/admin');
const studentRoutes = require('./routes/student');

app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
