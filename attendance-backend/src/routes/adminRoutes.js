const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_Controller');
const {isAuthorizedUser} = require('../middleware/auth');


router.put('/editAttendance', isAuthorizedUser(['admin']) , adminController.editAttendance);
router.post('/addAttendance', isAuthorizedUser(['admin']), adminController.addAttendance);
router.delete('/deleteAttendance', isAuthorizedUser(['admin']), adminController.deleteAttendance);
router.post('/getAttendanceBetweenDatess', isAuthorizedUser(['admin']), adminController.getAttendanceBetweenDates);
router.get('/getAttendanceCount', isAuthorizedUser(['admin']), adminController.getAttendanceCount);
router.get('/generateUserReport', isAuthorizedUser(['admin']),adminController.generateUserReport);
router.get('/generateAttendanceReport', isAuthorizedUser(['admin']), adminController.generateAttendanceReport);
router.get('/leaveRequests',isAuthorizedUser(['admin']) ,adminController.manageLeaveRequests);
router.put('/leaveRequests/approve',isAuthorizedUser(['admin']) ,adminController.approveLeaveRequest);
router.get('/attendanceCounts/:userId',isAuthorizedUser(['admin']) ,adminController.getAttendanceCounts);


module.exports = router;
