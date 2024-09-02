const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/databaseinit');

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

console.log("Backend started");

const adminRoutes = require('./routes/admin');
const studentRoutes = require('./routes/student');

app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);
app.listen(process.env.PORT||5000,()=>{
    console.log("Server started");
})

