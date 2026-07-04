import os
import sys
import pandas as pd
import sqlite3
import joblib
from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

# Ensure we can import from the backend directory
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "sql_app.db")
MODEL_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "ml")
MODEL_PATH = os.path.join(MODEL_DIR, "forecast_model.pkl")

def load_data():
    print(f"Loading data from {DB_PATH}...")
    conn = sqlite3.connect(DB_PATH)
    
    # We aggregate sales by date to forecast overall platform revenue
    query = """
    SELECT 
        date,
        SUM(weekly_sales) as total_revenue,
        MAX(holiday_flag) as holiday_flag,
        AVG(temperature) as temperature,
        AVG(fuel_price) as fuel_price,
        AVG(cpi) as cpi,
        AVG(unemployment) as unemployment
    FROM sales
    GROUP BY date
    ORDER BY date ASC
    """
    df = pd.read_sql_query(query, conn)
    conn.close()
    
    # Feature Engineering
    df['date'] = pd.to_datetime(df['date'])
    df['month'] = df['date'].dt.month
    df['week_of_year'] = df['date'].dt.isocalendar().week.astype(int)
    
    # Drop date as it's not a direct numeric feature for XGBoost
    # Keep it in a separate series for reference if needed
    dates = df['date']
    df = df.drop(columns=['date'])
    
    return df, dates

def train():
    df, dates = load_data()
    print(f"Dataset shape: {df.shape}")
    
    if len(df) < 50:
        print("Not enough data to train a meaningful model. Seed more data.")
        return
        
    # Define features (X) and target (y)
    X = df.drop(columns=['total_revenue'])
    y = df['total_revenue']
    
    # Split into train/test
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)
    
    print("Training XGBoost Regressor...")
    model = XGBRegressor(
        n_estimators=100,
        learning_rate=0.1,
        max_depth=5,
        random_state=42,
        objective='reg:squarederror'
    )
    
    model.fit(X_train, y_train)
    
    # Evaluate
    predictions = model.predict(X_test)
    mae = mean_absolute_error(y_test, predictions)
    r2 = r2_score(y_test, predictions)
    
    print(f"Model Evaluation -> MAE: ${mae:,.2f} | R-squared: {r2:.4f}")
    
    # Save model
    if not os.path.exists(MODEL_DIR):
        os.makedirs(MODEL_DIR)
        
    joblib.dump(model, MODEL_PATH)
    print(f"Model saved to {MODEL_PATH}")

if __name__ == "__main__":
    train()
