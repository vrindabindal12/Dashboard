export interface KPI {
  total_revenue: number;
  total_profit: number;
  total_orders: number;
  average_order_value: number;
  monthly_growth: number;
  top_performing_store: string;
}

export interface RevenueTrend {
  date: string;
  revenue: number;
}

export interface Product {
  id: number;
  name: string;
  revenue: number;
  units_sold: number;
  profit: number;
  growth_pct: number;
  ranking: number;
}

export interface Store {
  id: number;
  name: string;
  performance: "Excellent" | "Good" | "Average";
  revenue: number;
  profit: number;
  customer_count: number;
  monthly_growth: number;
}

export interface CustomerSegment {
  name: string;
  value: number;
  description: string;
}

export interface InventoryAlert {
  id: number;
  store: string;
  category: string;
  message: string;
  severity: "critical" | "high" | "medium";
}

export interface ForecastData {
  date: string;
  historical: number | null;
  forecast: number | null;
  forecast_lower?: number | null;
  forecast_upper?: number | null;
}

export interface SalesByRegion {
  name: string;
  sales: number;
}

export interface SalesByCategory {
  name: string;
  sales: number;
}
