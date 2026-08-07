import api from "./api";

// Get all services
export const getServices = () => {
  return api.get("/services");
};

// Get single service
export const getService = (id) => {
  return api.get(`/services/${id}`);
};

// Create service
export const createService = (service) => {
  return api.post("/services", service);
};

// Update service
export const updateService = (id, service) => {
  return api.put(`/services/${id}`, service);
};

// Delete service
export const deleteService = (id) => {
  return api.delete(`/services/${id}`);
};