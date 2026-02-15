import { useState, useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Zap, Settings, Clock, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { usePlan } from "@/contexts/PlanContext";

const pageTitles: Record<string, string> = {
  "/": "Home",
  "/prospect-search": "Prospect Search",
  "/saved-search": "Saved Search",
  "/data-enrichment": "Data Enrichment",
  "/custom-data": "Custom Data",
  "/validations/email": "Email Validation",
  "/validations/suppression": "Suppression",
  "/profile": "Profile",
};

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentPlan } = usePlan();
  const currentTitle = Object.entries(pageTitles).find(
    ([path]) => path === "/" ? location.pathname === "/" : location.pathname.startsWith(path)
  )?.[1] || "Home";

  const [timeLeft, setTimeLeft] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentPlan === 'trial') {
      setTimeout(() => setShowTooltip(true), 800);
    }
  }, [currentPlan]);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showTooltip &&
        tooltipRef.current &&
        badgeRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        !badgeRef.current.contains(event.target as Node)
      ) {
        handleDismissTooltip();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showTooltip) {
        handleDismissTooltip();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showTooltip]);

  const handleDismissTooltip = () => {
    setShowTooltip(false);
  };

  const handleBadgeClick = () => {
    setShowTooltip(!showTooltip);
  };

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
          {currentPlan !== 'enterprise' && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={() => navigate('/subscription')}
                  size="sm"
                  className="gap-2 bg-[#FF3030] hover:bg-[#B71833] text-white shadow-sm hover:shadow-md transition-all duration-200 rounded-md px-4 font-medium"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Upgrade
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Unlock Premium Intelligence Tools</p>
              </TooltipContent>
            </Tooltip>
          )}
          {currentPlan === 'trial' && (
            <div className="relative">
              <div 
                ref={badgeRef}
                onClick={handleBadgeClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 cursor-pointer hover:bg-amber-100 transition-colors"
              >
                <Clock className="h-3.5 w-3.5 text-amber-600" />
                <span className="text-xs font-semibold text-amber-900">Trial: {timeLeft}</span>
              </div>
              
              {showTooltip && (
                <div
                  ref={tooltipRef}
                  role="dialog"
                  aria-label="Trial information"
                  className="absolute top-full right-0 mt-2 w-80 bg-gradient-to-br from-green-50 via-white to-amber-50 rounded-xl shadow-2xl border border-green-200/50 p-4 z-[1000] animate-in fade-in zoom-in-95 duration-200"
                  style={{ transformOrigin: 'top right' }}
                >
                  <button
                    onClick={handleDismissTooltip}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Close tooltip"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="pr-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                      <h4 className="text-sm font-bold text-foreground">Limited Pro Access</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      You can access Pro features in a limited way during your Free Plan trial period. Upgrade to unlock full access to all premium tools.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Bell className="h-4.5 w-4.5" />
          </button>
          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                onClick={() => navigate('/profile')}
                className="h-8 w-8 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all"
              >
                <span className="text-sm font-bold text-primary-foreground">N</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Account Settings</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </header>

      <div className="flex flex-1 w-full pt-14">
        <AppSidebar />
        <main className="flex-1 py-2 px-3 min-w-0 ml-[72px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
