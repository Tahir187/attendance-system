// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_Controller');

// Define routes for markPresent, submitLeaveRequest, updateUser, and viewAttendance
router.post('/mark-present', userController.markPresent);
router.post('/submit-leave-request', userController.submitLeaveRequest);
router.put('/update-user', userController.updateUser);
router.get('/view-attendance', userController.viewAttendance);

module.exports = router;
