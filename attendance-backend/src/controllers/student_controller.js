const Student = require("../models/studentSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const studentRegister = async (req, res) => {
  const { username, email, password, rollNum } = req.body;

  if (!(username && email && password, rollNum)) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const studentExist = await Student.findOne({ email: email });
    if (studentExist)
      return res.status(400).json({ message: "Student already exists" });

    const hashPassword = await bcrypt.hash(password, 10);
    const student = await Student.create({
      username,
      email,
      password: hashPassword,
      rollNum,
    });
    res.status(201).json({ success: "Student created successfuly", student });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const studentLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const student = await Student.findOne({ email: email });
    if (!student) {
      return res.status(401).json({ message: "Student does not exist" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (isMatch) {
      const payload = {
        id: student._id,
        email: student.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 24 * 60 * 60,
      });
      return res.status(200).json({
        success: "Successfully logged in",
        student: student,
        token: `Bearer ${token}`,
      });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res
      .status(200)
      .json({ success: "Students retrieved successfully", students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentDetail = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      res.status(200).json({ success: "Student found", student });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (deletedStudent) {
      res.status(200).json({
        success: "Student deleted successfully",
        student: deletedStudent,
      });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAllStudents = async (req, res) => {
  try {
    const deletedStudents = await Student.deleteMany({});
    res.status(200).json({
      success: "All students deleted successfully",
      count: deletedStudents.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedStudent) {
      res.status(200).json({
        success: "Student updated successfully",
        student: updatedStudent,
      });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const viewAttendance = async (req, res) => {
    const studentId = req.params.id;

    try {
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        return res.status(200).json({ attendance: student.attendance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const studentAttendance = async (req, res) => {
    const { subName, status, date } = req.body;

    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const subject = await Subject.findById(subName);
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        const existingAttendance = student.attendance.find(a =>
            a.date.toDateString() === new Date(date).toDateString() &&
            a.subName.toString() === subName
        );

        if (existingAttendance) {
            existingAttendance.status = status;
        } else {
            const attendedSessions = student.attendance.filter(a =>
                a.subName.toString() === subName
            ).length;

            if (attendedSessions >= subject.sessions) {
                return res.status(400).json({ message: 'Maximum attendance limit reached' });
            }

            student.attendance.push({ date, status, subName });
        }

        const result = await student.save();
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const clearAllStudentAttendance = async (req, res) => {
    const schoolId = req.params.id;

    try {
        const result = await Student.updateMany(
            { school: schoolId },
            { $set: { attendance: [] } }
        );

        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeStudentAttendance = async (req, res) => {
    const studentId = req.params.id;

    try {
        const result = await Student.updateOne(
            { _id: studentId },
            { $set: { attendance: [] } }
        );

        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
  studentRegister,
  studentLogin,
  getStudents,
  getStudentDetail,
  deleteStudent,
  deleteAllStudents,
  updateStudent,
  studentAttendance,
    viewAttendance,
    clearAllStudentAttendance,
    removeStudentAttendance
};
