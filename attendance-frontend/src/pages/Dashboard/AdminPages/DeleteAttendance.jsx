import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeAttendanceRecord,
  fetchUserAttendanceRecords,
} from "../../../store/adminSlice";
import { getUserss } from "../../../api/getUsersApi";

const DeleteAttendance = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);
  const { userId } = useSelector((state) => state.auth); 
  
  useEffect(() => {
    getUserss().then((data) => {
      const filteredUsers = data.data.users.filter(
        (user) => user.role !== "admin" && user._id !== userId
      );
      setUsers(filteredUsers);
    });
  }, [userId]);

  useEffect(() => {
    if (selectedUser) {
      dispatch(fetchUserAttendanceRecords(selectedUser))
        .then((data) => {
          setAttendanceList(data); 
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }, [dispatch, selectedUser]);

  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
  };

  const handleDeleteAttendance = async (attendanceId) => {
    try {
      dispatch(removeAttendanceRecord(attendanceId));
      const updatedAttendanceList = attendanceList.filter(
        (attendance) => attendance._id !== attendanceId
      );
      setAttendanceList(updatedAttendanceList);
      {
        <p>Data update successfully</p>
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Delete Attendance</h2>
      <div className="mb-4">
        <label htmlFor="userSelect" className="block font-semibold mb-1">
          Select User:
        </label>
        <select
          id="userSelect"
          className="border border-gray-300 rounded px-3 py-1"
          value={selectedUser}
          onChange={(e) => handleUserSelect(e.target.value)}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {attendanceList && attendanceList.length > 0 ? (
          attendanceList.map((attendance) => (
            <li key={attendance._id} className="mb-4">
              <p>Date: {attendance.date}</p>
              <p>Status: {attendance.status}</p>
              <p>Leave Accepted: {attendance.leaveAccepted ? "Yes" : "No"}</p>
              <button
                onClick={() => handleDeleteAttendance(attendance._id)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
              >
                Delete Attendance
              </button>
            </li>
          ))
        ) : (
          <p>No attendance records found.</p>
        )}
      </ul>
    </div>
  );
};

export default DeleteAttendance;
