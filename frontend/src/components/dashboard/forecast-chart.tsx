"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

export function ForecastChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--foreground))" stopOpacity={0.15} />
            <stop offset="95%" stopColor="hsl(var(--foreground))" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorHistorical" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.15} />
            <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          className="font-medium"
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
          }}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          className="font-medium"
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip
          cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1, strokeDasharray: '4 4' }}
          contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
          labelStyle={{ color: 'hsl(var(--muted-foreground))', marginBottom: '4px' }}
          formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
          labelFormatter={(label) => new Date(label).toLocaleDateString()}
        />
        <Area
          type="monotone"
          dataKey="historical"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorHistorical)"
        />
        <Area
          type="monotone"
          dataKey="forecast"
          stroke="hsl(var(--foreground))"
          strokeWidth={2}
          strokeDasharray="4 4"
          fillOpacity={1}
          fill="url(#colorForecast)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
