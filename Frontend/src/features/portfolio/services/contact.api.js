import api from "../../../services/api";

export const sendContactEmail = async (formData) => {
  // Now we just hit your own backend route!
  const response = await api.post("/portfolio/contact", formData);
  return response.data;
};