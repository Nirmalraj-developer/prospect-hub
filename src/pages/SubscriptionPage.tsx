import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Check, ArrowLeft, Sparkles, Zap, Crown, Building2, ChevronDown, CheckCircle, X, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlan } from "@/contexts/PlanContext";
import { PLAN_INFO, PlanTier, FEATURES } from "@/lib/plans";

const PLAN_DETAILS = {
  pro: {
    monthlyPrice: 99,
    yearlyPrice: 990,
    credits: "5,000",
    icon: Zap,
    features: ["Find Prospects", "Saved Lists", "Request Custom Data", "Export Data", "AI Prospect Finder (Limited)"]
  },
  premium: {
    monthlyPrice: 299,
    yearlyPrice: 2990,
    credits: "15,000",
    icon: Sparkles,
    features: ["Everything in Pro", "AI Role Targeting", "Data Enhancement", "Email Validation", "Inclusion / Exclusion", "Team Access (5 Users)"]
  },
  enterprise: {
    monthlyPrice: null,
    yearlyPrice: null,
    credits: "Unlimited",
    icon: Crown,
    features: ["Everything in Premium", "Suppression Management", "CRM Integration", "Team Access (10 Users)", "Shared Saved Lists", "White Label Platform"]
  }
};

const ADDON_CREDITS = [
  { amount: 5000, price: 49 },
  { amount: 10000, price: 89 },
  { amount: 25000, price: 199 }
];

export default function SubscriptionPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentPlan, setCurrentPlan } = usePlan();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<PlanTier | null>(null);
  const [selectedAddon, setSelectedAddon] = useState<number | null>(null);
  const [showAddons, setShowAddons] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const featureName = searchParams.get("feature");
  const requiredPlan = searchParams.get("plan") as PlanTier;
  const returnUrl = searchParams.get("return");

  const hasActiveSubscription = currentPlan !== "trial";

  useEffect(() => {
    if (requiredPlan) {
      setSelectedPlan(requiredPlan);
    }
  }, [requiredPlan]);

  const handlePurchase = () => {
    if (selectedPlan) {
      setCurrentPlan(selectedPlan);
      if (returnUrl) {
        navigate(returnUrl);
      } else {
        navigate("/");
      }
    }
  };

  const getPrice = (plan: PlanTier) => {
    const details = PLAN_DETAILS[plan as keyof typeof PLAN_DETAILS];
    if (!details) return null;
    return billingCycle === "monthly" ? details.monthlyPrice : details.yearlyPrice;
  };

  const getTotalPrice = () => {
    if (!selectedPlan) return 0;
    const planPrice = getPrice(selectedPlan) || 0;
    const addonPrice = selectedAddon ? ADDON_CREDITS.find(a => a.amount === selectedAddon)?.price || 0 : 0;
    return planPrice + addonPrice;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F2] via-white to-[#FFF5F2]">
      <div className="w-full max-w-[1280px] px-6 py-2 -mt-[10px]">
        {featureName && requiredPlan && (
          <div className="bg-gradient-to-r from-[#FFE3D5] to-[#FFF5F2] border border-[#FF9882] rounded-xl p-2.5 mb-3">
            <p className="text-sm font-medium text-[#B71833]">
              Upgrade to <span className="font-bold text-[#FF3030]">{PLAN_INFO[requiredPlan].name}</span> to unlock <span className="font-bold">{featureName}</span>
            </p>
          </div>
        )}

        <div className="flex items-center justify-between py-2 mb-2 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-[13px] text-[#64748B] hover:text-[#FF3030] flex items-center gap-1.5 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>
            <h1 className="text-[18px] font-semibold text-foreground">Pricing Plans</h1>
          </div>
          <div className="flex items-center gap-4">
            <CheckCircle className="h-3.5 w-3.5 text-[#10B981]" />
            <span className="text-xs text-[#059669] font-semibold">GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-4">
            <CheckCircle className="h-3.5 w-3.5 text-[#10B981]" />
            <span className="text-xs text-[#059669] font-semibold">CCPA Compliant</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowComparison(true)}
              className="px-2.5 h-[30px] rounded-md border border-[#E5E7EB] text-[#334155] hover:border-[#FF3030] hover:text-[#FF3030] text-xs font-medium transition-colors"
            >
              Compare Plans
            </button>
            <div className="inline-flex items-center bg-white border border-[#E5E7EB] rounded-lg p-0.5 h-8">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-1 rounded-md text-[13px] font-medium transition-all duration-200 ${
                  billingCycle === "monthly" ? "bg-[#FF3030] text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-1 rounded-md text-[13px] font-medium transition-all duration-200 ${
                  billingCycle === "yearly" ? "bg-[#FF3030] text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Yearly <span className={billingCycle === "yearly" ? "text-white" : "text-[#10B981]"}>-17%</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(3,300px)] justify-center gap-5 mb-6">
          {(["pro", "premium", "enterprise"] as const).map((plan) => {
            const details = PLAN_DETAILS[plan];
            const price = getPrice(plan);
            const isRecommended = plan === requiredPlan || plan === "premium";
            const isCurrent = plan === currentPlan;
            const Icon = details.icon;

            return (
              <div
                key={plan}
                className={`bg-white border rounded-lg p-4 flex flex-col transition-all duration-200 relative ${
                  plan === "enterprise"
                    ? "border-[#FF3030] border-[1.5px] bg-[rgba(255,48,48,0.02)]"
                    : selectedPlan === plan 
                    ? "border-[#FF3030]" 
                    : "border-[#E5E7EB] hover:border-[#FF9882]"
                }`}
              >
                {plan === "premium" && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF3030] to-[#B71833] text-white px-3 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                {plan === "enterprise" && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF3030] to-[#B71833] text-white px-3 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap">
                    Tailored Plan
                  </div>
                )}


                {/* Header Zone */}
                <div className="pb-3 border-b border-[#F1F5F9] mb-3">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#FFE3D5] to-[#FF9882] flex items-center justify-center">
                      <Icon className="h-5 w-5 text-[#B71833]" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">{PLAN_INFO[plan].name}</h3>
                  </div>
                  <div className="mb-2">
                    {price ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-[#FF3030]">${price}</span>
                        <span className="text-xs text-muted-foreground font-bold">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                      </div>
                    ) : (
                      <div>
                        <div className="text-lg font-bold text-[#FF3030]">Custom</div>
                        <div className="text-xs text-muted-foreground font-bold">Dedicated Manager</div>
                      </div>
                    )}
                  </div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFE3D5] border border-[#FF9882]">
                    <Building2 className="h-3 w-3 text-[#B71833]" />
                    <span className="text-[10px] font-semibold text-[#B71833]">{details.credits} credits/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                  </div>
                </div>

                {/* CTA Zone - Moved to Top */}
                <div className="mb-3">
                  {plan === "enterprise" ? (
                    <button className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-[#FF3030] to-[#B71833] hover:from-[#B71833] hover:to-[#7A0930] text-white text-sm font-semibold transition-all">
                      Contact Sales
                    </button>
                  ) : (
                    <button
                      className="w-full px-3 py-2 rounded-lg text-sm font-semibold transition-all bg-gradient-to-r from-[#FF3030] to-[#B71833] hover:from-[#B71833] hover:to-[#7A0930] text-white"
                      onClick={() => setSelectedPlan(plan)}
                      disabled={isCurrent}
                    >
                      {isCurrent ? "Current Plan" : "Upgrade Now"}
                    </button>
                  )}
                </div>

                {/* Credit Zone */}
                {(plan === "pro" || plan === "premium" || plan === "enterprise") && (
                  <div className="bg-[#FFE3D5] border border-[#FF9882] rounded-md p-2 mb-3">
                    <div className="text-[10px] font-semibold text-[#B71833] mb-1">Credit Usage:</div>
                    <div className="text-[10px] text-[#B71833]">• Contact Email: 1 Credit</div>
                    <div className="text-[10px] text-[#B71833]">• Contact Phone: 1 Credit</div>
                  </div>
                )}

                {/* Feature Zone */}
                <div className="flex-grow pt-1">
                  {details.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 mb-1.5">
                      <Check className="h-4 w-4 text-[#FF3030] shrink-0" />
                      <span className="text-[13px] text-foreground font-medium leading-[1.4]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {hasActiveSubscription && (
          <div className="bg-white border-2 border-[#E5E7EB] rounded-2xl p-5 mb-6 shadow-sm hover:shadow-md transition-shadow">
            <button
              onClick={() => setShowAddons(!showAddons)}
              className="w-full flex items-center justify-between mb-3"
            >
              <h3 className="text-base font-bold text-foreground">Additional Credits</h3>
              <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${showAddons ? "rotate-180" : ""}`} />
            </button>
            {showAddons && (
              <div className="grid md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                {ADDON_CREDITS.map((addon) => (
                  <button
                    key={addon.amount}
                    onClick={() => setSelectedAddon(selectedAddon === addon.amount ? null : addon.amount)}
                    className={`border-2 rounded-xl p-4 text-center transition-all hover:scale-105 ${
                      selectedAddon === addon.amount 
                        ? "border-[#FF3030] bg-[#FFE3D5] shadow-md" 
                        : "border-[#E5E7EB] hover:border-[#FF9882]"
                    }`}
                  >
                    <div className="text-2xl font-bold text-[#FF3030]">+{addon.amount.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground mt-1">${addon.price}</div>
                  </button>
                ))}
                <button className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-4 text-center hover:border-[#FF3030] hover:scale-105 transition-all">
                  <div className="text-sm font-semibold text-foreground">Custom</div>
                  <div className="text-xs text-muted-foreground mt-1">Contact us</div>
                </button>
              </div>
            )}
          </div>
        )}

        {selectedPlan && selectedPlan !== "enterprise" && (
          <div className="bg-gradient-to-r from-white to-[#FFF5F2] border-2 border-[#FF3030] rounded-2xl p-5 flex items-center justify-between gap-4 shadow-lg">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Total Amount</div>
              <div className="text-2xl font-bold text-[#FF3030]">
                ${getTotalPrice()}
                <span className="text-sm text-muted-foreground font-normal ml-2">/{billingCycle === "monthly" ? "month" : "year"}</span>
              </div>
            </div>
            <button 
              onClick={handlePurchase}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF3030] to-[#B71833] hover:from-[#B71833] hover:to-[#7A0930] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Upgrade Now
            </button>
          </div>
        )}
      </div>

      {/* Comparison Modal */}
      {showComparison && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowComparison(false)} />
          <div className="relative w-[90%] max-w-[920px] bg-white rounded-lg overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB] bg-white">
              <h2 className="text-base font-semibold text-foreground">Plan Feature Comparison</h2>
              <button onClick={() => setShowComparison(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="max-h-[500px] overflow-y-auto">
              <table className="w-full border-collapse">
                <thead className="bg-[#F9FAFB] sticky top-0">
                  <tr>
                    <th className="text-left px-4 py-3 text-[13px] font-semibold text-foreground border-b border-[#F1F5F9]">Feature</th>
                    <th className="text-center px-4 py-3 text-[13px] font-semibold text-foreground border-b border-[#F1F5F9]">Pro</th>
                    <th className="text-center px-4 py-3 text-[13px] font-semibold text-foreground border-b border-[#F1F5F9]">Premium</th>
                    <th className="text-center px-4 py-3 text-[13px] font-semibold text-foreground border-b border-[#F1F5F9]">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {FEATURES.map((feature) => {
                    const availableInPro = feature.requiresPlan === 'pro';
                    const availableInPremium = feature.requiresPlan === 'pro' || feature.requiresPlan === 'premium';
                    const availableInEnterprise = true;
                    
                    return (
                      <tr key={feature.id} className="hover:bg-[#FAFAFA] transition-colors">
                        <td className="px-4 py-2.5 text-[13px] text-foreground border-b border-[#F1F5F9]">{feature.name}</td>
                        <td className="px-4 py-2.5 text-center border-b border-[#F1F5F9]">
                          {availableInPro ? (
                            <Check className="h-4 w-4 text-[#FF3030] mx-auto" />
                          ) : (
                            <Minus className="h-4 w-4 text-[#CBD5E1] mx-auto" />
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-center border-b border-[#F1F5F9]">
                          {availableInPremium ? (
                            <Check className="h-4 w-4 text-[#FF3030] mx-auto" />
                          ) : (
                            <Minus className="h-4 w-4 text-[#CBD5E1] mx-auto" />
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-center border-b border-[#F1F5F9]">
                          {availableInEnterprise ? (
                            <Check className="h-4 w-4 text-[#FF3030] mx-auto" />
                          ) : (
                            <Minus className="h-4 w-4 text-[#CBD5E1] mx-auto" />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-4 py-3 border-t border-[#E5E7EB] bg-white">
              <button
                onClick={() => {
                  setShowComparison(false);
                  setSelectedPlan('premium');
                }}
                className="px-4 py-2 rounded-md bg-[#FF3030] hover:bg-[#B71833] text-white text-[13px] font-medium transition-colors"
              >
                Upgrade to Premium
              </button>
              <button
                onClick={() => setShowComparison(false)}
                className="px-4 py-2 rounded-md border border-[#E5E7EB] hover:bg-[#F9FAFB] text-foreground text-[13px] font-medium transition-colors"
              >
                Contact Enterprise
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
