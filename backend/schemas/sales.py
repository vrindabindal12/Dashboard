from pydantic import BaseModel
from datetime import date
from typing import Optional

class SaleBase(BaseModel):
    store: int
    date: date
    weekly_sales: float
    holiday_flag: bool
    temperature: float
    fuel_price: float
    cpi: float
    unemployment: float
    department: int
    region: str
    product_category: str

class SaleCreate(SaleBase):
    pass

class Sale(SaleBase):
    id: int

    class Config:
        from_attributes = True

class KPIDashboard(BaseModel):
    total_revenue: float
    total_profit: float
    total_orders: int
    average_order_value: float
    monthly_growth: float
    top_performing_store: str
