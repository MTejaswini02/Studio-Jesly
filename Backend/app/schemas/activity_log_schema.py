from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ActivityLogBase(BaseModel):
    project_id: int
    user_id: int
    activity: str


class ActivityLogCreate(ActivityLogBase):
    pass


class ActivityLogUpdate(BaseModel):
    activity: str | None = None


class ActivityLogResponse(ActivityLogBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)