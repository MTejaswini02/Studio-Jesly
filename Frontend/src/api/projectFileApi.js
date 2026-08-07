import api from "./api";

export const getFiles = () =>
  api.get("/project-files");

export const deleteFile = (id) =>
  api.delete(`/project-files/${id}`);

export const uploadFile = (formData) =>
  api.post(
    "/project-files/upload",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );