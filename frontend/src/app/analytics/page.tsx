import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Advanced Analytics</h2>
        <p className="text-muted-foreground mt-1">Deep dive custom reports and machine learning predictions.</p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>We are currently training our predictive models.</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center border-t border-border/50 bg-black/5 mt-4">
          <p className="text-muted-foreground flex flex-col items-center gap-2">
            <BarChart3 className="w-8 h-8 opacity-50" />
            Machine Learning Forecasting Module will be deployed here
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
