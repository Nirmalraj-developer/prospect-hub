import { useState } from "react";
import { Search, Filter, Sparkles, Building2, Users, Target, Shield, Info, ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LockedPageLayout, LockedButton } from "@/components/LockedPageLayout";

export default function ProspectSearchPage() {
  const [searchType, setSearchType] = useState<"company" | "people">("company");
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  return (
    <LockedPageLayout 
      featureName="Find Leads" 
      requiredPlan="pro"
    >
      <div className="flex h-[calc(100vh-6.5rem)] relative">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
        {/* Top Control Bar */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
          {/* Company/People Toggle */}
          <div className="flex bg-muted/50 rounded-lg p-1">
            <button
              onClick={() => setSearchType("company")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                searchType === "company"
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Company
            </button>
            <button
              onClick={() => setSearchType("people")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                searchType === "people"
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              People
            </button>
          </div>

          {/* Filter Toggle Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilters.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-primary text-white text-xs font-semibold">
                {activeFilters.length}
              </span>
            )}
          </Button>

          {/* AI Prompt Button */}
          <LockedButton variant="outline" size="sm" className="gap-2" requiredPlan="pro" tooltipText="Upgrade to Pro to use AI-powered search">
            <Sparkles className="h-4 w-4" />
            AI Prompt
          </LockedButton>

          {/* Active Filter Chips */}
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2 flex-1 overflow-x-auto">
              {activeFilters.map((filter, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium flex items-center gap-1.5 whitespace-nowrap"
                >
                  {filter}
                  <button className="hover:text-foreground">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Clear Filters */}
          {activeFilters.length > 0 && (
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Clear All
            </Button>
          )}
        </div>

        {/* Results Area Placeholder */}
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <Search className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">Apply filters to see results</p>
          </div>
        </div>
      </div>

      {/* Right Filter Drawer */}
      <div
        className={`fixed right-0 top-14 h-[calc(100vh-3.5rem)] bg-white border-l border-border shadow-xl transition-transform duration-300 z-40 ${
          isFilterOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "400px" }}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-sm font-bold text-foreground">Filters</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="p-1 hover:bg-muted rounded-md transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          {/* Scrollable Filter Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Company Profile Section */}
            <FilterSection title="Company Profile" defaultOpen>
              <div className="space-y-3">
                <FilterGroup title="Sector">
                  <InclusionExclusionField label="Major Sector" />
                  <InclusionExclusionField label="Group Sector" />
                  <InclusionExclusionField label="Sub Sector" />
                  <InclusionExclusionField label="SIC Code" />
                </FilterGroup>

                <FilterGroup title="Company Size & Revenue">
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1.5 block">Employee Count</label>
                    <div className="flex gap-2">
                      <Input placeholder="Min" className="h-8 text-sm" />
                      <Input placeholder="Max" className="h-8 text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1.5 block">Annual Revenue</label>
                    <div className="flex gap-2">
                      <Input placeholder="Min" className="h-8 text-sm" />
                      <Input placeholder="Max" className="h-8 text-sm" />
                    </div>
                  </div>
                </FilterGroup>

                <FilterGroup title="Location">
                  <InclusionExclusionField label="Country" />
                  <InclusionExclusionField label="County" />
                  <InclusionExclusionField label="Town" />
                  <InclusionExclusionField label="Postcode" />
                </FilterGroup>
              </div>
            </FilterSection>

            {/* Engagement Section */}
            <FilterSection title="Engagement">
              <div className="space-y-3">
                <FilterGroup title="Marketing Touchpoints">
                  <InclusionExclusionField label="Technology Stack" />
                  <InclusionExclusionField label="Social Presence" />
                </FilterGroup>
              </div>
            </FilterSection>

            {/* Data Control Section */}
            <FilterSection title="Data Control">
              <div className="space-y-3">
                <FilterGroup title="Suppression Rules">
                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                    <Shield className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-2">Upload suppression file</p>
                    <Button variant="outline" size="sm" className="text-xs h-7">Choose File</Button>
                  </div>
                </FilterGroup>
              </div>
            </FilterSection>

            {/* People Profile Section */}
            {searchType === "people" && (
              <FilterSection title="People Profile">
                <div className="space-y-3">
                  <FilterGroup title="Job Information">
                    <InclusionExclusionField label="Job Title" />
                    <InclusionExclusionField label="Seniority" />
                    <InclusionExclusionField label="Department" />
                  </FilterGroup>

                  <FilterGroup title="Personal Information">
                    <div>
                      <label className="text-xs font-medium text-foreground mb-1.5 block">First Name</label>
                      <Input placeholder="Enter first name" className="h-8 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-foreground mb-1.5 block">Last Name</label>
                      <Input placeholder="Enter last name" className="h-8 text-sm" />
                    </div>
                  </FilterGroup>
                </div>
              </FilterSection>
            )}
          </div>

          {/* Sticky Footer */}
          <div className="p-4 border-t border-border bg-white">
            <div className="flex gap-2">
              <LockedButton className="flex-1" size="sm" requiredPlan="pro" tooltipText="Upgrade to Pro to apply filters">
                Apply Filters
              </LockedButton>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                Clear
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
      </div>
    </LockedPageLayout>
  );
}

function FilterSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-lg bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
      >
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wide">{title}</h3>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="px-3 pb-3">{children}</div>}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-semibold text-foreground">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function InclusionExclusionField({ label }: { label: string }) {
  const [mode, setMode] = useState<"include" | "exclude">("include");

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-medium text-muted-foreground">{label}</label>
        <div className="flex bg-muted rounded-md p-0.5">
          <button
            onClick={() => setMode("include")}
            className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors ${
              mode === "include"
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            Include
          </button>
          <button
            onClick={() => setMode("exclude")}
            className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors ${
              mode === "exclude"
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            Exclude
          </button>
        </div>
      </div>
      <Input placeholder={`Select ${label.toLowerCase()}...`} className="h-8 text-sm" />
    </div>
  );
}
