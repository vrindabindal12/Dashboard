"use client";

import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Topbar() {
  return (
    <div className="flex items-center justify-between h-16 px-6 border-b border-border/40 bg-card">
      <div className="flex-1 flex items-center">
        {/* Empty left side */}
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-md bg-muted hover:bg-muted/80 text-foreground overflow-hidden border border-border">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
