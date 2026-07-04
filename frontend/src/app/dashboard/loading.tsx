import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <Skeleton className="h-10 w-[250px] bg-muted/60" />
        <Skeleton className="h-4 w-[350px] mt-3 bg-muted/40" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="overflow-hidden bg-card border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-[120px] bg-muted/60" />
              <Skeleton className="h-4 w-4 rounded-sm bg-muted/60" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[140px] mb-3 bg-muted/80" />
              <Skeleton className="h-3 w-[180px] bg-muted/40" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-4">
        <Card className="col-span-1 lg:col-span-4 bg-card border-border shadow-sm h-[450px]">
          <CardHeader>
            <Skeleton className="h-6 w-[180px] bg-muted/60" />
            <Skeleton className="h-4 w-[280px] mt-2 bg-muted/40" />
          </CardHeader>
          <CardContent className="h-[350px] pt-6">
            <Skeleton className="h-full w-full rounded-lg bg-muted/30" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
