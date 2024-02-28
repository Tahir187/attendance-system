import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewAttendanceAction } from '../../../store/userSlice';

const ViewAttendance = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.userId); 
  const attendanceRecords = useSelector(state => state.user.attendanceRecords);

  useEffect(() => {
    dispatch(viewAttendanceAction(userId));
  }, [dispatch, userId]);

  return (
    <div className='bg-gray-200 h-screen'>
      <h2 className='text-center text-2xl mt-10 font-medium'>View Attendance</h2>
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map(record => (
            <tr key={record.id}>
              <td>{record.date}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAttendance;
