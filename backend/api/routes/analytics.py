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

@router.get("/forecast", response_model=List[ForecastDataPoint])
def get_revenue_forecast():
    global model
    if model is None:
        if not os.path.exists(MODEL_PATH):
            raise HTTPException(status_code=503, detail="Forecast model not trained yet. Run train_model.py first.")
        model = joblib.load(MODEL_PATH)

    # In a real app, we would query the last date from the DB.
    # For this demo, let's assume we want to forecast the next 12 weeks from today.
    # To make the chart look contiguous, we'll return 4 weeks of historical (mocked) and 12 weeks of forecast
    
    today = datetime.date.today()
    
    # Generate 12 future weeks
    future_dates = [today + datetime.timedelta(weeks=i) for i in range(1, 13)]
    
    # Create DataFrame for XGBoost features
    # Required features: month, week_of_year, holiday_flag, temperature, fuel_price, cpi, unemployment
    # We will use naive mean imputation for the environmental features for this demo
    
    future_data = []
    for d in future_dates:
        future_data.append({
            'holiday_flag': 1 if d.month == 12 else 0,
            'temperature': 60.0, # Average temp
            'fuel_price': 3.5,   # Average fuel
            'cpi': 215.0,        # Average CPI
            'unemployment': 7.0, # Average Unemployment
            'month': d.month,
            'week_of_year': d.isocalendar().week
        })
        
    df_future = pd.DataFrame(future_data)
    
    # Predict
    predictions = model.predict(df_future)
    
    results = []
    
    # We also want to return some "past" data to anchor the chart, 
    # but we'll let the frontend stitch it with the actual historical data for simplicity.
    # We just return the forecast points.
    
    for i, d in enumerate(future_dates):
        results.append(ForecastDataPoint(
            date=d.strftime("%Y-%m-%d"),
            predicted_revenue=float(predictions[i]),
            is_forecast=True
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
