import api from "./api";

const getToken = () => localStorage.getItem("token");

export const getTasks = () =>
  api.get("/tasks", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const createTask = (data) =>
  api.post("/tasks", data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const updateTask = (id, data) =>
  api.put(`/tasks/${id}`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const deleteTask = (id) =>
  api.delete(`/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });