import { useState } from "react";
import { Search, Filter, Sparkles, ChevronRight, BarChart3, Building2, MapPin, Users, Target, TrendingUp, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const filterSections = [
  {
    label: "COMPANY PROFILE",
    items: [
      { name: "Sector", icon: Building2 },
      { name: "Size & Revenue", icon: BarChart3 },
      { name: "Information", icon: Globe },
    ],
  },
  {
    label: "ENGAGEMENT",
    items: [
      { name: "Marketing Touchpoints", icon: Target },
      { name: "Intent Data", icon: TrendingUp },
    ],
  },
  {
    label: "DATA CONTROL",
    items: [
      { name: "Suppression List", icon: Users },
      { name: "Exclusions", icon: Filter },
    ],
  },
];

const tabs = [
  { label: "Company", active: true },
  { label: "People", active: false },
];

export default function ProspectSearchPage() {
  const [activeTab, setActiveTab] = useState("Company");

  return (
    <div className="flex gap-6 h-[calc(100vh-6.5rem)]">
      {/* Left filters panel */}
      <div className="w-64 bg-card border border-border rounded-xl flex flex-col shrink-0">
        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.label
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Quick search */}
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Quick Search..." className="pl-9 h-9 text-sm" />
          </div>
        </div>

        {/* Filter sections */}
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          {filterSections.map((section) => (
            <div key={section.label} className="mb-3">
              <div className="px-2 py-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                {section.label}
              </div>
              {section.items.map((item) => (
                <button
                  key={item.name}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <item.icon className="h-4 w-4 text-primary" />
                    <span>{item.name}</span>
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Search button */}
        <div className="p-3 border-t border-border">
          <Button className="w-full">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Right content area */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Region/industry pills */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-xs px-3 py-1 rounded-full bg-accent text-accent-foreground font-medium">United Kingdom</span>
          <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">Retail</span>
          <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">Healthcare</span>
          <span className="flex items-center gap-1 text-xs text-primary font-medium cursor-pointer hover:underline">Clear Filters</span>
          <span className="text-xs text-muted-foreground ml-2 cursor-pointer hover:text-foreground">+ Save View</span>
        </div>

        <div className="text-center max-w-lg">
          <div className="h-20 w-20 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-6">
            <Zap className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Start Your Search
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Refine your ideal prospects from our database of{" "}
            <span className="font-semibold text-foreground">4M+ records</span>{" "}
            using granular filters or AI-powered prompts.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Browse Filters
            </Button>
            <span className="text-muted-foreground text-xs">OR</span>
            <Button variant="outline" size="sm">
              <Sparkles className="h-4 w-4 mr-2" />
              Use AI Prompt
            </Button>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="flex gap-14 mt-16">
          {[
            { value: "4.1M", label: "B2B Records" },
            { value: "100%", label: "Email Valid" },
            { value: "Real-time", label: "Data Feed" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
