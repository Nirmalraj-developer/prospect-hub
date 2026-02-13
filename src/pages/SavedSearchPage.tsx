import { Trash2, Play, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { LockedPageLayout } from "@/components/LockedPageLayout";

const savedSearches = [
  { id: 1, name: "UK Healthcare Companies", icp: "Healthcare • 50-200 • UK", date: "2 hours ago", results: 1240 },
  { id: 2, name: "US Tech Startups", icp: "Technology • 1-50 • US", date: "1 day ago", results: 3420 },
  { id: 3, name: "EMEA Finance Enterprises", icp: "Finance • 500+ • EMEA", date: "3 days ago", results: 890 },
];

export default function SavedSearchPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <LockedPageLayout featureName="Saved Search" requiredPlan="pro">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Saved Searches</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your intelligence assets and execution history
          </p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          {/* Desktop Header */}
          <div className="hidden md:grid grid-cols-[2fr_1.2fr_0.6fr_1fr_0.5fr_0.4fr] items-center px-4 py-3 bg-gray-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <div>Search Name</div>
            <div>ICP Scope</div>
            <div className="text-right pr-4">Results</div>
            <div>Updated</div>
            <div className="text-center">Execute</div>
            <div className="text-center">Remove</div>
          </div>

          {/* Rows */}
          {savedSearches.length === 0 ? (
            <div className="text-center py-20">
              <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-6 w-6 text-slate-400" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-1">No saved searches</h3>
              <p className="text-sm text-slate-500">
                Save a search from Prospect Search to see it here
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {savedSearches.map((search) => (
                <div key={search.id} className="group">
                  {/* Desktop Row */}
                  <div className="hidden md:grid grid-cols-[2fr_1.2fr_0.6fr_1fr_0.5fr_0.4fr] items-center px-4 py-3 hover:bg-gray-50 transition-colors">
                    <div className="text-sm font-semibold text-slate-800 truncate pr-4">{search.name}</div>
                    <div className="text-xs text-slate-500 truncate pr-4">{search.icp}</div>
                    <div className="text-[13px] font-semibold text-red-700 text-right pr-4">{search.results.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">{search.date}</div>
                    <div className="text-center">
                      <button className="inline-flex items-center justify-center h-7 px-2.5 text-xs font-medium text-red-600 border border-red-600 rounded hover:bg-red-50 transition-colors">
                        Run
                      </button>
                    </div>
                    <div className="text-center">
                      <button className="text-slate-400 hover:text-red-600 transition-colors p-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Mobile Row (Expandable) */}
                  <div className="md:hidden">
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleExpand(search.id)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-semibold text-slate-800 truncate">{search.name}</h3>
                          <span className="text-[13px] font-semibold text-red-700">{search.results.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-slate-500 truncate">{search.icp}</p>
                      </div>
                      <div className="ml-4">
                        {expandedId === search.id ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                      </div>
                    </div>
                    {/* Expanded Content */}
                    {expandedId === search.id && (
                      <div className="px-4 pb-4 pt-0 bg-gray-50 border-t border-slate-100">
                        <div className="grid grid-cols-2 gap-4 py-3">
                          <div>
                            <span className="text-xs text-slate-400 block mb-1">Updated</span>
                            <span className="text-xs text-slate-600 font-medium">{search.date}</span>
                          </div>
                          <div className="text-right">
                            <button className="text-slate-400 hover:text-red-600 transition-colors inline-flex items-center gap-1 text-xs">
                              <Trash2 className="h-3 w-3" /> Delete
                            </button>
                          </div>
                        </div>
                        <button className="w-full h-8 flex items-center justify-center text-xs font-medium text-red-600 border border-red-600 rounded bg-white hover:bg-red-50 transition-colors">
                          <Play className="h-3 w-3 mr-1.5" /> Run Search
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </LockedPageLayout>
  );
}
