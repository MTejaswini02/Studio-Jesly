from sqlalchemy.orm import Session

from app.models.service import Service


class ServiceRepository:

    def create(self, db: Session, service: Service):
        db.add(service)
        db.commit()
        db.refresh(service)
        return service

    def get_all(self, db: Session):
        return db.query(Service).all()

    def get_by_id(self, db: Session, service_id: int):
        return (
            db.query(Service)
            .filter(Service.id == service_id)
            .first()
        )

    def get_by_name(self, db: Session, name: str):
        return (
            db.query(Service)
            .filter(Service.name == name)
            .first()
        )

    def update(self, db: Session, service: Service):
        db.commit()
        db.refresh(service)
        return service

    def delete(self, db: Session, service: Service):
        db.delete(service)
        db.commit()