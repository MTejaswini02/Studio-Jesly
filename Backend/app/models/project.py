from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Date,
    DateTime,
    ForeignKey
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    project_code = Column(String(20), unique=True, nullable=False)

    title = Column(String(150), nullable=False)

    description = Column(Text)

    client_id = Column(Integer, ForeignKey("clients.id"), nullable=False)

    service_id = Column(Integer, ForeignKey("services.id"), nullable=False)

    assigned_to = Column(Integer, ForeignKey("users.id"), nullable=False)

    status = Column(String(30), default="Pending")

    priority = Column(String(20), default="Medium")

    estimated_hours = Column(Integer)

    start_date = Column(Date)

    due_date = Column(Date)

    completed_at = Column(DateTime(timezone=True))

    notes = Column(Text)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    client = relationship("Client")

    service = relationship("Service")

    assigned_user = relationship("User")

    files = relationship(
        "ProjectFile",
        back_populates="project",
        cascade="all, delete-orphan"
    )

    activities = relationship(
        "ActivityLog",
        back_populates="project",
        cascade="all, delete-orphan"
    )

    portfolio = relationship(
        "Portfolio",
        back_populates="project",
        uselist=False,
        cascade="all, delete-orphan"
    )