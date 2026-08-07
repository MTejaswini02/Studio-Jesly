from sqlalchemy.orm import Session

from app.models.activity_log import ActivityLog


class ActivityLogRepository:

    def create(
        self,
        db: Session,
        activity_log: ActivityLog,
    ):
        db.add(activity_log)
        db.commit()
        db.refresh(activity_log)
        return activity_log

    def get_all(self, db: Session):
        return db.query(ActivityLog).all()

    def get_by_id(
        self,
        db: Session,
        log_id: int,
    ):
        return (
            db.query(ActivityLog)
            .filter(ActivityLog.id == log_id)
            .first()
        )

    def get_by_project(
        self,
        db: Session,
        project_id: int,
    ):
        return (
            db.query(ActivityLog)
            .filter(ActivityLog.project_id == project_id)
            .all()
        )

    def get_by_user(
        self,
        db: Session,
        user_id: int,
    ):
        return (
            db.query(ActivityLog)
            .filter(ActivityLog.user_id == user_id)
            .all()
        )

    def update(
        self,
        db: Session,
        activity_log: ActivityLog,
    ):
        db.commit()
        db.refresh(activity_log)
        return activity_log

    def delete(
        self,
        db: Session,
        activity_log: ActivityLog,
    ):
        db.delete(activity_log)
        db.commit()