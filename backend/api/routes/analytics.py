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
