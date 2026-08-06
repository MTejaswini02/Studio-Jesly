from sqlalchemy.orm import Session

from app.models.user import User


class UserRepository:

    def create(self, db: Session, user: User):
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    def get_all(self, db: Session):
        return db.query(User).all()

    def get_by_id(self, db: Session, user_id: int):
        return db.query(User).filter(User.id == user_id).first()

    def get_by_email(self, db: Session, email: str):
        return db.query(User).filter(User.email == email).first()

    def update(self, db: Session, user_id: int, data: dict):

        user = self.get_by_id(db, user_id)

        if not user:
            return None

        for key, value in data.items():
            setattr(user, key, value)

        db.commit()
        db.refresh(user)

        return user

    def delete(self, db: Session, user_id: int):

        user = self.get_by_id(db, user_id)

        if not user:
            return False

        db.delete(user)

        db.commit()

        return True