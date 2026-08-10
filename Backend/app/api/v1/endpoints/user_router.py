from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.auth import get_current_user
from app.database.database import get_db
from app.models.user import User

from app.schemas.user_schema import (
    UserCreate,
    UserResponse,
    UserUpdate,
    Token,
    GoogleLoginRequest,
    ClientSignup,
    SignupOTPRequest,
    SignupOTPResponse,
)

from app.services.user_service import UserService
from app.core.permissions import require_admin
from app.common.helpers import success_response


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

user_service = UserService()


# -----------------------------------------
# Create User
# -----------------------------------------

@router.post("/")
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    created_user = user_service.create_user(
        db,
        user
    )

    return success_response(
        message="User created successfully",
        data=UserResponse.model_validate(
            created_user
        )
    )


# -----------------------------------------
# Client Signup
# -----------------------------------------

@router.post(
    "/signup",
    response_model=SignupOTPResponse
)
def client_signup(
    user: ClientSignup,
    db: Session = Depends(get_db),
):

    return user_service.create_client(
        db,
        user
    )


# -----------------------------------------
# Google Client Signup
# -----------------------------------------

@router.post(
    "/google-signup",
    response_model=SignupOTPResponse
)
def google_signup(
    data: GoogleLoginRequest,
    db: Session = Depends(get_db),
):

    return user_service.signup_with_google(
        db,
        data.google_token,
    )


# -----------------------------------------
# Verify Signup OTP
# -----------------------------------------

@router.post(
    "/verify-signup-otp",
    response_model=Token
)
def verify_signup_otp(
    data: SignupOTPRequest,
    db: Session = Depends(get_db),
):

    try:

        user = user_service.verify_client_signup_otp(
            db=db,
            email=str(data.email),
            otp=data.otp,
        )

        return user_service.create_user_token(
            user
        )

    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )


# -----------------------------------------
# Get Users
# -----------------------------------------

@router.get(
    "/",
    response_model=list[UserResponse]
)
def get_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):

    return user_service.get_users(db)


# -----------------------------------------
# Current User
# -----------------------------------------

@router.get(
    "/me",
    response_model=UserResponse
)
def get_me(
    current_user: User = Depends(get_current_user),
):

    return current_user


# -----------------------------------------
# Update User
# -----------------------------------------

@router.put(
    "/{user_id}",
    response_model=UserResponse
)
def update_user(
    user_id: int,
    user: UserUpdate,
    db: Session = Depends(get_db)
):

    return user_service.update_user(
        db,
        user_id,
        user
    )


# -----------------------------------------
# Delete User
# -----------------------------------------

@router.delete(
    "/{user_id}"
)
def delete_user(
    user_id: int,
    db: Session = Depends(get_db)
):

    return user_service.delete_user(
        db,
        user_id
    )


# -----------------------------------------
# Email + Password Login
# -----------------------------------------

@router.post(
    "/login",
    response_model=Token
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):

    return user_service.login_user(
        db,
        form_data.username,
        form_data.password,
    )


# -----------------------------------------
# Google Login
# -----------------------------------------

@router.post(
    "/google-login",
    response_model=Token
)
def google_login(
    data: GoogleLoginRequest,
    db: Session = Depends(get_db),
):

    return user_service.login_with_google(
        db,
        data.google_token,
    )