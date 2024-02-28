import React from "react";
import RegistrationPage from "./pages/Auth/Registration";
import Login from "./pages/Auth/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import UserDashboard from "./components/Dashboard/UserDashboard";
import { useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoutes";
import UnauthorizedPage from "./components/Dashboard/UnauthorizedPage";
import EditAttendance from "./pages/Dashboard/AdminPages/EditAttendance";
import AddAttendance from "./pages/Dashboard/AdminPages/AddAttendance";
import DeleteAttendance from "./pages/Dashboard/AdminPages/DeleteAttendance";
import GetAttendanceBetweenDates from "./pages/Dashboard/AdminPages/GetAttendanceBetweenDates";
import AttendanceCount from "./pages/Dashboard/AdminPages/AttendanceCount";
import GenerateUserReport from './pages/Dashboard/AdminPages/GenerateUserReport'
import GenerateAttendanceReport from "./pages/Dashboard/AdminPages/GenerateAttendanceReport";
import ManageLeaveRequests from "./pages/Dashboard/AdminPages/ManageLeaveRequest";
import ApproveLeaveRequest from "./pages/Dashboard/AdminPages/ApproveLeaveRequest";
import MarkPresentPage from "./pages/Dashboard/UserPages/MarkPresent";
import SubmitLeaveRequest from "./pages/Dashboard/UserPages/SubmitLeaveRequest";
import ViewAttendance from "./pages/Dashboard/UserPages/ViewAttendance";
import UpdateUserProfile from "./pages/Dashboard/UserPages/UpdateUserProfile";

function App() {

  return (
    <div className="flex flex-col">
      <Router>
        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route
            path="/adminDashboard"
            element={
              <ProtectedRoute component={AdminDashboard} roles={["admin"]} />
            }
          />
          <Route
            path="/userDashboard"
            element={
              <ProtectedRoute component={UserDashboard} roles={["user"]} />
            }
          />
          {/* user protected pages */}
          <Route
            path="/userDashboard/mark-present" 
            element={
              <ProtectedRoute component={MarkPresentPage} roles={["user"]} /> 
            }
          />
          <Route
            path="/userDashboard/submit-leave-request" 
            element={
              <ProtectedRoute component={SubmitLeaveRequest} roles={["user"]} /> 
            }
          />
          <Route
            path="/userDashboard/view-attendance" 
            element={
              <ProtectedRoute component={ViewAttendance} roles={["user"]} /> 
            }
          />
          <Route
            path="/userDashboard/update-profile" 
            element={
              <ProtectedRoute component={UpdateUserProfile} roles={["user"]} /> 
            }
          />


          {/* admin protected psages */}
          <Route
            path="/adminDashboard/edit-attendance" 
            element={
              <ProtectedRoute component={EditAttendance} roles={["admin"]} /> 
            }
          />
          <Route
            path="/adminDashboard/add-attendance" 
            element={
              <ProtectedRoute component={AddAttendance} roles={["admin"]} /> 
            }
          />
          <Route
            path="/adminDashboard/delete-attendance" 
            element={
              <ProtectedRoute component={DeleteAttendance} roles={["admin"]} /> 
            }
          />
          <Route
            path="/adminDashboard/attendance-between-dates" 
            element={
              <ProtectedRoute component={GetAttendanceBetweenDates} roles={["admin"]} /> 
            }
          />
          <Route
            path="/adminDashboard/attendance-count" 
            element={
              <ProtectedRoute component={AttendanceCount} roles={["admin"]} /> 
            }
          />
          <Route
            path="/adminDashboard/generate-user-report" 
            element={
              <ProtectedRoute component={GenerateUserReport} roles={["admin"]} /> 
            }
          />
          <Route
            path="/adminDashboard/generate-attendance-report" 
            element={
              <ProtectedRoute component={GenerateAttendanceReport} roles={["admin"]} /> 
            }
          />
          <Route
            path="/adminDashboard/manage-leave-request" 
            element={
              <ProtectedRoute component={ManageLeaveRequests} roles={["admin"]} /> 
            }
          />
          <Route
            path="/adminDashboard/approve-leave-request" 
            element={
              <ProtectedRoute component={ApproveLeaveRequest} roles={["admin"]} /> 
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
