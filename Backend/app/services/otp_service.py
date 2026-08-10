from datetime import datetime, timedelta, timezone
import hashlib
import secrets

from sqlalchemy.orm import Session

from app.models.signup_verification import SignupVerification
from app.services.email_service import send_otp_email


OTP_EXPIRY_MINUTES = 5
MAX_OTP_ATTEMPTS = 5


def generate_otp() -> str:
    """
    Generate a secure 6-digit OTP.
    """
    return f"{secrets.randbelow(1_000_000):06d}"


def hash_otp(otp: str) -> str:
    """
    Hash the OTP before storing it in the database.
    """
    return hashlib.sha256(
        otp.encode("utf-8")
    ).hexdigest()


def create_signup_verification(
    db: Session,
    email: str,
    full_name: str,
    password_hash: str | None = None,
):
    """
    Create a temporary signup verification record
    and send the OTP to the user's email.
    """

    email = email.lower()

    # Remove any previous pending verification
    # for this email.
    db.query(SignupVerification).filter(
        SignupVerification.email == email
    ).delete(
        synchronize_session=False
    )

    otp = generate_otp()

    otp_hash = hash_otp(otp)

    expires_at = (
        datetime.now(timezone.utc)
        + timedelta(
            minutes=OTP_EXPIRY_MINUTES
        )
    )

    verification = SignupVerification(
        email=email,
        full_name=full_name,
        password_hash=password_hash,
        otp_hash=otp_hash,
        expires_at=expires_at,
        attempts=0,
    )

    db.add(verification)
    db.commit()
    db.refresh(verification)

    try:

        send_otp_email(
            recipient_email=email,
            otp=otp,
        )

    except Exception:

        # If email sending fails, remove the
        # temporary verification record.
        db.delete(verification)
        db.commit()

        raise

    return verification


def verify_signup_otp(
    db: Session,
    email: str,
    otp: str,
):
    """
    Verify the OTP entered by the user.
    """

    email = email.lower()

    verification = (
        db.query(SignupVerification)
        .filter(
            SignupVerification.email == email
        )
        .first()
    )

    if not verification:
        raise ValueError(
            "No pending signup verification found."
        )

    now = datetime.now(timezone.utc)

    # Check expiry
    if now > verification.expires_at:

        db.delete(verification)
        db.commit()

        raise ValueError(
            "OTP has expired. Please request a new OTP."
        )

    # Check attempts
    if verification.attempts >= MAX_OTP_ATTEMPTS:

        db.delete(verification)
        db.commit()

        raise ValueError(
            "Too many incorrect attempts. Please request a new OTP."
        )

    # Validate OTP
    if not secrets.compare_digest(
        hash_otp(otp),
        verification.otp_hash,
    ):

        verification.attempts += 1

        db.commit()

        raise ValueError(
            "Invalid OTP."
        )

    return verification


def delete_signup_verification(
    db: Session,
    verification: SignupVerification,
):
    """
    Remove a verification record after
    successful account creation.
    """

    db.delete(verification)
    db.commit()