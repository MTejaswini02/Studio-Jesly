from sqlalchemy.orm import Session

from app.models.client import Client


class ClientRepository:

    def create(self, db: Session, client: Client):
        db.add(client)
        db.commit()
        db.refresh(client)
        return client

    def get_all(self, db: Session):
        return db.query(Client).all()

    def get_by_id(self, db: Session, client_id: int):
        return (
            db.query(Client)
            .filter(Client.id == client_id)
            .first()
        )

    def get_by_email(self, db: Session, email: str):
        return (
            db.query(Client)
            .filter(Client.email == email)
            .first()
        )

    def update(self, db: Session, client: Client):
        db.commit()
        db.refresh(client)
        return client

    def delete(self, db: Session, client: Client):
        db.delete(client)
        db.commit()