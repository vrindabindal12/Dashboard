import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground mt-1">Manage your account and platform configurations.</p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>System settings and user preferences</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center border-t border-border/50 bg-black/5 mt-4">
          <p className="text-muted-foreground flex flex-col items-center gap-2">
            <Settings className="w-8 h-8 opacity-50 animate-spin-slow" />
            Settings module is currently locked for this demo environment.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
