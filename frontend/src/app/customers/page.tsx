import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, UserPlus, Heart, RefreshCw } from "lucide-react";
import { KPICard } from "@/components/dashboard/kpi-card";
import { CustomerSegmentsChart } from "@/components/dashboard/customer-segments-chart";
import { fetchCustomerSegments } from "@/lib/api";

export default async function CustomersPage() {
  const segments = await fetchCustomerSegments();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Customer Analytics</h2>
        <p className="text-muted-foreground mt-1">Deep dive into customer retention and behavior.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard 
          title="Total Customers"
          value="1.2M"
          icon={Users}
          trend="up"
          trendValue="+14%"
          description="vs last year"
        />
        <KPICard 
          title="New Customers"
          value="45.2k"
          icon={UserPlus}
          trend="up"
          trendValue="+2.4%"
          description="vs last month"
        />
        <KPICard 
          title="Customer LTV"
          value="$1,240"
          icon={Heart}
          trend="up"
          trendValue="+5.1%"
          description="Lifetime value"
        />
        <KPICard 
          title="Retention Rate"
          value="68.5%"
          icon={RefreshCw}
          trend="down"
          trendValue="-1.2%"
          description="30-day retention"
        />
      </div>

      <Card className="bg-card border-border shadow-sm">
        <CardHeader>
          <CardTitle>Customer Segments</CardTitle>
          <CardDescription>Breakdown by purchasing behavior</CardDescription>
        </CardHeader>
        <CardContent>
          <CustomerSegmentsChart data={segments} />
        </CardContent>
      </Card>
    </div>
  );
}
