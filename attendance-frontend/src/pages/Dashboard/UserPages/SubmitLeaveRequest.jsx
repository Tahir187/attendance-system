import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitLeaveRequestAction } from '../../../store/userSlice';

const SubmitLeaveRequest = () => {
  const dispatch = useDispatch();
  const [leaveRequestData, setLeaveRequestData] = useState({
    username: '',
    date: '',
    status: '',
    leaveReason: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveRequestData({ ...leaveRequestData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitLeaveRequestAction(leaveRequestData));
    setLeaveRequestData({
      username: '',
      date: '',
      status: '',
      leaveReason: ''
    });
  };

  return (
    <div className='bg-gray-200 h-screen'>
      <h2 className='text-center text-2xl mt-10 font-medium'>Submit Leave Request</h2>
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center mt-5'>
        <div className='shadow-sm shadow-gray-150 p-2'>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={leaveRequestData.username}
            onChange={handleChange}
            required
            className=' outline-none rounded-sm border-b text-gray-500 placeholder-gray-500 bg-gray-50'
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={leaveRequestData.date}
            onChange={handleChange}
            required
            className=' outline-none rounded-sm border-b text-gray-500 placeholder-gray-500 bg-gray-50'
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={leaveRequestData.status}
            onChange={handleChange}
            required
            className=' outline-none rounded-sm border-b text-gray-500 placeholder-gray-500 bg-gray-50'
          >
            <option value="">Select Status</option>
            <option value="approved">leave</option>
          </select>
        </div>
        <div>
          <label htmlFor="leaveReason">Leave Reason:</label>
          <textarea
            id="leaveReason"
            name="leaveReason"
            value={leaveRequestData.leaveReason}
            onChange={handleChange}
            required
            className=' outline-none rounded-sm border-b text-gray-500 placeholder-gray-500 bg-gray-50'
          ></textarea>
        </div>
        <button type="submit" className='bg-gray-500 mt-1 px-2 rounded'>Submit</button>
      </form>
    </div>
  );
};

export default SubmitLeaveRequest;
