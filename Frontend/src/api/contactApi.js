import api from "./api";

export const getContacts = () =>
  api.get("/contacts");

export const getContact = (id) =>
  api.get(`/contacts/${id}`);

export const createContact = (data) =>
  api.post("/contacts/", data);

export const updateStatus = (id, status) =>
  api.patch(`/contacts/${id}`, {
    status: status,
  });

export const deleteContact = (id) =>
  api.delete(`/contacts/${id}`);