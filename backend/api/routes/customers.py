from fastapi import APIRouter

router = APIRouter()

@router.get("/segments")
def get_customer_segments():
    # Mocking customer cohort data since the Kaggle Walmart dataset lacks individual Customer IDs.
    # In a real-world scenario, this would be computed using RFM (Recency, Frequency, Monetary) analysis.
    return [
        {"name": "Champions", "value": 25, "description": "Bought recently, buy often, spend the most"},
        {"name": "Loyal Customers", "value": 35, "description": "Spend good money, responsive to promotions"},
        {"name": "New Customers", "value": 15, "description": "Made their first purchase recently"},
        {"name": "At Risk", "value": 15, "description": "Spent big money but haven't purchased recently"},
        {"name": "Lost", "value": 10, "description": "Lowest recency, frequency, and monetary scores"}
    ]
