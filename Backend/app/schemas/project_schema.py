from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class ProjectBase(BaseModel):
    project_code: str
    title: str
    description: Optional[str] = None

    client_id: int
    service_id: int
    assigned_to: int

    status: str = "Pending"
    priority: str = "Medium"

    estimated_hours: Optional[int] = None

    start_date: Optional[date] = None
    due_date: Optional[date] = None

    notes: Optional[str] = None


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None

    client_id: Optional[int] = None
    service_id: Optional[int] = None
    assigned_to: Optional[int] = None

    status: Optional[str] = None
    priority: Optional[str] = None

    estimated_hours: Optional[int] = None

    start_date: Optional[date] = None
    due_date: Optional[date] = None

    notes: Optional[str] = None


class ProjectResponse(ProjectBase):
    id: int

    completed_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)