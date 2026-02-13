import { useState } from "react";
import { Edit2, Check, X, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePlan } from "@/contexts/PlanContext";
import { PLAN_INFO } from "@/lib/plans";

export function ProfileHeader() {
  const { currentPlan } = usePlan();
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [profile, setProfile] = useState({
    name: "Nirmal Raj",
    email: "nirmal.raj@company.com",
    company: "InFynd Technologies"
  });
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const planInfo = PLAN_INFO[currentPlan];

  return (
    <div className="bg-card border border-border rounded-2xl p-6 mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
              {getInitials(profile.name)}
            </div>
            <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-white" />
          </div>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-2 animate-in fade-in slide-in-from-left-2 duration-200">
                <Input
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  className="h-9 text-sm font-semibold"
                  placeholder="Full Name"
                />
                <Input
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                  className="h-8 text-xs"
                  placeholder="Work Email"
                  type="email"
                />
                <Input
                  value={editedProfile.company}
                  onChange={(e) => setEditedProfile({ ...editedProfile, company: e.target.value })}
                  className="h-8 text-xs"
                  placeholder="Company Name (Optional)"
                />
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-left-2 duration-200">
                <h2 className="text-lg font-bold text-foreground mb-0.5">{profile.name}</h2>
                <p className="text-sm text-muted-foreground mb-1">{profile.email}</p>
                {profile.company && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Building2 className="h-3.5 w-3.5" />
                    <span>{profile.company}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-md ${
            currentPlan === 'premium' 
              ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' 
              : currentPlan === 'enterprise'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'
              : currentPlan === 'trial'
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-blue-100 text-blue-700 border border-blue-200'
          }`}>
            <span>{planInfo.name}</span>
            <div className="h-1 w-1 rounded-full bg-current" />
            <span>Active</span>
          </div>

          {isEditing ? (
            <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-200">
              <Button
                size="sm"
                onClick={handleSave}
                className="gap-2 bg-green-600 hover:bg-green-700 text-white"
              >
                <Check className="h-3.5 w-3.5" />
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
                className="gap-2"
              >
                <X className="h-3.5 w-3.5" />
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="gap-2 hover:bg-muted transition-all hover:shadow-md"
            >
              <Edit2 className="h-3.5 w-3.5" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {showSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="h-3 w-3 text-white" />
          </div>
          <span className="text-sm font-medium text-green-900">Profile updated successfully</span>
        </div>
      )}
    </div>
  );
}
