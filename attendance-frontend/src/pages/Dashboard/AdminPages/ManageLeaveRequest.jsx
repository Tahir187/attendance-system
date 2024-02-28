import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { manageLeaveRequestsAction } from "../../../store/adminSlice";
import { getUserss } from "../../../api/getUsersApi";

const ManageLeaveRequests = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    getUserss().then((data) => {
      const filteredUsers = data.data.users.filter(
        (user) => user.role !== "admin"
      );
      setUsers(filteredUsers);
    });
  }, []);

  const handleFetchLeaveRequests = async () => {
    try {
      const response = dispatch(
        manageLeaveRequestsAction({ userId: selectedUserId })
      );
      setLeaveRequests(response.payload.leaveRequests);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Leave Requests</h2>
      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        className="border border-gray-300 rounded px-3 py-1"
      >
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.username}
          </option>
        ))}
      </select>
      <button
        onClick={handleFetchLeaveRequests}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Fetch Leave Requests
      </button>
      <table className="mt-4 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Leave Reason</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
          </tr>
        </thead>
        {leaveRequests && (
          <tbody>
            {leaveRequests.map((request, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{request.userId}</td>
                <td className="border border-gray-300 px-4 py-2">{request.leaveReason}</td>
                <td className="border border-gray-300 px-4 py-2">{request.date}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default ManageLeaveRequests;
