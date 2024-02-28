import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/authSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.user?.username);
  
  const handleLogout = () => {
    dispatch(logoutUser());
  };


  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Attendance System</h1>
        <span className="ml-2">{username}</span>
      </div>
      <div>
        <Link to="/login">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 py-2 px-4 rounded-md text-white"
          >
            Logout
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
