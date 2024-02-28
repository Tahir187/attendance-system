import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/profile/upload/';

export const uploadProfile = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/upload`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
