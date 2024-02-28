import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { markPresentAction } from "../../../store/userSlice";

const MarkPresentPage = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStatus, setSelectedStatus] = useState("present"); 
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(markPresentAction({ date: selectedDate, status: selectedStatus }));
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Mark Present</h2>
      <div className="mb-4">
        <label className="block mb-2">Select Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="border border-gray-300 rounded px-3 py-1"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Select Status:</label>
        <div>
          <label className="mr-4">
            <input
              type="radio"
              value="present"
              checked={selectedStatus === "present"}
              onChange={handleStatusChange}
            />
            Present
          </label>
          <label>
            <input
              type="radio"
              value="absent"
              checked={selectedStatus === "absent"}
              onChange={handleStatusChange}
            />
            Absent
          </label>
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default MarkPresentPage;
