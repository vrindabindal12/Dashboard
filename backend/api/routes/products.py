from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from database.session import get_db
from database.models import Sale

router = APIRouter()

@router.get("/")
def get_products(db: Session = Depends(get_db)):
    # Group by product category to simulate products page data
    results = db.query(
        Sale.product_category.label("name"),
        func.sum(Sale.weekly_sales).label("revenue"),
        func.count(Sale.id).label("units_sold"),
        func.sum(Sale.weekly_sales * 0.2).label("profit")
    ).group_by(Sale.product_category).order_by(func.sum(Sale.weekly_sales).desc()).all()
    
    products = []
    for i, r in enumerate(results):
        products.append({
            "id": i + 1,
            "name": r.name,
            "revenue": r.revenue or 0,
            "units_sold": r.units_sold or 0,
            "profit": r.profit or 0,
            "growth_pct": round((i + 1) * 2.5, 1), # Mock growth
            "ranking": i + 1
        })
        
    return products

