from app.exceptions.exceptions import (
    UserNotFoundException,
    EmailAlreadyExistsException,
    InvalidCredentialsException,
)

from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.core.security import verify_password

from app.models.user import User
from app.models.client import Client

from app.repositories.user_repository import UserRepository
from app.repositories.client_repository import ClientRepository

from app.schemas.user_schema import (
    UserCreate,
    UserUpdate,
    ClientSignup,
)

from app.core.jwt import create_access_token
from app.core.logger import logger
from app.core.config import settings

from google.oauth2 import id_token
from google.auth.transport import requests

import secrets


class UserService:

    def __init__(self):

        self.repository = UserRepository()
        self.client_repository = ClientRepository()


    # -----------------------------------------
    # Create User
    # -----------------------------------------

    def create_user(
        self,
        db: Session,
        user_data: UserCreate
    ):

        email = str(user_data.email).lower()

        existing = self.repository.get_by_email(
            db,
            email
        )

        if existing:
            raise EmailAlreadyExistsException()


        user = User(
            full_name=user_data.full_name,
            email=email,
            password=hash_password(
                user_data.password
            ),
            role=user_data.role
        )


        created_user = self.repository.create(
            db,
            user
        )


        # If an admin creates a client account,
        # make sure the Client record also exists.

        if user_data.role.lower() == "client":

            self._ensure_client_record(
                db,
                created_user.full_name,
                email
            )


        logger.info(
            f"User created | Email: {created_user.email} | Role: {created_user.role}"
        )

        return created_user


    # -----------------------------------------
    # Ensure Client Record Exists
    # -----------------------------------------

    def _ensure_client_record(
        self,
        db: Session,
        full_name: str,
        email: str,
    ):

        email = email.lower()

        existing_client = (
            self.client_repository.get_by_email(
                db,
                email
            )
        )


        if existing_client:

            logger.info(
                f"Existing client record found | Email: {email}"
            )

            return existing_client


        client = Client(
            full_name=full_name,
            email=email,
        )


        created_client = (
            self.client_repository.create(
                db,
                client
            )
        )


        logger.info(
            f"Client record created | Email: {email}"
        )

        return created_client


    # -----------------------------------------
    # Client Signup
    # -----------------------------------------

    def create_client(
        self,
        db: Session,
        user_data: ClientSignup
    ):

        email = str(user_data.email).lower()


        existing_user = (
            self.repository.get_by_email(
                db,
                email
            )
        )


        if existing_user:
            raise EmailAlreadyExistsException()


        user = User(
            full_name=user_data.full_name,
            email=email,
            password=hash_password(
                user_data.password
            ),
            role="client"
        )


        created_user = self.repository.create(
            db,
            user
        )


        # Create corresponding Client record

        self._ensure_client_record(
            db,
            created_user.full_name,
            email
        )


        logger.info(
            f"Client account created | Email: {created_user.email}"
        )


        return created_user


    # -----------------------------------------
    # Get Users
    # -----------------------------------------

    def get_users(
        self,
        db: Session
    ):

        return self.repository.get_all(db)


    # -----------------------------------------
    # Get User
    # -----------------------------------------

    def get_user(
        self,
        db: Session,
        user_id: int
    ):

        return self.repository.get_by_id(
            db,
            user_id
        )


    # -----------------------------------------
    # Update User
    # -----------------------------------------

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


    # -----------------------------------------
    # Delete User
    # -----------------------------------------

    def delete_user(
        self,
        db: Session,
        user_id: int
    ):

        deleted = self.repository.delete(
            db,
            user_id
        )


        if not deleted:
            raise UserNotFoundException()


        logger.info(
            f"User deleted | ID: {user_id}"
        )


        return {
            "message": "User deleted successfully"
        }


    # -----------------------------------------
    # Email + Password Login
    # -----------------------------------------

    def login_user(
        self,
        db: Session,
        email: str,
        password: str
    ):

        email = email.lower()


        user = self.repository.get_by_email(
            db,
            email
        )


        if not user:
            raise InvalidCredentialsException()


        if not verify_password(
            password,
            user.password
        ):

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


    # -----------------------------------------
    # Google Login
    # -----------------------------------------

    def login_with_google(
        self,
        db: Session,
        google_token: str,
    ):

        # -----------------------------------------
        # Verify Google token
        # -----------------------------------------

        try:

            idinfo = id_token.verify_oauth2_token(
                google_token,
                requests.Request(),
                settings.GOOGLE_CLIENT_ID,
            )

        except ValueError:

            raise InvalidCredentialsException()


        # -----------------------------------------
        # Read Google identity
        # -----------------------------------------

        email = idinfo.get("email")

        email_verified = idinfo.get(
            "email_verified",
            False
        )


        if not email or not email_verified:

            raise InvalidCredentialsException()


        email = email.lower()


        # -----------------------------------------
        # Find existing user
        # -----------------------------------------

        user = self.repository.get_by_email(
            db,
            email
        )


        if not user:

            raise InvalidCredentialsException()


        # -----------------------------------------
        # Create Studio Jesly JWT
        # -----------------------------------------

        access_token = create_access_token(
            data={
                "sub": user.email,
                "role": user.role,
                "user_id": user.id
            }
        )


        logger.info(
            f"Google login successful | Email: {user.email}"
        )


        return {
            "access_token": access_token,
            "token_type": "bearer"
        }


    # -----------------------------------------
    # Google Client Signup
    # -----------------------------------------

    def signup_with_google(
        self,
        db: Session,
        google_token: str,
    ):

        # -----------------------------------------
        # Step 1: Verify Google token
        # -----------------------------------------

        try:

            idinfo = id_token.verify_oauth2_token(
                google_token,
                requests.Request(),
                settings.GOOGLE_CLIENT_ID,
            )

        except ValueError:

            raise InvalidCredentialsException()


        # -----------------------------------------
        # Step 2: Read Google identity
        # -----------------------------------------

        email = idinfo.get("email")

        email_verified = idinfo.get(
            "email_verified",
            False
        )

        full_name = idinfo.get(
            "name",
            "Studio Jesly Client"
        )


        if not email or not email_verified:

            raise InvalidCredentialsException()


        email = email.lower()


        # -----------------------------------------
        # Step 3: Check existing User
        # -----------------------------------------

        existing_user = (
            self.repository.get_by_email(
                db,
                email
            )
        )


        if existing_user:

            raise EmailAlreadyExistsException()


        # -----------------------------------------
        # Step 4: Create User
        # -----------------------------------------

        random_password = secrets.token_urlsafe(
            32
        )


        user = User(
            full_name=full_name,
            email=email,
            password=hash_password(
                random_password
            ),
            role="client"
        )


        created_user = self.repository.create(
            db,
            user
        )


        # -----------------------------------------
        # Step 5: Create Client Record
        # -----------------------------------------

        self._ensure_client_record(
            db,
            created_user.full_name,
            email
        )


        # -----------------------------------------
        # Step 6: Create Studio Jesly JWT
        # -----------------------------------------

        access_token = create_access_token(
            data={
                "sub": created_user.email,
                "role": created_user.role,
                "user_id": created_user.id
            }
        )


        logger.info(
            f"Google client account created | Email: {created_user.email}"
        )


        return {
            "access_token": access_token,
            "token_type": "bearer"
        }