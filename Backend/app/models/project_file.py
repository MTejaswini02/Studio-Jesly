from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.database import Base


class ProjectFile(Base):
    __tablename__ = "project_files"

    id = Column(Integer, primary_key=True, index=True)

    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)

    file_name = Column(String(255), nullable=False)

    file_path = Column(String(500), nullable=False)

    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())

    project = relationship("Project", back_populates="files")