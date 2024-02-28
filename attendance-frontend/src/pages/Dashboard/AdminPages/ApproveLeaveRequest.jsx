import React, { useState, useEffect } from "react";
import {
  fetchLeaveRequests,
  approveLeaveRequestAction,
} from "../../../store/adminSlice";
import { getUserss } from "../../../api/getUsersApi";


const ApproveLeaveRequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUserss().then((data) => {
      const filteredUsers = data.data.users.filter(
        (user) => user.role !== "admin"
      );
      setUsers(filteredUsers);
    });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const fetchData = async () => {
        try {
          const data = await fetchLeaveRequests({ filters: { userId: selectedUser } });
          setLeaveRequests(data.leaveRequests);
        } catch (error) {
          console.error("Error fetching leave requests:", error);
        }
      };

      fetchData();
    }
  }, [selectedUser]);

  const handleApproveRequest = async (requestId) => {
    try {
       approveLeaveRequestAction(requestId);

      const data =  fetchLeaveRequests({ filters: { userId: selectedUser } });
      setLeaveRequests(data.leaveRequests);
    } catch (error) {
      console.error("Error approving leave request:", error);
    }
  };

  return (
    <div>
      <h2>Leave Requests</h2>
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        className="border border-gray-300 rounded px-3 py-1"
      >
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.username}
          </option>
        ))}
      </select>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Leave Reason</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.date}</td>
              <td>{request.leaveReason}</td>
              <td>
                <button onClick={() => handleApproveRequest(request._id)}>
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveLeaveRequest;
