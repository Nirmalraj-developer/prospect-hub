import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bookmark, Download, Sparkles, TrendingUp, Database, Lock, Zap, Star, Crown, FileSpreadsheet, Users, Share2, Palette, Shield, ArrowRight, Clock, CheckCircle, CheckCheck, ShieldOff, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpgradeModal } from "@/components/UpgradeModal";
import { PlanTier, FEATURES, hasAccess, PLAN_INFO, PLAN_FEATURES } from "@/lib/plans";
import { usePlan } from "@/contexts/PlanContext";

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

  const getDisplayFeatures = () => {
    const featureIds = PLAN_FEATURES[selectedPlan];
    return featureIds.map(id => FEATURES.find(f => f.id === id)!).filter(Boolean);
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
    <div className="h-[calc(100vh-3.5rem)] flex flex-col relative">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl background-glow" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/5 to-purple-500/5 rounded-full blur-3xl background-glow" style={{ animationDelay: '10s' }} />
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
        </div>

        {/* Plan Selector */}
        <div className="flex justify-center mb-3">
          <div className="inline-flex bg-muted/50 rounded-xl p-1 gap-1.5">
            <button
              onClick={() => setSelectedPlan('pro')}
              className={`relative px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                selectedPlan === 'pro'
                  ? 'bg-white text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Pro
            </button>
            
            <button
              onClick={() => setSelectedPlan('premium')}
              className={`relative px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                selectedPlan === 'premium'
                  ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {selectedPlan !== 'premium' && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-primary text-white text-xs rounded-md whitespace-nowrap shadow-large animate-pulse">
                  Popular
                </div>
              )}
              <div className="flex items-center gap-1">
                <Star className="h-2.5 w-2.5" />
                Premium
              </div>
            </button>
            
            <button
              onClick={() => setSelectedPlan('enterprise')}
              className={`relative px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                selectedPlan === 'enterprise'
                  ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-1">
                <Crown className="h-2.5 w-2.5" />
                Enterprise
              </div>
            </button>
          </div>
        </div>

        {/* Thin Included Features Strip */}
        {selectedPlan !== 'pro' && (
          <div className={`mb-2 px-3 py-1.5 rounded-lg border text-center ${
            selectedPlan === 'premium' 
              ? 'bg-purple-50/50 border-purple-200' 
              : 'bg-amber-50/50 border-amber-200'
          }`}>
            <span className="text-xs font-semibold text-foreground">
              ✓ {getIncludedText(selectedPlan)}
            </span>
          </div>
        )}

        {/* Section Header */}
        <div className="mb-3">
          <p className="text-xs text-muted-foreground">
            {selectedPlan !== currentPlan && selectedPlan !== 'pro'
              ? `Upgrade to ${PLAN_INFO[selectedPlan].name} to unlock ${selectedPlan === 'premium' ? 'advanced AI capabilities and team collaboration' : 'enterprise-grade features and priority support'}`
              : 'Access your intelligence tools and accelerate your prospecting workflow'
            }
          </p>
        </div>

        {/* Feature Grid - Flex 1 to fill remaining space */}
        <div className="flex-1 grid grid-cols-3 gap-3 content-start overflow-hidden">
          {getDisplayFeatures().map((feature, index) => {
            const Icon = ICON_MAP[feature.icon];
            const locked = !hasAccess(currentPlan, feature.requiresPlan);
            const isAI = feature.isAI;

            return (
              <div
                key={feature.id}
                onClick={() => handleFeatureClick(feature)}
                className={`relative bg-white rounded-xl p-3.5 transition-all duration-300 cursor-pointer fade-in-up hover:-translate-y-1 hover:shadow-lg ${
                  locked
                    ? 'border border-border opacity-75 hover:border-border'
                    : isAI
                    ? 'border-2 border-purple-200 hover:border-purple-400'
                    : 'border border-border hover:border-primary/40'
                }`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Icon */}
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-2.5 transition-all ${
                  locked
                    ? 'bg-muted text-muted-foreground'
                    : isAI
                    ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-md'
                    : 'bg-gradient-to-br from-primary/20 to-primary/10 text-primary'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className={`text-sm font-bold flex-1 ${locked ? 'text-muted-foreground' : 'text-foreground'}`}>
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
                          locked ? 'bg-muted text-muted-foreground border border-border' : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                        }`}>
                          <Sparkles className="h-2.5 w-2.5" />
                          AI
                        </div>
                      )}
                      {locked && (
                        <Lock className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2.5">
                    {feature.description}
                  </p>
                  
                  {/* Subtle Launch Link */}
                  {locked ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setUpgradeModal({ open: true, feature });
                      }}
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      Upgrade to {PLAN_INFO[feature.requiresPlan].name} →
                    </button>
                  ) : (
                    <div className="text-xs text-muted-foreground hover:text-foreground font-medium flex items-center gap-1 group">
                      Launch
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
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
