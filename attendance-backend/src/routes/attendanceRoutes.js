const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminController = require("../controllers/admin_Controller");

// add attendance route
router.post("/addAttendance", auth, adminController.addAttendance);

// delete attendance route
router.delete("/deleteAttendance", auth, adminController.deleteAttendance);

// get attendance between dates route
router.post(
  "/getAttendanceBetweenDates",
  auth,
  adminController.getAttendanceBetweenDates
);

// get attendance by count route
router.post("/getAttendanceCount", auth, adminController.getAttendanceCount);

module.exports = router;