from sqlalchemy.orm import Session

from app.models.project_file import ProjectFile


class ProjectFileRepository:

    def create(
        self,
        db: Session,
        project_file: ProjectFile,
    ):
        db.add(project_file)
        db.commit()
        db.refresh(project_file)
        return project_file

    def get_all(self, db: Session):
        return db.query(ProjectFile).all()

    def get_by_id(
        self,
        db: Session,
        file_id: int,
    ):
        return (
            db.query(ProjectFile)
            .filter(ProjectFile.id == file_id)
            .first()
        )

    def get_by_project(
        self,
        db: Session,
        project_id: int,
    ):
        return (
            db.query(ProjectFile)
            .filter(ProjectFile.project_id == project_id)
            .all()
        )

    def update(
        self,
        db: Session,
        project_file: ProjectFile,
    ):
        db.commit()
        db.refresh(project_file)
        return project_file

    def delete(
        self,
        db: Session,
        project_file: ProjectFile,
    ):
        db.delete(project_file)
        db.commit()