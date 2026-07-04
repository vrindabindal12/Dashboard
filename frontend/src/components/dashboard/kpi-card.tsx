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
    <Card className={cn("overflow-hidden bg-card/50 backdrop-blur-sm border-white/10 shadow-lg relative", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {(description || trendValue) && (
          <p className="text-xs mt-1 flex items-center">
            {trendValue && (
              <span 
                className={cn(
                  "mr-2 font-medium",
                  trend === "up" ? "text-emerald-500" : trend === "down" ? "text-rose-500" : "text-zinc-500"
                )}
              >
                {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
              </span>
            )}
            <span className="text-muted-foreground">{description}</span>
          </p>
        )}
      </CardContent>
      {/* Decorative gradient blur in background */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl z-0" />
    </Card>
  );
}
