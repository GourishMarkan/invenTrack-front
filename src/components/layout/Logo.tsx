import { Package2 } from "lucide-react"

import { cn } from "@/lib/utils"

type LogoProps = {
  compact?: boolean
  className?: string
}

export default function Logo({ compact = false, className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-primary text-primary-foreground shadow-sm shadow-black/5">
        <Package2 className="h-5 w-5" />
      </div>
      {!compact ? (
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold leading-none text-foreground">
            InvenTrack
          </p>
          <p className="mt-1 truncate text-xs text-muted-foreground">
            Inventory Management System
          </p>
        </div>
      ) : null}
    </div>
  )
}
