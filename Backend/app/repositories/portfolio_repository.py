from sqlalchemy.orm import Session

from app.models.portfolio import Portfolio


class PortfolioRepository:

    def create(self, db: Session, portfolio: Portfolio):
        db.add(portfolio)
        db.commit()
        db.refresh(portfolio)
        return portfolio

    def get_all(self, db: Session):
        return db.query(Portfolio).all()

    def get_featured(self, db: Session):
        return (
            db.query(Portfolio)
            .filter(Portfolio.is_featured == True)
            .all()
        )

    def get_by_id(self, db: Session, portfolio_id: int):
        return (
            db.query(Portfolio)
            .filter(Portfolio.id == portfolio_id)
            .first()
        )

    def get_by_project_id(self, db: Session, project_id: int):
        return (
            db.query(Portfolio)
            .filter(Portfolio.project_id == project_id)
            .first()
        )

    def update(self, db: Session, portfolio: Portfolio):
        db.commit()
        db.refresh(portfolio)
        return portfolio

    def delete(self, db: Session, portfolio: Portfolio):
        db.delete(portfolio)
        db.commit()