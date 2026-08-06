from fastapi import HTTPException


class UserNotFoundException(HTTPException):

    def __init__(self):
        super().__init__(
            status_code=404,
            detail="User not found"
        )


class EmailAlreadyExistsException(HTTPException):

    def __init__(self):
        super().__init__(
            status_code=400,
            detail="Email already exists"
        )


class InvalidCredentialsException(HTTPException):

    def __init__(self):
        super().__init__(
            status_code=401,
            detail="Invalid email or password"
        )

class ContactNotFoundException(HTTPException):

    def __init__(self):
        super().__init__(
            status_code=404,
            detail="Contact request not found"
        )