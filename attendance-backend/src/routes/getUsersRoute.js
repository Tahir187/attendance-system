const express = require('express');
const UserController = require('../controllers/getUsersController');
const {isAuthorizedUser} = require('../middleware/auth');

const router = express.Router();

// Define routes
router.get('/users', isAuthorizedUser(['admin']) ,UserController.getUsers);

module.exports = router;
