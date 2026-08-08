from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.core.auth import get_current_user
from app.core.permissions import require_admin

from app.models.user import User

from app.schemas.project_schema import (
    ProjectCreate,
    ProjectUpdate,
    ProjectResponse,
)

from app.services.project_service import ProjectService


router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)


project_service = ProjectService()


# -----------------------------------------
# Admin - Create Project
# -----------------------------------------

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


# -----------------------------------------
# Admin - Get All Projects
# -----------------------------------------

@router.get(
    "/",
    response_model=list[ProjectResponse],
    dependencies=[Depends(require_admin)]
)
def get_projects(
    db: Session = Depends(get_db)
):

    return project_service.get_projects(db)


# -----------------------------------------
# Client - Get Own Projects
# -----------------------------------------

@router.get(
    "/client",
    response_model=list[ProjectResponse]
)
def get_client_projects(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return project_service.get_client_projects(
        db,
        current_user
    )


# -----------------------------------------
# Admin - Get Project
# -----------------------------------------

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


# -----------------------------------------
# Admin - Update Project
# -----------------------------------------

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


# -----------------------------------------
# Admin - Delete Project
# -----------------------------------------

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