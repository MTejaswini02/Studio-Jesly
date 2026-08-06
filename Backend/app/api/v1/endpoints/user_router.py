from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.core.auth import get_current_user
from app.database.database import get_db
from app.models.user import User
from app.schemas.user_schema import UserCreate, UserResponse, UserUpdate, Token
from app.services.user_service import UserService
from app.core.permissions import require_admin
from app.common.helpers import success_response

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

user_service = UserService()


@router.post("/")
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    created_user = user_service.create_user(db, user)

    return success_response(
        message="User created successfully",
        data=UserResponse.model_validate(created_user)
    )


@router.get("/", response_model=list[UserResponse])
def get_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return user_service.get_users(db)

@router.get("/me", response_model=UserResponse)
def get_me(
    current_user: User = Depends(get_current_user),
):
    return current_user

@router.put("/{user_id}", response_model=UserResponse)
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


@router.delete("/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    return user_service.delete_user(
        db,
        user_id
    )

@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    return user_service.login_user(
        db,
        form_data.username,   # username will contain the email
        form_data.password,
    )