const express = require('express');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoute');
require('dotenv').config();
const  initializePassport  = require('./config/passport'); 
require('./config/db');
const cors = require('cors');


const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// Passport initialization
initializePassport(passport);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/attendance', passport.authenticate('jwt', { session: false }), attendanceRoutes);
app.use('/api/admin', passport.authenticate('jwt', { session: false }), adminRoutes);
app.use('/api/user', userRoutes);
// Default route  passport.authenticate('jwt', { session: false }),
app.get('/api',  (req, res) => {
    res.send('Homepage');
});

// Root redirect
app.get('/', (req, res) => {
    res.redirect('/');
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
