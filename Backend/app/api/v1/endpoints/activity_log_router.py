from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.permissions import require_admin
from app.database.database import get_db
from app.schemas.activity_log_schema import (
    ActivityLogCreate,
    ActivityLogUpdate,
    ActivityLogResponse,
)
from app.services.activity_log_service import ActivityLogService


router = APIRouter(
    prefix="/activity-logs",
    tags=["Activity Logs"],
)

activity_log_service = ActivityLogService()


@router.post(
    "/",
    response_model=ActivityLogResponse,
    dependencies=[Depends(require_admin)],
)
def create_log(
    activity_log: ActivityLogCreate,
    db: Session = Depends(get_db),
):
    return activity_log_service.create_log(
        db,
        activity_log,
    )


@router.get(
    "/",
    response_model=list[ActivityLogResponse],
    dependencies=[Depends(require_admin)],
)
def get_logs(
    db: Session = Depends(get_db),
):
    return activity_log_service.get_logs(db)


@router.get(
    "/project/{project_id}",
    response_model=list[ActivityLogResponse],
    dependencies=[Depends(require_admin)],
)
def get_project_logs(
    project_id: int,
    db: Session = Depends(get_db),
):
    return activity_log_service.get_project_logs(
        db,
        project_id,
    )


@router.get(
    "/user/{user_id}",
    response_model=list[ActivityLogResponse],
    dependencies=[Depends(require_admin)],
)
def get_user_logs(
    user_id: int,
    db: Session = Depends(get_db),
):
    return activity_log_service.get_user_logs(
        db,
        user_id,
    )


@router.get(
    "/{log_id}",
    response_model=ActivityLogResponse,
    dependencies=[Depends(require_admin)],
)
def get_log(
    log_id: int,
    db: Session = Depends(get_db),
):
    return activity_log_service.get_log(
        db,
        log_id,
    )


@router.put(
    "/{log_id}",
    response_model=ActivityLogResponse,
    dependencies=[Depends(require_admin)],
)
def update_log(
    log_id: int,
    activity_log: ActivityLogUpdate,
    db: Session = Depends(get_db),
):
    return activity_log_service.update_log(
        db,
        log_id,
        activity_log,
    )


@router.delete(
    "/{log_id}",
    dependencies=[Depends(require_admin)],
)
def delete_log(
    log_id: int,
    db: Session = Depends(get_db),
):
    return activity_log_service.delete_log(
        db,
        log_id,
    )