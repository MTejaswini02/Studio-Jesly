import os

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from fastapi.responses import FileResponse

from sqlalchemy.orm import Session

from app.core.permissions import require_admin

from app.database.database import get_db

from app.models.project_file import ProjectFile

from app.schemas.portfolio_schema import (
    PortfolioCreate,
    PortfolioUpdate,
    PortfolioResponse,
)

from app.services.portfolio_service import (
    PortfolioService,
)


router = APIRouter(
    prefix="/portfolio",
    tags=["Portfolio"],
)


portfolio_service = PortfolioService()


# =========================================
# ADMIN - CREATE PORTFOLIO
# =========================================

@router.post(
    "/",
    response_model=PortfolioResponse,
    dependencies=[
        Depends(require_admin)
    ],
)
def create_portfolio(
    portfolio: PortfolioCreate,
    db: Session = Depends(get_db),
):

    return portfolio_service.create_portfolio(
        db,
        portfolio,
    )


# =========================================
# PUBLIC - GET ALL PORTFOLIO
# =========================================

@router.get(
    "/",
    response_model=list[PortfolioResponse],
)
def get_portfolios(
    db: Session = Depends(get_db),
):

    return portfolio_service.get_portfolios(
        db
    )


# =========================================
# PUBLIC - GET FEATURED PORTFOLIO
# =========================================

@router.get(
    "/featured",
    response_model=list[PortfolioResponse],
)
def get_featured_portfolios(
    db: Session = Depends(get_db),
):

    return portfolio_service.get_featured_portfolios(
        db
    )


# =========================================
# PUBLIC - GET SERVICES USED IN PORTFOLIO
# =========================================

@router.get(
    "/services",
)
def get_portfolio_services(
    db: Session = Depends(get_db),
):

    return portfolio_service.get_portfolio_services(
        db
    )


# =========================================
# PUBLIC - GET PORTFOLIO BY SERVICE
# =========================================

@router.get(
    "/service/{service_id}",
    response_model=list[PortfolioResponse],
)
def get_portfolios_by_service(
    service_id: int,
    db: Session = Depends(get_db),
):

    return portfolio_service.get_portfolios_by_service(
        db,
        service_id,
    )


# =========================================
# PUBLIC - VIEW PORTFOLIO PDF
# =========================================

@router.get(
    "/{portfolio_id}/view",
)
def view_portfolio(
    portfolio_id: int,
    db: Session = Depends(get_db),
):

    portfolio = portfolio_service.get_portfolio(
        db,
        portfolio_id,
    )


    project_file = (
        db.query(ProjectFile)
        .filter(
            ProjectFile.project_id
            == portfolio.project_id,

            ProjectFile.file_path.ilike(
                "%.pdf"
            ),
        )
        .first()
    )


    if not project_file:

        raise HTTPException(
            status_code=404,
            detail="Portfolio PDF not found.",
        )


    if not os.path.isfile(
        project_file.file_path
    ):

        raise HTTPException(
            status_code=404,
            detail="Portfolio file not found on server.",
        )


    return FileResponse(
        path=project_file.file_path,

        media_type="application/pdf",

        headers={
            "Content-Disposition":
            "inline"
        },
    )


# =========================================
# ADMIN - GET SINGLE PORTFOLIO
# =========================================

@router.get(
    "/{portfolio_id}",
    response_model=PortfolioResponse,
    dependencies=[
        Depends(require_admin)
    ],
)
def get_portfolio(
    portfolio_id: int,
    db: Session = Depends(get_db),
):

    return portfolio_service.get_portfolio(
        db,
        portfolio_id,
    )


# =========================================
# ADMIN - UPDATE PORTFOLIO
# =========================================

@router.put(
    "/{portfolio_id}",
    response_model=PortfolioResponse,
    dependencies=[
        Depends(require_admin)
    ],
)
def update_portfolio(
    portfolio_id: int,
    portfolio: PortfolioUpdate,
    db: Session = Depends(get_db),
):

    return portfolio_service.update_portfolio(
        db,
        portfolio_id,
        portfolio,
    )


# =========================================
# ADMIN - DELETE PORTFOLIO
# =========================================

@router.delete(
    "/{portfolio_id}",
    dependencies=[
        Depends(require_admin)
    ],
)
def delete_portfolio(
    portfolio_id: int,
    db: Session = Depends(get_db),
):

    return portfolio_service.delete_portfolio(
        db,
        portfolio_id,
    )