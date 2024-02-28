import React from "react";
import Header from "../Layout/Header";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <Header />
      <h1 className="text-4xl text-center mt-10 font-bold uppercase">Attendance System</h1>
      <h2 className="text-2lx text-center mt-7 font-semibold capitalize">Admin Dashboard</h2>
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Link to="/adminDashboard/edit-attendance" className="btn">
          Edit Attendance
        </Link>
        <Link to="/adminDashboard/add-attendance" className="btn">
          Add Attendance
        </Link>
        <Link to="/adminDashboard/delete-attendance" className="btn">
          Delete Attendance
        </Link>
        <Link to="/adminDashboard/attendance-between-dates" className="btn">
          Get Attendance Between Dates
        </Link>
        <Link to="/adminDashboard/attendance-count" className="btn">
          Get Attendance Count
        </Link>
        <Link to="/adminDashboard/generate-user-report" className="btn">
          Generate User Report
        </Link>
        <Link to="/adminDashboard/generate-attendance-report" className="btn">
          Generate Attendance Report
        </Link>
        <Link to="/adminDashboard/manage-leave-request" className="btn">
          Manage Leave Request
        </Link>
        <Link to="/adminDashboard/approve-leave-request" className="btn">
          Approve Leave Request
        </Link>

      </div>
    </div>
  );
};

export default AdminDashboard;
