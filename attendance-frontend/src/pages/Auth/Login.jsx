import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userRole = useSelector((state) => state.auth.role[0]);

  // Component state variables to store user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   // ... logic
  //   if (isLoggedIn && userRole) {
  //     const redirectTo = userRole === 'admin' ? '/adminDashboard' : '/userDashboard';
  //     dispatch(navigate(redirectTo)); // Use `navigate` for programmatic navigation
  //   }
  // }, [isLoggedIn, userRole]);

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Dispatch the loginUserAsync action
      dispatch(loginUser({ email, password }));
      // Clear the form fields after successful login
      // setEmail("");
      // setPassword("");
      // setErrorMessage("");
      if (isLoggedIn && userRole) {
        const redirectTo =
          userRole === "admin" ? "/adminDashboard" : "/userDashboard";
        console.log(redirectTo)
        navigate(redirectTo);
      }
    } catch (error) {
      // Handle login error
      setErrorMessage(error.message);
    }
    console.log(loginUser);
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-gray-200 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
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
            Login
          </button>
        </form>

        <p className="mt-2">
          If you are a new user, please{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
