import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserProfileAction } from '../../../store/userSlice';

const UpdateUserProfile = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfileAction(formData));
  };

  return (
    <div className='bg-gray-200 h-screen'>
      <h2 className='text-center text-2xl mt-10 font-medium'>Update Profile</h2>
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-cente mt-5">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            required
          />
        </div>
        <button type="submit" className="bg-gray-500 text-white px-4 py-2 rounded ">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateUserProfile;
