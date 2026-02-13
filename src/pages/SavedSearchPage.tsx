import { Bookmark, Clock, Trash2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LockedPageLayout, LockedButton } from "@/components/LockedPageLayout";

const savedSearches = [
  { id: 1, name: "UK Healthcare Companies", filters: "Sector: Healthcare · Size: 50-200 · UK", date: "2 hours ago", results: 1240 },
  { id: 2, name: "US Tech Startups", filters: "Sector: Technology · Size: 1-50 · US", date: "1 day ago", results: 3420 },
  { id: 3, name: "EMEA Finance Enterprises", filters: "Sector: Finance · Size: 500+ · EMEA", date: "3 days ago", results: 890 },
];

export default function SavedSearchPage() {
  return (
    <LockedPageLayout featureName="Saved Search" requiredPlan="pro">
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Saved Searches</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Quickly re-run your previous prospect searches
          </p>
        </div>
      </div>

      {savedSearches.length === 0 ? (
        <div className="text-center py-20">
          <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-foreground mb-1">No saved searches</h3>
          <p className="text-sm text-muted-foreground">
            Save a search from Prospect Search to see it here
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {savedSearches.map((search) => (
            <div
              key={search.id}
              className="bg-card border border-border rounded-xl p-5 flex items-center justify-between hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                  <Bookmark className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{search.name}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{search.filters}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {search.date}
                    </span>
                    <span>{search.results.toLocaleString()} results</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <LockedButton size="sm" variant="outline" requiredPlan="pro" tooltipText="Upgrade to Pro to run saved searches">
                  <Play className="h-3.5 w-3.5 mr-1" /> Run
                </LockedButton>
                <LockedButton size="sm" variant="ghost" requiredPlan="pro" tooltipText="Upgrade to Pro to manage saved searches">
                  <Trash2 className="h-3.5 w-3.5" />
                </LockedButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </LockedPageLayout>
  );
}
