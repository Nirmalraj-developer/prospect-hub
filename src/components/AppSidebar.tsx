import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import {
  Home,
  Search,
  Bookmark,
  Database,
  FileSpreadsheet,
  ShieldCheck,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { title: "Home", path: "/", icon: Home },
  { title: "Prospect Search", path: "/prospect-search", icon: Search },
  { title: "Saved Search", path: "/saved-search", icon: Bookmark },
  { title: "Data Enrichment", path: "/data-enrichment", icon: Database },
  { title: "Custom Data", path: "/custom-data", icon: FileSpreadsheet },
  { title: "Validations", path: "/validations/email", icon: ShieldCheck },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside
      className="flex flex-col items-center border-r border-border bg-card w-14 sticky top-12 py-3 gap-1"
      style={{ height: "calc(100vh - 3rem)" }}
    >
      <nav className="flex-1 flex flex-col items-center gap-1">
        {navItems.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);

          return (
            <Tooltip key={item.path} delayDuration={0}>
              <TooltipTrigger asChild>
                <RouterNavLink
                  to={item.path}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-[18px] w-[18px]" />
                </RouterNavLink>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>
                {item.title}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <button className="flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Settings className="h-[18px] w-[18px]" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          Settings
        </TooltipContent>
      </Tooltip>
    </aside>
  );
}
