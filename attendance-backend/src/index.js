const express = require('express');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const adminRoutes = require('./routes/adminRoutes');
require('dotenv').config();
const  initializePassport  = require('./config/passport'); 
require('./config/db');

const app = express();

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Passport initialization
initializePassport(passport);

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/attendance', passport.authenticate('jwt', { session: false }), attendanceRoutes);
app.use('/api/v1/admin', passport.authenticate('jwt', { session: false }), adminRoutes);

// Default route
app.get('/api/v1', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('Homepage');
});

// Root redirect
app.get('/', (req, res) => {
    res.redirect('/api/v1');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Define the port
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
