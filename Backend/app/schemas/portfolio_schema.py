from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class PortfolioBase(BaseModel):
    project_id: int

    title: str

    category: str

    description: Optional[str] = None

    thumbnail: Optional[str] = None

    is_featured: bool = False


class PortfolioCreate(PortfolioBase):
    pass


class PortfolioUpdate(BaseModel):
    title: Optional[str] = None

    category: Optional[str] = None

    description: Optional[str] = None

    thumbnail: Optional[str] = None

    is_featured: Optional[bool] = None


class PortfolioResponse(PortfolioBase):
    id: int

    published_at: datetime

    model_config = ConfigDict(from_attributes=True)