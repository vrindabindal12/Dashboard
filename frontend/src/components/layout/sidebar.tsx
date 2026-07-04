"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Store, 
  Users, 
  Settings,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-foreground",
  },
  {
    label: "Products",
    icon: Package,
    href: "/products",
    color: "text-muted-foreground",
  },
  {
    label: "Stores",
    icon: Store,
    href: "/stores",
    color: "text-muted-foreground",
  },
  {
    label: "Customers",
    icon: Users,
    href: "/customers",
    color: "text-muted-foreground",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/analytics",
    color: "text-muted-foreground",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-background border-r border-border">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14 mt-4">
          <div className="relative w-8 h-8 mr-3 bg-muted rounded-md flex items-center justify-center border border-border">
            <TrendingUp className="w-5 h-5 text-foreground" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            RetailOps
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-foreground hover:bg-muted/50 rounded-md transition-all duration-200",
                pathname === route.href ? "text-foreground bg-muted font-semibold shadow-sm" : "text-muted-foreground"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", pathname === route.href ? "text-foreground" : "text-muted-foreground")} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
