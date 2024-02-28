import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { generateAttendanceReportAction  } from '../../../store/adminSlice';
import { getUserss } from '../../../api/getUsersApi';

const GenerateAttendanceReport = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [attendanceReport, setAttendanceReport] = useState([]);

  useEffect(() => {
    getUserss().then((data) => {
      const filteredUsers = data.data.users.filter(
        (user) => user.role !== 'admin'
      );
      setUsers(filteredUsers);
    });
  }, []);

  const handleGenerateAttendanceReport = async () => {
    try {
      const response =  dispatch(generateAttendanceReportAction(selectedUser, selectedDate, selectedStatus));
      setAttendanceReport(response.payload.attendanceReport);
    } catch (error) {
      console.error('Error generating attendance report:', error);
    }
  };
  

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Generate Attendance Report</h2>
      <div className="mb-4">
        <label htmlFor="userSelect" className="block font-semibold mb-1">
          Select User:
        </label>
        <select
          id="userSelect"
          className="border border-gray-300 rounded px-3 py-1"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="dateSelect" className="block font-semibold mb-1">
          Select Date:
        </label>
        <input
          type="date"
          id="dateSelect"
          className="border border-gray-300 rounded px-3 py-1"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="statusSelect" className="block font-semibold mb-1">
          Select Status:
        </label>
        <select
          id="statusSelect"
          className="border border-gray-300 rounded px-3 py-1"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="leave">Leave</option>
        </select>
      </div>
      <button
        onClick={handleGenerateAttendanceReport}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Generate Attendance Report
      </button>
      <table className="mt-4 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">User ID</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceReport.map((entry, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{entry.userId}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.date}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenerateAttendanceReport;
