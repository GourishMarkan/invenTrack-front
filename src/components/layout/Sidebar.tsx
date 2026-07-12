import {
  Boxes,
  ClipboardList,
  LayoutDashboard,
  PackageSearch,
  Settings2,
  Truck,
  LogOut,
  X,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

import Logo from "./Logo"
import NavItem from "./NavItem"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SidebarProps = {
  mobileOpen: boolean
  onClose: () => void
}

const navigationItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/products", label: "Products", icon: Boxes },
  { to: "/suppliers", label: "Suppliers", icon: Truck },
  { to: "/purchase-orders", label: "Purchase Orders", icon: ClipboardList },
  { to: "/purchases", label: "Purchases", icon: PackageSearch },
  { to: "/settings", label: "Settings", icon: Settings2 },
]

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <Logo />

        {onClose ? (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onClose}
            className="border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden"
            aria-label="Close navigation menu"
          >
            <X className="h-4.5 w-4.5" />
          </Button>
        ) : null}
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigationItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            label={item.label}
            icon={item.icon}
            end={item.end}
            onNavigate={onClose}
          />
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/login")}
          className={cn(
            "w-full justify-start gap-3 rounded-xl border-border bg-background text-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          <LogOut className="h-4.5 w-4.5" />
          Logout
        </Button>
      </div>
    </div>
  )
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[280px] border-r border-border bg-background lg:flex">
        <SidebarContent />
      </aside>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-200 lg:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!mobileOpen}
        onClick={onClose}
      >
        <aside
          className={cn(
            "h-full w-[280px] border-r border-border bg-background shadow-xl shadow-black/10 transition-transform duration-200",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(event) => event.stopPropagation()}
        >
          <SidebarContent onClose={onClose} />
        </aside>
      </div>
    </>
  )
}
