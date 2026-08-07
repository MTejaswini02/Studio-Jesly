from sqlalchemy.orm import Session

from app.models.service import Service
from app.repositories.service_repository import ServiceRepository
from app.schemas.service_schema import (
    ServiceCreate,
    ServiceUpdate,
)
from app.exceptions.exceptions import (
    ServiceNotFoundException,
    ServiceAlreadyExistsException
)


class ServiceService:

    def __init__(self):
        self.repository = ServiceRepository()

    def create_service(
        self,
        db: Session,
        service_data: ServiceCreate,
    ):

        existing_service = self.repository.get_by_name(
            db,
            service_data.name,
        )

        if existing_service:
            raise ServiceAlreadyExistsException()

        service = Service(
            name=service_data.name,
            description=service_data.description,
        )

        return self.repository.create(db, service)

    def get_services(self, db: Session):
        return self.repository.get_all(db)

    def get_service(
        self,
        db: Session,
        service_id: int,
    ):

        service = self.repository.get_by_id(
            db,
            service_id,
        )

        if not service:
            raise ServiceNotFoundException()

        return service

    def update_service(
        self,
        db: Session,
        service_id: int,
        service_data: ServiceUpdate,
    ):

        service = self.repository.get_by_id(
            db,
            service_id,
        )

        if not service:
            raise ServiceNotFoundException()

        update_data = service_data.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(service, key, value)

        return self.repository.update(db, service)

    def delete_service(
        self,
        db: Session,
        service_id: int,
    ):

        service = self.repository.get_by_id(
            db,
            service_id,
        )

        if not service:
            raise ServiceNotFoundException()

        self.repository.delete(db, service)

        return {
            "message": "Service deleted successfully"
        }