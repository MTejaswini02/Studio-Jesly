from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.database.database import Base


class ContactRequest(Base):
    __tablename__ = "contact_requests"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    email = Column(String(120), nullable=False)

    project_type = Column(String(100), nullable=False)

    message = Column(Text, nullable=False)

    status = Column(String(30), default="Pending")

    created_at = Column(DateTime(timezone=True), server_default=func.now())