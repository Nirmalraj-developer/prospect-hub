import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bookmark, Download, Sparkles, TrendingUp, Database, Lock, Zap, Star, Crown, FileSpreadsheet, Users, Share2, Palette, Shield, ArrowRight, Clock, CheckCircle, CheckCheck, ShieldOff, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpgradeModal } from "@/components/UpgradeModal";
import { PlanTier, FEATURES, hasAccess, PLAN_INFO, PLAN_FEATURES } from "@/lib/plans";
import { usePlan } from "@/contexts/PlanContext";
import { AIInsightWidget } from "@/components/AIInsightWidget";

const ICON_MAP: Record<string, any> = {
  Search, Bookmark, Download, Sparkles, TrendingUp, Database, FileSpreadsheet, Users, Share2, Palette, Shield, CheckCircle, CheckCheck, ShieldOff
};

export default function HomePage() {
  const navigate = useNavigate();
  const { currentPlan } = usePlan();
  const [selectedPlan, setSelectedPlan] = useState<PlanTier>(currentPlan === 'trial' ? 'pro' : currentPlan);
  const [upgradeModal, setUpgradeModal] = useState<{ open: boolean; feature?: any }>({ open: false });
  const [credits, setCredits] = useState(0);
  const [showTrialInfo, setShowTrialInfo] = useState(false);

  useEffect(() => {
    if (currentPlan === 'trial') {
      const hasSeenTrialInfo = sessionStorage.getItem('hasSeenTrialInfo');
      if (!hasSeenTrialInfo) {
        setTimeout(() => setShowTrialInfo(true), 500);
        sessionStorage.setItem('hasSeenTrialInfo', 'true');
      }
    }
  }, [currentPlan]);

  useEffect(() => {
    const timer = setTimeout(() => {
      let count = 0;
      const target = 45207;
      const increment = target / 50;
      const interval = setInterval(() => {
        count += increment;
        if (count >= target) {
          setCredits(target);
          clearInterval(interval);
        } else {
          setCredits(Math.floor(count));
        }
      }, 16);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleFeatureClick = (feature: any) => {
    navigate(feature.route);
  };

  const getFeatureCTA = (featureId: string) => {
    const ctaMap: Record<string, string> = {
      'find-leads': 'Start Prospect Search',
      'saved-lists': 'View Saved Lists',
      'request-custom-list': 'Submit ICP Request',
      'export-leads': 'Export Contacts',
      'ai-lead-finder': 'Run AI Targeting',
      'ai-role-targeting': 'Run AI Targeting',
      'ai-market-targeting': 'Generate Market Targets',
      'enrich-leads': 'Enrich Data',
      'email-validation': 'Validate Emails',
      'advanced-targeting': 'Configure Filters',
      'team-access-5': 'Manage Team Access',
      'bulk-email-validation': 'Run Bulk Validation',
      'suppression-management': 'Manage Suppression List',
      'crm-sync': 'Sync to CRM',
      'team-access-10': 'Manage Team Access',
      'shared-lists': 'Access Shared Lists',
      'white-label-platform': 'Configure Branding'
    };
    return ctaMap[featureId] || 'Launch Tool';
  };

  const getAllFeatures = () => {
    const allPlans: PlanTier[] = ['pro', 'premium', 'enterprise'];
    const allFeatures: Array<{ plan: PlanTier; feature: any }> = [];
    
    allPlans.forEach(plan => {
      const featureIds = PLAN_FEATURES[plan];
      featureIds.forEach(id => {
        const feature = FEATURES.find(f => f.id === id);
        if (feature && !allFeatures.some(f => f.feature.id === feature.id)) {
          allFeatures.push({ plan, feature });
        }
      });
    });
    
    return allFeatures;
  };

  const getIncludedText = (plan: PlanTier) => {
    if (plan === 'premium') return 'Everything in Pro + Advanced AI & Team Collaboration';
    if (plan === 'enterprise') return 'Everything in Pro + Premium + Enterprise Features';
    return '';
  };

  const getQuickActions = () => {
    const actions = {
      pro: [
        { label: 'Start Search', icon: Search, route: '/prospect-search' },
        { label: 'AI Search', icon: Sparkles, route: '/prospect-search?ai=limited', isAI: true },
        { label: 'Saved Lists', icon: Bookmark, route: '/saved-search' }
      ],
      premium: [
        { label: 'Start Search', icon: Search, route: '/prospect-search' },
        { label: 'AI Search', icon: Sparkles, route: '/prospect-search?ai=full', isAI: true },
        { label: 'Saved Lists', icon: Bookmark, route: '/saved-search' }
      ],
      enterprise: [
        { label: 'Start Search', icon: Search, route: '/prospect-search' },
        { label: 'AI Search', icon: Sparkles, route: '/prospect-search?ai=full', isAI: true },
        { label: 'Saved Lists', icon: Bookmark, route: '/saved-search' }
      ]
    };
    return actions[currentPlan];
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col relative bg-gradient-to-br from-[#FFF5F2] to-white">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#FF3030]/5 to-[#FF9882]/5 rounded-full blur-3xl background-glow" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#FFE3D5]/30 to-[#FF9882]/10 rounded-full blur-3xl background-glow" style={{ animationDelay: '10s' }} />
      </div>

      <div className="relative flex flex-col h-full">
        {/* Workspace Overview Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase mb-1.5">Intelligence Workspace</div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <h1 className="text-lg font-bold text-foreground">Welcome, <span className="text-primary">Nirmal Raj</span></h1>
              <span className="px-2 py-0.5 rounded-md bg-muted text-[10px] font-semibold text-foreground uppercase tracking-wide">
                {PLAN_INFO[currentPlan].name}
              </span>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span className="text-[11px] text-muted-foreground">Active</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-foreground count-up">{credits.toLocaleString()}</span>
                <span className="text-muted-foreground">Credits</span>
              </div>
              <div className="h-3 w-px bg-border" />
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-foreground">3</span>
                <span className="text-muted-foreground">Searches</span>
              </div>
              <div className="h-3 w-px bg-border" />
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-foreground">1</span>
                <span className="text-muted-foreground">Export</span>
              </div>
              <div className="h-3 w-px bg-border" />
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-foreground">8</span>
                <span className="text-muted-foreground">Saved Lists</span>
              </div>
            </div>
          </div>
          <AIInsightWidget />
        </div>

        {/* Section Header */}
        <div className="mb-3">
          <p className="text-xs text-muted-foreground">
            Access your intelligence tools and accelerate your prospecting workflow
          </p>
        </div>

        {/* Feature Grid - Single Scrollable Container */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-3 gap-3 pb-4">
            {getAllFeatures().map(({ plan, feature }, index) => {
              const Icon = ICON_MAP[feature.icon];
              const locked = !hasAccess(currentPlan, feature.requiresPlan);
              const isAI = feature.isAI;

              return (
                <div
                  key={feature.id}
                  onClick={() => handleFeatureClick(feature)}
                  className={`relative bg-white border border-black/[0.06] rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 cursor-pointer fade-in-up ${
                    locked
                      ? 'opacity-75'
                      : 'hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
                  }`}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {locked && (
                    <div className="absolute inset-0 bg-[#FF3030]/[0.025] rounded-2xl pointer-events-none" />
                  )}
                  
                  {/* Icon */}
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 relative ${
                    locked
                      ? 'bg-muted text-muted-foreground'
                      : isAI
                      ? 'bg-[#FFE3D5] text-[#B71833]'
                      : 'bg-[#FFE3D5] text-[#B71833]'
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className={`text-[17px] font-semibold flex-1 ${locked ? 'text-muted-foreground' : 'text-[#1C1C1E]'}`}>
                        {feature.name}
                      </h3>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {currentPlan === 'trial' && !locked && (
                          <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-green-50 text-green-700 border border-green-200">
                            <Clock className="h-2.5 w-2.5" />
                            Trial
                          </div>
                        )}
                        {isAI && (
                          <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                            locked ? 'bg-muted text-muted-foreground border border-border' : 'bg-[#FFE3D5] text-[#B71833] border border-[#FF9882]'
                          }`}>
                            <Sparkles className="h-2.5 w-2.5" />
                            AI
                          </div>
                        )}
                        {locked && (
                          <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <p className={`text-[13px] leading-relaxed line-clamp-2 mb-4 ${
                      locked ? 'text-muted-foreground' : 'text-[rgba(60,60,67,0.7)]'
                    }`}>
                      {feature.description}
                    </p>
                    
                    {/* CTA */}
                    {locked ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setUpgradeModal({ open: true, feature });
                        }}
                        className="text-[13px] text-[#FF3030] hover:text-[#B71833] font-medium transition-colors"
                      >
                        Unlock with {PLAN_INFO[feature.requiresPlan].name} →
                      </button>
                    ) : (
                      <button className="px-3 py-1.5 rounded-lg bg-[#FF3030] hover:bg-[#B71833] text-white text-xs font-medium transition-colors">
                        {getFeatureCTA(feature.id)}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {upgradeModal.feature && (
        <UpgradeModal
          open={upgradeModal.open}
          onClose={() => setUpgradeModal({ open: false })}
          currentPlan={currentPlan}
          requiredPlan={upgradeModal.feature.requiresPlan}
          featureName={upgradeModal.feature.name}
        />
      )}

      {/* Trial Info Popup */}
      {showTrialInfo && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[1000]" onClick={() => setShowTrialInfo(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001] w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-2xl p-6 mx-4 animate-in fade-in zoom-in duration-300">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                  <Info className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2">Welcome to Your 3-Day Trial!</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    You have full access to all <span className="font-semibold text-foreground">Pro features</span> for the next 3 days. Explore lead finding, AI search, data export, and more—completely free.
                  </p>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <span className="text-xs font-semibold text-amber-900">Trial expires in 3 days</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowTrialInfo(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-6 flex gap-3">
                <Button
                  onClick={() => setShowTrialInfo(false)}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                >
                  Get Started
                </Button>
                <Button
                  onClick={() => {
                    setShowTrialInfo(false);
                    setSelectedPlan('premium');
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  View Plans
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
