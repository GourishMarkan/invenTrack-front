import { useNavigate } from "react-router-dom"
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@/features/auth/hooks/useUser"


export default function UserMenu() {
  const { data, isLoading, isError } = useUser();
  const navigate = useNavigate()

if (isLoading) {
  return null; // or a skeleton
}

if (isError || !data) {
  return null; // or a fallback menu
}


  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
        aria-label="Notifications"
      >
        <Bell className="h-4.5 w-4.5" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger
          className="inline-flex items-center gap-3 rounded-2xl border border-border bg-background px-2 py-1.5 text-left transition-colors hover:bg-accent/60"
          aria-label="Open user menu"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground">
           {data.name.slice(0,1).toUpperCase()}
          </div>
          <div className="hidden min-w-0 flex-col items-start text-left sm:flex">
            <span className="truncate text-sm font-medium text-foreground">
              {data.name.slice(0,1)}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              ${data.role}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </DropdownMenuTrigger>

        <DropdownMenuContent sideOffset={12} align="end">
          <DropdownMenuLabel>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">{data.name}</p>
              <p className="text-xs text-muted-foreground">{}</p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem onSelect={() => navigate("/settings") }>
            <Settings2 className="h-4 w-4" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onSelect={() => navigate("/login") }>
            <LogOut className="h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
