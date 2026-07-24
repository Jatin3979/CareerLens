import { useState } from "react";
import { sendContactEmail } from "../services/contact.api";

export const useContact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const submitContactForm = async (formData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Calls your frontend service -> which calls your backend -> which calls Web3Forms
      await sendContactEmail(formData);
      
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
      return true; 
      
    } catch (err) {
      // Grabs the exact error message we defined in the backend controller
      const errorMessage = 
        err.response?.data?.message || 
        err.message || 
        "Network error. Please check your connection.";
        
      setError(errorMessage);
      setTimeout(() => setError(null), 5000);
      return false; 
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearError = () => setError(null);

  return { 
    isSubmitting, 
    isSubmitted, 
    error, 
    submitContactForm, 
    clearError 
  };
};