const express = require('express');
require('dotenv').config(); // Load environment variables

// Database connection
require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); 
app.use('/api/attendance', attendanceRoutes); 
app.use('/api/admin', adminRoutes); 

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define the port
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
