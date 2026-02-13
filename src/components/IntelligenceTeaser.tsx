import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, CheckCircle, Sparkles, Database, Target } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { usePlan } from "@/contexts/PlanContext";
import { hasAccess } from "@/lib/plans";

const INTELLIGENCE_MESSAGES = [
  { text: "Try Company Golden Records", icon: Database, route: "/data-enrichment" },
  { text: "Explore Verified People Profiles", icon: CheckCircle, route: "/data-enrichment" },
  { text: "Access AI-Enriched Contact Data", icon: Sparkles, route: "/data-enrichment" },
  { text: "Discover Market-Ready Lead Intelligence", icon: Target, route: "/prospect-search" },
  { text: "Unlock Role-Level Targeting", icon: Target, route: "/prospect-search" },
  { text: "Access CRM-Synced Firmographics", icon: Database, route: "/data-enrichment" }
];

const INDICATORS = ["✓ Verified", "AI Enriched", "CRM Synced", "Market Validated"];

export function IntelligenceTeaser() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [indicatorIndex, setIndicatorIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const { currentPlan } = usePlan();
  
  const isLocked = !hasAccess(currentPlan, "premium");
  const currentMessage = INTELLIGENCE_MESSAGES[currentIndex];
  const Icon = currentMessage.icon;

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % INTELLIGENCE_MESSAGES.length);
        setIndicatorIndex((prev) => (prev + 1) % INDICATORS.length);
        setIsVisible(true);
      }, 300);
    }, 6000);

    return () => clearInterval(messageInterval);
  }, []);

  const handleClick = () => {
    if (isLocked) {
      navigate("/subscription?plan=premium");
    } else {
      navigate(currentMessage.route);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleClick}
          className="relative hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-muted/50 to-muted/30 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
              <Icon className="h-3.5 w-3.5 text-primary" />
            </div>
            
            <div className="flex flex-col items-start min-w-[200px]">
              <div
                className={`text-xs font-medium text-foreground transition-all duration-500 ease-in-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                }`}
              >
                {currentMessage.text}
              </div>
              <div
                className={`text-[10px] text-muted-foreground transition-all duration-500 ease-in-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                {INDICATORS[indicatorIndex]}
              </div>
            </div>

            {isLocked && (
              <div className="ml-1 h-4 w-4 rounded-full bg-amber-100 flex items-center justify-center">
                <Lock className="h-2.5 w-2.5 text-amber-600" />
              </div>
            )}
          </div>
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs">
          {isLocked 
            ? "Available in Premium Plan" 
            : "Access enriched Company & People Golden Records with Premium Intelligence"}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
