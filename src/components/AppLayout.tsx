import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Zap, Settings, Clock } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/": "Home",
  "/prospect-search": "Prospect Search",
  "/saved-search": "Saved Search",
  "/data-enrichment": "Data Enrichment",
  "/custom-data": "Custom Data",
  "/validations/email": "Email Validation",
  "/validations/suppression": "Suppression",
  "/settings": "Settings",
};

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentTitle = Object.entries(pageTitles).find(
    ([path]) => path === "/" ? location.pathname === "/" : location.pathname.startsWith(path)
  )?.[1] || "Home";

  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + 3);

    const updateTimer = () => {
      const now = new Date();
      const diff = trialEnd.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft('Trial expired');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      {/* Top navbar */}
      <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-[900]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <span className="text-base font-bold text-foreground">InFynd</span>
          </div>
          <div className="h-5 w-px bg-border" />
          <span className="text-sm text-muted-foreground font-medium">{currentTitle}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200">
            <Clock className="h-3.5 w-3.5 text-amber-600" />
            <span className="text-xs font-semibold text-amber-900">Trial: {timeLeft}</span>
          </div>
          <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Bell className="h-4.5 w-4.5" />
          </button>
          <button 
            onClick={() => navigate('/settings')}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Settings className="h-4.5 w-4.5" />
          </button>
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center cursor-pointer">
            <span className="text-sm font-bold text-primary-foreground">N</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 w-full pt-14">
        <AppSidebar />
        <main className="flex-1 py-6 px-8 min-w-0 ml-[72px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
