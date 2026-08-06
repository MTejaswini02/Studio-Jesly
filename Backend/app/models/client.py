from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.database.database import Base


class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    email = Column(String(120), unique=True, nullable=False)

    phone = Column(String(20), nullable=True)

    company = Column(String(100), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())