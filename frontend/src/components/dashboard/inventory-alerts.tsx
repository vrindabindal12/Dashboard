"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowUpCircle, CheckCircle2, Package } from "lucide-react";

type Alert = {
  id: number;
  store: string;
  category: string;
  message: string;
  severity: "critical" | "high" | "medium";
};

export function InventoryAlertsList({ alerts }: { alerts: Alert[] }) {
  const getIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "high":
        return <ArrowUpCircle className="w-5 h-5 text-orange-500" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBorderColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-red-500/50";
      case "high":
        return "border-orange-500/50";
      default:
        return "border-blue-500/50";
    }
  };

  return (
    <Card className="bg-card border-border shadow-sm h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          Inventory Restock Alerts
        </CardTitle>
        <CardDescription>Prescriptive analytics based on real-time surging demand</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center">
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`flex items-start gap-3 p-3 rounded-lg border bg-black/20 ${getBorderColor(alert.severity)}`}
            >
              <div className="mt-0.5">
                {getIcon(alert.severity)}
              </div>
              <div>
                <div className="font-semibold text-sm text-zinc-200 flex items-center gap-2">
                  {alert.store} 
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-zinc-400">
                    {alert.category}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground mt-1 leading-snug">
                  {alert.message}
                </div>
              </div>
            </div>
          ))}
          {alerts.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              No critical inventory alerts at this time.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
