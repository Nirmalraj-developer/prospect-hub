import { useNavigate } from "react-router-dom";
import { Search, Database, FileSpreadsheet, ShieldCheck, TrendingUp, Users, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  {
    title: "Buy Data",
    description: "Browse ready-made datasets across industries and countries to accelerate your outreach.",
    icon: Database,
    action: "Browse Data",
    path: "/prospect-search",
  },
  {
    title: "Find Prospects",
    description: "Build targeted prospect lists using filters or AI to reach key decision-makers.",
    icon: Search,
    action: "Build a List",
    path: "/prospect-search",
  },
  {
    title: "Enrich My Data",
    description: "Upload your file and enrich it with verified firmographics, technographics, and contact data.",
    icon: TrendingUp,
    action: "Upload & Enrich",
    path: "/data-enrichment",
  },
  {
    title: "Custom Data Request",
    description: "Tell us your requirement and we'll build the dataset tailored to your ICP.",
    icon: FileSpreadsheet,
    action: "Create Request",
    path: "/custom-data",
  },
];

const stats = [
  { value: "4.1M+", label: "B2B Contacts" },
  { value: "100%", label: "Verified Emails" },
  { value: "Real-time", label: "Data Updates" },
  { value: "150+", label: "Countries" },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Segment tabs */}
      <div className="flex justify-end mb-8">
        <div className="inline-flex bg-muted rounded-lg p-1 gap-1">
          {["SMB", "Mid-Market", "Enterprise"].map((seg, i) => (
            <button
              key={seg}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                i === 0
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {seg}
            </button>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          What would you like to do today?
        </h1>
        <p className="text-muted-foreground">
          Choose an action to get started with InFynd
        </p>
      </div>

      {/* Action cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        {actions.map((item) => (
          <div
            key={item.title}
            className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {item.description}
                </p>
                <Button size="sm" onClick={() => navigate(item.path)}>
                  {item.action}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-10">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
