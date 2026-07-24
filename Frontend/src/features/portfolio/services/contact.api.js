import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const sendContactEmail = async (formData) => {
  // Now we just hit your own backend route!
  const response = await api.post("/portfolio/contact", formData);
  return response.data;
};