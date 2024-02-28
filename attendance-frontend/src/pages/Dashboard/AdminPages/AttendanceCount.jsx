import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAttendanceCount } from "../../../store/adminSlice";
import { getUserss } from "../../../api/getUsersApi";

const AttendanceCount = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [attendanceCountData, setAttendanceCountData] = useState([]);

  useEffect(() => {
    getUserss().then((data) => {
      const filteredUsers = data.data.users.filter(
        (user) => user.role !== "admin"
      );
      setUsers(filteredUsers);
    });
  }, []);

  const handleGenerateAttendanceCount = async () => {
    try {
      const data = dispatch(
        fetchAttendanceCount({
          userId: selectedUser,
          status: selectedStatus,
        })
      );
      if (data.payload && data.payload.attendanceCount) {
        setAttendanceCountData(data.payload.attendanceCount);
      } else {
        console.error(
          "Error fetching attendance count: Invalid data structure"
        );
      }
    } catch (error) {
      console.error("Error fetching attendance count:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Generate Attendance Count</h2>
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
            <option key={user.id || user._id} value={user.id || user._id}>
              {user.username}
            </option>
          ))}
        </select>
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
        onClick={handleGenerateAttendanceCount}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Generate Attendance Count
      </button>
      <table className="mt-4 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">User Name</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Count</th>
          </tr>
        </thead>
        <tbody>
          {attendanceCountData &&
            attendanceCountData.map((data) => (
              <tr key={data.userId}>
                <td className="border border-gray-300 px-4 py-2">
                  {data.username}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {data.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {data.count}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceCount;
