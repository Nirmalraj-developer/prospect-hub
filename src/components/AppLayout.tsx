import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, User, Zap, Globe, Lock, Settings } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/": "Home",
  "/prospect-search": "Prospect Search",
  "/saved-search": "Saved Search",
  "/data-enrichment": "Data Enrichment",
  "/custom-data": "Custom Data",
  "/validations/email": "Email Validation",
  "/validations/suppression": "Suppression",
};

export default function AppLayout() {
  const location = useLocation();
  const currentTitle = Object.entries(pageTitles).find(
    ([path]) => path === "/" ? location.pathname === "/" : location.pathname.startsWith(path)
  )?.[1] || "Home";

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      {/* Top navbar */}
      <header className="h-12 border-b border-border bg-card flex items-center justify-between px-4 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold text-foreground">InFynd</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <span className="text-sm text-muted-foreground font-medium">{currentTitle}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground mr-2">
            <Globe className="h-3 w-3" />
            <span>Credits:</span>
            <span className="font-semibold text-foreground">45,207</span>
          </div>
          <button className="px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Upgrade
          </button>
          <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Bell className="h-4 w-4" />
          </button>
          <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Settings className="h-4 w-4" />
          </button>
          <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center ml-1 cursor-pointer">
            <span className="text-xs font-bold text-primary-foreground">N</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 w-full">
        <AppSidebar />
        <main className="flex-1 p-6 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
