const express = require('express');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoute');
const profileRoutes = require('./routes/profileRoutes')
const getUsersRoute = require('./routes/getUsersRoute');


require('dotenv').config();
const  initializePassport  = require('./config/passport'); 
const cors = require('cors');
const path = require('path');

const corsOptions ={
    origin:'http://localhost:5173',     
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials:true,           
    optionSuccessStatus:200
}

require('./config/db');
const app = express();

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'uploads')));


// Passport initialization
initializePassport(passport);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', passport.authenticate('jwt', { session: false }), adminRoutes);
app.use('/api/profile',profileRoutes ,passport.authenticate('jwt', {session:false}))
app.use('/api/getUsers', getUsersRoute); 
app.use('/api/user', userRoutes);

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
