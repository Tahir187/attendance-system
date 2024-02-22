// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_Controller');

// Define routes for markPresent, submitLeaveRequest, updateUser, and viewAttendance
router.post('/markPresent', userController.markPresent);
router.post('/submitLeaveRequest', userController.submitLeaveRequest);
router.put('/updateUser', userController.updateUser);
router.get('/viewAttendance', userController.viewAttendance);
router.delete('/deleteAttendance', userController.deleteAttendance);

module.exports = router;
