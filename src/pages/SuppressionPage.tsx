import { Upload, FileUp, Shield, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LockedPageLayout, LockedButton } from "@/components/LockedPageLayout";

const validationTabs = [
  { label: "Email Validation", path: "/validations/email" },
  { label: "Suppression", path: "/validations/suppression" },
];

const suppressionLists = [
  { id: 1, name: "Global Do-Not-Contact", entries: 12400, updated: "Feb 10, 2026" },
  { id: 2, name: "Competitor Domains", entries: 340, updated: "Feb 5, 2026" },
  { id: 3, name: "Bounced Emails Q1", entries: 5600, updated: "Jan 28, 2026" },
];

export default function SuppressionPage() {
  const location = useLocation();

  return (
    <LockedPageLayout featureName="Data Compliance" requiredPlan="enterprise">
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Validations</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Verify email addresses and manage suppression lists
        </p>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1 bg-muted rounded-lg p-1 mb-8 w-fit">
        {validationTabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-colors",
              location.pathname === tab.path
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      {/* Upload new list */}
      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-card hover:border-primary/40 transition-colors mb-8">
        <div className="h-14 w-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
          <Shield className="h-7 w-7 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Upload Suppression List
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Upload emails or domains to exclude from your searches and exports
        </p>
        <LockedButton requiredPlan="enterprise" tooltipText="Upgrade to Enterprise to enable suppression management">
          <FileUp className="h-4 w-4 mr-2" />
          Upload List
        </LockedButton>
      </div>

      {/* Existing lists */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-foreground">Suppression Lists</h3>
        <LockedButton size="sm" variant="outline" requiredPlan="enterprise" tooltipText="Upgrade to Enterprise to create suppression lists">
          <Plus className="h-3.5 w-3.5 mr-1" />
          New List
        </LockedButton>
      </div>
      <div className="space-y-3">
        {suppressionLists.map((list) => (
          <div
            key={list.id}
            className="bg-card border border-border rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground text-sm">{list.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {list.entries.toLocaleString()} entries · Updated {list.updated}
                </div>
              </div>
            </div>
            <LockedButton size="sm" variant="ghost" requiredPlan="enterprise" tooltipText="Upgrade to Enterprise to manage suppression lists">
              <Trash2 className="h-3.5 w-3.5" />
            </LockedButton>
          </div>
        ))}
      </div>
    </div>
    </LockedPageLayout>
  );
}
