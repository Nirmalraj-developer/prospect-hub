import { useState } from "react";
import { Search, Filter, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const filterSections = [
  {
    label: "COMPANY PROFILE",
    items: ["Sector", "Size & Revenue", "Information"],
  },
  {
    label: "ENGAGEMENT",
    items: ["Marketing Touchpoints", "Intent Data"],
  },
  {
    label: "DATA CONTROL",
    items: ["Suppression List", "Exclusions"],
  },
];

const tabs = [
  { label: "Company", active: true },
  { label: "People", active: false },
];

export default function ProspectSearchPage() {
  const [activeTab, setActiveTab] = useState("Company");

  return (
    <div className="flex gap-6 h-[calc(100vh-5rem)]">
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
            <div key={section.label} className="mb-4">
              <div className="px-2 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {section.label}
              </div>
              {section.items.map((item) => (
                <button
                  key={item}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
                >
                  <span>{item}</span>
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
        <div className="text-center max-w-md">
          <div className="h-20 w-20 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-6">
            <Filter className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Start Your Search
          </h2>
          <p className="text-muted-foreground mb-6">
            Refine your ideal prospects from our database of{" "}
            <span className="font-semibold text-foreground">4M+ records</span>{" "}
            using granular filters or AI-powered prompts.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Browse Filters
            </Button>
            <span className="text-muted-foreground text-sm">OR</span>
            <Button variant="outline">
              <Sparkles className="h-4 w-4 mr-2" />
              Use AI Prompt
            </Button>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="flex gap-12 mt-16">
          {[
            { value: "4.1M", label: "Verified Records" },
            { value: "100%", label: "Data Valid" },
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
