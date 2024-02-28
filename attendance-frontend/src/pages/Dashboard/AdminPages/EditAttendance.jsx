import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUserAttendance } from "../../../store/adminSlice";
import { getUserss } from "../../../api/getUsersApi";

const EditAttendance = () => {
  const dispatch = useDispatch();
  
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    userId: "", 
    date: "",
    status: "",
    leaveAccepted: false,
  });

  useEffect(() => {
    getUserss().then((data) => {
      setUsers(data.data.users);
    });
  }, []);

  const handleChange = (e) => {
    const updatedFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { userId, ...attendanceData } = formData; 
    dispatch(updateUserAttendance({ attendanceId: userId, attendanceData }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Attendance</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userName" className="block font-semibold mb-1">
            User
          </label>
          <select
            name="userId"
            id="userId"
            className="border border-gray-300 rounded px-3 py-1 w-full"
            value={formData.userId} 
            onChange={handleChange}
            required
          >
            <option value="">Select User</option>
            {users &&
              users.map((user) => (
                <option key={user.id || user._id} value={user.id || user._id}>
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
            value={formData.date || formatDate(new Date())}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="Absent">Absent</option>
            <option value="Leave">Leave</option>
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
            value={formData.leaveAccepted}
            onChange={handleChange}
            required
          >
            <option value="false">Not Accepted</option>
            <option value="true">Accepted</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Update Attendance
        </button>
      </form>
    </div>
  );
};

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); 
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
}

export default EditAttendance;
