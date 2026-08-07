from sqlalchemy.orm import Session

from app.models.client import Client
from app.repositories.client_repository import ClientRepository
from app.schemas.client_schema import (
    ClientCreate,
    ClientUpdate,
)
from app.exceptions.exceptions import (
    EmailAlreadyExistsException,
    ClientNotFoundException,
)


class ClientService:

    def __init__(self):
        self.repository = ClientRepository()

    def create_client(
        self,
        db: Session,
        client_data: ClientCreate,
    ):

        existing_client = self.repository.get_by_email(
            db,
            client_data.email,
        )

        if existing_client:
            raise EmailAlreadyExistsException()

        client = Client(
            full_name=client_data.full_name,
            email=client_data.email,
            phone=client_data.phone,
            company=client_data.company,
        )

        return self.repository.create(db, client)

    def get_clients(self, db: Session):
        return self.repository.get_all(db)

    def get_client(
        self,
        db: Session,
        client_id: int,
    ):

        client = self.repository.get_by_id(
            db,
            client_id,
        )

        if not client:
            raise ClientNotFoundException()

        return client

    def update_client(
        self,
        db: Session,
        client_id: int,
        client_data: ClientUpdate,
    ):

        client = self.repository.get_by_id(
            db,
            client_id,
        )

        if not client:
            raise ClientNotFoundException()

        update_data = client_data.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(client, key, value)

        return self.repository.update(db, client)

    def delete_client(
        self,
        db: Session,
        client_id: int,
    ):

        client = self.repository.get_by_id(
            db,
            client_id,
        )

        if not client:
            raise ClientNotFoundException()

        self.repository.delete(db, client)

        return {
            "message": "Client deleted successfully"
        }