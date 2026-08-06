from sqlalchemy.orm import Session

from app.models.contact_request import ContactRequest


class ContactRepository:

    def create(self, db: Session, contact: ContactRequest):
        db.add(contact)
        db.commit()
        db.refresh(contact)
        return contact

    def get_all(self, db: Session):
        return db.query(ContactRequest).all()

    def get_by_id(self, db: Session, contact_id: int):
        return (
            db.query(ContactRequest)
            .filter(ContactRequest.id == contact_id)
            .first()
        )

    def update(self, db: Session, contact: ContactRequest):
        db.commit()
        db.refresh(contact)
        return contact

    def delete(self, db: Session, contact: ContactRequest):
        db.delete(contact)
        db.commit()