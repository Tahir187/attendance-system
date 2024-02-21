const express = require('express');
const router = express.Router();
const userAuthController = require('../controllers/userAuth_Controller');
const auth = require('../middleware/auth');

// POST route for user registration
router.post('/register', userAuthController.register);

// POST route for user login
router.post('/login', userAuthController.login);

// Mark Present Route
router.post('/markPresent', auth, userAuthController.markPresent);

// Submit Leave Request Route
router.post('/submitLeaveRequest', auth, userAuthController.submitLeaveRequest);

// Update User Route
router.put('/updateUser', auth, userAuthController.updateUser);


module.exports = router;
