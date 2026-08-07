from sqlalchemy.orm import Session

from app.models.activity_log import ActivityLog
from app.repositories.activity_log_repository import (
    ActivityLogRepository,
)
from app.schemas.activity_log_schema import (
    ActivityLogCreate,
    ActivityLogUpdate,
)
from app.exceptions.exceptions import (
    ActivityLogNotFoundException,
)


class ActivityLogService:

    def __init__(self):
        self.repository = ActivityLogRepository()

    def create_log(
        self,
        db: Session,
        log_data: ActivityLogCreate,
    ):

        activity_log = ActivityLog(
            project_id=log_data.project_id,
            user_id=log_data.user_id,
            activity=log_data.activity,
        )

        return self.repository.create(
            db,
            activity_log,
        )

    def get_logs(self, db: Session):
        return self.repository.get_all(db)

    def get_project_logs(
        self,
        db: Session,
        project_id: int,
    ):
        return self.repository.get_by_project(
            db,
            project_id,
        )

    def get_user_logs(
        self,
        db: Session,
        user_id: int,
    ):
        return self.repository.get_by_user(
            db,
            user_id,
        )

    def get_log(
        self,
        db: Session,
        log_id: int,
    ):

        activity_log = self.repository.get_by_id(
            db,
            log_id,
        )

        if not activity_log:
            raise ActivityLogNotFoundException()

        return activity_log

    def update_log(
        self,
        db: Session,
        log_id: int,
        log_data: ActivityLogUpdate,
    ):

        activity_log = self.repository.get_by_id(
            db,
            log_id,
        )

        if not activity_log:
            raise ActivityLogNotFoundException()

        update_data = log_data.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(activity_log, key, value)

        return self.repository.update(
            db,
            activity_log,
        )

    def delete_log(
        self,
        db: Session,
        log_id: int,
    ):

        activity_log = self.repository.get_by_id(
            db,
            log_id,
        )

        if not activity_log:
            raise ActivityLogNotFoundException()

        self.repository.delete(
            db,
            activity_log,
        )

        return {
            "message": "Activity log deleted successfully"
        }