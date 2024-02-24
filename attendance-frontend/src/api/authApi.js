import axios from "axios";

const baseURL = "http://localhost:8080/api/auth";

const authApi = axios.create({
  baseURL,  
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (userData) => {
  try {
    const response = await authApi.post("/login", userData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};

export const register = async (userData) => {
  try {
    const response = await authApi.post("/register", userData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};

export default authApi;
