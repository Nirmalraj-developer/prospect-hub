import { usePlan } from '@/contexts/PlanContext';
import { Crown, Star, Check, Clock } from 'lucide-react';
import { PlanTier, PLAN_INFO } from '@/lib/plans';

export default function SettingsPage() {
  const { currentPlan, setCurrentPlan } = usePlan();

  const plans: { tier: PlanTier; icon: any; color: string; bgColor: string }[] = [
    { tier: 'trial', icon: Clock, color: 'text-green-600', bgColor: 'bg-green-600' },
    { tier: 'pro', icon: Check, color: 'text-foreground', bgColor: 'bg-white' },
    { tier: 'premium', icon: Star, color: 'text-purple-600', bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600' },
    { tier: 'enterprise', icon: Crown, color: 'text-amber-600', bgColor: 'bg-gradient-to-br from-amber-500 to-amber-600' }
  ];

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account preferences and plan</p>
      </div>

      <div className="bg-white rounded-xl border border-border p-6">
        <h2 className="text-lg font-bold text-foreground mb-1">Current Plan</h2>
        <p className="text-sm text-muted-foreground mb-6">Switch plans to test different UI features and access levels</p>

        <div className="grid grid-cols-4 gap-4">
          {plans.map(({ tier, icon: Icon, color, bgColor }) => {
            const info = PLAN_INFO[tier];
            const isActive = currentPlan === tier;

            return (
              <button
                key={tier}
                onClick={() => setCurrentPlan(tier)}
                className={`relative p-5 rounded-xl border-2 transition-all duration-300 text-left ${
                  isActive
                    ? 'border-primary shadow-lg scale-105'
                    : 'border-border hover:border-primary/40 hover:shadow-md'
                }`}
              >
                {isActive && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                    Active
                  </div>
                )}

                <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-3 ${
                  tier === 'trial' ? 'bg-green-50' : tier === 'pro' ? 'bg-muted' : bgColor
                }`}>
                  <Icon className={`h-6 w-6 ${tier === 'trial' ? 'text-green-600' : tier === 'pro' ? color : 'text-white'}`} />
                </div>

                <h3 className="text-base font-bold text-foreground mb-1">{info.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{info.description}</p>

                <div className="text-sm font-bold text-foreground">
                  {info.price}
                  {tier !== 'enterprise' && tier !== 'trial' && <span className="text-xs text-muted-foreground font-normal">/month</span>}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Note:</span> This is a testing feature to preview different plan UIs. 
            In production, the plan would be determined by your subscription status.
          </p>
        </div>
      </div>
    </div>
  );
}
