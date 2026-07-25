import api from "../../../services/api";

export const registerUser = async ({ username, email, password }) => {
  const response = await api.post("/auth/register", {
    username,
    email,
    password,
  });
  return response.data;
};

export const loginUser = async ({ email, password }) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout", {}, { withCredentials: true });
  return response.data;
};

// auth.api.js
export const getCurrentUser = async () => {
  const response = await api.get("/auth/profile", { skipErrorToast: true });
  return response.data;
};
