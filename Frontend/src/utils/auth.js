import { jwtDecode } from "jwt-decode";

export function getToken() {
  return localStorage.getItem("access_token");
}

export function getCurrentUser() {
  const token = getToken();

  console.log("Token:", token);

  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    console.log("Decoded Token:", decoded);

    return decoded;
  } catch {
    localStorage.removeItem("access_token");
    return null;
  }
}

export function isAuthenticated() {
  return getCurrentUser() !== null;
}

export function isAdmin() {
  const user = getCurrentUser();

  console.log("User:", user);
  console.log("Role:", user?.role);

  return user?.role === "Admin";
}

export function logout() {
  localStorage.removeItem("access_token");
}