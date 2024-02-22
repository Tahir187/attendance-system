const User = require("../models/userSchema");
const Attendance = require("../models/attendanceSchema");

const adminController = {
  editAttendance: async (req, res) => {
    try {
      const { userId, date, status, leaveAccepted } = req.body;

      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user's attendance for the specified date exists
      let attendance = await Attendance.findOne({ date: { $eq: date } });
      if (!attendance) {
        attendance = new Attendance({ date: date, attendance: [] });
      }

      // Update or add the user's attendance status

      const userAttendance = attendance.attendance.find(
        (a) => a.userId.toString() === userId
      );
      if (userAttendance) {
        userAttendance.status = status;
        userAttendance.leaveAccepted = leaveAccepted;
      } else {
        attendance.attendance.push({
          userId: userId,
          status: status,
          leaveAccepted: leaveAccepted,
        });
      }

      await attendance.save();
      res.status(200).json({ message: "Attendance updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addAttendance: async (req, res) => {
    try {
      const { userId, date, status,leaveAccepted } = req.body;

      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user's attendance for the specified date exists

      let attendance = await Attendance.findOne({ date: { $eq: date } });
      if (!attendance) {
        attendance = new Attendance({ date: date, attendance: [] });
      }

      //   add the user's attendance status
      attendance.attendance.push({
        userId: userId,
        status: status,
        leaveAccepted: leaveAccepted,
      });

      await attendance.save();
      res.status(200).json({ message: "Attendance added successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteAttendance: async (req, res) => {
    try {
      const { userId, date } = req.body;

      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Find and delete the user's attendance for the specified date
      await Attendance.updateOne(
        { date: date },
        { $pull: { attendance: { userId: userId } } }
      );

      res.status(200).json({ message: "Attendance deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAttendanceBetweenDates: async (req, res) => {
    try {
      const { userId, startDate, endDate } = req.body;

      // fetch the user's attendance between the specified dates
      const attendance = await Attendance.find({
        date: { $gte: startDate, $lte: endDate },
        "attendance.userId": userId,
      });

      res.status(200).json({ attendance });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAttendanceCount: async (req, res) => {
    try {
      const { userId, status } = req.body;

      // count the number of days the user was present or absent
      const attendanceCount = await Attendance.countDocuments({
        "attendance.userId": userId,
        "attendance.status": status,
      });
      res.status(200).json({ count: attendanceCount });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
module.exports = adminController;