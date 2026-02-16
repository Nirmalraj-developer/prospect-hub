export type PlanTier = "trial" | "pro" | "premium" | "enterprise";

export interface Feature {
  id: string;
  name: string;
  description: string;
  route: string;
  icon: string;
  requiresPlan: PlanTier;
  isAI?: boolean;
  aiLevel?: "limited" | "full" | "advanced";
  category: "prospecting" | "data" | "ai" | "enterprise";
}

export const PLAN_FEATURES: Record<PlanTier, string[]> = {
  trial: [
    "find-leads",
    "saved-lists",
    "request-custom-list",
    "export-leads",
    "ai-lead-finder",
  ],
  pro: [
    "find-leads",
    "saved-lists",
    "request-custom-list",
    "export-leads",
    "ai-lead-finder",
  ],
  premium: [
    "enrich-leads",
    "email-validation",
    "advanced-targeting",
    "team-access-5",
  ],
  enterprise: [
    "suppression-management",
    "crm-sync",
    "team-access-10",
    "shared-lists",
    "white-label-platform",
  ],
};

export const FEATURES: Feature[] = [
  // ----------------------------
  // PRO – Core Prospecting
  // ----------------------------
  {
    id: "find-leads",
    name: "AI Prospect discovery",
    description:
      "Prospect Search enables AI-driven discovery of ideal customers using job role, seniority, and firmographic filters.",
    route: "/prospect-search",
    icon: "Search",
    requiresPlan: "pro",
    isAI: true,
    category: "prospecting",
  },
  // {
  //   id: "saved-lists",
  //   name: "Saved Lists",
  //   description:
  //     "Save and reuse your best-performing searches to accelerate recurring prospecting workflows.",
  //   route: "/saved-search",
  //   icon: "Bookmark",
  //   requiresPlan: "pro",
  //   category: "prospecting",
  // },
  {
    id: "request-custom-list",
    name: "Custom Data",
    description:
      "Submit your Ideal Customer Profile and receive a curated list of verified contacts built by our team.",
    route: "/custom-data",
    icon: "FileSpreadsheet",
    requiresPlan: "pro",
    category: "prospecting",
  },
  // {
  //   id: "export-leads",
  //   name: "Export Data",
  //   description:
  //     "Export verified contacts and company data in CSV format for CRM import and outbound campaigns.",
  //   route: "/prospect-search",
  //   icon: "Download",
  //   requiresPlan: "pro",
  //   category: "prospecting",
  // },

  // ----------------------------
  // PRO – AI (Limited)
  // ----------------------------
  // {
  //   id: "ai-lead-finder",
  //   name: "AI Prospect Finder",
  //   description:
  //     "Use AI-powered targeting to discover prospects within specific sub-industries based on intent signals.",
  //   route: "/prospect-search?ai=limited",
  //   icon: "Sparkles",
  //   requiresPlan: "pro",
  //   isAI: true,
  //   aiLevel: "limited",
  //   category: "ai",
  // },

  // ----------------------------
  // PREMIUM – Advanced AI & Data
  // ----------------------------
  // {
  //   id: "ai-role-targeting",
  //   name: "AI Role Targeting",
  //   description:
  //     "Discover prospects using AI-driven job title pattern recognition and role-based targeting across industries.",
  //   route: "/prospect-search?ai=job",
  //   icon: "Sparkles",
  //   requiresPlan: "premium",
  //   isAI: true,
  //   aiLevel: "advanced",
  //   category: "ai",
  // },
  // {
  //   id: "ai-market-targeting",
  //   name: "AI Market Targeting",
  //   description:
  //     "Surface high-conversion prospects across all industries using advanced AI modeling and predictive scoring.",
  //   route: "/prospect-search?ai=full",
  //   icon: "Sparkles",
  //   requiresPlan: "premium",
  //   isAI: true,
  //   aiLevel: "advanced",
  //   category: "ai",
  // },
  {
    id: "enrich-leads",
    name: "Data Enhancement",
    description:
      "Data Enrichment enhances prospect and company data with verified attributes.",
    route: "/data-enrichment",
    icon: "TrendingUp",
    requiresPlan: "premium",
    category: "data",
  },
  {
    id: "email-validation",
    name: "Data Validation",
    description:
      "Data Validation verifies email deliverability before outreach.",
    route: "/email-validation",
    icon: "CheckCircle",
    requiresPlan: "premium",
    category: "data",
  },
  {
    id: "suppression-management",
    name: "Data Compliance",
    description:
      "Data Compliance helps manage suppression and DNC lists across email, phone, domain, and LinkedIn.",
    route: "/suppression",
    icon: "ShieldOff",
    requiresPlan: "enterprise",
    category: "enterprise",
  },
  {
    id: "crm-sync",
    name: "Data Integrations",
    description:
      "Seamlessly sync prospect and company data with leading CRM platforms using automated field mapping.",
    route: "/crm",
    icon: "Database",
    requiresPlan: "enterprise",
    category: "enterprise",
  },
  {
    id: "advanced-targeting",
    name: "Inclusion / Exclusion",
    description:
      "Refine targeting precision with inclusion and suppression rules to eliminate irrelevant or restricted records.",
    route: "/prospect-search?filters=advanced",
    icon: "Shield",
    requiresPlan: "premium",
    category: "data",
  },
  {
    id: "team-access-5",
    name: "Team Collaboration",
    description:
      "Team Collaboration enables shared search and controlled access across users (5 Users).",
    route: "/team",
    icon: "Users",
    requiresPlan: "premium",
    category: "data",
  },

  // ----------------------------
  // ENTERPRISE – Integrations & Scale
  // ----------------------------
  // {
  //   id: "bulk-email-validation",
  //   name: "Bulk Email Validation",
  //   description:
  //     "Data Validation verifies email deliverability before outreach at scale with batch processing.",
  //   route: "/bulk-validation",
  //   icon: "CheckCheck",
  //   requiresPlan: "enterprise",
  //   category: "enterprise",
  // },

  // {
  //   id: "team-access-10",
  //   name: "Team Collaboration",
  //   description:
  //     "Team Collaboration enables shared search and controlled access across users (10 Users).",
  //   route: "/team",
  //   icon: "Users",
  //   requiresPlan: "enterprise",
  //   category: "enterprise",
  // },
  // {
  //   id: "shared-lists",
  //   name: "Shared Search",
  //   description:
  //     "Share saved lists across your organization with structured access controls and governance.",
  //   route: "/saved-search",
  //   icon: "Share2",
  //   requiresPlan: "enterprise",
  //   category: "enterprise",
  // },
  {
    id: "white-label-platform",
    name: "White Labelling",
    description:
      "White Labelling allows full platform branding customization for client-facing or internal deployments.",
    route: "/white-label",
    icon: "Palette",
    requiresPlan: "enterprise",
    category: "enterprise",
  },
];

export const PLAN_INFO: Record<
  PlanTier,
  {
    name: string;
    color: string;
    bgColor: string;
    textColor: string;
    description?: string;
    price?: string;
  }
> = {
  trial: {
    name: "Trial",
    color: "hsl(142, 76%, 36%)",
    bgColor: "bg-green-600",
    textColor: "text-green-600",
    description: "Try Pro features free",
    price: "Free",
  },
  pro: {
    name: "Pro",
    color: "hsl(217, 91%, 60%)",
    bgColor: "bg-blue-500",
    textColor: "text-blue-500",
    description: "Essential prospecting tools",
    price: "$99",
  },
  premium: {
    name: "Premium",
    color: "hsl(271, 91%, 65%)",
    bgColor: "bg-purple-500",
    textColor: "text-purple-500",
    description: "Advanced AI & collaboration",
    price: "$299",
  },
  enterprise: {
    name: "Enterprise",
    color: "hsl(45, 93%, 47%)",
    bgColor: "bg-amber-500",
    textColor: "text-amber-500",
    description: "Full platform access",
    price: "Custom",
  },
};

export function hasAccess(userPlan: PlanTier, requiredPlan: PlanTier): boolean {
  const hierarchy: PlanTier[] = ["trial", "pro", "premium", "enterprise"];
  const userIndex = hierarchy.indexOf(userPlan);
  const requiredIndex = hierarchy.indexOf(requiredPlan);

  // Trial has same access as Pro
  if (userPlan === "trial" && requiredPlan === "pro") return true;
  if (userPlan === "pro" && requiredPlan === "trial") return true;

  return userIndex >= requiredIndex;
}

export function getFeaturesByCategory(category: string) {
  return FEATURES.filter((f) => f.category === category);
}
