# 📊 RetailOps AI & Analytics Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.10%2B-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-green)
![Machine_Learning](https://img.shields.io/badge/ML-XGBoost-orange)
![SQL](https://img.shields.io/badge/Database-SQLite%2FPostgreSQL-blue)

A full-stack, enterprise-grade data platform demonstrating end-to-end **Machine Learning**, **Data Analytics**, and **Generative AI**. This project proves my ability to extract raw data, build predictive models, and deploy them into production web applications.

---

## 🎯 Executive Summary
Most junior analytics portfolios consist of static Jupyter Notebooks. **RetailOps Analytics** is different. It is a fully deployed production application that demonstrates my capability to act as a **Data Analyst**, **Machine Learning Engineer**, and **Data Engineer**.

By pushing heavy `SQL` aggregations down to the database layer, training an `XGBoost` regression model for forecasting, and engineering a simulated Generative AI engine for business intelligence, this platform solves real-world enterprise data challenges.

---

## 🚀 Core Competencies Demonstrated

### 1. Machine Learning & Predictive Analytics (Python, XGBoost, Pandas)
I built a full production Machine Learning pipeline. The backend uses `pandas` to extract temporal features (e.g., week of year, holidays, macroeconomic indicators like CPI and fuel prices) from raw data. It then trains an optimized **XGBoost regressor** to forecast the next 12 weeks of revenue, serialized via `joblib`, and served instantly through a FastAPI REST endpoint.

### 2. Generative AI & Natural Language Processing
To bridge the gap between raw data and actionable business intelligence, I engineered a programmatic GenAI Insights Engine. It analyzes the SQL database for statistical anomalies (regional drops, holiday spikes) and dynamically streams conversational, ChatGPT-style insights directly to the frontend interface.

### 3. Prescriptive Analytics (Inventory Alerts)
Moving beyond *descriptive* analytics (what happened), I implemented *prescriptive* analytics (what we should do). By writing complex SQL aggregations to identify surging demand across stores and product categories, the dashboard automatically recommends inventory restocks to prevent stockouts.

### 4. Advanced SQL & Data Aggregation
The primary engineering feat of this project is the strictly optimized **SQL** data layer. Instead of pulling raw data into memory (which causes the classic `O(N)` memory leak), all computations are executed within the database engine using `SQLAlchemy`.
- Computes Total Revenue, Profit Margins, and Average Order Value dynamically using native SQL `SUM()`, `COUNT()`, and `GROUP BY`.

### 5. Full-Stack Data Engineering (FastAPI & Next.js)
Unlike traditional Tableau or PowerBI dashboards which abstract away the engineering, this platform proves full-stack data proficiency. 
- **Backend:** Built a high-performance REST API with **Python** and **FastAPI**.
- **Frontend:** Built with **Next.js 15** and **React Server Components (RSC)** to guarantee zero client-side data fetching overhead, visualized dynamically with **Recharts**.

---

## 🏗️ System Architecture & Data Flow

If you are a hiring manager or senior engineer reviewing this architecture, here is the exact data flow:

```mermaid
flowchart TD
    A[Kaggle Dataset] --> B[Data Cleaning <br/>Pandas]
    B --> C[(PostgreSQL Database)]
    C --> D[SQL + EDA + Power BI Dashboard]
    D --> E[Train XGBoost Model <br/>.pkl]
    E --> F[FastAPI Backend]
    F --> G["/predict endpoint"]
    G --> H[React / Next.js Frontend]
    H --> I((Render + Vercel))
    
    classDef default fill:#f9f9f9,stroke:#333,stroke-width:2px;
    classDef db fill:#e1f5fe,stroke:#0288d1;
    classDef deploy fill:#e8f5e9,stroke:#388e3c;
    class C db;
    class I deploy;
```

---

## 💻 Local Development Setup

To test my skills and run this project locally, you must start both the backend API server and the frontend Next.js server.

### 1. Backend (FastAPI & Machine Learning)
Navigate to the backend directory and set up a virtual environment:

```bash
cd backend
python -m venv venv

# Activate the virtual environment
# On Windows:
.\venv\Scripts\Activate.ps1
# On macOS/Linux:
source venv/bin/activate

# Install Data Science & Web dependencies
pip install -r requirements.txt
pip install pandas scikit-learn xgboost joblib

# Run the API server
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```
The interactive Swagger API documentation will be available at `http://127.0.0.1:8000/docs`.

### 2. Frontend (Next.js Dashboard)
Open a new terminal window, navigate to the frontend directory, and start the development server:

```bash
cd frontend

# Install Node modules
npm install

# Start the development server
npm run dev
```
The web application will be available at `http://localhost:3000`.

---

## 📜 License
This project is open-source and available under the MIT License.
