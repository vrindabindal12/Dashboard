import { DollarSign, ShoppingCart, Store, TrendingUp } from "lucide-react";
import { KPICard } from "@/components/dashboard/kpi-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { InventoryAlertsList } from "@/components/dashboard/inventory-alerts";
import { fetchKPIs, fetchRevenueTrend, fetchInventoryAlerts } from "@/lib/api";

export default async function DashboardPage() {
  const [kpis, trendData, inventoryAlerts] = await Promise.all([
    fetchKPIs(),
    fetchRevenueTrend(),
    fetchInventoryAlerts()
  ]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground mt-1">
          Welcome back. Here's what's happening with your stores today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard 
          title="Total Revenue"
          value={`$${(kpis.total_revenue / 1000000).toFixed(2)}M`}
          icon={DollarSign}
          trend="up"
          trendValue="+12.5%"
          description="vs last month"
        />
        <KPICard 
          title="Total Profit"
          value={`$${(kpis.total_profit / 1000000).toFixed(2)}M`}
          icon={TrendingUp}
          trend="up"
          trendValue="+8.2%"
          description="vs last month"
        />
        <KPICard 
          title="Total Orders"
          value={kpis.total_orders.toLocaleString()}
          icon={ShoppingCart}
          trend="down"
          trendValue="-2.1%"
          description="vs last month"
        />
        <KPICard 
          title="Top Store"
          value={kpis.top_performing_store}
          icon={Store}
          description="Highest volume location"
        />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <RevenueChart data={trendData} />
        </div>
        <div className="lg:col-span-3">
          <InventoryAlertsList alerts={inventoryAlerts} />
        </div>
      </div>
    </div>
  );
}
