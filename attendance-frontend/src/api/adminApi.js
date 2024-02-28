import axiosApi from './axios'; 
const baseURL = 'http://localhost:8080/api/admin'; 

export const adminApi = axiosApi.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const getUserAttendanceRecords = async (userId) => {
  try {
    const response = await adminApi.get(`/attendance/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

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
    const response = await adminApi.post('/addAttendance', attendanceData);
    return response.data;
  } catch (error) {
    console.error("Error adding attendance:", error); 

   
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
    console.log("api for generate user", response);
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
      const response = await axios.post('/leaveRequests', requestData);

      return response.data;
  } catch (error) {
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