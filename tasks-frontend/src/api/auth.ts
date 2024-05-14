import axios from "axios";
("axios");

const API_URL = "http://localhost:5000/api";

export const registerUser = async (username: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { username, email, password });
    return response.data; //this is the token
  } catch (error) {
    console.error("Error signing up", error);
    throw error;
  }
};

export const loginUser = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data;
};
