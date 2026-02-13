import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Check, ArrowLeft, Sparkles, Zap, Crown, Building2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlan } from "@/contexts/PlanContext";
import { PLAN_INFO, PlanTier } from "@/lib/plans";

const PLAN_DETAILS = {
  pro: {
    monthlyPrice: 99,
    yearlyPrice: 990,
    credits: "5,000",
    icon: Zap,
    features: ["Find Your Leads", "Saved Lists", "Request Custom Leads", "Export Leads", "AI Lead Finder (Limited)"]
  },
  premium: {
    monthlyPrice: 299,
    yearlyPrice: 2990,
    credits: "15,000",
    icon: Sparkles,
    features: ["Everything in Pro", "AI Role Targeting", "AI Market Targeting", "Data Enrichment", "Email Validation", "Team Access (5 Users)"]
  },
  enterprise: {
    monthlyPrice: null,
    yearlyPrice: null,
    credits: "Unlimited",
    icon: Crown,
    features: ["Everything in Premium", "Bulk Email Validation", "Suppression Management", "CRM Sync", "Team Access (10 Users)", "Shared Lists", "White Label Platform"]
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-6 hover:bg-muted/50">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {featureName && requiredPlan && (
          <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 border border-primary/20 rounded-2xl p-4 mb-8 backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-500">
            <p className="text-sm font-medium text-foreground text-center">
              Upgrade to <span className="font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">{PLAN_INFO[requiredPlan].name}</span> to unlock <span className="font-bold">{featureName}</span>
            </p>
          </div>
        )}

        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-6 duration-700">
          <h1 className="text-4xl font-bold text-foreground mb-2">Choose Your Plan</h1>
          <p className="text-muted-foreground">Select the plan that fits your intelligence needs</p>
        </div>

        <div className="flex justify-center mb-12 animate-in fade-in slide-in-from-top-8 duration-900">
          <div className="relative inline-flex items-center bg-muted/50 backdrop-blur-sm rounded-full p-1 border border-border shadow-inner">
            <div
              className={`absolute h-[calc(100%-8px)] bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-300 shadow-lg ${
                billingCycle === "monthly" ? "left-1 w-[calc(50%-4px)]" : "left-[calc(50%+2px)] w-[calc(50%-4px)]"
              }`}
            />
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                billingCycle === "monthly" ? "text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                billingCycle === "yearly" ? "text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly <span className="text-green-600 ml-1 font-bold">Save 17%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {(["pro", "premium", "enterprise"] as const).map((plan, idx) => {
            const details = PLAN_DETAILS[plan];
            const price = getPrice(plan);
            const isRecommended = plan === requiredPlan;
            const isCurrent = plan === currentPlan;
            const Icon = details.icon;

            return (
              <div
                key={plan}
                className={`relative bg-card/50 backdrop-blur-sm border-2 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl animate-in fade-in slide-in-from-bottom-4 ${
                  selectedPlan === plan 
                    ? "border-primary shadow-xl shadow-primary/20" 
                    : "border-border hover:border-primary/50"
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {isRecommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg animate-in zoom-in duration-500">
                    Recommended
                  </div>
                )}
                {isCurrent && (
                  <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
                    Current Plan
                  </div>
                )}

                <div className="flex justify-center mb-4">
                  <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${
                    plan === "pro" ? "bg-blue-100" : plan === "premium" ? "bg-purple-100" : "bg-amber-100"
                  }`}>
                    <Icon className={`h-7 w-7 ${
                      plan === "pro" ? "text-blue-600" : plan === "premium" ? "text-purple-600" : "text-amber-600"
                    }`} />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{PLAN_INFO[plan].name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    {price ? (
                      <>
                        <span className="text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">${price}</span>
                        <span className="text-muted-foreground text-sm">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">Custom</span>
                    )}
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/50 border border-border">
                    <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">{details.credits} credits/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {details.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-foreground leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan === "enterprise" ? (
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transition-all" size="lg">
                    Contact Sales
                  </Button>
                ) : (
                  <Button
                    className={`w-full shadow-lg hover:shadow-xl transition-all ${
                      selectedPlan === plan 
                        ? "bg-gradient-to-r from-primary to-purple-600 hover:from-primary hover:to-purple-700 text-white" 
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    }`}
                    size="lg"
                    onClick={() => setSelectedPlan(plan)}
                  >
                    {isCurrent ? "Current Plan" : "Select Plan"}
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        {hasActiveSubscription && (
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <button
              onClick={() => setShowAddons(!showAddons)}
              className="w-full flex items-center justify-between mb-4"
            >
              <h3 className="text-lg font-bold text-foreground">Additional Credits</h3>
              <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${showAddons ? "rotate-180" : ""}`} />
            </button>
            {showAddons && (
              <div className="grid md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                {ADDON_CREDITS.map((addon) => (
                  <button
                    key={addon.amount}
                    onClick={() => setSelectedAddon(selectedAddon === addon.amount ? null : addon.amount)}
                    className={`border-2 rounded-xl p-4 text-center transition-all hover:scale-105 ${
                      selectedAddon === addon.amount 
                        ? "border-primary bg-primary/10 shadow-lg" 
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="text-2xl font-bold text-foreground">+{addon.amount.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground mt-1">${addon.price}</div>
                  </button>
                ))}
                <button className="border-2 border-dashed border-border rounded-xl p-4 text-center hover:border-primary transition-all hover:scale-105">
                  <div className="text-sm font-medium text-foreground">Custom</div>
                  <div className="text-xs text-muted-foreground mt-1">Contact us</div>
                </button>
              </div>
            )}
          </div>
        )}

        {selectedPlan && selectedPlan !== "enterprise" && (
          <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border p-4 shadow-2xl md:relative md:bg-card/50 md:border md:rounded-2xl md:shadow-xl animate-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  ${getTotalPrice()}
                  <span className="text-base text-muted-foreground ml-2">/{billingCycle === "monthly" ? "month" : "year"}</span>
                </div>
              </div>
              <Button 
                size="lg" 
                onClick={handlePurchase}
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all px-8"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Upgrade Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
