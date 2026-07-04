import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";
import { fetchForecast, fetchRevenueTrend } from "@/lib/api";
import { ForecastChart } from "@/components/dashboard/forecast-chart";
import { AiInsightsCard } from "@/components/dashboard/ai-insights-card";

export default async function AnalyticsPage() {
  const forecastData = await fetchForecast();
  const historicalData = await fetchRevenueTrend();
  
  // Combine historical and forecast data for charting
  // Get last 8 historical points
  const recentHistorical = historicalData.slice(-8).map((d: any) => ({
    date: d.date,
    historical: d.revenue,
    forecast: null
  }));
  
  // Get the last historical point to connect the lines
  const lastHistorical = recentHistorical[recentHistorical.length - 1];
  
  // We need to shift the futureForecast array down by 1 because we prepended the connecting node,
  // but let's just append the rest of the forecast.
  const mappedForecast = forecastData.map((d: any) => ({
     date: d.date,
     historical: null,
     forecast: d.predicted_revenue,
     confidenceBand: [d.forecast_lower, d.forecast_upper]
  }));
  
  // The connecting point
  const connectionPoint = lastHistorical ? {
    date: lastHistorical.date,
    historical: lastHistorical.historical,
    forecast: lastHistorical.historical,
    confidenceBand: [lastHistorical.historical, lastHistorical.historical]
  } : null;

  const chartData = [
    ...recentHistorical.slice(0, -1),
    ...(connectionPoint ? [connectionPoint] : []),
    ...mappedForecast
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <BrainCircuit className="w-8 h-8 text-primary" />
          Predictive Analytics
        </h2>
        <p className="text-muted-foreground mt-1">XGBoost machine learning forecast model predicting future platform revenue.</p>
      </div>

      <Card className="bg-card border-border shadow-sm">
        <CardHeader>
          <CardTitle>12-Week Revenue Forecast</CardTitle>
          <CardDescription>Historical performance vs Machine Learning prediction</CardDescription>
        </CardHeader>
        <CardContent className="h-[500px]">
          <ForecastChart data={chartData} />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Model Architecture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">XGBoost Regressor</div>
            <p className="text-xs text-muted-foreground mt-1">100 estimators, max depth 5</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Input Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Temporal + Macro</div>
            <p className="text-xs text-muted-foreground mt-1">Week of year, Holiday flag, Temp, CPI</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Forecast Horizon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">12 Weeks</div>
            <p className="text-xs text-muted-foreground mt-1">Forward-looking predictive window</p>
          </CardContent>
        </Card>
      </div>

      <AiInsightsCard />
    </div>
  );
}
