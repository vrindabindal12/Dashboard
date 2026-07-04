"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { CustomerSegment } from "@/types";

interface CustomerSegmentsChartProps {
  data: CustomerSegment[];
}

const COLORS = ['#6366f1', '#8b5cf6', '#d946ef', '#0ea5e9', '#14b8a6'];

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
            paddingAngle={5}
            dataKey="value"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(9, 9, 11, 0.95)',
              borderColor: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
            itemStyle={{ color: '#e2e8f0' }}
            formatter={(value: number, name: string, props: any) => [
              `${value}%`, 
              <span key={name} className="flex flex-col">
                <span className="font-semibold">{name}</span>
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
