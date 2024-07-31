
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/databaseinit');

const userRoutes = require('./routes/user-routes');
const studentRoutes = require('./routes/student-routes');
const ownerRoutes = require('./routes/owner-routes');
const complaintRoutes = require('./routes/complaint-routes');


dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/owners', ownerRoutes);
app.use('/api/complaints', complaintRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
