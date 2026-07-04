"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { CustomerSegment } from "@/types";

interface CustomerSegmentsChartProps {
  data: CustomerSegment[];
}

const COLORS = ['hsl(var(--foreground))', 'hsl(var(--muted-foreground))', 'hsl(var(--border))', 'hsl(var(--primary))'];

export function CustomerSegmentsChart({ data }: CustomerSegmentsChartProps) {
  return (
    <div className="h-[400px] w-full pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
            stroke="hsl(var(--background))"
            strokeWidth={3}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
            itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 500 }}
            formatter={(value: any, name: any, props: any) => [
              `${value}%`, 
              <span key={name} className="flex flex-col tracking-tight">
                <span className="font-semibold text-foreground">{name}</span>
                <span className="text-xs text-muted-foreground">{props.payload.description}</span>
              </span>
            ]}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
            formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
