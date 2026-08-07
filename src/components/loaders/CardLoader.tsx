import { Skeleton } from "@/components/ui/skeleton";

export default function CardLoader(){
    return(
        <div className="grid gap-4 md:grid-cols-4">
  {Array.from({ length: 4 }).map((_, i) => (
    <Skeleton
      key={i}
      className="h-36 rounded-xl"
    />
  ))}
</div>
    )
}