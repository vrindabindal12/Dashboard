from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from database.session import get_db
from database.models import Sale

router = APIRouter()

@router.get("/")
def get_stores(db: Session = Depends(get_db)):
    results = db.query(
        Sale.store.label("id"),
        func.sum(Sale.weekly_sales).label("revenue"),
        (func.count(Sale.id) * 15).label("customer_count"), # Mocking transactions as customers directly in SQL
        func.sum(Sale.weekly_sales * 0.18).label("profit")
    ).group_by(Sale.store).order_by(func.sum(Sale.weekly_sales).desc()).all()
    
    stores = []
    for r in results:
        revenue = r.revenue or 0
        stores.append({
            "id": r.id,
            "name": f"Store {r.id}",
            "performance": "Excellent" if revenue > 3000000 else "Good" if revenue > 1500000 else "Average",
            "revenue": revenue,
            "profit": r.profit or 0,
            "customer_count": r.customer_count or 0,
            "monthly_growth": round((r.id % 5) + 1.2, 1) # Mock growth
        })
        
    return stores

