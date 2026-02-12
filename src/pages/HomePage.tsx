import { useNavigate } from "react-router-dom";
import { Search, Database, FileSpreadsheet, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  {
    title: "Buy Data",
    description: "Browse ready-made B2B datasets across industries and countries.",
    icon: Database,
    action: "Browse Data",
    path: "/prospect-search",
    gradient: "from-rose-500/10 to-orange-500/10",
    iconBg: "bg-gradient-to-br from-rose-500 to-orange-500",
  },
  {
    title: "Find Prospects",
    description: "Build targeted prospect lists using advanced filters or AI prompts.",
    icon: Search,
    action: "Build a List",
    path: "/prospect-search",
    gradient: "from-blue-500/10 to-indigo-500/10",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-500",
  },
  {
    title: "Enrich My Data",
    description: "Upload your file and enrich it with verified contact & company data.",
    icon: TrendingUp,
    action: "Upload & Enrich",
    path: "/data-enrichment",
    gradient: "from-emerald-500/10 to-teal-500/10",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500",
  },
  {
    title: "Custom Data Request",
    description: "Tell us your ICP and we'll build a tailored dataset for you.",
    icon: FileSpreadsheet,
    action: "Create Request",
    path: "/custom-data",
    gradient: "from-violet-500/10 to-purple-500/10",
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-500",
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
    <div className="max-w-5xl mx-auto py-4">
      {/* Segment tabs */}
      <div className="flex justify-end mb-6 animate-fade-in" style={{ animationDelay: "0ms" }}>
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
      <div className="text-center mb-10 opacity-0 animate-slide-up" style={{ animationDelay: "100ms" }}>
        <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">
          What would you like to do today?
        </h1>
        <p className="text-lg text-muted-foreground">
          Choose an action to get started with InFynd
        </p>
      </div>

      {/* Action cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
        {actions.map((item, index) => (
          <button
            key={item.title}
            onClick={() => navigate(item.path)}
            className={`group relative bg-card border border-border rounded-2xl p-6 text-left 
              hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 
              transition-all duration-300 ease-out opacity-0 animate-fade-in-scale`}
            style={{ animationDelay: `${200 + index * 100}ms` }}
          >
            {/* Subtle gradient background on hover */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            <div className="relative flex items-start gap-4">
              <div className={`h-12 w-12 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {item.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {item.action}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-12 opacity-0 animate-fade-in" style={{ animationDelay: "700ms" }}>
        {stats.map((stat, i) => (
          <div key={stat.label} className="text-center opacity-0 animate-count-up" style={{ animationDelay: `${800 + i * 100}ms` }}>
            <div className="text-3xl font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1.5 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
