"use client";

import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Topbar() {
  return (
    <div className="flex items-center justify-between h-16 px-6 border-b border-border/40 bg-card">
      <div className="flex-1 flex items-center">
        {/* Search bar removed per user request */}
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full bg-secondary text-secondary-foreground overflow-hidden">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
