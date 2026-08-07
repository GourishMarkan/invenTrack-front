import { Skeleton } from "@/components/ui/skeleton";

export default function PageLoader() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <Skeleton className="h-[520px] w-full max-w-md rounded-2xl" />
    </main>
  );
}