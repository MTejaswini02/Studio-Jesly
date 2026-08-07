from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.project_schema import (
    ProjectCreate,
    ProjectUpdate,
    ProjectResponse
)
from app.services.project_service import ProjectService
from app.core.permissions import require_admin


router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)

project_service = ProjectService()


@router.post(
    "/",
    response_model=ProjectResponse,
    dependencies=[Depends(require_admin)]
)
def create_project(
    project: ProjectCreate,
    db: Session = Depends(get_db)
):
    return project_service.create_project(
        db,
        project
    )


@router.get(
    "/",
    response_model=list[ProjectResponse],
    dependencies=[Depends(require_admin)]
)
def get_projects(
    db: Session = Depends(get_db)
):
    return project_service.get_projects(db)


@router.get(
    "/{project_id}",
    response_model=ProjectResponse,
    dependencies=[Depends(require_admin)]
)
def get_project(
    project_id: int,
    db: Session = Depends(get_db)
):
    return project_service.get_project(
        db,
        project_id
    )


@router.put(
    "/{project_id}",
    response_model=ProjectResponse,
    dependencies=[Depends(require_admin)]
)
def update_project(
    project_id: int,
    project: ProjectUpdate,
    db: Session = Depends(get_db)
):
    return project_service.update_project(
        db,
        project_id,
        project
    )


@router.delete(
    "/{project_id}",
    dependencies=[Depends(require_admin)]
)
def delete_project(
    project_id: int,
    db: Session = Depends(get_db)
):
    return project_service.delete_project(
        db,
        project_id
    )