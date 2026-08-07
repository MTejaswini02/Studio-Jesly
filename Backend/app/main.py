from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.models.contact_request import ContactRequest
from app.database.database import engine, Base
from app.models.service import Service
from app.models.user import User
from app.models.client import Client
from app.models.project import Project
from app.models.project_file import ProjectFile
from app.models.activity_log import ActivityLog
from app.models.portfolio import Portfolio
from app.api.v1.router import api_router
from app.api.v1.api import api_router

app = FastAPI(
    title="Studio Jesly API",
    version="1.0.0",
)

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def root():
    return {
        "message": "Studio Jesly Backend Running"
    }


@app.get("/health")
def health():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return {
        "status": "healthy",
        "database": "connected"
    }