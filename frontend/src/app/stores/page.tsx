import { fetchStores } from "@/lib/api";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store as StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function StoresPage() {
  const stores = await fetchStores();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Stores Overview</h2>
        <p className="text-muted-foreground mt-1">Monitor performance metrics across all physical locations.</p>
      </div>

      <Card className="bg-card border-border shadow-sm">
        <CardHeader>
          <CardTitle>Store Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>Store ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Profit</TableHead>
                <TableHead className="text-right">Customers</TableHead>
                <TableHead className="text-right">Monthly Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stores.map((store) => (
                <TableRow key={store.id} className="border-border/50 hover:bg-white/5">
                  <TableCell className="font-medium flex items-center gap-2">
                    <StoreIcon className="h-4 w-4 text-muted-foreground" />
                    {store.name}
                  </TableCell>
                  <TableCell>
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      store.performance === "Excellent" ? "bg-emerald-500/20 text-emerald-400" :
                      store.performance === "Good" ? "bg-blue-500/20 text-blue-400" :
                      "bg-amber-500/20 text-amber-400"
                    )}>
                      {store.performance}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">${store.revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                  <TableCell className="text-right">${store.profit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                  <TableCell className="text-right">{store.customer_count.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-emerald-400">+{store.monthly_growth}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
