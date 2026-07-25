import axios from "axios";
import toast from "react-hot-toast";

const apiBaseUrl = import.meta.env.VITE_API_URL?.trim();

if (!apiBaseUrl) {
  throw new Error("VITE_API_URL is not defined. Set it in Frontend/.env");
}

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";

    toast.error(errorMessage, {
      style: {
        background: "#DC2626",
        color: "#FFFFFF",
      },
      iconTheme: {
        primary: "#FFFFFF",
        secondary: "#DC2626",
      },
    });

    return Promise.reject(error);
  },
);

export default api;
