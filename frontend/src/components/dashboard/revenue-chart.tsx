"use client";

import { 
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface RevenueChartProps {
  data: { date: string; revenue: number }[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  // Format data
  const formattedData = data.map(item => ({
    ...item,
    formattedDate: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  return (
    <Card className="col-span-1 lg:col-span-4 bg-card border-border shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 ease-out">
      <CardHeader>
        <CardTitle className="tracking-tight">Revenue Trend</CardTitle>
        <CardDescription>Daily revenue performance over time</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--foreground))" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="hsl(var(--foreground))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="formattedDate" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              minTickGap={30}
              className="font-medium"
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              className="font-medium"
            />
            <Tooltip 
              cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1, strokeDasharray: '4 4' }}
              contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
              labelStyle={{ color: 'hsl(var(--muted-foreground))', marginBottom: '4px' }}
              formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="hsl(var(--foreground))" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
