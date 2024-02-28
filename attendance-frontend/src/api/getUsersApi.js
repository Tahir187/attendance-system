import axios from "axios";

const baseURL = "http://localhost:8080/api/getUsers";

const getUsersApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUsers = async () => {
  try {
    const response = await getUsersApi.get("/users");
    console.log("users response", response);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};

export const getUserss = async () => {
  try {
    return getUsersApi.get("/users");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};
export default getUsersApi;
