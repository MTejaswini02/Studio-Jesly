from pydantic import BaseModel, ConfigDict, EmailStr


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: str


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str

    model_config = ConfigDict(from_attributes=True)


class UserUpdate(BaseModel):
    full_name: str
    email: EmailStr
    role: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class GoogleLoginRequest(BaseModel):
    google_token: str


class ClientSignup(BaseModel):
    full_name: str
    email: EmailStr
    password: str