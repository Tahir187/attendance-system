const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Attendance = require("../models/attendanceSchema");

const userAuthController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(401).json({ message: "User does not exist" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const payload = {
          id: user._id,
          email: user.email,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: 24 * 60 * 60,
        });
        return res.status(200).json({
          success: "Successfully logged in",
          user: user,
          token: `Bearer ${token}`,
        });
      }
    } catch (error) {
      res.status(401).json({ message: "Invalid credentials" });
    }
  },
  register: async (req, res) => {
    const { username, email, password } = req.body;

    if (!(username && email && password)) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const userExist = await User.findOne({ email: email });
      if (userExist)
        return res.status(400).json({ message: "User already exists" });

      const hashPassword = await bcrypt.hash(password, 10);
      console.log(req.file);
      const user = await User.create({
        username,
        email,
        password: hashPassword,
        profile: {
          username,
          avatar: req.file && req.file.path,
        },
      });
      res.status(201).json({ success: "User created successfully", user });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  markPresent: async (req, res) => {
    try {
      const { userId } = req.body;
      const date = new Date();

      // check if user exist
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // check if the user has already marked attendance for the current date.
      const existingAttendance = await Attendance.findOne({
        date: { $eq: date },
      });

      if (existingAttendance) {
        return res
          .status(400)
          .json({ message: "Attendance already marked for today" });
      }

      // create a new attendance entry
      const attendance = new Attendance({
        date: date,
        attendance: [{ userId: userId, status: "present" }],
      });
      await attendance.save();

      res
        .status(200)
        .json({ message: "Attendance marked successfully marked" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  submitLeaveRequest: async (req, res) => {
    try {
      const { userId, leaveReason } = req.body;
      const date = new Date();

      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user has already marked attendance for the current date
      const existingAttendance = await Attendance.findOne({
        date: { $eq: date },
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

      //   check if the user is type 'user'
      if (user.role.includes("user")) {
        // update user
        const updateUser = await User.findByIdAndUpdate(
          userId,
          { $set: userData },
          { new: true }
        );
        res.status(200).json({
          message: "User data updated successfully",
          user: updateUser,
        });
      } else {
        return res
          .status(403)
          .json({ message: "Access denied. User is not of type 'user'" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = userAuthController;
