import React from "react";
import Header from "../Layout/Header";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div>
      <Header />
      <h1 className="text-4xl text-center mt-10 font-bold uppercase">
        Attendance System
      </h1>
      <h2 className="text-2lx text-center mt-7 font-semibold capitalize">
        User Dashboard
      </h2>
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Link to="/userDashboard/mark-present" className="btn">
          Mark Present
        </Link>
        <Link to="/userDashboard/submit-leave-request" className="btn">
          Submit Leave Request
        </Link>
        <Link to="/userDashboard/view-attendance" className="btn">
          View Attendance
        </Link>
        <Link to="/userDashboard/update-profile" className="btn">
          Update Profile
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
