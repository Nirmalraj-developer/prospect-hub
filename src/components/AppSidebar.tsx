import { NavLink as RouterNavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  Search,
  Bookmark,
  Database,
  FileSpreadsheet,
  ShieldCheck,
  Sparkles,
  Users,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePlan } from "@/contexts/PlanContext";
import { hasAccess, PlanTier, PLAN_INFO } from "@/lib/plans";
import { UpgradeModal } from "@/components/UpgradeModal";

interface NavItem {
  title: string;
  path: string;
  icon: any;
  requiresPlan?: PlanTier;
  section?: 'primary' | 'ai' | 'enterprise';
}

const navItems: NavItem[] = [
  { title: "Home", path: "/", icon: Home, section: "primary" },
  {
    title: "Prospect Search",
    path: "/prospect-search",
    icon: Search,
    section: "primary",
  },
  {
    title: "Saved Search",
    path: "/saved-search",
    icon: Bookmark,
    section: "primary",
  },
  {
    title: "Data Enhancement",
    path: "/data-enrichment",
    icon: Database,
    requiresPlan: "premium",
    section: "ai",
  },
  {
    title: "Custom Data",
    path: "/custom-data",
    icon: FileSpreadsheet,
    requiresPlan: "premium",
    section: "ai",
  },
  {
    title: "Validations",
    path: "/validations/email",
    icon: ShieldCheck,
    section: "primary",
  },
  {
    title: "Team Collaboration",
    path: "/team",
    icon: Users,
    requiresPlan: "enterprise",
    section: "enterprise",
  },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentPlan } = usePlan();
  const [upgradeModal, setUpgradeModal] = useState<{ open: boolean; requiredPlan?: PlanTier; featureName?: string }>({ open: false });

  const handleNavClick = (item: NavItem, e: React.MouseEvent) => {
    if (item.requiresPlan && !hasAccess(currentPlan, item.requiresPlan)) {
      e.preventDefault();
      setUpgradeModal({ open: true, requiredPlan: item.requiresPlan, featureName: item.title });
    }
  };

  const renderNavItem = (item: NavItem) => {
    const isActive = item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path);
    const isLocked = item.requiresPlan && !hasAccess(currentPlan, item.requiresPlan);

    return (
      <Tooltip key={item.path} delayDuration={0}>
        <TooltipTrigger asChild>
          <RouterNavLink
            to={item.path}
            onClick={(e) => handleNavClick(item, e)}
            className={cn(
              "relative flex items-center justify-center w-11 h-11 rounded-lg transition-colors duration-200",
              isActive
                ? "bg-primary/10 text-primary border-l-2 border-primary"
                : isLocked
                ? "text-muted-foreground hover:bg-muted/50 opacity-90"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="h-[18px] w-[18px]" />
            {isLocked && (
              <div className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-[#FFE3D5] border border-[#FF9882] flex items-center justify-center">
                <Lock className="h-2 w-2 text-[#B71833]" />
              </div>
            )}
          </RouterNavLink>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          <div className="flex flex-col gap-0.5">
            <span>{item.title}</span>
            {isLocked && (
              <span className="text-xs text-muted-foreground">Available in {PLAN_INFO[item.requiresPlan!].name}</span>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    );
  };

  const primaryItems = navItems.filter(item => item.section === 'primary');
  const aiItems = navItems.filter(item => item.section === 'ai');
  const enterpriseItems = navItems.filter(item => item.section === 'enterprise');

  return (
    <>
      <aside
        className="fixed left-0 top-14 flex flex-col items-center border-r border-border bg-card w-[72px] py-4 z-[1000]"
        style={{ height: "calc(100vh - 3.5rem)" }}
      >
        <nav className="flex-1 flex flex-col items-center gap-5">
          {/* Primary Section */}
          <div className="flex flex-col items-center gap-1">
            {primaryItems.map(renderNavItem)}
          </div>

          {/* AI Tools Section */}
          {aiItems.length > 0 && (
            <>
              <div className="w-8 h-px bg-border" />
              <div className="flex flex-col items-center gap-1">
                {aiItems.map(renderNavItem)}
              </div>
            </>
          )}

          {/* Enterprise Section */}
          {enterpriseItems.length > 0 && (
            <>
              <div className="w-8 h-px bg-border" />
              <div className="flex flex-col items-center gap-1">
                {enterpriseItems.map(renderNavItem)}
              </div>
            </>
          )}
        </nav>
      </aside>

      {upgradeModal.requiredPlan && (
        <UpgradeModal
          open={upgradeModal.open}
          onClose={() => setUpgradeModal({ open: false })}
          currentPlan={currentPlan}
          requiredPlan={upgradeModal.requiredPlan}
          featureName={upgradeModal.featureName}
        />
      )}
    </>
  );
}
