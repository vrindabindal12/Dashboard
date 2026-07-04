import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

export function KPICard({ title, value, icon: Icon, description, trend, trendValue, className }: KPICardProps) {
  return (
    <Card className={cn("overflow-hidden bg-card border-border shadow-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium tracking-tight text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-mono font-bold tracking-tight">{value}</div>
        {(description || trendValue) && (
          <p className="text-xs mt-1 flex items-center tracking-tight">
            {trendValue && (
              <span 
                className={cn(
                  "mr-2 font-semibold",
                  trend === "up" ? "text-emerald-500" : trend === "down" ? "text-rose-500" : "text-zinc-500"
                )}
              >
                {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
              </span>
            )}
            <span className="text-muted-foreground font-medium">{description}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
