import { ReactNode, useState } from 'react';
import { Lock, Star, Crown, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePlan } from '@/contexts/PlanContext';
import { hasAccess, PLAN_INFO, PlanTier } from '@/lib/plans';
import { useIsMobile } from '@/hooks/use-mobile';

interface LockedPageLayoutProps {
  children: ReactNode;
  featureName: string;
  requiredPlan: PlanTier;
}

export function LockedPageLayout({ children, featureName, requiredPlan }: LockedPageLayoutProps) {
  const { currentPlan } = usePlan();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const isLocked = !hasAccess(currentPlan, requiredPlan);

  if (!isLocked) {
    return <>{children}</>;
  }

  const planInfo = PLAN_INFO[requiredPlan];

  const handleUnlock = () => {
    navigate(`/subscription?feature=${encodeURIComponent(featureName)}&plan=${requiredPlan}&return=${encodeURIComponent(location.pathname)}`);
  };

  return (
    <div className="relative h-full">
      {/* Plan Badge - Top Right */}
      <div className="absolute top-0 right-0 z-20 animate-in fade-in duration-300">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg shadow-lg ${
          requiredPlan === 'premium' 
            ? 'bg-gradient-to-br from-purple-500 to-purple-600' 
            : requiredPlan === 'enterprise'
            ? 'bg-gradient-to-br from-amber-500 to-amber-600'
            : 'bg-gradient-to-br from-blue-500 to-blue-600'
        } text-white text-xs font-bold`}>
          <Lock className="h-3.5 w-3.5" />
          {requiredPlan === 'premium' && <Star className="h-3.5 w-3.5" />}
          {requiredPlan === 'enterprise' && <Crown className="h-3.5 w-3.5" />}
          {planInfo.name} Feature
        </div>
      </div>

      {/* Unlock CTA - Below Badge */}
      <div className="absolute top-12 right-0 z-20 animate-in fade-in duration-500">
        <Button 
          onClick={handleUnlock}
          size="sm"
          className={`gap-2 shadow-lg ${
            requiredPlan === 'premium'
              ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
              : requiredPlan === 'enterprise'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
              : 'bg-primary hover:bg-primary/90'
          } text-white`}
        >
          <Unlock className="h-4 w-4" />
          Unlock This Feature
        </Button>
      </div>

      {/* Content with blur overlay on desktop only */}
      <div className={`${!isMobile ? 'blur-[1px] opacity-70' : ''} pointer-events-none select-none`}>
        {children}
      </div>

      {/* Transparent overlay to block interactions */}
      <div className="absolute inset-0 z-10" />
    </div>
  );
}

interface LockedButtonProps {
  children: ReactNode;
  requiredPlan: PlanTier;
  tooltipText?: string;
  [key: string]: any;
}

export function LockedButton({ children, requiredPlan, tooltipText, ...props }: LockedButtonProps) {
  const { currentPlan } = usePlan();
  const navigate = useNavigate();
  const location = useLocation();
  const isLocked = !hasAccess(currentPlan, requiredPlan);
  const planInfo = PLAN_INFO[requiredPlan];

  const handleClick = () => {
    navigate(`/subscription?plan=${requiredPlan}&return=${encodeURIComponent(location.pathname)}`);
  };

  if (!isLocked) {
    return <Button {...props}>{children}</Button>;
  }

  const defaultTooltip = `Available in ${planInfo.name} Plan`;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span>
          <Button {...props} onClick={handleClick} className="gap-2">
            <Lock className="h-3.5 w-3.5" />
            {children}
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs">{tooltipText || defaultTooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
