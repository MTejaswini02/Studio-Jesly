from app.exceptions.exceptions import (
    UserNotFoundException,
    EmailAlreadyExistsException,
    InvalidCredentialsException,
)
from sqlalchemy.orm import Session
from app.core.security import hash_password
from app.core.security import verify_password
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user_schema import UserCreate, UserUpdate
from app.core.jwt import create_access_token
from app.core.logger import logger


class UserService:

    def __init__(self):
        self.repository = UserRepository()

    def create_user(self, db: Session, user_data: UserCreate):

        existing = self.repository.get_by_email(db, user_data.email)

        if existing:
            raise EmailAlreadyExistsException()
        user = User(
            full_name=user_data.full_name,
            email=user_data.email,
            password=hash_password(user_data.password),
            role=user_data.role
        )
       
        created_user = self.repository.create(db, user)

        logger.info(
            f"User created | Email: {created_user.email} | Role: {created_user.role}"
        )

        return created_user

    def get_users(self, db: Session):
        return self.repository.get_all(db)

    def get_user(self, db: Session, user_id: int):
        return self.repository.get_by_id(db, user_id)

    def update_user(
        self,
        db: Session,
        user_id: int,
        user_data: UserUpdate
    ):

        user = self.repository.update(
            db,
            user_id,
            user_data.model_dump()
        )

        if not user:
            raise UserNotFoundException()
        logger.info(
            f"User updated | ID: {user.id}"
        )

        return user

    def delete_user(
        self,
        db: Session,
        user_id: int
    ):

        deleted = self.repository.delete(db, user_id)

        if not deleted:
            raise UserNotFoundException()

        logger.info(
            f"User deleted | ID: {user_id}"
        )
        return {
            "message": "User deleted successfully"
        }

    def login_user(
        self,
        db: Session,
        email: str,
        password: str
    ):

        user = self.repository.get_by_email(db, email)

        if not user:
          raise InvalidCredentialsException()

        if not verify_password(password, user.password):
            raise InvalidCredentialsException()

        access_token = create_access_token(
            data={
                "sub": user.email,
                "role": user.role,
                "user_id": user.id
            }
        )

        return {
            "access_token": access_token,
            "token_type": "bearer"
        }