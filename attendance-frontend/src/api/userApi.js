import axiosApi from './axios'; 

const baseURL = "http://localhost:8080/api/user/";

export const userApi = axiosApi.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const markPresent = async (attendanceData) => {
  try {
    const response = await userApi.post('/markPresent', attendanceData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const submitLeaveRequest = async (leaveRequestData) => {
  try {
    const response = await userApi.post('/submitLeaveRequest', leaveRequestData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateUserProfile = async (userId, userData) => {
  try {
    const response = await userApi.put(`/updateProfile/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const viewAttendance = async (userId, userData) => {
  try {
    const response = await userApi.get(`/viewAttendance/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export default userApi;
