import { Skeleton } from "@/components/ui/skeleton";

export default function TableLoader() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-60" />

      <Skeleton className="h-12 w-full" />

      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-14 w-full rounded-lg"
        />
      ))}
    </div>
  );
}