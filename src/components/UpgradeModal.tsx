import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { PlanTier, PLAN_INFO } from "@/lib/plans";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  currentPlan: PlanTier;
  requiredPlan: PlanTier;
  featureName: string;
}

const PLAN_COMPARISON = {
  pro: ['Prospect Search', 'Saved Search', 'Export Data', 'Custom Data', '10,000 credits/month'],
  premium: ['Everything in Pro', 'Data Enrichment', 'Data Validation', 'Team Collaboration (5 Users)', '50,000 credits/month'],
  enterprise: ['Everything in Premium', 'Data Integrations', 'White Labelling', 'Data Compliance', 'Dedicated Support', 'Unlimited credits']
};

export function UpgradeModal({ open, onClose, currentPlan, requiredPlan, featureName }: UpgradeModalProps) {
  const plans: PlanTier[] = ['pro', 'premium', 'enterprise'];
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Upgrade to access {featureName}</DialogTitle>
          <DialogDescription>
            This feature requires {PLAN_INFO[requiredPlan].name} plan or higher
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {plans.map((plan) => {
            const info = PLAN_INFO[plan];
            const isCurrent = plan === currentPlan;
            const isRequired = plan === requiredPlan;
            
            return (
              <div
                key={plan}
                className={`relative border-2 rounded-xl p-6 ${
                  isRequired ? 'border-primary shadow-lg' : 'border-border'
                } ${isCurrent ? 'bg-muted/50' : ''}`}
              >
                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-muted border border-border rounded-full text-xs font-medium">
                    Current Plan
                  </div>
                )}
                {isRequired && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                    Recommended
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${info.bgColor} mb-3`}>
                    <span className="text-white font-bold text-lg">{info.name[0]}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{info.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {plan === 'pro' && 'For small teams'}
                    {plan === 'premium' && 'For growing businesses'}
                    {plan === 'enterprise' && 'For large organizations'}
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {PLAN_COMPARISON[plan].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={isRequired ? 'default' : 'outline'}
                  disabled={isCurrent}
                >
                  {isCurrent ? 'Current Plan' : `Upgrade to ${info.name}`}
                </Button>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
