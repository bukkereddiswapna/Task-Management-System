import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// REGISTER
export const register = async (data) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

// LOGIN
export const login = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);

  if (res.data?.token) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  }

  return res.data;
};

// GET PROFILE
export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// UPDATE PROFILE
export const updateProfile = async (data) => {
  const token = localStorage.getItem("token");

  const res = await axios.put(`${API_URL}/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  localStorage.setItem("user", JSON.stringify(res.data));

  return res.data;
};

// LOGOUT
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};