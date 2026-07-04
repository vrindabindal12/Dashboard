import { KPI, RevenueTrend, Product, Store, CustomerSegment, InventoryAlert, ForecastData, SalesByRegion, SalesByCategory } from "@/types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

export async function fetchKPIs(days: string = "30"): Promise<KPI> {
  const res = await fetch(`${API_URL}/dashboard/kpis?days=${days}`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch KPIs");
  return res.json();
}

export async function fetchInventoryAlerts(days: string = "30"): Promise<InventoryAlert[]> {
  const res = await fetch(`${API_URL}/dashboard/inventory-alerts?days=${days}`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch inventory alerts");
  return res.json();
}

export async function fetchForecast(): Promise<ForecastData[]> {
  const res = await fetch(`${API_URL}/analytics/forecast`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch forecast");
  return res.json();
}

export async function fetchInsights(): Promise<{insight: string}> {
  const res = await fetch(`${API_URL}/analytics/insights`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch insights");
  return res.json();
}

export async function fetchRevenueTrend(days: string = "30"): Promise<RevenueTrend[]> {
  const res = await fetch(`${API_URL}/dashboard/revenue-trend?days=${days}`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch revenue trend");
  return res.json();
}

export async function fetchSalesByRegion(): Promise<SalesByRegion[]> {
  const res = await fetch(`${API_URL}/dashboard/sales-by-region`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch sales by region");
  return res.json();
}

export async function fetchSalesByCategory(): Promise<SalesByCategory[]> {
  const res = await fetch(`${API_URL}/dashboard/sales-by-category`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch sales by category");
  return res.json();
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchStores(): Promise<Store[]> {
  const res = await fetch(`${API_URL}/stores`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch stores");
  return res.json();
}

export async function fetchCustomerSegments(): Promise<CustomerSegment[]> {
  const res = await fetch(`${API_URL}/customers/segments`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch customer segments");
  return res.json();
}
