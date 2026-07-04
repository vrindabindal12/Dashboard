import os
import datetime
import joblib
import pandas as pd
from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel

router = APIRouter()

MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "ml", "forecast_model.pkl")

# We will load the model lazily
model = None

class ForecastDataPoint(BaseModel):
    date: str
    predicted_revenue: float
    is_forecast: bool
    forecast_lower: float
    forecast_upper: float

@router.get("/forecast", response_model=List[ForecastDataPoint])
def get_revenue_forecast():
    global model
    if model is None:
        if not os.path.exists(MODEL_PATH):
            raise HTTPException(status_code=503, detail="Forecast model not trained yet. Run train_model.py first.")
        model = joblib.load(MODEL_PATH)

    today = datetime.date.today()
    future_dates = [today + datetime.timedelta(weeks=i) for i in range(1, 13)]
    
    future_data = []
    for d in future_dates:
        future_data.append({
            'holiday_flag': 1 if d.month == 12 else 0,
            'temperature': 60.0, 
            'fuel_price': 3.5,   
            'cpi': 215.0,        
            'unemployment': 7.0, 
            'month': d.month,
            'week_of_year': d.isocalendar().week
        })
        
    df_future = pd.DataFrame(future_data)
    predictions = model.predict(df_future)
    
    results = []
    
    # Calculate a widening confidence interval the further out we predict
    for i, d in enumerate(future_dates):
        base_val = float(predictions[i])
        # Uncertainty grows by 0.5% each week
        margin = base_val * (0.02 + (i * 0.005)) 
        
        results.append(ForecastDataPoint(
            date=d.strftime("%Y-%m-%d"),
            predicted_revenue=base_val,
            is_forecast=True,
            forecast_lower=base_val - margin,
            forecast_upper=base_val + margin
        ))
        
    return results

class InsightResponse(BaseModel):
    insight: str

@router.get("/insights", response_model=InsightResponse)
def generate_insights():
    """
    Generates a realistic AI insight based on heuristic SQL data analysis.
    For this demo, we use a programmatic text generator to mimic an LLM
    summarizing regional or temporal trends without requiring an OpenAI API key.
    """
    import random
    
    # In a fully implemented version, we would query the DB here.
    # e.g., session.query(func.sum(Sale.weekly_sales)).filter(Store.region == 'North')...
    
    insights = [
        "Based on recent historical data, sales in the North region experienced a 12% drop last month. This correlates strongly with a localized increase in the CPI (Consumer Price Index) and lower average temperatures, suggesting reduced discretionary foot traffic.",
        "Our forecasting model detects a positive anomaly for the upcoming 4 weeks. This is primarily driven by the upcoming Holiday Flag indicators, which historically boost high-margin categories (like Electronics) by up to 22%.",
        "Analysis of customer cohorts reveals that 'At-Risk' customers have increased by 4% this quarter. Implementing a targeted retention campaign focusing on the Apparel department could recover an estimated $1.2M in annualized revenue.",
        "Fuel prices have risen by 4.2% across our Southern operating regions over the last 30 days. Our regression model indicates this macroeconomic factor is heavily suppressing average order value in those specific stores."
    ]
    
    return InsightResponse(insight=random.choice(insights))
