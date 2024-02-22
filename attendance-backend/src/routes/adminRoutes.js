const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_Controller');
const auth = require('../middleware/auth');


router.put('/editAttendance', auth, adminController.editAttendance);
router.post('/addAttendance', auth, adminController.addAttendance);
router.delete('/deleteAttendance', auth, adminController.deleteAttendance);
router.get('/getAttendanceBetweenDates', auth, adminController.getAttendanceBetweenDates);
router.get('/getAttendanceCount', auth, adminController.getAttendanceCount);
router.get('/generateUserReport', adminController.generateUserReport);
router.get('/generateAttendanceReport', adminController.generateAttendanceReport);
router.get('/leaveRequests', adminController.manageLeaveRequests);
router.put('/leaveRequests/approve', adminController.approveLeaveRequest);
router.get('/attendanceCounts/:userId', adminController.getAttendanceCounts);


module.exports = router;
