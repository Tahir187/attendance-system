import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewAttendanceRecord, setLoading, setError, setAttendanceRecords } from "../../../store/adminSlice";
import { addAttendance } from "../../../api/adminApi"; 


import { getUserss } from "../../../api/getUsersApi";

const AddAttendance = () => {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);

  const [attendanceData, setAttendanceData] = useState({
    userId:"",
    date: "",
    status: "",
    leaveAccepted: false,
  });

  const isLoading = useSelector((state) => state.admin.loading);
  const error = useSelector((state) => state.admin.error);


  useEffect(() => {

    getUserss().then((data) => {
      setUsers(data.data.users);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true)); 
      await addAttendance("/addAttendance", attendanceData); 
      const updatedAttendanceRecords =  addNewAttendanceRecord(
        attendanceData.userId
      );
      dispatch(setAttendanceRecords(updatedAttendanceRecords)); 
      setAttendanceData({
        userId: "",
        date: "",
        status: "",
        leaveAccepted: false,
      });
      console.log("Attendance added successfully!");
    } catch (error) {
      dispatch(setError(error.message)); 
      console.error("Error adding attendance:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAttendanceData({
      ...attendanceData,
      [name]: value,
    });
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Add Attendance</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block font-semibold mb-1">
            User
          </label>
          <select
            name="userId"
            id="username"
            className="border border-gray-300 rounded px-3 py-1 w-full"
            value={attendanceData._id}
            onChange={handleInputChange}
            required
          >
            <option value="">Select User</option>
            {users &&
              users.map((user) => (
                <option key={user.id || user._id}  value={user._id}>
                  {user.username}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block font-semibold mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="border border-gray-300 rounded px-3 py-1 w-full"
            value={attendanceData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block font-semibold mb-1">
            Status
          </label>
          <select
            name="status"
            id="status"
            className="border border-gray-300 rounded px-3 py-1 w-full"
            value={attendanceData.status}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="leave">Leave</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="leaveAccepted" className="block font-semibold mb-1">
            Leave Accepted
          </label>
          <select
            name="leaveAccepted"
            id="leaveAccepted"
            className="border border-gray-300 rounded px-3 py-1 w-full"
            value={attendanceData.leaveAccepted}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="false">Not Accepted</option>
            <option value="true">Accepted</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Add Attendance
        </button>
      </form>
    </div>
  );
};

export default AddAttendance;
