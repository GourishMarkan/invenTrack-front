import { Menu, Search } from "lucide-react"

import UserMenu from "./UserMenu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type NavbarProps = {
  onMenuClick: () => void
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onMenuClick}
          className="border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-4.5 w-4.5" />
        </Button>

        <div className="relative hidden max-w-md flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search inventory, suppliers, orders..."
            className="h-10 rounded-2xl border-border bg-background pl-10"
          />
        </div>

        <div className="flex-1 md:hidden" />

        <UserMenu />
      </div>
    </header>
  )
}
