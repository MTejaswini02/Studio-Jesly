from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class ContactCreate(BaseModel):
    full_name: str
    email: EmailStr
    project_type: str
    message: str


class ContactResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    project_type: str
    message: str
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class ContactStatusUpdate(BaseModel):
    status: str