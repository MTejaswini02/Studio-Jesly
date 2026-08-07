import api from "./api";

// Get all clients
export const getClients = () => {
  return api.get("/clients");
};

// Get single client
export const getClient = (id) => {
  return api.get(`/clients/${id}`);
};

// Create client
export const createClient = (client) => {
  return api.post("/clients", client);
};

// Update client
export const updateClient = (id, client) => {
  return api.put(`/clients/${id}`, client);
};

// Delete client
export const deleteClient = (id) => {
  return api.delete(`/clients/${id}`);
};