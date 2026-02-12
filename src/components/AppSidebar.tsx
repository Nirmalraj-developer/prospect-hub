import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Search,
  Bookmark,
  Database,
  FileSpreadsheet,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Home", path: "/", icon: Home },
  { title: "Prospect Search", path: "/prospect-search", icon: Search },
  { title: "Saved Search", path: "/saved-search", icon: Bookmark },
  { title: "Data Enrichment", path: "/data-enrichment", icon: Database },
  { title: "Custom Data", path: "/custom-data", icon: FileSpreadsheet },
  { title: "Validations", path: "/validations/email", icon: ShieldCheck },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-card h-screen sticky top-0 transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 h-14 border-b border-border">
        <Zap className="h-6 w-6 text-primary shrink-0" />
        {!collapsed && (
          <span className="text-lg font-bold text-foreground tracking-tight">
            InFynd
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 space-y-1 px-2">
        {navItems.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-10 border-t border-border text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </aside>
  );
}
