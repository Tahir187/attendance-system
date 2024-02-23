import React from "react";
import RegistrationPage from "./pages/Auth/Registration";
import Login from "./pages/Auth/Login";

function App() {
  return (
    <div className="flex flex-col">
      
      <h1>Attendance System</h1>
      {/* <RegistrationPage /> */}
      <Login />
    </div>
  );
}

export default App;
