from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.permissions import require_admin
from app.database.database import get_db
from app.schemas.portfolio_schema import (
    PortfolioCreate,
    PortfolioUpdate,
    PortfolioResponse,
)
from app.services.portfolio_service import PortfolioService


router = APIRouter(
    prefix="/portfolio",
    tags=["Portfolio"],
)

portfolio_service = PortfolioService()


@router.post(
    "/",
    response_model=PortfolioResponse,
    dependencies=[Depends(require_admin)],
)
def create_portfolio(
    portfolio: PortfolioCreate,
    db: Session = Depends(get_db),
):
    return portfolio_service.create_portfolio(
        db,
        portfolio,
    )


@router.get(
    "/",
    response_model=list[PortfolioResponse],
    dependencies=[Depends(require_admin)],
)
def get_portfolios(
    db: Session = Depends(get_db),
):
    return portfolio_service.get_portfolios(db)


@router.get(
    "/featured",
    response_model=list[PortfolioResponse],
)
def get_featured_portfolios(
    db: Session = Depends(get_db),
):
    return portfolio_service.get_featured_portfolios(db)


@router.get(
    "/{portfolio_id}",
    response_model=PortfolioResponse,
    dependencies=[Depends(require_admin)],
)
def get_portfolio(
    portfolio_id: int,
    db: Session = Depends(get_db),
):
    return portfolio_service.get_portfolio(
        db,
        portfolio_id,
    )


@router.put(
    "/{portfolio_id}",
    response_model=PortfolioResponse,
    dependencies=[Depends(require_admin)],
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


@router.delete(
    "/{portfolio_id}",
    dependencies=[Depends(require_admin)],
)
def delete_portfolio(
    portfolio_id: int,
    db: Session = Depends(get_db),
):
    return portfolio_service.delete_portfolio(
        db,
        portfolio_id,
    )