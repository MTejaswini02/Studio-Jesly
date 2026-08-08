from sqlalchemy.orm import Session

from app.models.project import Project
from app.models.user import User
from app.repositories.project_repository import ProjectRepository
from app.repositories.client_repository import ClientRepository

from app.schemas.project_schema import (
    ProjectCreate,
    ProjectUpdate,
)

from app.exceptions.exceptions import (
    ProjectNotFoundException,
    ClientNotFoundException,
)

from app.utils.activity_logger import log_activity


class ProjectService:

    def __init__(self):

        self.repository = ProjectRepository()
        self.client_repository = ClientRepository()


    # -----------------------------------------
    # Create Project - Admin
    # -----------------------------------------

    def create_project(
        self,
        db: Session,
        project_data: ProjectCreate,
    ):

        project = Project(
            project_code=project_data.project_code,
            title=project_data.title,
            description=project_data.description,
            client_id=project_data.client_id,
            service_id=project_data.service_id,
            assigned_to=project_data.assigned_to,
            status=project_data.status,
            priority=project_data.priority,
            estimated_hours=project_data.estimated_hours,
            start_date=project_data.start_date,
            due_date=project_data.due_date,
            notes=project_data.notes,
        )


        project = self.repository.create(
            db,
            project
        )


        # Create activity log automatically

        log_activity(
            db=db,
            project_id=project.id,
            user_id=project.assigned_to,
            activity=f"Project '{project.title}' created",
        )


        return project


    # -----------------------------------------
    # Get All Projects - Admin
    # -----------------------------------------

    def get_projects(
        self,
        db: Session
    ):

        return self.repository.get_all(db)


    # -----------------------------------------
    # Get Project - Admin
    # -----------------------------------------

    def get_project(
        self,
        db: Session,
        project_id: int,
    ):

        project = self.repository.get_by_id(
            db,
            project_id
        )


        if not project:

            raise ProjectNotFoundException()


        return project


    # -----------------------------------------
    # Update Project - Admin
    # -----------------------------------------

    def update_project(
        self,
        db: Session,
        project_id: int,
        project_data: ProjectUpdate,
    ):

        project = self.repository.get_by_id(
            db,
            project_id
        )


        if not project:

            raise ProjectNotFoundException()


        update_data = project_data.model_dump(
            exclude_unset=True
        )


        for key, value in update_data.items():

            setattr(
                project,
                key,
                value
            )


        return self.repository.update(
            db,
            project
        )


    # -----------------------------------------
    # Delete Project - Admin
    # -----------------------------------------

    def delete_project(
        self,
        db: Session,
        project_id: int,
    ):

        project = self.repository.get_by_id(
            db,
            project_id
        )


        if not project:

            raise ProjectNotFoundException()


        self.repository.delete(
            db,
            project
        )


        return {
            "message": "Project deleted successfully"
        }


    # -----------------------------------------
    # Get Client Projects
    # -----------------------------------------

    def get_client_projects(
        self,
        db: Session,
        user: User,
    ):

        # -----------------------------------------
        # Find Client using authenticated email
        # -----------------------------------------

        email = user.email.lower()


        client = (
            self.client_repository.get_by_email(
                db,
                email
            )
        )


        if not client:

            raise ClientNotFoundException()


        # -----------------------------------------
        # Get ONLY this client's projects
        # -----------------------------------------

        return self.repository.get_by_client_id(
            db,
            client.id
        )