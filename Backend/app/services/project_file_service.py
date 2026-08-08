from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.project_file import ProjectFile
from app.models.project import Project
from app.models.client import Client

from app.repositories.project_file_repository import (
    ProjectFileRepository,
)

from app.schemas.project_file_schema import (
    ProjectFileCreate,
    ProjectFileUpdate,
)

from app.exceptions.exceptions import (
    ProjectFileNotFoundException,
    ClientNotFoundException,
    ProjectNotFoundException,
)


class ProjectFileService:

    def __init__(self):
        self.repository = ProjectFileRepository()


    # -----------------------------------------
    # Admin - Create File
    # -----------------------------------------

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


    # -----------------------------------------
    # Admin - Get All Files
    # -----------------------------------------

    def get_files(
        self,
        db: Session,
    ):

        return self.repository.get_all(db)


    # -----------------------------------------
    # Admin - Get Project Files
    # -----------------------------------------

    def get_project_files(
        self,
        db: Session,
        project_id: int,
    ):

        return self.repository.get_by_project(
            db,
            project_id,
        )


    # -----------------------------------------
    # Admin - Get Single File
    # -----------------------------------------

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


    # -----------------------------------------
    # Admin - Update File
    # -----------------------------------------

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


    # -----------------------------------------
    # Admin - Delete File
    # -----------------------------------------

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


    # =========================================
    # Client - Get Own Project Files
    # =========================================

    def get_client_project_files(
        self,
        db: Session,
        current_user,
        project_id: int,
    ):

        client = (
            db.query(Client)
            .filter(
                func.lower(Client.email)
                == func.lower(current_user.email)
            )
            .first()
        )

        if not client:
            raise ClientNotFoundException()


        project = (
            db.query(Project)
            .filter(
                Project.id == project_id,
                Project.client_id == client.id,
            )
            .first()
        )

        if not project:
            raise ProjectNotFoundException()


        return self.repository.get_by_project(
            db,
            project.id,
        )


    # =========================================
    # Client - Get Own File
    # =========================================

    def get_client_file(
        self,
        db: Session,
        current_user,
        file_id: int,
    ):

        client = (
            db.query(Client)
            .filter(
                func.lower(Client.email)
                == func.lower(current_user.email)
            )
            .first()
        )

        if not client:
            raise ClientNotFoundException()


        project_file = (
            db.query(ProjectFile)
            .join(
                Project,
                Project.id == ProjectFile.project_id,
            )
            .filter(
                ProjectFile.id == file_id,
                Project.client_id == client.id,
            )
            .first()
        )

        if not project_file:
            raise ProjectFileNotFoundException()


        return project_file