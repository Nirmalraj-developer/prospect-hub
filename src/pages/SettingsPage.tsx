import { usePlan } from '@/contexts/PlanContext';
import { Crown, Star, Check, Clock, X, Briefcase, Sparkles } from 'lucide-react';
import { PlanTier, PLAN_INFO, FEATURES, PLAN_FEATURES } from '@/lib/plans';
import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const { currentPlan, setCurrentPlan } = usePlan();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [selectedPlanPreview, setSelectedPlanPreview] = useState<PlanTier>(currentPlan);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const plans: { tier: PlanTier; icon: any }[] = [
    { tier: 'trial', icon: Clock },
    { tier: 'pro', icon: Briefcase },
    { tier: 'premium', icon: Sparkles },
    { tier: 'enterprise', icon: Crown }
  ];

  const handlePlanClick = (tier: PlanTier) => {
    setCurrentPlan(tier);
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedPlanPreview(tier);
    }, 120);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 320);
  };

  const getSelectedPlanFeatures = () => {
    const featureIds = PLAN_FEATURES[selectedPlanPreview];
    return FEATURES.filter(f => featureIds.includes(f.id));
  };

  const getFeaturesByCategory = () => {
    const features = getSelectedPlanFeatures();
    return {
      prospecting: features.filter(f => f.category === 'prospecting'),
      ai: features.filter(f => f.category === 'ai'),
      data: features.filter(f => f.category === 'data'),
      enterprise: features.filter(f => f.category === 'enterprise')
    };
  };

  const getPlanLimits = () => {
    const limits: Record<PlanTier, { users: string; emailValidation: string; export: string; whiteLabel: string }> = {
      trial: { users: '1', emailValidation: 'Limited', export: 'Yes', whiteLabel: 'No' },
      pro: { users: '3', emailValidation: 'Standard', export: 'Yes', whiteLabel: 'No' },
      premium: { users: '5', emailValidation: 'Enabled', export: 'Yes', whiteLabel: 'No' },
      enterprise: { users: '10', emailValidation: 'Enabled', export: 'Yes', whiteLabel: 'Enabled' }
    };
    return limits[selectedPlanPreview];
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(720px,2.6fr)_360px] gap-6 items-start w-full">
      {/* Left: Main Settings Content */}
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-1">Profile & Preferences</h1>
          <p className="text-sm text-muted-foreground">Manage your account preferences and plan</p>
        </div>

        {/* Account Identity Header */}
        <div className="flex items-center gap-4 p-3 mb-4 border border-[#E5E7EB] rounded-md bg-white">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-[#FFE3D5] text-[#B71833] flex items-center justify-center font-semibold text-sm shrink-0">
            N
          </div>

          {/* Account Meta */}
          <div className="flex-1">
            {/* Primary Info */}
            <div className="flex flex-col">
              <span className="text-base font-semibold text-[#1E293B]">Nirmal Raj</span>
              <span className="text-xs text-[#64748B]">nirmal@infynd.com</span>
            </div>

            {/* Secondary Info */}
            <div className="flex items-center gap-4 mt-1 text-xs">
              <span className="text-[#10B981] font-medium">Active</span>
              <span className="px-1.5 py-0.5 rounded bg-[#FFE3D5] text-[#B71833] font-medium">{PLAN_INFO[currentPlan].name}</span>
              <span className="text-[#94A3B8]">Last login: Today, 9:42 AM</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowEditProfile(true)}
              className="px-3 py-1.5 rounded-md border border-[#E5E7EB] text-[#334155] hover:border-[#FF3030] hover:text-[#FF3030] text-xs font-medium transition-colors"
            >
              Edit Profile
            </button>
            <button
              onClick={() => setShowChangePassword(true)}
              className="px-3 py-1.5 rounded-md border border-[#E5E7EB] text-[#334155] hover:border-[#FF3030] hover:text-[#FF3030] text-xs font-medium transition-colors"
            >
              Change Password
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border p-6 mb-6">
          <h2 className="text-lg font-bold text-foreground mb-1">UI Preferences</h2>
          <p className="text-sm text-muted-foreground mb-4">Customize your workspace layout</p>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Home Layout</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="homepage1"
                    name="homeLayout"
                    value="homepage1"
                    checked={localStorage.getItem('homeLayoutMode') !== 'homepage2'}
                    onChange={() => {
                      localStorage.setItem('homeLayoutMode', 'homepage1');
                      window.dispatchEvent(new Event('homeLayoutChanged'));
                      window.location.reload();
                    }}
                    className="accent-[#FF3030] h-4 w-4"
                  />
                  <label htmlFor="homepage1" className="text-sm text-foreground">Standard Layout (Single Grid)</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="homepage2"
                    name="homeLayout"
                    value="homepage2"
                    checked={localStorage.getItem('homeLayoutMode') === 'homepage2'}
                    onChange={() => {
                      localStorage.setItem('homeLayoutMode', 'homepage2');
                      window.dispatchEvent(new Event('homeLayoutChanged'));
                      window.location.reload();
                    }}
                    className="accent-[#FF3030] h-4 w-4"
                  />
                  <label htmlFor="homepage2" className="text-sm text-foreground">Tier-Based Layout (Tabs)</label>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5E7EB]">
              <h3 className="text-sm font-semibold text-foreground mb-2">Prospect Search</h3>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="customForm" className="text-sm text-foreground">Show Custom Form</label>
                  <p className="text-xs text-muted-foreground mt-0.5">Display custom order form instead of results grid</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="customForm"
                    checked={localStorage.getItem('showCustomForm') === 'true'}
                    onChange={(e) => {
                      localStorage.setItem('showCustomForm', e.target.checked.toString());
                      window.dispatchEvent(new Event('customFormChanged'));
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#FF3030]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF3030]"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-1">Current Plan</h2>
          <p className="text-sm text-muted-foreground mb-6">Switch plans to test different UI features and access levels</p>

          <div className="grid grid-cols-4 gap-4">
            {plans.map(({ tier, icon: Icon }) => {
              const info = PLAN_INFO[tier];
              const isActive = currentPlan === tier;

              return (
                <button
                  key={tier}
                  onClick={() => handlePlanClick(tier)}
                  className={`relative p-5 rounded-xl border-2 transition-all duration-300 text-left ${isActive
                      ? 'border-primary shadow-lg scale-105'
                      : 'border-border hover:border-primary/40 hover:shadow-md'
                    }`}
                >
                  {isActive && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                      Active
                    </div>
                  )}

                  <div className={`h-11 w-11 rounded-[10px] flex items-center justify-center mb-3 ${isActive ? 'bg-[#FF9882]' : 'bg-[#FFE3D5]'
                    }`}>
                    <Icon className="h-[18px] w-[18px] text-[#B71833]" strokeWidth={1.8} />
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

      {/* Right: Plan Features Sidebar */}
      <div className="sticky top-24 h-fit">
        <div className="border border-[#E5E7EB] rounded-lg bg-white flex flex-col">
          <div className="p-5 pb-4 border-b border-[#F1F5F9]">
            <h3 className="text-sm font-semibold text-[#B71833]">{PLAN_INFO[selectedPlanPreview].name} Plan</h3>
            <p className="text-xs text-[#64748B] mt-0.5">Included capabilities</p>
          </div>

          <div className={`p-5 flex-1 transition-all duration-200 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
            }`}>
            <div className="space-y-2.5">
              {getSelectedPlanFeatures().map((feature) => (
                <div key={feature.id} className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-[#FF3030] shrink-0 mt-0.5" />
                  <span className="text-[13px] text-[#334155] leading-relaxed">{feature.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-[#F1F5F9]">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#64748B]">Team Size</span>
                  <span className="text-xs font-semibold text-[#1E293B]">{getPlanLimits().users} users</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#64748B]">Email Validation</span>
                  <span className="text-xs font-semibold text-[#1E293B]">{getPlanLimits().emailValidation}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#64748B]">White Label</span>
                  <span className="text-xs font-semibold text-[#1E293B]">{getPlanLimits().whiteLabel}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-[#E5E7EB]">
            <button className="w-full px-4 py-2.5 bg-[#FF3030] hover:bg-[#B71833] text-white text-sm font-medium rounded-md transition-colors">
              Upgrade to {PLAN_INFO[selectedPlanPreview].name}
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowEditProfile(false)} />
          <div className="relative w-[90%] max-w-[480px] bg-white rounded-lg overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB]">
              <h2 className="text-base font-semibold text-foreground">Edit Profile</h2>
              <button onClick={() => setShowEditProfile(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#64748B] mb-1">Full Name</label>
                  <input type="text" defaultValue="Nirmal Raj" className="w-full px-3 py-2 border border-[#E5E7EB] rounded-md text-sm focus:outline-none focus:border-[#FF3030]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#64748B] mb-1">Email</label>
                  <input type="email" defaultValue="nirmal@infynd.com" className="w-full px-3 py-2 border border-[#E5E7EB] rounded-md text-sm focus:outline-none focus:border-[#FF3030]" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-[#E5E7EB] bg-[#F9FAFB]">
              <button onClick={() => setShowEditProfile(false)} className="px-4 py-2 rounded-md border border-[#E5E7EB] text-[#334155] hover:bg-white text-xs font-medium transition-colors">
                Cancel
              </button>
              <button onClick={() => setShowEditProfile(false)} className="px-4 py-2 rounded-md bg-[#FF3030] hover:bg-[#B71833] text-white text-xs font-medium transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowChangePassword(false)} />
          <div className="relative w-[90%] max-w-[480px] bg-white rounded-lg overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB]">
              <h2 className="text-base font-semibold text-foreground">Change Password</h2>
              <button onClick={() => setShowChangePassword(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#64748B] mb-1">Current Password</label>
                  <input type="password" className="w-full px-3 py-2 border border-[#E5E7EB] rounded-md text-sm focus:outline-none focus:border-[#FF3030]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#64748B] mb-1">New Password</label>
                  <input type="password" className="w-full px-3 py-2 border border-[#E5E7EB] rounded-md text-sm focus:outline-none focus:border-[#FF3030]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#64748B] mb-1">Confirm New Password</label>
                  <input type="password" className="w-full px-3 py-2 border border-[#E5E7EB] rounded-md text-sm focus:outline-none focus:border-[#FF3030]" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-[#E5E7EB] bg-[#F9FAFB]">
              <button onClick={() => setShowChangePassword(false)} className="px-4 py-2 rounded-md border border-[#E5E7EB] text-[#334155] hover:bg-white text-xs font-medium transition-colors">
                Cancel
              </button>
              <button onClick={() => setShowChangePassword(false)} className="px-4 py-2 rounded-md bg-[#FF3030] hover:bg-[#B71833] text-white text-xs font-medium transition-colors">
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
