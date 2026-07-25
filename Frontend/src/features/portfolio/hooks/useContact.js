import { useState } from "react";
import { sendContactEmail } from "../services/contact.api";

export const useContact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitContactForm = async (formData) => {
    setIsSubmitting(true);
    
    try {
      // Calls your frontend service -> which calls your backend -> which calls Web3Forms
      await sendContactEmail(formData);
      
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
      return true; 
      
    } catch {
      return false; 
    } finally {
      setIsSubmitting(false);
    }
  };

  return { 
    isSubmitting, 
    isSubmitted, 
    submitContactForm,
  };
};