import axios from "axios";

// For Vite projects, use import.meta.env instead of process.env
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function for error handling
const handleApiError = (error) => {
  if (error.response) {
    console.error("API Error Response:", error.response.data);
    console.error("Status:", error.response.status);
    console.error("Headers:", error.response.headers);
  } else if (error.request) {
    console.error("API Request Error:", error.request);
  } else {
    console.error("API Error:", error.message);
  }
  throw error;
};

// Projects API
export const getProjects = async () => {
  try {
    const response = await api.get("/projects");
    return response.data;
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// Skills API
export const getSkills = async () => {
  try {
    const response = await api.get("/skills");
    return response.data;
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// Testimonials API
export const getTestimonials = async () => {
  try {
    const response = await api.get("/testimonials");
    return response.data;
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// Blog Posts API
export const getBlogPosts = async () => {
  try {
    const response = await api.get("/blog");
    return response.data;
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// Personal Info API
export const getPersonalInfo = async () => {
  try {
    const response = await api.get("/info");
    return response.data;
  } catch (error) {
    handleApiError(error);
    return {};
  }
};

// Timeline API
export const getTimeline = async () => {
  try {
    const response = await api.get("/timeline");
    return response.data;
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// Certifications API
export const getCertifications = async () => {
  try {
    const response = await api.get("/certifications");
    return response.data;
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// Contact API
export const sendContactForm = async (formData) => {
  try {
    const response = await api.post("/contact", formData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    return { success: false, message: "Failed to send message" };
  }
};

export default api;