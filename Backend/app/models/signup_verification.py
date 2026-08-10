from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.database.database import Base


class SignupVerification(Base):

    __tablename__ = "signup_verifications"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    email = Column(
        String(120),
        nullable=False,
        index=True
    )

    full_name = Column(
        String(100),
        nullable=False
    )

    # Password is already hashed before being stored here.
    # It remains here only until OTP verification succeeds.
    password_hash = Column(
        String(255),
        nullable=True
    )

    # We will store a hashed OTP, not the actual OTP.
    otp_hash = Column(
        String(255),
        nullable=False
    )

    expires_at = Column(
        DateTime(timezone=True),
        nullable=False
    )

    attempts = Column(
        Integer,
        nullable=False,
        default=0
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )