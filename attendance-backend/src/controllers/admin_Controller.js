const User = require("../models/userSchema");
const Attendance = require("../models/attendanceSchema");
const fs = require("fs");
const path = require("path");
const cloudinary = require("../config/cloudinary");

const adminController = {
  getUserAttendanceRecords: async (req, res) => {
    try {
      const { userId } = req.params;

      // Fetch all attendance records for the specified user
      const attendanceRecords = await Attendance.find({
        "attendance.userId": userId,
      }).sort({ date: -1 }); // Sort by date in descending order

      res.status(200).json({ attendanceRecords });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

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
          userName: userName,
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
      const { userId, date, status, leaveAccepted } = req.body;
      console.log('user date', req.body)
      // Check if the user exists
      const user = await User.findById({_id:userId});
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
      console.log("body", req.body);
      const { userId, startDate, endDate } = req.body;
      // fetch the user's attendance between the specified dates
      console.log(new Date("2024-02-13").toDateString());
      const attendance = await Attendance.find({
        date: {
          $gte: new Date(startDate).toDateString(),
          $lte: new Date(endDate).toDateString(),
        },
        "attendance.userId": userId,
      });

      res.status(200).json({ attendance });
    } catch (error) {
      console.log(error);
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

  generateUserReport: async (req, res) => {
    try {
      // Fetch all user data
      const { userId, username, email, profile, role } = req.body;
      const users = await User.find(
        {},
        `userId, username, email, profile, role`
      );

      // Prepare the user report data
      const userReport = users.map((user) => ({
        userId: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile,
        role: user.role,
      }));

      // Send the user report as response
      res.status(200).json({ userReport });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  generateAttendanceReport: async (req, res) => {
    try {
      // Fetch all attendance data
      const attendanceData = await Attendance.find({}, "userId date status");

      // Prepare the attendance report data
      const attendanceReport = attendanceData.map((entry) => ({
        userId: entry.userId,
        date: entry.date,
        status: entry.status,
      }));

      // Send the attendance report as response
      res.status(200).json({ attendanceReport });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  manageLeaveRequests: async (req, res) => {
    try {
      const { userId } = req.body;

      const leaveRequests = await Attendance.find({
        "attendance.status": "leave",
        "attendance.leaveAccepted": false,
        "attendance.userId": userId,
      });

      const formattedLeaveRequests = leaveRequests.map((request) => ({
        userId: request.attendance.userId,
        date: request.date,
        leaveReason: request.attendance.leaveReason,
      }));

      res.status(200).json({ leaveRequests: formattedLeaveRequests });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getLeaveRequests: async (req, res) => {
    try {
      // Extract filtering options from request body (optional)
      const { userId, status, startDate, endDate } = req.body || {};

      // Construct query for efficient retrieval
      const query = {
        "attendance.status": status ? status : "leave",
      };

      // Apply additional filters if provided
      if (userId) query.attendance.userId = userId;
      if (startDate) query.date = { $gte: new Date(startDate).toDateString() };
      if (endDate) query.date = { $lte: new Date(endDate).toDateString() };

      // Fetch leave requests from Attendance model
      const leaveRequests = await Attendance.find(query)
        .populate("attendance.userId", "username name") // Populate user info
        .select("date attendance -_id"); 

      // Format response for clarity
      const formattedLeaveRequests = leaveRequests.map((request) => ({
        userId: request.attendance.userId._id,
        username: request.attendance.userId.username,
        name: request.attendance.userId.name,
        date: request.date,
        status: request.attendance.status,
        leaveReason: request.attendance.leaveReason,
        leaveAccepted: request.attendance.leaveAccepted,
      }));

      res.status(200).json({ leaveRequests: formattedLeaveRequests });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  approveLeaveRequest: async (req, res) => {
    try {
      const { userId, date, approvalStatus } = req.body;

      // Find the attendance record for the specified user and date
      const attendanceRecord = await Attendance.findOne({
        "attendance.userId": userId,
        date,
      });

      // Check if the attendance record exists
      if (!attendanceRecord) {
        return res.status(404).json({ message: "Attendance record not found" });
      }

      // Update the leaveAccepted field based on the approval status
      attendanceRecord.attendance.forEach((entry) => {
        if (entry.userId === userId && entry.status === "leave") {
          entry.leaveAccepted = approvalStatus;
        }
      });

      // Save the updated attendance record
      await attendanceRecord.save();

      // Send the success message
      res.status(200).json({ message: "Leave request updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAttendanceCounts: async (req, res) => {
    try {
      const { userId } = req.params;

      // Fetch the user's attendance data
      const userAttendance = await Attendance.find({
        "attendance.userId": userId,
      });

      // Initialize counts
      let leaveCount = 0;
      let presentCount = 0;
      let absentCount = 0;

      // Count leaves, presents, and absents
      userAttendance.forEach((entry) => {
        entry.attendance.forEach((record) => {
          if (record.userId === userId) {
            if (record.status === "leave" && record.leaveAccepted) {
              leaveCount++;
            } else if (record.status === "present") {
              presentCount++;
            } else if (record.status === "absent") {
              absentCount++;
            }
          }
        });
      });

      // Send the counts to the admin
      res.status(200).json({ leaveCount, presentCount, absentCount });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // **************************** UPLOAD PROFILE PHOTO *********************************
  uploadProfilePicture: async (req, res) => {
    try {
      if (!req.file.path)
        return res.status(400).json({ message: "File not selected" });
      // upload the file on cloudinary
      const response = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto",
        folder: "images",
      });
      console.log("response", response);
      // Update the user's profile avatar field with the Cloudinary URL
      await User.findByIdAndUpdate(req.user._id, {
        "profile.avatar": response.url + `?${Date.now()}`,
      });

      // Delete local file on the server
      fs.unlinkSync(req.file.path);

      // file uploaded successfully
      return res.status(200).json({
        message: "profile image uploaded successfully",
        img_url: response.url,
      });
    } catch (error) {
      // delete local file on the server
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ error: "File deleted from the server" });
    }
  },
};
module.exports = adminController;
