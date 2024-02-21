const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_Controller');
const auth = require('../middleware/auth');

// Edit Attendance Route
router.put('/editAttendance', auth, adminController.editAttendance);

module.exports = router;
