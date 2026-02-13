import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { usePlan } from "@/contexts/PlanContext";
import { hasAccess } from "@/lib/plans";

const MESSAGES = [
  { text: "Access AI-Enriched Contact Data", route: "/data-enrichment", requiresPlan: "premium" as const, highlight: true },
  { text: "Try Company Golden Records", route: "/prospect-search", requiresPlan: "premium" as const },
  { text: "Explore Verified People Profiles", route: "/prospect-search", requiresPlan: "premium" as const },
  { text: "CRM Synced Prospect Intelligence", route: "/crm-sync", requiresPlan: "enterprise" as const, highlight: true },
  { text: "Market-Ready Lead Insights", route: "/ai-lead-finder", requiresPlan: "premium" as const },
  { text: "Role-Level Targeting", route: "/ai-role-targeting", requiresPlan: "premium" as const, highlight: true }
];

export function IntelligenceCapsule() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showGlow, setShowGlow] = useState(false);
  const { currentPlan } = usePlan();
  const navigate = useNavigate();

  const currentMessage = MESSAGES[currentIndex];
  const isLocked = !hasAccess(currentPlan, currentMessage.requiresPlan);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
        setIsVisible(true);
      }, 300);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentMessage.highlight) {
      const glowInterval = setInterval(() => {
        setShowGlow(true);
        setTimeout(() => setShowGlow(false), 600);
      }, 12000);
      return () => clearInterval(glowInterval);
    }
  }, [currentMessage]);

  const handleClick = () => {
    if (!isLocked) {
      navigate(currentMessage.route);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${
        isLocked
          ? "bg-[#FFE3D5]/30 border-[#FF9882]/30 cursor-default"
          : "bg-white border-border hover:border-primary/40 hover:shadow-sm cursor-pointer"
      } ${showGlow && currentMessage.highlight ? 'animate-glow' : ''}`}
      style={{
        boxShadow: showGlow && currentMessage.highlight ? '0 0 0 2px rgba(255,48,48,0.15)' : undefined
      }}
    >
      <div
        className={`transition-all duration-300 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        <span className="text-xs font-medium text-foreground whitespace-nowrap">
          {currentMessage.text}
        </span>
      </div>
      {isLocked && (
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FFE3D5]">
          <Lock className="h-2.5 w-2.5 text-[#B71833]" />
          <span className="text-[10px] font-semibold text-[#B71833] uppercase">Premium</span>
        </div>
      )}
    </div>
  );
}
