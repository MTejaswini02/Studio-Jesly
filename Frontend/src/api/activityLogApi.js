import api from "./api";

export const getActivityLogs = () =>
  api.get("/activity-logs");