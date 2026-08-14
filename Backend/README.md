# Studio Jesly — Backend

Backend API for **Studio Jesly**, a digital services agency platform.

The backend provides the REST API, authentication, authorization, database operations, project management, file management, portfolio management, and client/admin workflows.

---

## 🌐 Overview

The Studio Jesly backend is built with FastAPI and provides the business logic and API layer for the frontend application.

It manages:

- Authentication
- Users
- Clients
- Contacts
- Services
- Projects
- Project Files
- Portfolio
- Activity Logs

---

## 🛠️ Technology Stack

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- PostgreSQL
- JWT Authentication
- REST APIs

---

## 🏗️ Backend Architecture

The backend follows a layered architecture:

```text
API Routers
     ↓
Services
     ↓
Repositories
     ↓
SQLAlchemy Models
     ↓
PostgreSQL

This separation keeps API routing, business logic, database access, and data models organized independently.

📁 Backend Structure
Backend/
│
├── app/
│   │
│   ├── core/
│   │
│   ├── database/
│   │
│   ├── models/
│   │
│   ├── repositories/
│   │
│   ├── schemas/
│   │
│   ├── services/
│   │
│   ├── routers/
│   │
│   ├── exceptions/
│   │
│   └── main.py
│
├── uploads/
│
├── requirements.txt
└── README.md
🔌 API Modules

The backend provides REST APIs for the main Studio Jesly modules.

/api/v1/auth
/api/v1/users
/api/v1/clients
/api/v1/contacts
/api/v1/services
/api/v1/projects
/api/v1/project-files
/api/v1/portfolio
👤 Authentication

The backend provides authentication for administrators and clients.

The authentication flow is based on access tokens.

Login
  ↓
Authentication
  ↓
Access Token
  ↓
Frontend
  ↓
Protected API Requests

Protected endpoints use authentication and permission dependencies to restrict access.

🔐 Authorization

Studio Jesly separates administrative and client permissions.

Admin

Administrators can manage:

Clients
Contacts
Services
Projects
Project Files
Portfolio
Users
Administrative operations
Client

Clients are restricted to their own client-facing resources.

This separation prevents clients from accessing administrative resources.

👥 Client Management

The backend provides functionality for managing client information and client relationships.

Clients can be associated with projects.

Client
  |
  +── Project
  +── Project
  +── Project
📞 Contact Management

The Contact module handles enquiries submitted through the public website.

Administrators can manage contact submissions through the Admin Dashboard.

🧩 Service Management

Services represent the digital services offered by Studio Jesly.

Services can be:

Created
Retrieved
Updated
Deleted

Projects are associated with services so that portfolio work can later be organized by service.

📋 Project Management

Projects are central to the Studio Jesly workflow.

A project can contain:

Project
├── Project Code
├── Title
├── Description
├── Client
├── Service
├── Assigned User
├── Status
├── Priority
├── Estimated Hours
├── Start Date
├── Due Date
└── Notes

Project status and priority allow administrators to track the progress and importance of work.

📎 Project File Management

Project files are linked to individual projects.

The system supports:

File uploads
Project association
File retrieval
File deletion
Client access to their project files

The project-file relationship is:

Project
   |
   +── File
   +── File
   +── File

Portfolio PDFs can be served through a dedicated portfolio viewing endpoint.

🖼️ Portfolio Management

The Portfolio module connects public portfolio entries with internal projects.

A portfolio entry contains information such as:

Portfolio
├── Project ID
├── Title
├── Category
├── Description
├── Thumbnail
├── Featured Status
└── Published Date

This allows completed project work to be presented publicly while remaining connected to the project managed by the agency.

⭐ Featured Portfolio

Portfolio entries can be marked as featured.

The backend provides functionality for retrieving featured portfolio entries so the frontend can highlight selected work.

🔎 Service-Based Portfolio

Portfolio entries are connected to projects, and projects are connected to services.

This creates the relationship:

Service
   ↓
Project
   ↓
Portfolio

The frontend can therefore display portfolio work associated with a selected service.

There is no fixed three-project limit in the main portfolio system.

🧱 Database

The backend uses SQLAlchemy as the ORM and PostgreSQL as the database.

The database stores information related to:

Users
Clients
Contacts
Services
Projects
Project Files
Portfolio

Relationships between these entities allow the system to maintain a connected business workflow.

⚠️ Error Handling

The backend uses application-specific exceptions for situations such as:

Resource not found
Duplicate portfolio entries
Invalid operations
Unauthorized access

These errors are converted into appropriate API responses for the frontend.

⚙️ Environment Variables

Sensitive configuration should be stored in environment variables.

Example:

DATABASE_URL=


SECRET_KEY=


ACCESS_TOKEN_EXPIRE_MINUTES=


GOOGLE_CLIENT_ID=


GOOGLE_CLIENT_SECRET=

Do not commit real credentials or secrets to GitHub.

🚀 Getting Started
Prerequisites

Install:

Python
PostgreSQL
pip
Create Virtual Environment

On Windows:

python -m venv venv

Activate it:

venv\Scripts\activate
Install Dependencies
pip install -r requirements.txt
Configure Environment

Create the appropriate .env file with the required database and authentication configuration.

Do not commit the .env file to GitHub.

Run the Backend
uvicorn app.main:app --reload

FastAPI provides interactive API documentation while the development server is running.

🔗 Frontend Integration

The React frontend communicates with this backend through REST APIs.

The development architecture is:

React
  ↓
Axios
  ↓
FastAPI
  ↓
SQLAlchemy
  ↓
PostgreSQL

The frontend sends authentication tokens with protected requests.

🔒 Security

The backend includes:

JWT-based authentication
Role-based authorization
Protected endpoints
Request validation
Environment-based secrets
Permission dependencies
Database relationships

Production deployment will require an additional security review and production-specific configuration.

📌 Current Status
FastAPI Backend           ✅
PostgreSQL Integration    ✅
Authentication            ✅
Authorization             ✅
Client Management         ✅
Contact Management        ✅
Service Management        ✅
Project Management        ✅
Project Files             ✅
Portfolio Management      ✅
Featured Portfolio        ✅
Service Relationships     ✅
Activity Logging          ✅
Production Deployment     ⏳
🚧 Future Development

Potential future backend improvements include:

Production file storage
Client notifications
Email notifications
Proposal management
Quotation management
Invoice management
Payment tracking
Task management
Team management
Advanced activity tracking
Analytics
Agency automation

These features can be introduced based on actual Studio Jesly business requirements.

🎯 Backend Vision

The backend is designed to serve as the operational foundation of Studio Jesly.

The long-term workflow is:

Lead
 ↓
Client
 ↓
Service
 ↓
Project
 ↓
Files
 ↓
Delivery
 ↓
Portfolio
 ↓
Case Study
 ↓
Testimonial
 ↓
Repeat Business

The goal is to evolve the backend from a service-management API into the operational platform supporting a growing digital services agency.