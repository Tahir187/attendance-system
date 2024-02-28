import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttendanceBetweenDates } from "../../../store/adminSlice";
import { getUserss } from "../../../api/getUsersApi";

const GetAttendanceBetweenDates = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    getUserss().then((data) => {
      const filteredUsers = data.data.users.filter(
        (user) => user.role !== "admin"
      );
      setUsers(filteredUsers);
    });
  }, []);

  const handleGenerateAttendance = async () => {
    try {
      const data = await dispatch(
        fetchAttendanceBetweenDates({
          userId,
          startDate,
          endDate,
        })
      );
      if (data.payload && data.payload.attendance) {
        setAttendanceData(data.payload.attendance);
      } else {
        setAttendanceData([]);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Generate Attendance</h2>
      <div className="mb-4">
        <label htmlFor="startDate" className="block font-semibold mb-1">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          className="border border-gray-300 rounded px-3 py-1"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        {startDate && (
          <p className="text-gray-500 mt-1">
            {new Date(startDate).toLocaleDateString("en-CA")}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="endDate" className="block font-semibold mb-1">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          className="border border-gray-300 rounded px-3 py-1"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        {endDate && (
          <p className="text-gray-500 mt-1">
            {new Date(endDate).toLocaleDateString("en-CA")}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="userSelect" className="block font-semibold mb-1">
          Select User:
        </label>
        <select
          id="userSelect"
          className="border border-gray-300 rounded px-3 py-1"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleGenerateAttendance}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Generate Attendance
      </button>
      <table className="mt-4 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Leave Accepted</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((attendance) => (
            <tr key={attendance._id}>
              <td className="border border-gray-300 px-4 py-2">
                {attendance.username}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(attendance.date).toLocaleDateString("en-CA")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {attendance.status}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {attendance.leaveAccepted ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAttendanceBetweenDates;
