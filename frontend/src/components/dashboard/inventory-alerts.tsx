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
        return <AlertCircle className="w-5 h-5 text-rose-500" />;
      case "high":
        return <ArrowUpCircle className="w-5 h-5 text-amber-500" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <Card className="bg-card border-border shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 tracking-tight text-lg">
          <Package className="w-5 h-5 text-muted-foreground" />
          Inventory Alerts
        </CardTitle>
        <CardDescription>Prescriptive analytics based on real-time surging demand</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-start">
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className="flex items-start gap-3 p-3 rounded-lg border border-border bg-muted/40 transition-colors hover:bg-muted/60"
            >
              <div className="mt-0.5">
                {getIcon(alert.severity)}
              </div>
              <div>
                <div className="font-semibold text-sm text-foreground flex items-center gap-2 tracking-tight">
                  {alert.store} 
                  <span className="text-xs px-2 py-0.5 rounded-md bg-background text-muted-foreground border border-border font-medium">
                    {alert.category}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground mt-1 leading-snug font-medium">
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
