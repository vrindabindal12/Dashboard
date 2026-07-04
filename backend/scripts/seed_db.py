import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pandas as pd
import numpy as np
from database.session import engine, Base
from database.models import User, Sale
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import random

# Create tables
Base.metadata.create_all(bind=engine)

def seed_database():
    print("Seeding database...")
    with Session(engine) as session:
        # Check if already seeded
        if session.query(Sale).first():
            print("Database already seeded with sales data.")
            return

        # Create demo user
        demo_user = User(
            email="admin@retail.com",
            hashed_password="hashedpassword123", # For demo purposes
            is_active=True
        )
        session.add(demo_user)

        # Generate realistic data based on Walmart schema
        # We will generate 2 years of weekly data for 10 stores
        stores = range(1, 11)
        regions = ["North", "South", "East", "West", "Central"]
        categories = ["Electronics", "Clothing", "Groceries", "Home", "Toys"]
        
        start_date = datetime(2023, 1, 1)
        
        sales_records = []
        for store in stores:
            region = random.choice(regions)
            for week in range(104): # 2 years of weekly data
                current_date = start_date + timedelta(weeks=week)
                holiday_flag = week in [47, 51, 52] # Mock holidays
                
                for dept in range(1, 6):
                    category = categories[dept-1]
                    
                    # Base sales with some seasonality and random noise
                    base_sales = np.random.normal(50000, 10000)
                    if holiday_flag:
                        base_sales *= random.uniform(1.2, 1.8)
                    
                    weekly_sales = max(1000, base_sales) # Ensure positive
                    
                    # Assume profit margin between 10% and 30% for realistic dashboard
                    profit = weekly_sales * random.uniform(0.1, 0.3)
                    
                    sale = Sale(
                        store=store,
                        date=current_date.date(),
                        weekly_sales=weekly_sales,
                        holiday_flag=holiday_flag,
                        temperature=random.uniform(30.0, 90.0),
                        fuel_price=random.uniform(2.5, 4.0),
                        cpi=random.uniform(210.0, 225.0),
                        unemployment=random.uniform(4.0, 9.0),
                        department=dept,
                        region=region,
                        product_category=category
                    )
                    sales_records.append(sale)
                    
        session.bulk_save_objects(sales_records)
        session.commit()
        print(f"Successfully inserted {len(sales_records)} sales records.")

if __name__ == "__main__":
    seed_database()
