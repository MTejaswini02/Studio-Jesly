from sqlalchemy.orm import Session

from app.models.activity_log import ActivityLog


def log_activity(
    db: Session,
    project_id: int,
    user_id: int,
    activity: str,
):
    """
    Creates an activity log entry.
    """

    activity_log = ActivityLog(
        project_id=project_id,
        user_id=user_id,
        activity=activity,
    )

    db.add(activity_log)
    db.commit()
    db.refresh(activity_log)