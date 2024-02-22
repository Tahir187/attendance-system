const express = require('express');
const router = express.Router();
const userAuthController = require('../controllers/userAuth_Controller');
const auth = require('../middleware/auth');

// POST route for user registration
router.post('/register', userAuthController.register);

// POST route for user login
router.post('/login', userAuthController.login);

router.get('/user',auth ,(req, res)=>{
    res.status(200).json({message: 'This is user', user: req.user});
})

module.exports = router;
