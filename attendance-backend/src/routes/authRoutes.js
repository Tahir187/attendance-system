const express = require('express');
const router = express.Router();
const userAuthController = require('../controllers/userAuth_Controller');
const auth = require('../middleware/auth');

// POST route for user registration
router.post('/register', userAuthController.register);

// POST route for user login
router.post('/login', userAuthController.login);


module.exports = router;
