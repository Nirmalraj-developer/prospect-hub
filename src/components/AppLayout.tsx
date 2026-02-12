import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, User } from "lucide-react";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-border bg-card flex items-center justify-end px-6 gap-3 sticky top-0 z-10">
          <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Bell className="h-4 w-4" />
          </button>
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
