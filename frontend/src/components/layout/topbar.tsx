"use client";

import { Bell, User, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

export function Topbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentDays = searchParams.get("days") || "30";

  const handleDateChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("days", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between h-16 px-6 border-b border-border/40 bg-card">
      <div className="flex-1 flex items-center">
        {/* Global Filter */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="w-4 h-4" />
          <Select value={currentDays} onValueChange={handleDateChange}>
            <SelectTrigger className="w-[180px] h-9 border-border bg-muted/30 hover:bg-muted/50 transition-colors">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
              <SelectItem value="90">Last 90 Days</SelectItem>
              <SelectItem value="365">Year to Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
