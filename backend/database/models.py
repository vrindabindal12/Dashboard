from sqlalchemy import Column, Integer, String, Float, Boolean, Date, ForeignKey
from .session import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

class Sale(Base):
    __tablename__ = "sales"
    
    id = Column(Integer, primary_key=True, index=True)
    store = Column(Integer, index=True)
    date = Column(Date, index=True)
    weekly_sales = Column(Float)
    holiday_flag = Column(Boolean)
    temperature = Column(Float)
    fuel_price = Column(Float)
    cpi = Column(Float)
    unemployment = Column(Float)
    
    # Optional extensions for a more realistic dashboard
    department = Column(Integer, index=True, default=1)
    region = Column(String, index=True, default="North")
    product_category = Column(String, index=True, default="General")
