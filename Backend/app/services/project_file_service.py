from sqlalchemy.orm import Session

from app.models.project_file import ProjectFile
from app.repositories.project_file_repository import (
    ProjectFileRepository,
)
from app.schemas.project_file_schema import (
    ProjectFileCreate,
    ProjectFileUpdate,
)
from app.exceptions.exceptions import (
    ProjectFileNotFoundException,
)


class ProjectFileService:

    def __init__(self):
        self.repository = ProjectFileRepository()

    def create_file(
        self,
        db: Session,
        file_data: ProjectFileCreate,
    ):

        project_file = ProjectFile(
            project_id=file_data.project_id,
            file_name=file_data.file_name,
            file_path=file_data.file_path,
        )

        return self.repository.create(
            db,
            project_file,
        )

    def get_files(self, db: Session):
        return self.repository.get_all(db)

    def get_project_files(
        self,
        db: Session,
        project_id: int,
    ):
        return self.repository.get_by_project(
            db,
            project_id,
        )

    def get_file(
        self,
        db: Session,
        file_id: int,
    ):

        project_file = self.repository.get_by_id(
            db,
            file_id,
        )

        if not project_file:
            raise ProjectFileNotFoundException()

        return project_file

    def update_file(
        self,
        db: Session,
        file_id: int,
        file_data: ProjectFileUpdate,
    ):

        project_file = self.repository.get_by_id(
            db,
            file_id,
        )

        if not project_file:
            raise ProjectFileNotFoundException()

        update_data = file_data.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(project_file, key, value)

        return self.repository.update(
            db,
            project_file,
        )

    def delete_file(
        self,
        db: Session,
        file_id: int,
    ):

        project_file = self.repository.get_by_id(
            db,
            file_id,
        )

        if not project_file:
            raise ProjectFileNotFoundException()

        self.repository.delete(
            db,
            project_file,
        )

        return {
            "message": "Project file deleted successfully"
        }