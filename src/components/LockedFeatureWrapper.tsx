import { ReactNode, useState } from 'react';
import { Lock, Star, Crown, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UpgradeModal } from '@/components/UpgradeModal';
import { usePlan } from '@/contexts/PlanContext';
import { hasAccess, PLAN_INFO, PlanTier } from '@/lib/plans';

interface LockedFeatureWrapperProps {
  children: ReactNode;
  featureName: string;
  requiredPlan: PlanTier;
  pageRoute: string;
}

export function LockedFeatureWrapper({ 
  children, 
  featureName, 
  requiredPlan,
  pageRoute 
}: LockedFeatureWrapperProps) {
  const { currentPlan } = usePlan();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const isLocked = !hasAccess(currentPlan, requiredPlan);

  if (!isLocked) {
    return <>{children}</>;
  }

  const planInfo = PLAN_INFO[requiredPlan];

  return (
    <div className="relative h-full">
      {/* Sticky Plan Badge */}
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

      {/* Dimmed Content */}
      <div className="opacity-60 pointer-events-none select-none">
        {children}
      </div>

      {/* Glass Overlay with CTA */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80 backdrop-blur-[2px] flex items-center justify-center z-10">
        <div className="max-w-md text-center px-6 animate-in fade-in zoom-in-95 duration-500">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-muted to-muted/50 mb-4 shadow-lg">
            <Lock className="h-8 w-8 text-muted-foreground" />
          </div>
          
          <h2 className="text-xl font-bold text-foreground mb-2">
            Upgrade to Access {featureName}
          </h2>
          
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            This feature requires a <span className="font-semibold text-foreground">{planInfo.name}</span> plan. 
            Upgrade now to unlock full access and start using this feature.
          </p>

          <Button 
            onClick={() => setShowUpgradeModal(true)}
            className={`gap-2 shadow-lg ${
              requiredPlan === 'premium'
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
                : requiredPlan === 'enterprise'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
                : 'bg-primary hover:bg-primary/90'
            } text-white animate-pulse`}
          >
            <Unlock className="h-4 w-4" />
            Unlock This Feature
          </Button>
        </div>
      </div>

      <UpgradeModal
        open={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        currentPlan={currentPlan}
        requiredPlan={requiredPlan}
        featureName={featureName}
      />
    </div>
  );
}
