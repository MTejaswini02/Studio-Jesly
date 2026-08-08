import { jwtDecode } from "jwt-decode";


export function getToken() {

  return localStorage.getItem("access_token");

}


export function getCurrentUser() {

  const token = getToken();

  if (!token) {
    return null;
  }

  try {

    const decoded = jwtDecode(token);

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

  return user?.role?.toLowerCase() === "admin";

}


export function isClient() {

  const user = getCurrentUser();

  return user?.role?.toLowerCase() === "client";

}


export function logout() {

  localStorage.removeItem("access_token");

}