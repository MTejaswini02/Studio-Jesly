from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.permissions import require_admin
from app.database.database import get_db
from app.schemas.client_schema import (
    ClientCreate,
    ClientUpdate,
    ClientResponse,
)
from app.services.client_service import ClientService


router = APIRouter(
    prefix="/clients",
    tags=["Clients"],
)

client_service = ClientService()


@router.post(
    "/",
    response_model=ClientResponse,
    dependencies=[Depends(require_admin)],
)
def create_client(
    client: ClientCreate,
    db: Session = Depends(get_db),
):
    return client_service.create_client(db, client)


@router.get(
    "/",
    response_model=list[ClientResponse],
    dependencies=[Depends(require_admin)],
)
def get_clients(
    db: Session = Depends(get_db),
):
    return client_service.get_clients(db)


@router.get(
    "/{client_id}",
    response_model=ClientResponse,
    dependencies=[Depends(require_admin)],
)
def get_client(
    client_id: int,
    db: Session = Depends(get_db),
):
    return client_service.get_client(
        db,
        client_id,
    )


@router.put(
    "/{client_id}",
    response_model=ClientResponse,
    dependencies=[Depends(require_admin)],
)
def update_client(
    client_id: int,
    client: ClientUpdate,
    db: Session = Depends(get_db),
):
    return client_service.update_client(
        db,
        client_id,
        client,
    )


@router.delete(
    "/{client_id}",
    dependencies=[Depends(require_admin)],
)
def delete_client(
    client_id: int,
    db: Session = Depends(get_db),
):
    return client_service.delete_client(
        db,
        client_id,
    )