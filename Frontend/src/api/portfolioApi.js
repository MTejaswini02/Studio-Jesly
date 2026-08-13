import api from "./api";


// -----------------------------------------
// Public - Get All Portfolio
// -----------------------------------------

export const getPortfolio = () =>
  api.get("/portfolio");


// -----------------------------------------
// Public - Get Featured Portfolio
// -----------------------------------------

export const getFeaturedPortfolio = () =>
  api.get("/portfolio/featured");


// -----------------------------------------
// Public - Get Services Used In Portfolio
// -----------------------------------------

export const getPortfolioServices = () =>
  api.get("/portfolio/services");


// -----------------------------------------
// Public - Get Portfolio By Service
// -----------------------------------------

export const getPortfolioByService = (serviceId) =>
  api.get(`/portfolio/service/${serviceId}`);


// -----------------------------------------
// Admin - Get Single Portfolio
// -----------------------------------------

export const getPortfolioItem = (id) =>
  api.get(`/portfolio/${id}`);


// -----------------------------------------
// Admin - Create Portfolio
// -----------------------------------------

export const createPortfolioItem = (data) =>
  api.post("/portfolio", data);


// -----------------------------------------
// Admin - Update Portfolio
// -----------------------------------------

export const updatePortfolioItem = (id, data) =>
  api.put(`/portfolio/${id}`, data);


// -----------------------------------------
// Admin - Delete Portfolio
// -----------------------------------------

export const deletePortfolioItem = (id) =>
  api.delete(`/portfolio/${id}`);