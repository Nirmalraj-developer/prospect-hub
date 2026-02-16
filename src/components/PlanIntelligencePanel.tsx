import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Sparkles, Crown, Star, ArrowRight, Users, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlan } from "@/contexts/PlanContext";
import { PLAN_INFO, PlanTier } from "@/lib/plans";

const PLAN_CAPABILITIES = {
  trial: ["Prospect Search", "Saved Lists", "Custom Data", "Export Data"],
  pro: ["Prospect Search", "Saved Lists", "Custom Data", "Export Data"],
  premium: [
    "Prospect Search",
    "Data Enhancement",
    "Data Validation",
    "Team Collaboration (5 Users)",
    "Export Data",
  ],
  enterprise: [
    "Prospect Search",
    "Bulk Email Validation",
    "Data Compliance",
    "Data Integrations",
    "Team Collaboration (10 Users)",
    "Shared Search",
    "White Labelling",
  ],
};

const PLAN_CREDITS = {
  trial: { total: 5000, used: 1200 },
  pro: { total: 5000, used: 1200 },
  premium: { total: 15000, used: 4200 },
  enterprise: { total: 50000, used: 12500 }
};

export function PlanIntelligencePanel() {
  const { currentPlan } = usePlan();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const planInfo = PLAN_INFO[currentPlan];
  const capabilities = PLAN_CAPABILITIES[currentPlan];
  const credits = PLAN_CREDITS[currentPlan];
  const progressPercent = (credits.used / credits.total) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(progressPercent);
    }, 200);
    return () => clearTimeout(timer);
  }, [progressPercent]);

  const getPlanIcon = () => {
    if (currentPlan === 'premium') return Star;
    if (currentPlan === 'enterprise') return Crown;
    return Sparkles;
  };

  const Icon = getPlanIcon();

  return (
    <div className="sticky top-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        {/* Plan Header */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
          <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
            currentPlan === 'premium' 
              ? 'bg-gradient-to-br from-purple-500 to-purple-600' 
              : currentPlan === 'enterprise'
              ? 'bg-gradient-to-br from-amber-500 to-amber-600'
              : currentPlan === 'trial'
              ? 'bg-green-100'
              : 'bg-blue-100'
          }`}>
            <Icon className={`h-6 w-6 ${
              currentPlan === 'premium' || currentPlan === 'enterprise' 
                ? 'text-white' 
                : currentPlan === 'trial'
                ? 'text-green-600'
                : 'text-blue-600'
            }`} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground">{planInfo.name} Plan</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground">Active Subscription</span>
            </div>
          </div>
        </div>

        {/* Enabled Capabilities */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-foreground mb-3">Enabled Capabilities</h4>
          <div className="space-y-2">
            {capabilities.map((capability, idx) => (
              <div 
                key={capability}
                className="flex items-center gap-2 text-sm text-foreground animate-in fade-in slide-in-from-left-2 duration-200"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Check className="h-2.5 w-2.5 text-green-600" />
                </div>
                <span>{capability}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Credit Allocation */}
        <div className="mb-6 pb-6 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-bold text-foreground">Monthly Credits</h4>
            <span className="text-xs font-semibold text-muted-foreground">
              {credits.used.toLocaleString()} / {credits.total.toLocaleString()}
            </span>
          </div>
          <div className="h-2 bg-[#FFE3D5] rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-500 ease-out bg-gradient-to-r from-[#FF3030] to-[#B71833]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {(credits.total - credits.used).toLocaleString()} credits remaining this month
          </p>
        </div>

        {/* Conditional CTA */}
        {currentPlan === 'pro' && (
          <div className="bg-white border border-black/[0.06] rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="flex items-start gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-[#FFE3D5] flex items-center justify-center shrink-0">
                <Sparkles className="h-6 w-6 text-[#B71833]" />
              </div>
              <div>
                <h5 className="text-[17px] font-semibold text-[#1C1C1E] mb-1">Upgrade to Premium</h5>
                <p className="text-[13px] text-[rgba(60,60,67,0.7)]">Enable Advanced AI & Data Integrations</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/subscription?plan=premium')}
              className="w-full px-4 py-2 rounded-lg bg-[#FF3030] hover:bg-[#B71833] text-white text-sm font-medium transition-colors"
            >
              Upgrade Plan
            </button>
          </div>
        )}

        {currentPlan === 'premium' && (
          <div className="bg-white border border-black/[0.06] rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="flex items-start gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-[#FFE3D5] flex items-center justify-center shrink-0">
                <Database className="h-6 w-6 text-[#B71833]" />
              </div>
              <div>
                <h5 className="text-[17px] font-semibold text-[#1C1C1E] mb-1">Need More Data Credits?</h5>
                <p className="text-[13px] text-[rgba(60,60,67,0.7)]">Purchase additional credits anytime</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/subscription')}
              className="w-full px-4 py-2 rounded-lg bg-[#FF3030] hover:bg-[#B71833] text-white text-sm font-medium transition-colors"
            >
              Purchase Additional Credits
            </button>
          </div>
        )}

        {currentPlan === 'enterprise' && (
          <div className="bg-white border border-black/[0.06] rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="flex items-start gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-[#FFE3D5] flex items-center justify-center shrink-0">
                <Users className="h-6 w-6 text-[#B71833]" />
              </div>
              <div>
                <h5 className="text-[17px] font-semibold text-[#1C1C1E] mb-1">Contact Account Manager</h5>
                <p className="text-[13px] text-[rgba(60,60,67,0.7)]">For scaling access and custom solutions</p>
              </div>
            </div>
            <button 
              className="w-full px-4 py-2 rounded-lg border border-black/[0.06] hover:bg-gray-50 text-[#1C1C1E] text-sm font-medium transition-colors"
            >
              Contact Support
            </button>
          </div>
        )}

        {currentPlan === 'trial' && (
          <div className="bg-white border border-black/[0.06] rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="flex items-start gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-[#FFE3D5] flex items-center justify-center shrink-0">
                <Sparkles className="h-6 w-6 text-[#B71833]" />
              </div>
              <div>
                <h5 className="text-[17px] font-semibold text-[#1C1C1E] mb-1">Upgrade to Pro</h5>
                <p className="text-[13px] text-[rgba(60,60,67,0.7)]">Continue accessing all features</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/subscription?plan=pro')}
              className="w-full px-4 py-2 rounded-lg bg-[#FF3030] hover:bg-[#B71833] text-white text-sm font-medium transition-colors"
            >
              Upgrade Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
