import React from "react";
import RegistrationPage from "./pages/Auth/Registration";
import Login from "./pages/Auth/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import UserDashboard from "./components/Dashboard/UserDashboard";
import { useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoutes";
import UnauthorizedPage from "./components/Dashboard/UnauthorizedPage";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userRole = useSelector((state) => state.auth.role);

  return (
    <div className="flex flex-col">
      <h1>Attendance System</h1>
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
          {/* Other routes */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
