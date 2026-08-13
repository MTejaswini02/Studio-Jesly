from sqlalchemy.orm import Session

from app.models.portfolio import Portfolio
from app.models.project import Project
from app.models.service import Service


class PortfolioRepository:

    # =========================================
    # CREATE
    # =========================================

    def create(
        self,
        db: Session,
        portfolio: Portfolio,
    ):

        db.add(portfolio)
        db.commit()
        db.refresh(portfolio)

        return portfolio


    # =========================================
    # GET ALL
    # =========================================

    def get_all(
        self,
        db: Session,
    ):

        return (
            db.query(Portfolio)
            .all()
        )


    # =========================================
    # GET FEATURED
    # =========================================

    def get_featured(
        self,
        db: Session,
    ):

        return (
            db.query(Portfolio)
            .filter(
                Portfolio.is_featured == True
            )
            .all()
        )


    # =========================================
    # GET BY ID
    # =========================================

    def get_by_id(
        self,
        db: Session,
        portfolio_id: int,
    ):

        return (
            db.query(Portfolio)
            .filter(
                Portfolio.id == portfolio_id
            )
            .first()
        )


    # =========================================
    # GET BY PROJECT ID
    # =========================================

    def get_by_project_id(
        self,
        db: Session,
        project_id: int,
    ):

        return (
            db.query(Portfolio)
            .filter(
                Portfolio.project_id == project_id
            )
            .first()
        )


    # =========================================
    # GET BY SERVICE
    # =========================================

    def get_by_service(
        self,
        db: Session,
        service_id: int,
    ):

        return (
            db.query(Portfolio)
            .join(
                Project,
                Project.id == Portfolio.project_id,
            )
            .filter(
                Project.service_id == service_id
            )
            .all()
        )


    # =========================================
    # GET PORTFOLIO SERVICES
    # =========================================

    def get_portfolio_services(
        self,
        db: Session,
    ):

        return (
            db.query(
                Service.id,
                Service.name,
            )
            .join(
                Project,
                Project.service_id == Service.id,
            )
            .join(
                Portfolio,
                Portfolio.project_id == Project.id,
            )
            .distinct()
            .order_by(
                Service.name
            )
            .all()
        )


    # =========================================
    # UPDATE
    # =========================================

    def update(
        self,
        db: Session,
        portfolio: Portfolio,
    ):

        db.commit()
        db.refresh(portfolio)

        return portfolio


    # =========================================
    # DELETE
    # =========================================

    def delete(
        self,
        db: Session,
        portfolio: Portfolio,
    ):

        db.delete(portfolio)
        db.commit()