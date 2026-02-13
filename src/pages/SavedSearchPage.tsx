import { Trash2, Play, ChevronDown, ChevronUp, Eye, Pencil, Search, Save, Zap } from "lucide-react";
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
      <div className="w-full h-full flex flex-col px-6 py-6 overflow-hidden">
        <div className="mb-6 flex-shrink-0">
          <h1 className="text-2xl font-bold text-slate-800">Saved Searches</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your intelligence assets and execution history
          </p>
        </div>

        <div className="flex-1 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          {/* Desktop Header */}
          <div className="hidden md:grid grid-cols-[3fr_2.5fr_1fr_1fr_2fr] items-center px-6 py-3 bg-gray-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider flex-shrink-0">
            <div>Search Name</div>
            <div>ICP Scope</div>
            <div className="text-right pr-8">Results</div>
            <div>Updated</div>
            <div className="pl-2">Actions</div>
          </div>

          {/* Rows */}
          {savedSearches.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50_">
              <div className="max-w-md w-full text-center space-y-8 animate-in fade-in duration-700">
                <div className="relative mx-auto w-24 h-24">
                  <div className="absolute inset-0 bg-blue-100/50 rounded-full animate-pulse"></div>
                  <div className="absolute inset-2 bg-blue-50/80 rounded-full flex items-center justify-center border border-blue-100">
                    <Search className="h-10 w-10 text-blue-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-800">Start Building Your Intelligence Assets</h3>
                  <p className="text-slate-500">Create powerful searches once, run them forever.</p>
                </div>

                <div className="grid gap-4 text-left bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-500 font-semibold shadow-sm">1</div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">Define Criteria</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Filter by sector, size, and location in Prospect Search</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-500 font-semibold shadow-sm">2</div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">Save Search</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Click the <Save className="h-3 w-3 inline text-slate-400" /> icon to store your configuration</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-500 font-semibold shadow-sm">3</div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">Automate</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Run anytime to get fresh results instantly</p>
                    </div>
                  </div>
                </div>

                <button className="inline-flex items-center justify-center h-10 px-6 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow-md">
                  <Search className="h-4 w-4 mr-2" /> Go to Prospect Search
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-auto divide-y divide-slate-100">
              {savedSearches.map((search) => (
                <div key={search.id} className="group">
                  {/* Desktop Row */}
                  <div className="hidden md:grid grid-cols-[3fr_2.5fr_1fr_1fr_2fr] items-center px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="text-sm font-semibold text-slate-800 truncate pr-6">{search.name}</div>
                    <div className="text-xs text-slate-500 truncate pr-6">{search.icp}</div>
                    <div className="text-[13px] font-semibold text-red-700 text-right pr-8">{search.results.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">{search.date}</div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pl-2">
                      <button className="inline-flex items-center justify-center h-8 px-3 text-xs font-medium text-red-600 border border-red-600 rounded bg-white hover:bg-red-50 transition-colors shadow-sm">
                        Run
                      </button>
                      <div className="h-6 w-px bg-slate-200 mx-1"></div>
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all" title="View Details">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded transition-all" title="Edit Search">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-all" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Mobile Row (Expandable) */}
                  <div className="md:hidden">
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 border-b border-transparent"
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
                      <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-xs text-slate-400 block mb-0.5">Updated</span>
                            <span className="text-xs text-slate-600 font-medium">{search.date}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 mb-3">
                          <button className="flex-1 h-9 flex items-center justify-center text-xs font-medium text-slate-600 border border-slate-200 bg-white rounded hover:bg-slate-50 transition-colors">
                            <Eye className="h-3.5 w-3.5 mr-1.5" /> View
                          </button>
                          <button className="flex-1 h-9 flex items-center justify-center text-xs font-medium text-slate-600 border border-slate-200 bg-white rounded hover:bg-slate-50 transition-colors">
                            <Pencil className="h-3.5 w-3.5 mr-1.5" /> Edit
                          </button>
                          <button className="flex-1 h-9 flex items-center justify-center text-xs font-medium text-red-600 border border-red-200 bg-white rounded hover:bg-red-50 transition-colors">
                            <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Delete
                          </button>
                        </div>

                        <button className="w-full h-10 flex items-center justify-center text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 shadow-sm transition-all">
                          <Play className="h-4 w-4 mr-2" /> Run Search Now
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
