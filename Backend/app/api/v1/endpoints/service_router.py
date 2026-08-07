from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.permissions import require_admin
from app.database.database import get_db
from app.schemas.service_schema import (
    ServiceCreate,
    ServiceUpdate,
    ServiceResponse,
)
from app.services.service_service import ServiceService


router = APIRouter(
    prefix="/services",
    tags=["Services"],
)

service_service = ServiceService()


@router.post(
    "/",
    response_model=ServiceResponse,
    dependencies=[Depends(require_admin)],
)
def create_service(
    service: ServiceCreate,
    db: Session = Depends(get_db),
):
    return service_service.create_service(
        db,
        service,
    )


@router.get(
    "/",
    response_model=list[ServiceResponse],
    dependencies=[Depends(require_admin)],
)
def get_services(
    db: Session = Depends(get_db),
):
    return service_service.get_services(db)


@router.get(
    "/{service_id}",
    response_model=ServiceResponse,
    dependencies=[Depends(require_admin)],
)
def get_service(
    service_id: int,
    db: Session = Depends(get_db),
):
    return service_service.get_service(
        db,
        service_id,
    )


@router.put(
    "/{service_id}",
    response_model=ServiceResponse,
    dependencies=[Depends(require_admin)],
)
def update_service(
    service_id: int,
    service: ServiceUpdate,
    db: Session = Depends(get_db),
):
    return service_service.update_service(
        db,
        service_id,
        service,
    )


@router.delete(
    "/{service_id}",
    dependencies=[Depends(require_admin)],
)
def delete_service(
    service_id: int,
    db: Session = Depends(get_db),
):
    return service_service.delete_service(
        db,
        service_id,
    )