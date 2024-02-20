const mongoose = require('mongoose');

const attendanceSchema  = new mongoose.Schema({
    date:{
        type: date,
        default: Date.now(),
        unique: true,
    },
    attendance: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
          },
          status: {
            type: String,
            enum: ['present', 'absent', 'leave'],
            required: true
          },
          leaveAccepted:{
            type: Boolean,
            default: false,
          }
        }
      ]

});

const Attendance = mongoose.model('attendance',attendanceSchema);

module.exports = Attendance;