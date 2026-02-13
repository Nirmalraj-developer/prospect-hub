import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bookmark, Download, Sparkles, TrendingUp, Database, Lock, FolderKey, Star, Crown, FileSpreadsheet, Users, Share2, Palette, Shield, ArrowRight, Clock, CheckCircle, CheckCheck, ShieldOff, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpgradeModal } from "@/components/UpgradeModal";
import { PlanTier, FEATURES, hasAccess, PLAN_INFO, PLAN_FEATURES } from "@/lib/plans";
import { usePlan } from "@/contexts/PlanContext";
import { AIInsightWidget } from "@/components/AIInsightWidget";
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

    // Default to premium as requested in step 6
    // const [activeTier, setActiveTier] = useState('premium')

    // Credits Animation
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

    const getFeaturesForTab = (tab: "pro" | "premium" | "enterprise") => {
        // Exact mapping from requirements
        const featureMap = {
            pro: ['find-leads', 'saved-lists', 'request-custom-list', 'export-leads'],
            premium: ['ai-lead-finder', 'ai-role-targeting', 'ai-market-targeting', 'enrich-leads', 'email-validation', 'advanced-targeting', 'team-access-5'],
            enterprise: ['bulk-email-validation', 'suppression-management', 'crm-sync', 'shared-lists', 'white-label-platform', 'team-access-10']
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
                <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-4">
                        Access your intelligence tools and accelerate your prospecting workflow
                    </p>

                    {/* Tier Tabs - Exact Styling */}
                    <div className="flex gap-2 w-full overflow-x-auto justify-center pt-5 pb-1">
                        {(['pro', 'premium', 'enterprise'] as const).map((tier) => (
                            <button
                                key={tier}
                                onClick={() => setActiveTier(tier)}
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

                    {/* Tier Highlight Banner */}
                    {activeTier !== 'pro' && (
                        <div
                            key={activeTier}
                            className="mx-auto max-w-fit mt-2 mb-3 px-2.5 py-1.5 rounded-md text-xs font-medium border text-center animate-in fade-in slide-in-from-bottom-1 duration-200"
                            style={{
                                backgroundColor: 'rgba(255,48,48,0.06)',
                                borderColor: theme.light,
                                color: theme.dark,
                                lineHeight: 1.3
                            }}
                        >
                            {activeTier === 'premium' && "Everything in Pro + Advanced AI & Team Collaboration"}
                            {activeTier === 'enterprise' && "Everything in Premium + CRM Sync & White Label Platform"}
                        </div>
                    )}
                </div>

                {/* Feature Grid */}
                <div className="flex-1 overflow-y-auto">
                    {/* Grid Layout */}
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
                                    onClick={() => !locked && handleFeatureClick(feature)}
                                    className={`relative bg-white border border-black/[0.06] rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 cursor-pointer ${locked
                                        ? 'opacity-75 cursor-not-allowed'
                                        : 'hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
                                        }`}
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                        borderColor: !locked ? 'transparent' : undefined // Let hover effect handle border color via CSS or class
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!locked) e.currentTarget.style.borderColor = theme.light;
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!locked) e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)';
                                    }}
                                >
                                    {locked && (
                                        <div className="absolute inset-0 bg-[#FF3030]/[0.025] rounded-2xl pointer-events-none" />
                                    )}

                                    {/* Icon */}
                                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 relative ${locked
                                        ? 'bg-muted text-muted-foreground'
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

                                        <p className={`text-[13px] leading-relaxed line-clamp-2 mb-4 ${locked ? 'text-muted-foreground' : 'text-[rgba(60,60,67,0.7)]'
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
                                                className="px-3 py-1.5 rounded-lg text-white text-xs font-medium transition-colors flex items-center gap-1 shadow-sm"
                                                style={{ backgroundColor: theme.default }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.dark}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.default}
                                            >
                                                Upgrade to {activeTier.charAt(0).toUpperCase() + activeTier.slice(1)} →
                                            </button>
                                        ) : (
                                            <button
                                                className="px-3 py-1.5 rounded-lg text-white text-xs font-medium transition-colors"
                                                style={{ backgroundColor: theme.default }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.dark}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.default}
                                            >
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
                    requiredPlan={activeTier}
                    featureName={upgradeModal.feature.name}
                />
            )}
        </div>
    );
}
