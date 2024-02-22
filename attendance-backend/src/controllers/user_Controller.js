const User = require("../models/userSchema");
const Attendance = require("../models/attendanceSchema");

const userController = {
  markPresent: async (req, res) => {
    try {
      const { userId } = req.body;
      const currentDate = new Date().toISOString().split("T")[0]; // Get current date in 'YYYY-MM-DD' format

      // Check if user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user has already marked attendance for the current date
      const existingAttendance = await Attendance.findOne({
        date: currentDate,
        "attendance.userId": userId,
        "attendance.status": "present",
      });

      if (existingAttendance) {
        return res
          .status(400)
          .json({ message: "Attendance already marked for today" });
      }

      if (existingAttendance) {
        return res
          .status(400)
          .json({ message: "Attendance already marked for today" });
      }

      // Create a new attendance entry
      const attendance = new Attendance({
        date: currentDate,
        attendance: [{ userId: userId, status: "present" }],
      });
      await attendance.save();

      res.status(200).json({ message: "Attendance marked successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  viewAttendance: async (req, res) => {
    try {
      const { userId } = req.body;

      // Check if user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Find all attendance records for the user
      const attendanceRecords = await Attendance.find({
        "attendance.userId": userId,
      });

      res.status(200).json({ attendanceRecords });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  submitLeaveRequest: async (req, res) => {
    try {
      const { userId, leaveReason } = req.body;
      const date = new Date();
      const currentDate = new Date().toISOString().split("T")[0];

      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user has already marked attendance for the current date
      const existingAttendance = await Attendance.findOne({
        date: currentDate,
        "attendance.userId": userId,
        "attendance.status": "present",
      });

      if (existingAttendance) {
        return res
          .status(400)
          .json({ message: "Attendance already marked for today" });
      }

      //   create a new attendance entry with leave status
      const attendance = new Attendance({
        date: date,
        attendance: [
          { userId: userId, status: "leave", leaveReason: leaveReason },
        ],
      });
      await attendance.save();

      res.status(200).json({ message: "Leave request submitted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { userId, userData } = req.body;

      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user is of type 'user'
      if (!user.role.includes("user")) {
        return res
          .status(403)
          .json({ message: "Access denied. User is not of type 'user'" });
      }

      // Update user data
      const updateUser = await User.findByIdAndUpdate(
        userId,
        { $set: userData },
        { new: true }
      );

      // If password is being updated, hash it
      if (userData.password) {
        const salt = await bcrypt.genSalt(10);
        updateUser.password = await bcrypt.hash(userData.password, salt);
        await updateUser.save();
      }

      res.status(200).json({
        message: "User data updated successfully",
        user: updateUser,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  deleteAttendance: async (req, res) => {
    try {
      const { userId, attendanceId } = req.body;

      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the attendance record exists and if the status is 'present'
      const attendance = await Attendance.findOne({ _id: attendanceId, "attendance.userId": userId, "attendance.status": "present" });
      if (!attendance) {
        return res.status(404).json({ message: "Attendance not found or it cannot be deleted" });
      }

      // If the attendance record is found and the status is 'present', prevent deletion
      return res.status(403).json({ message: "Attendance marked present cannot be deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

};

module.exports = userController;
