import axios from "axios";

const baseURL = "http://localhost:8080/api/admin/";

const adminApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const editAttendance = async (attendanceId, attendanceData) => {
  try {
    const response = await adminApi.put(
      `/editAttendance/${attendanceId}`,
      attendanceData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const addAttendance = async (attendanceData) => {
  try {
    const response = await adminApi.post("/addAttendance", attendanceData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteAttendance = async (attendanceId) => {
  try {
    const response = await adminApi.delete(`/deleteAttendance/${attendanceId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getAttendanceBetweenDates = async (attendanceId) => {
  try {
    const response = await adminApi.get(
      `/getAttendanceBetweenDates/${attendanceId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getAttendanceCount = async (attendanceId) => {
  try {
    const response = await adminApi.get(`getAttendanceCount/${attendanceId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const generateUserReport = async (fromDate, toDate) => {
  try {
    const response = await adminApi.get(
      `/generateUserReport?fromDate=${fromDate}&toDate=${toDate}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const generateAttendanceReport = async (fromDate, toDate) => {
  try {
    const response = await adminApi.get(
      `/generateAttendanceReport?fromDate=${fromDate}&toDate=${toDate}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const manageLeaveRequests = async (requestData) => {
  try {
      // Send a POST request to the manage leave requests endpoint
      const response = await axios.post('/leaveRequests', requestData);

      // Return the response data
      return response.data;
  } catch (error) {
      // If an error occurs, throw it so it can be caught and handled by the caller
      throw error;
  }
};

export const getLeaveRequests = async () => {
  try {
    const response = await adminApi.get("/leaveRequests");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const approveLeaveRequest = async (leaveRequestId) => {
  try {
    const response = await adminApi.put(
      `/leaveRequests/approve/${leaveRequestId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getAttendanceCounts = async (userId) => {
  try {
    const response = await adminApi.get(`/attendanceCounts/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Add other admin-related API functions as needed

export default adminApi;
