import smtplib
from email.message import EmailMessage

from app.core.config import settings


def send_otp_email(
    recipient_email: str,
    otp: str,
):
    message = EmailMessage()

    message["Subject"] = "Studio Jesly - Email Verification Code"
    message["From"] = settings.MAIL_FROM
    message["To"] = recipient_email

    message.set_content(
        f"""
Hello,

Thank you for signing up with Studio Jesly.

Your email verification code is:

{otp}

This code will expire in 5 minutes.

If you did not request this verification, you can safely ignore this email.

Regards,
Studio Jesly
"""
    )

    try:

        with smtplib.SMTP(
            settings.MAIL_SERVER,
            settings.MAIL_PORT,
        ) as server:

            server.starttls()

            server.login(
                settings.MAIL_USERNAME,
                settings.MAIL_PASSWORD,
            )

            server.send_message(message)

    except Exception as error:

        print(
            "Failed to send OTP email:",
            error
        )

        raise