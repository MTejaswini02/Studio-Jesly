from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ProjectFileBase(BaseModel):
    project_id: int
    file_name: str
    file_path: str


class ProjectFileCreate(ProjectFileBase):
    pass


class ProjectFileUpdate(BaseModel):
    file_name: str | None = None
    file_path: str | None = None


class ProjectFileResponse(ProjectFileBase):
    id: int
    uploaded_at: datetime

    model_config = ConfigDict(from_attributes=True)