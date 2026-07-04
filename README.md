# RetailOps Analytics Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.10%2B-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-green)

A full-stack, enterprise-grade retail analytics platform built to process and visualize large-scale transaction data. This project demonstrates end-to-end data engineering, API development, and modern UI/UX design.

## 🚀 Key Features

- **High-Performance Data Aggregation:** Backend engineered with FastAPI and SQLAlchemy, utilizing native SQL aggregation functions (`SUM`, `COUNT`, `GROUP BY`) to process thousands of transaction records in milliseconds—eliminating O(N) memory bottlenecks.
- **Modern Next.js 15 Architecture:** Built using the Next.js App Router, heavily utilizing **React Server Components (RSC)** and **Suspense** to fetch data on the server with zero client-side fetching overhead.
- **Enterprise UI/UX:** Designed with a custom OLED "Midnight Blue & Indigo" theme using Tailwind CSS v4 and `shadcn/ui`. Features dynamic micro-animations, skeleton loaders, and a responsive layout.
- **Interactive Visualizations:** Integrated with Recharts for dynamic area charts and real-time KPI trend analysis.
- **Strictly Typed:** End-to-end TypeScript interfaces ensure perfect API contract adherence and robust error handling via centralized Next.js Error Boundaries.

## 🛠️ Tech Stack

### Frontend
* **Framework:** Next.js 15 (App Router, Server Components)
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4, custom CSS variables
* **Component Library:** shadcn/ui, Lucide Icons
* **Data Visualization:** Recharts
* **Fonts:** Plus Jakarta Sans

### Backend
* **Framework:** FastAPI
* **Language:** Python 3.10+
* **ORM:** SQLAlchemy
* **Database:** SQLite (Development) / PostgreSQL (Production ready)
* **Data Seed:** Synthetically generated 5,000+ row dataset mimicking Walmart's Kaggle Sales Data

---

## 💻 Local Development Setup

To run this project locally, you will need to start both the backend API server and the frontend Next.js server.

### 1. Backend (FastAPI)

Navigate to the backend directory and set up a virtual environment:

```bash
cd backend
python -m venv venv

# Activate the virtual environment
# On Windows:
.\venv\Scripts\Activate.ps1
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the API server
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```
*The interactive Swagger API documentation will be available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).*

### 2. Frontend (Next.js)

Open a new terminal window, navigate to the frontend directory, and install dependencies:

```bash
cd frontend

# Install Node modules
npm install

# Start the development server
npm run dev
```
*The web application will be available at [http://localhost:3000](http://localhost:3000).*

---

## 📈 Architecture Overview

The system is designed with a strict decoupling between the presentation layer and the data layer:
1. **The Database Engine** handles all heavy lifting, computing revenue, margins, and customer counts dynamically.
2. **The FastAPI Backend** serves as a lightweight, lightning-fast router validating requests via Pydantic models.
3. **The Next.js Frontend** acts purely as a server-side renderer, fetching the pre-computed data and streaming the hydrated HTML directly to the client.

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
