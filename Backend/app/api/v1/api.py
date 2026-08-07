from fastapi import APIRouter
from app.api.v1.endpoints.contact_router import router as contact_router
from app.api.v1.endpoints.user_router import router as user_router
from app.api.v1.endpoints.project_router import router as project_router
from app.api.v1.endpoints.client_router import router as client_router
from app.api.v1.endpoints.service_router import router as service_router
from app.api.v1.endpoints.portfolio_router import router as portfolio_router
api_router = APIRouter()

api_router.include_router(user_router)
api_router.include_router(contact_router)
api_router.include_router(project_router)
api_router.include_router(client_router)
api_router.include_router(service_router)
api_router.include_router(portfolio_router)