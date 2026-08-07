from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File,
    Form,
    HTTPException,
)
from sqlalchemy.orm import Session
from app.core.permissions import require_admin
from app.database.database import get_db
from app.schemas.project_file_schema import (
    ProjectFileCreate,
    ProjectFileUpdate,
    ProjectFileResponse,
)
from app.services.project_file_service import ProjectFileService
import os
import shutil


router = APIRouter(
    prefix="/project-files",
    tags=["Project Files"],
)

project_file_service = ProjectFileService()


@router.post(
    "/",
    response_model=ProjectFileResponse,
    dependencies=[Depends(require_admin)],
)
def create_file(
    project_file: ProjectFileCreate,
    db: Session = Depends(get_db),
):
    return project_file_service.create_file(
        db,
        project_file,
    )


@router.get(
    "/",
    response_model=list[ProjectFileResponse],
    dependencies=[Depends(require_admin)],
)
def get_files(
    db: Session = Depends(get_db),
):
    return project_file_service.get_files(db)


@router.get(
    "/project/{project_id}",
    response_model=list[ProjectFileResponse],
    dependencies=[Depends(require_admin)],
)
def get_project_files(
    project_id: int,
    db: Session = Depends(get_db),
):
    return project_file_service.get_project_files(
        db,
        project_id,
    )


@router.get(
    "/{file_id}",
    response_model=ProjectFileResponse,
    dependencies=[Depends(require_admin)],
)
def get_file(
    file_id: int,
    db: Session = Depends(get_db),
):
    return project_file_service.get_file(
        db,
        file_id,
    )


@router.put(
    "/{file_id}",
    response_model=ProjectFileResponse,
    dependencies=[Depends(require_admin)],
)
def update_file(
    file_id: int,
    project_file: ProjectFileUpdate,
    db: Session = Depends(get_db),
):
    return project_file_service.update_file(
        db,
        file_id,
        project_file,
    )


@router.delete(
    "/{file_id}",
    dependencies=[Depends(require_admin)],
)
def delete_file(
    file_id: int,
    db: Session = Depends(get_db),
):
    return project_file_service.delete_file(
        db,
        file_id,
    )
@router.post(
    "/upload",
    response_model=ProjectFileResponse,
    dependencies=[Depends(require_admin)],
)
def upload_project_file(
    project_id: int = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):

    upload_directory = f"uploads/projects/{project_id}"

    os.makedirs(upload_directory, exist_ok=True)

    file_path = os.path.join(
        upload_directory,
        file.filename,
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer,
        )

    project_file = ProjectFileCreate(
        project_id=project_id,
        file_name=file.filename,
        file_path=file_path,
    )

    return project_file_service.create_file(
        db,
        project_file,
    )