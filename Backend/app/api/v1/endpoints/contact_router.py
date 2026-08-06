from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from app.database.database import get_db
from app.schemas.contact_schema import (
    ContactCreate,
    ContactResponse,
    ContactStatusUpdate
)
from app.services.contact_service import ContactService
from app.common.helpers import success_response
from app.core.permissions import require_admin
from app.models.contact_request import ContactRequest
from app.schemas.contact_schema import ContactStatusUpdate
from app.core.permissions import require_admin

router = APIRouter(
    prefix="/contacts",
    tags=["Contacts"]
)

contact_service = ContactService()


@router.post("/")
def create_contact(
    contact: ContactCreate,
    db: Session = Depends(get_db)
):

    created = contact_service.create_contact(
        db,
        contact
    )

    return success_response(
        message="Contact request submitted successfully",
        data=ContactResponse.model_validate(created)
    )


@router.get("/", response_model=list[ContactResponse])
def get_contacts(
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    return contact_service.get_contacts(db)

@router.get("/{contact_id}", response_model=ContactResponse)
def get_contact(
    contact_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    return contact_service.get_contact(
        db,
        contact_id,
    )

@router.patch("/{contact_id}")
def update_contact_status(
    contact_id: int,
    update: ContactStatusUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):

    updated = contact_service.update_status(
        db,
        contact_id,
        update.status,
    )

    return success_response(
        "Status updated successfully",
        ContactResponse.model_validate(updated),
    )

@router.delete("/{contact_id}")
def delete_contact(
    contact_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):

    return contact_service.delete_contact(
        db,
        contact_id,
    )

    return success_response(
        "Contact deleted successfully"
    )