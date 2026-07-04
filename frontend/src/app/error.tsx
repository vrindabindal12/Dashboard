"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Dashboard caught global error:", error);
  }, [error]);

  return (
    <div className="flex h-[80vh] w-full items-center justify-center p-6">
      <Card className="w-full max-w-md bg-card border-border shadow-lg">
        <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mb-2">
            <AlertCircle className="w-8 h-8 text-rose-500" />
          </div>
          <h2 className="text-2xl font-heading font-bold tracking-tight text-foreground">Connection Lost</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We are unable to connect to the RetailOps analytics engine. The server might be restarting or experiencing heavy load.
          </p>
          <div className="pt-4 w-full flex justify-center">
            <Button onClick={() => reset()} className="gap-2 w-full max-w-[200px] transition-all hover:scale-105">
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
