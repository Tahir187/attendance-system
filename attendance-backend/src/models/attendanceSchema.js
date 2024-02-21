const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
      unique: true,
    },
    attendance: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        status: {
          type: String,
          enum: ["present", "absent", "leave"],
          required: true,
        },
        leaveAccepted: {
          type: Boolean,
          default: false,
        },
        leaveReason:{
            type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance; 
