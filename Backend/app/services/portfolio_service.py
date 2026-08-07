from sqlalchemy.orm import Session

from app.models.portfolio import Portfolio
from app.repositories.portfolio_repository import PortfolioRepository
from app.schemas.portfolio_schema import (
    PortfolioCreate,
    PortfolioUpdate,
)
from app.exceptions.exceptions import (
    PortfolioNotFoundException,
    PortfolioAlreadyExistsException,
)


class PortfolioService:

    def __init__(self):
        self.repository = PortfolioRepository()

    def create_portfolio(
        self,
        db: Session,
        portfolio_data: PortfolioCreate,
    ):

        existing_portfolio = self.repository.get_by_project_id(
            db,
            portfolio_data.project_id,
        )

        if existing_portfolio:
            raise PortfolioAlreadyExistsException()

        portfolio = Portfolio(
            project_id=portfolio_data.project_id,
            title=portfolio_data.title,
            category=portfolio_data.category,
            description=portfolio_data.description,
            thumbnail=portfolio_data.thumbnail,
            is_featured=portfolio_data.is_featured,
        )

        return self.repository.create(db, portfolio)

    def get_portfolios(self, db: Session):
        return self.repository.get_all(db)

    def get_featured_portfolios(self, db: Session):
        return self.repository.get_featured(db)

    def get_portfolio(
        self,
        db: Session,
        portfolio_id: int,
    ):

        portfolio = self.repository.get_by_id(
            db,
            portfolio_id,
        )

        if not portfolio:
            raise PortfolioNotFoundException()

        return portfolio

    def update_portfolio(
        self,
        db: Session,
        portfolio_id: int,
        portfolio_data: PortfolioUpdate,
    ):

        portfolio = self.repository.get_by_id(
            db,
            portfolio_id,
        )

        if not portfolio:
            raise PortfolioNotFoundException()

        update_data = portfolio_data.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(portfolio, key, value)

        return self.repository.update(db, portfolio)

    def delete_portfolio(
        self,
        db: Session,
        portfolio_id: int,
    ):

        portfolio = self.repository.get_by_id(
            db,
            portfolio_id,
        )

        if not portfolio:
            raise PortfolioNotFoundException()

        self.repository.delete(db, portfolio)

        return {
            "message": "Portfolio deleted successfully"
        }