from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from datetime import date, timedelta
from database.session import get_db
from database.models import Sale
from schemas.sales import KPIDashboard

router = APIRouter()

@router.get("/kpis", response_model=KPIDashboard)
def get_kpis(
    days: Optional[int] = None,
    store: Optional[int] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Sale)
    
    start_date = None
    if days:
        max_date = db.query(func.max(Sale.date)).scalar()
        if max_date:
            start_date = max_date - timedelta(days=days)
            
    if start_date:
        query = query.filter(Sale.date >= start_date)
    if store:
        query = query.filter(Sale.store == store)
        
    aggregates = db.query(
        func.sum(Sale.weekly_sales).label('total_revenue'),
        func.count(Sale.id).label('total_orders'),
        func.sum(Sale.weekly_sales * 0.20).label('total_profit')
    )
    
    if start_date:
        aggregates = aggregates.filter(Sale.date >= start_date)
    if store:
        aggregates = aggregates.filter(Sale.store == store)
        
    result = aggregates.first()
    
    total_revenue = result.total_revenue or 0.0
    total_orders = result.total_orders or 0
    total_profit = result.total_profit or 0.0
    aov = total_revenue / total_orders if total_orders > 0 else 0.0
    
    top_store_query = db.query(
        Sale.store,
        func.sum(Sale.weekly_sales).label('total_sales')
    ).group_by(Sale.store).order_by(func.sum(Sale.weekly_sales).desc())
    
    if start_date:
        top_store_query = top_store_query.filter(Sale.date >= start_date)
        
    top_store_result = top_store_query.first()
    top_store = top_store_result.store if top_store_result else "N/A"
    
    return KPIDashboard(
        total_revenue=total_revenue,
        total_profit=total_profit,
        total_orders=total_orders,
        average_order_value=aov,
        monthly_growth=5.2, 
        top_performing_store=f"Store {top_store}"
    )

@router.get("/revenue-trend")
def get_revenue_trend(days: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(Sale.date, func.sum(Sale.weekly_sales).label("total_sales"))
    if days:
        max_date = db.query(func.max(Sale.date)).scalar()
        if max_date:
            start_date = max_date - timedelta(days=days)
            query = query.filter(Sale.date >= start_date)
            
    results = query.group_by(Sale.date).order_by(Sale.date).all()
    return [{"date": str(r[0]), "revenue": r[1]} for r in results]

@router.get("/sales-by-region")
def get_sales_by_region(db: Session = Depends(get_db)):
    results = db.query(Sale.region, func.sum(Sale.weekly_sales).label("total_sales")).group_by(Sale.region).all()
    return [{"region": r[0], "sales": r[1]} for r in results]

@router.get("/sales-by-category")
def get_sales_by_category(db: Session = Depends(get_db)):
    results = db.query(Sale.product_category, func.sum(Sale.weekly_sales).label("total_sales")).group_by(Sale.product_category).all()
    return [{"category": r[0], "sales": r[1]} for r in results]

@router.get("/holiday-sales")
def get_holiday_sales(db: Session = Depends(get_db)):
    results = db.query(Sale.holiday_flag, func.sum(Sale.weekly_sales).label("total_sales")).group_by(Sale.holiday_flag).all()
    return [{"type": "Holiday" if r[0] else "Non-Holiday", "sales": r[1]} for r in results]

@router.get("/inventory-alerts")
def get_inventory_alerts(days: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(
        Sale.store,
        Sale.product_category,
        func.sum(Sale.weekly_sales).label("total_sales")
    )
    
    if days:
        max_date = db.query(func.max(Sale.date)).scalar()
        if max_date:
            start_date = max_date - timedelta(days=days)
            query = query.filter(Sale.date >= start_date)
            
    top_selling = query.group_by(Sale.store, Sale.product_category).order_by(func.sum(Sale.weekly_sales).desc()).limit(4).all()
    
    alerts = []
    severities = ["critical", "high", "medium", "medium"]
    
    for i, r in enumerate(top_selling):
        store = r[0]
        category = r[1]
        sales = r[2]
        
        alerts.append({
            "id": i,
            "store": f"Store {store}",
            "category": category,
            "message": f"Restock {category} in Store {store} next week. Demand surged to ${sales:,.0f}.",
            "severity": severities[i] if i < len(severities) else "medium"
        })
        
    return alerts

