import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bookmark, Download, Sparkles, TrendingUp, Database, Lock, FolderKey, Star, Crown, FileSpreadsheet, Users, Share2, Palette, Shield, ArrowRight, Clock, CheckCircle, CheckCheck, ShieldOff, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpgradeModal } from "@/components/UpgradeModal";
import { PlanTier, FEATURES, hasAccess, PLAN_INFO, PLAN_FEATURES } from "@/lib/plans";
import { usePlan } from "@/contexts/PlanContext";
import { AIInsightWidget } from "@/components/AIInsightWidget";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, any> = {
    Search, Bookmark, Download, Sparkles, TrendingUp, Database, FileSpreadsheet, Users, Share2, Palette, Shield, CheckCircle, CheckCheck, ShieldOff
};

export default function HomePage2() {
    const navigate = useNavigate();
    const { currentPlan } = usePlan();
    const [activeTier, setActiveTier] = useState<"pro" | "premium" | "enterprise">("premium");
    const [upgradeModal, setUpgradeModal] = useState<{ open: boolean; feature?: any }>({ open: false });
    const [credits, setCredits] = useState(0);
    const [bannerVisible, setBannerVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    // Default to premium as requested in step 6
    // const [activeTier, setActiveTier] = useState('premium')

    // Credits Animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
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
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const handleFeatureClick = (feature: any, locked: boolean) => {
        if (!locked) {
            navigate(feature.route);
        }
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

    const getFeaturesForTab = (tab: "pro" | "premium" | "enterprise") => {
        // Exact mapping from requirements
        const featureMap = {
            pro: ['find-leads', 'saved-lists', 'request-custom-list', 'export-leads'],
            premium: ['enrich-leads', 'email-validation', 'advanced-targeting', 'team-access-5'],
            enterprise: ['suppression-management', 'crm-sync', 'shared-lists', 'white-label-platform', 'team-access-10']
        };

        const targetIds = featureMap[tab] || [];
        // We map manually to preserve the order requested
        return targetIds.map(id => FEATURES.find(f => f.id === id)).filter(Boolean) as typeof FEATURES;
    };

    const getThemeColors = () => {
        // ThemeColorPresets.Red mapping
        return {
            lighter: '#FFE3D5',
            light: '#FF9882',
            default: '#FF3030',
            dark: '#B71833'
        };
    }
    const theme = getThemeColors();

    const getTierInheritanceBanner = () => {
        if (activeTier === 'pro') return 'Everything in Pro';
        if (activeTier === 'premium') return "Everything in Pro + Data Enhancement, Data Validation & Team Collaboration";
        if (activeTier === 'enterprise') return 'Everything in Premium + Data Compliance, Data Integrations & White Labelling';
        return '';
    };

    const handleTierChange = (tier: "pro" | "premium" | "enterprise") => {
        setBannerVisible(false);
        setTimeout(() => {
            setActiveTier(tier);
            setBannerVisible(true);
        }, 100);
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
                <div className="flex items-center justify-between mb-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h1 className="text-xl font-bold text-foreground">Welcome back, <span className="text-[#FF3030]">Nirmal Raj</span></h1>
                                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide" style={{ backgroundColor: PLAN_INFO[currentPlan].bgColor.replace('bg-', ''), color: 'white' }}>
                                        {PLAN_INFO[currentPlan].name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1.5">
                                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-xs text-muted-foreground font-medium">Active Subscription</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">•</span>
                                    <span className="text-xs text-muted-foreground">Last login: Today, 9:42 AM</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Stats Cards */}
                        <div className="grid grid-cols-4 gap-3">
                            <div className="bg-white border border-border rounded-lg p-3 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-muted-foreground font-medium">Credits</span>
                                    <div className="h-6 w-6 rounded-md bg-[#FFE3D5] flex items-center justify-center">
                                        <Sparkles className="h-3.5 w-3.5 text-[#B71833]" />
                                    </div>
                                </div>
                                <div className="text-xl font-bold text-foreground count-up">{credits.toLocaleString()}</div>
                                <div className="text-[10px] text-green-600 font-medium mt-0.5">Available</div>
                            </div>
                            
                            <div className="bg-white border border-border rounded-lg p-3 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-muted-foreground font-medium">Searches</span>
                                    <div className="h-6 w-6 rounded-md bg-blue-50 flex items-center justify-center">
                                        <Search className="h-3.5 w-3.5 text-blue-600" />
                                    </div>
                                </div>
                                <div className="text-xl font-bold text-foreground">3</div>
                                <div className="text-[10px] text-muted-foreground font-medium mt-0.5">This month</div>
                            </div>
                            
                            <div className="bg-white border border-border rounded-lg p-3 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-muted-foreground font-medium">Exports</span>
                                    <div className="h-6 w-6 rounded-md bg-green-50 flex items-center justify-center">
                                        <Download className="h-3.5 w-3.5 text-green-600" />
                                    </div>
                                </div>
                                <div className="text-xl font-bold text-foreground">1</div>
                                <div className="text-[10px] text-muted-foreground font-medium mt-0.5">Completed</div>
                            </div>
                            
                            <div className="bg-white border border-border rounded-lg p-3 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-muted-foreground font-medium">Saved Lists</span>
                                    <div className="h-6 w-6 rounded-md bg-purple-50 flex items-center justify-center">
                                        <Bookmark className="h-3.5 w-3.5 text-purple-600" />
                                    </div>
                                </div>
                                <div className="text-xl font-bold text-foreground">8</div>
                                <div className="text-[10px] text-muted-foreground font-medium mt-0.5">Total saved</div>
                            </div>
                        </div>
                    </div>
                    <AIInsightWidget />
                </div>

                {/* Section Header */}
                <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-4">
                        Access your intelligence tools and accelerate your prospecting workflow
                    </p>

                    {/* Tier Tabs - Exact Styling */}
                    <div className="flex gap-2 w-full overflow-x-auto justify-center pt-5 pb-1">
                        {(['pro', 'premium', 'enterprise'] as const).map((tier) => (
                            <button
                                key={tier}
                                onClick={() => handleTierChange(tier)}
                                className={cn(
                                    "relative h-[28px] px-3 text-xs rounded-md border transition-all duration-150 capitalize whitespace-nowrap flex items-center gap-2",
                                    activeTier === tier
                                        ? "font-medium"
                                        : "bg-white border-[#E5E7EB] text-slate-600 hover:border-[#FF9882]"
                                )}
                                style={activeTier === tier ? {
                                    backgroundColor: theme.lighter,
                                    color: theme.dark,
                                    borderColor: theme.light
                                } : {}}
                            >
                                {tier}
                                {tier === 'premium' && (
                                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#FF3030] text-white leading-none uppercase tracking-wider whitespace-nowrap shadow-sm">
                                        Popular
                                    </span>
                                )}
                                {tier === 'enterprise' && (
                                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-slate-800 text-white leading-none uppercase tracking-wider whitespace-nowrap shadow-sm">
                                        Tailored
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tier Inheritance Banner */}
                    <div
                        className={cn(
                            "mx-auto max-w-fit mt-2 mb-3 px-2.5 py-1.5 rounded-md text-xs font-medium border text-center transition-all duration-180",
                            bannerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                        )}
                        style={{
                            backgroundColor: 'rgba(255,48,48,0.06)',
                            borderColor: theme.lighter,
                            color: theme.dark,
                            lineHeight: 1.3
                        }}
                    >
                        {getTierInheritanceBanner()}
                    </div>
                </div>

                {/* Feature Grid */}
                <div className="flex-1 overflow-y-auto">
                    {isLoading ? (
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 pb-4">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white border border-black/[0.06] rounded-2xl p-6">
                                    <Skeleton className="h-12 w-12 rounded-xl mb-4" />
                                    <Skeleton className="h-5 w-3/4 mb-2" />
                                    <Skeleton className="h-4 w-full mb-1" />
                                    <Skeleton className="h-4 w-5/6 mb-4" />
                                    <Skeleton className="h-9 w-32" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="feature-grid grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 pb-4 animate-in fade-in slide-in-from-bottom-1 duration-150" key={activeTier}>
                        {getFeaturesForTab(activeTier).map((feature, index) => {
                            const Icon = ICON_MAP[feature.icon];

                            // Plan hierarchy calculation
                            const planLevels = { trial: 1, pro: 1, premium: 2, enterprise: 3 };
                            const tierLevels = { pro: 1, premium: 2, enterprise: 3 };

                            const userLevel = planLevels[currentPlan];
                            const tierLevel = tierLevels[activeTier];

                            // Locked logic: if user plan < active tier
                            const locked = userLevel < tierLevel;

                            const isAI = feature.isAI;

                            return (
                                <div
                                    key={feature.id}
                                    onClick={() => handleFeatureClick(feature, locked)}
                                    onMouseEnter={() => setHoveredCard(feature.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    className={cn(
                                        "relative bg-white border rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 cursor-pointer",
                                        locked ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-[0_8px_16px_rgba(0,0,0,0.12)] hover:-translate-y-1',
                                        hoveredCard === feature.id && !locked && 'scale-[1.02]'
                                    )}
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                        borderColor: hoveredCard === feature.id && !locked ? theme.light : 'rgba(0,0,0,0.06)'
                                    }}
                                >
                                    {locked && (
                                        <div className="absolute inset-0 bg-[#FF3030]/[0.025] rounded-2xl pointer-events-none" />
                                    )}

                                    {/* Icon */}
                                    <div className={cn(
                                        "h-12 w-12 rounded-xl flex items-center justify-center mb-4 relative transition-all duration-200",
                                        locked ? 'bg-muted text-muted-foreground' : 'bg-[#FFE3D5] text-[#B71833]',
                                        hoveredCard === feature.id && !locked && 'scale-110 rotate-3'
                                    )}>
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative">
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <h3 className={`text-[17px] font-semibold flex-1 ${locked ? 'text-muted-foreground' : 'text-[#1C1C1E]'}`}>
                                                {feature.name}
                                            </h3>
                                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                                {isAI && (
                                                    <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${locked ? 'bg-muted text-muted-foreground border border-border' : 'bg-[#FFE3D5] text-[#B71833] border border-[#FF9882]'
                                                        }`}>
                                                        <Sparkles className="h-2.5 w-2.5" />
                                                        AI
                                                    </div>
                                                )}
                                                {locked && (
                                                    <Lock className="h-3.5 w-3.5" style={{ color: theme.light }} />
                                                )}
                                            </div>
                                        </div>

                                        <p className={`text-[13px] leading-relaxed line-clamp-2 ${locked ? 'text-muted-foreground' : 'text-[rgba(60,60,67,0.7)]'
                                            }`}>
                                            {feature.description}
                                        </p>

                                        {locked && (
                                            <div className="text-[11px] text-[#64748B] mt-1 mb-3">
                                                Available in {activeTier.charAt(0).toUpperCase() + activeTier.slice(1)}
                                            </div>
                                        )}

                                        {/* CTA */}
                                        <div className="mt-4">
                                            {locked ? (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setUpgradeModal({ open: true, feature });
                                                    }}
                                                    className="text-xs font-medium transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-1"
                                                    style={{ color: theme.dark }}
                                                >
                                                    Upgrade to unlock {feature.name}
                                                    <ArrowRight className="h-3 w-3" />
                                                </button>
                                            ) : (
                                                <button
                                                    className="px-3 py-1.5 rounded-lg text-white text-xs font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                                                    style={{ backgroundColor: theme.default }}
                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.dark}
                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.default}
                                                >
                                                    {getFeatureCTA(feature.id)}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    )}
                </div>
            </div>

            {upgradeModal.feature && (
                <UpgradeModal
                    open={upgradeModal.open}
                    onClose={() => setUpgradeModal({ open: false })}
                    currentPlan={currentPlan}
                    requiredPlan={activeTier}
                    featureName={upgradeModal.feature.name}
                />
            )}
        </div>
    );
}
