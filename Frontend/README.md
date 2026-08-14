# Studio Jesly — Frontend

The frontend application for **Studio Jesly**, a digital services agency platform.

The frontend provides the public-facing Studio Jesly website along with dedicated interfaces for administrators and clients.

---

## 🌐 Overview

The Studio Jesly frontend is built with React and provides three main experiences:

### Public Website

Visitors can access:

- Home
- Services
- Portfolio
- About
- Contact
- Featured Work

### Admin Interface

Administrators can access the management dashboard to manage:

- Clients
- Contacts
- Services
- Projects
- Project Files
- Portfolio
- Activity Logs

### Client Interface

Clients can:

- Sign up
- Log in
- Access their dashboard
- View their projects
- View project information
- Access project files

---

## ✨ Features

### Public Website

- Responsive landing page
- Service presentation
- Portfolio showcase
- Service-based portfolio filtering
- Portfolio PDF viewing
- Featured work section
- Contact/enquiry form
- Responsive navigation
- Responsive layouts for different screen sizes

### Authentication

The frontend supports:

- Admin login
- Client login
- Client signup
- Protected admin routes
- Protected client routes
- Authentication token handling
- Role-based access

### Admin Dashboard

The admin interface provides management screens for:

- Dashboard
- Clients
- Contacts
- Services
- Projects
- Project Files
- Portfolio
- Activity Logs

### Client Dashboard

The client interface provides access to:

- Client information
- Assigned projects
- Project details
- Project files

---

# 🛠️ Technology Stack

The frontend uses:

- React
- JavaScript
- Vite
- Tailwind CSS
- Axios
- React Router

---

# 📁 Frontend Structure

The frontend is organized into pages, components and API modules.

```text
Frontend/
│
├── public/
│
├── src/
│   │
│   ├── api/
│   │   ├── api.js
│   │   ├── clientApi.js
│   │   ├── projectApi.js
│   │   ├── projectFileApi.js
│   │   ├── portfolioApi.js
│   │   ├── serviceApi.js
│   │   └── userApi.js
│   │
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── CTA/
│   │   ├── Loader/
│   │   ├── Common/
│   │   └── Protected Routes
│   │
│   ├── pages/
│   │   ├── Home
│   │   ├── Services
│   │   ├── Portfolio
│   │   ├── About
│   │   ├── Contact
│   │   ├── AdminLogin
│   │   ├── AdminDashboard
│   │   ├── ClientLogin
│   │   ├── ClientDashboard
│   │   ├── Signup
│   │   ├── Login
│   │   └── NotFound
│   │
│   └── Portfolio Assets/
│
├── package.json
└── README.md

The application is organized into reusable components, pages and API modules.

🔗 API Integration

The frontend communicates with the FastAPI backend through REST APIs using Axios.

The API client is configured centrally.

Example:

import api from "./api";


export const getProjects = () =>
  api.get("/projects");

Authentication tokens are attached to protected API requests through an Axios interceptor.

🔐 Authentication

The general authentication flow is:

User Login
     ↓
Authentication API
     ↓
Access Token
     ↓
Stored in Browser
     ↓
Axios Interceptor
     ↓
Protected API Request

Protected routes are used to prevent unauthorized access to Admin and Client dashboards.

🧭 Routing
Public Routes
/
 /services
 /portfolio
 /about
 /contact
Authentication Routes
/admin/login
/client/login
/signup
/login
Protected Routes
/admin
/client
🎨 UI & Design

The frontend uses a dark agency-style visual design with:

Dark backgrounds
Yellow accent colors
Rounded cards
Responsive layouts
Consistent buttons
Reusable UI components
Responsive navigation

The design is intended to provide a professional experience for both visitors and authenticated users.

📂 Portfolio

The Portfolio section is connected to the backend portfolio system.

Each portfolio entry can display:

Title
Category
Description
Thumbnail
Associated project

Portfolio work can be filtered by service.

For example:

Presentation Design
        ↓
Matching portfolio projects
Canva Design
        ↓
Matching portfolio projects

The main Portfolio page displays all portfolio work matching the selected service.

The Home page contains a separate curated Featured Work section.

📄 Project Files

The frontend provides an interface for administrators to:

Upload project files
Associate files with projects
View uploaded files
Delete files

Clients can access files belonging to their own projects through the Client Dashboard.

Supported portfolio PDF files can also be opened through the public portfolio interface.

🚀 Getting Started
Prerequisites

Make sure you have installed:

Node.js
npm

The FastAPI backend should also be running for API-based functionality.

Installation

Clone the repository:

git clone YOUR_GITHUB_REPOSITORY_URL

Navigate to the frontend:

cd Frontend

Install dependencies:

npm install
Run Development Server
npm run dev

Vite will provide the local development URL in the terminal.

⚙️ Backend Connection

During development, the frontend communicates with the FastAPI backend through the configured API base URL.

Example:

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
});

For production deployment, this will be changed to the deployed backend API URL.

🏗️ Frontend Architecture

The general frontend architecture is:

Pages
  ↓
Reusable Components
  ↓
API Modules
  ↓
FastAPI Backend

Pages provide application screens, components provide reusable UI elements, and API modules handle communication with the backend.

📌 Current Status
Public Website             ✅
Home Page                  ✅
Services Page              ✅
Portfolio Page             ✅
About Page                 ✅
Contact Page               ✅
Admin Login                ✅
Admin Dashboard            ✅
Client Signup              ✅
Client Login               ✅
Client Dashboard           ✅
Project Management UI      ✅
Project Files UI           ✅
Portfolio Management UI    ✅
Service Filtering          ✅
Responsive Design          ✅
🚧 Future Development

Potential future improvements include:

Production deployment
Production API configuration
Improved client communication
Client notifications
Proposal and quotation interfaces
Invoice and payment interfaces
Team management
Additional agency workflows
Advanced analytics

These features can be introduced as Studio Jesly grows.

🎯 Project Vision

The Studio Jesly frontend is designed as the user interface for a growing digital services agency.

The long-term workflow is:

Visitors
   ↓
Services
   ↓
Portfolio
   ↓
Enquiry
   ↓
Client
   ↓
Projects
   ↓
Files
   ↓
Delivery

The frontend is therefore more than a static portfolio website. It is the user-facing layer of the Studio Jesly agency platform.
