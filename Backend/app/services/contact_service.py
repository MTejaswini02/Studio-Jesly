from app.models.contact_request import ContactRequest
from app.repositories.contact_repository import ContactRepository
from app.exceptions.exceptions import ContactNotFoundException


class ContactService:

    def __init__(self):
        self.repository = ContactRepository()

    def create_contact(
        self,
        db,
        contact_data,
    ):

        contact = ContactRequest(
            full_name=contact_data.full_name,
            email=contact_data.email,
            project_type=contact_data.project_type,
            message=contact_data.message,
            status="Pending",
        )

        return self.repository.create(
            db,
            contact,
        )

    def get_contacts(
        self,
        db,
    ):
        return self.repository.get_all(db)

    def get_contact(
        self,
        db,
        contact_id: int,
    ):

        contact = self.repository.get_by_id(
        db,
        contact_id,
        )

        if not contact:
            raise ContactNotFoundException()

        return contact


    def update_status(
        self,
        db,
        contact_id: int,
        status: str,
    ):

        contact = self.repository.get_by_id(
            db,
            contact_id,
        )

        if not contact:
            raise ContactNotFoundException()

        contact.status = status

        return self.repository.update(
            db,
            contact,
    )


    def delete_contact(
        self,
        db,
        contact_id: int,
    ):

        contact = self.repository.get_by_id(
            db,
            contact_id,
        )

        if not contact:
            raise ContactNotFoundException()

        self.repository.delete(
            db,
            contact,
        )

        return {
        "message": "Contact deleted successfully"
    }