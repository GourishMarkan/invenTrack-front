import { Skeleton } from "@/components/ui/skeleton";

export default function PageLoader() {
  return (
   <div className="space-y-6">
  <Skeleton className="h-10 w-1/3" />

  {Array.from({ length: 6 }).map((_, i) => (
    <Skeleton key={i} className="h-12 w-full" />
  ))}

  <Skeleton className="h-12 w-32" />
</div>
  );
}
