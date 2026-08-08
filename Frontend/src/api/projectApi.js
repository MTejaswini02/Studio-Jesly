import api from "./api";


// -----------------------------------------
// Admin - Get All Projects
// -----------------------------------------

export const getProjects = () =>
  api.get("/projects");


// -----------------------------------------
// Admin - Get Single Project
// -----------------------------------------

export const getProject = (id) =>
  api.get(`/projects/${id}`);


// -----------------------------------------
// Admin - Create Project
// -----------------------------------------

export const createProject = (data) =>
  api.post("/projects", data);


// -----------------------------------------
// Admin - Update Project
// -----------------------------------------

export const updateProject = (id, data) =>
  api.put(`/projects/${id}`, data);


// -----------------------------------------
// Admin - Delete Project
// -----------------------------------------

export const deleteProject = (id) =>
  api.delete(`/projects/${id}`);


// -----------------------------------------
// Client - Get Own Projects
// -----------------------------------------

export const getClientProjects = () =>
  api.get("/projects/client");


// -----------------------------------------
// Client - Get Files For Own Project
// -----------------------------------------

export const getClientProjectFiles = (projectId) =>
  api.get(`/project-files/client/project/${projectId}`);


// -----------------------------------------
// Client - Download / Open Own File
// -----------------------------------------

export const getClientProjectFile = (fileId) =>
  api.get(`/project-files/client/file/${fileId}`, {
    responseType: "blob",
  });