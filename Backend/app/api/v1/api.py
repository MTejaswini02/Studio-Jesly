from fastapi import APIRouter
from app.api.v1.endpoints.contact_router import router as contact_router
from app.api.v1.endpoints.user_router import router as user_router

api_router = APIRouter()

api_router.include_router(user_router)
api_router.include_router(contact_router)