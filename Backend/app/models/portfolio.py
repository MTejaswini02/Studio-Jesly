from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.database import Base


class Portfolio(Base):
    __tablename__ = "portfolio"

    id = Column(Integer, primary_key=True, index=True)

    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)

    title = Column(String(150), nullable=False)

    category = Column(String(100), nullable=False)

    description = Column(Text)

    thumbnail = Column(String(500))

    is_featured = Column(Boolean, default=False)

    published_at = Column(DateTime(timezone=True), server_default=func.now())

    project = relationship("Project", back_populates="portfolio")