// GenerateUserReport.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { generateUserReportAction } from '../../../store/adminSlice';
import { getUserss } from '../../../api/getUsersApi';

const GenerateUserReport = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [userReport, setUserReport] = useState([]);

  useEffect(() => {
    getUserss().then((data) => {
      const filteredUsers = data.data.users.filter(
        (user) => user.role !== 'admin'
      );
      setUsers(filteredUsers);
    });
  }, []);

  const handleGenerateUserReport = async () => {
    try {
        const response =  dispatch(generateUserReportAction(selectedUser));
        console.log(response.payload);
        setUserReport(response.payload.userReport); 

      } catch (error) {
        console.error('Error generating user report:', error);
      }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Generate User Report</h2>
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
      <button
        onClick={handleGenerateUserReport}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Generate User Report
      </button>
      <table className="mt-4 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">User ID</th>
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Profile</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {userReport.map(user => (
            <tr key={user.userId}>
              <td className="border border-gray-300 px-4 py-2">{user.userId}</td>
              <td className="border border-gray-300 px-4 py-2">{user.username}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.profile}</td>
              <td className="border border-gray-300 px-4 py-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenerateUserReport;
