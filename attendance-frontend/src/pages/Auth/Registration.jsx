// Import necessary modules
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";

// Define the component for registration
const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Component state variables to store user input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle form submission
  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      // Dispatch the registerUserAsync action
      dispatch(registerUser({ username, email, password, role }));
      // Clear the form fields after successful registration
      setUsername("");
      setEmail("");
      setPassword("");
      setRole([]);
      setErrorMessage("");
      setTimeout(() => navigate("/login"), 5000);
    } catch (error) {
      // Handle registration error
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="text-3xl text-center mt-10 font-bold uppercase">Attendance System</h1>
      <div className="bg-gray-200 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Registration</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleRegistration}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Role
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="role"
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
          <p className="mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
