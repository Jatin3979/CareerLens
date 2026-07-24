import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL?.trim();

if (!apiBaseUrl) {
  throw new Error("VITE_API_URL is not defined. Set it in Frontend/.env");
}

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

export const sendContactEmail = async (formData) => {
  // Now we just hit your own backend route!
  const response = await api.post("/portfolio/contact", formData);
  return response.data;
};