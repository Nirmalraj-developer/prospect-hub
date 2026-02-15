import { Trash2, Play, ChevronDown, ChevronUp, Eye, Pencil, Calendar, ArrowUpDown } from "lucide-react";
import { useState, useMemo } from "react";
import { LockedPageLayout } from "@/components/LockedPageLayout";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, subDays, startOfDay } from "date-fns";
import { SavedSearchOnboarding } from "@/components/SavedSearchOnboarding";

const savedSearches = [
  { id: 1, name: "UK Healthcare Companies", type: "Company", date: "2024-02-10", results: 1240, status: "Active" },
  { id: 2, name: "US Tech Startups", type: "Company", date: "2024-02-09", results: 3420, status: "Executed" },
  { id: 3, name: "EMEA Finance Enterprises", type: "People", date: "2024-02-07", results: 890, status: "Active" },
  { id: 4, name: "APAC Manufacturing SMBs", type: "Company", date: "2024-02-05", results: 2150, status: "Executed" },
  { id: 5, name: "North America SaaS Scale-ups", type: "People", date: "2024-02-03", results: 4200, status: "Active" },
];

export default function SavedSearchPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
  const [datePreset, setDatePreset] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"results" | "date">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const applyDatePreset = (preset: string) => {
    setDatePreset(preset);
    const now = new Date();
    if (preset === "today") {
      setDateRange({ from: startOfDay(now), to: now });
    } else if (preset === "7d") {
      setDateRange({ from: subDays(now, 7), to: now });
    } else if (preset === "30d") {
      setDateRange({ from: subDays(now, 30), to: now });
    } else if (preset === "90d") {
      setDateRange({ from: subDays(now, 90), to: now });
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredSearches = useMemo(() => {
    let filtered = savedSearches.filter(search => {
      const matchesSearch = search.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           search.type.toLowerCase().includes(searchQuery.toLowerCase());
      
      const searchDate = new Date(search.date);
      const matchesDateRange = !dateRange.from || !dateRange.to || 
                               (searchDate >= dateRange.from && searchDate <= dateRange.to);
      
      return matchesSearch && matchesDateRange;
    });

    filtered.sort((a, b) => {
      if (sortBy === "results") {
        return sortOrder === "asc" ? a.results - b.results : b.results - a.results;
      }
      return sortOrder === "asc" ? 
        new Date(a.date).getTime() - new Date(b.date).getTime() :
        new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return filtered;
  }, [searchQuery, dateRange, sortBy, sortOrder]);

  const paginatedSearches = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSearches.slice(start, start + itemsPerPage);
  }, [filteredSearches, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredSearches.length / itemsPerPage);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <LockedPageLayout featureName="Saved Search" requiredPlan="pro">
      <div className="w-full h-full flex flex-col">
        <div className="mb-4 flex-shrink-0">
          <h1 className="text-2xl font-bold text-slate-800">Search History</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your intelligence assets and execution history
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex items-center gap-3 mb-3 flex-shrink-0">
          <div className="flex-1 max-w-xs">
            <Input
              placeholder="Search by name or type"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 text-xs"
            />
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <button className="h-8 px-2.5 text-xs border border-slate-200 rounded bg-white hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-slate-700">
                  {dateRange.from && dateRange.to ? (
                    `${format(dateRange.from, "MMM dd, yyyy")} → ${format(dateRange.to, "MMM dd, yyyy")}`
                  ) : (
                    "All time"
                  )}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-2.5 md:w-auto" align="start">
              <div className="space-y-2.5">
                {/* Quick Select Row */}
                <div className="flex gap-1.5">
                  <button
                    onClick={() => applyDatePreset("today")}
                    className={`flex-1 h-7 text-[11px] font-medium rounded transition-colors ${
                      datePreset === "today" 
                        ? "bg-[#FFE3D5] text-[#B71833]" 
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Today
                  </button>
                  <button
                    onClick={() => applyDatePreset("7d")}
                    className={`flex-1 h-7 text-[11px] font-medium rounded transition-colors ${
                      datePreset === "7d" 
                        ? "bg-[#FFE3D5] text-[#B71833]" 
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    7D
                  </button>
                  <button
                    onClick={() => applyDatePreset("30d")}
                    className={`flex-1 h-7 text-[11px] font-medium rounded transition-colors ${
                      datePreset === "30d" 
                        ? "bg-[#FFE3D5] text-[#B71833]" 
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    30D
                  </button>
                  <button
                    onClick={() => applyDatePreset("90d")}
                    className={`flex-1 h-7 text-[11px] font-medium rounded transition-colors ${
                      datePreset === "90d" 
                        ? "bg-[#FFE3D5] text-[#B71833]" 
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    90D
                  </button>
                </div>

                {/* Single Month Calendar */}
                <div className="[&_.rdp]:m-0 [&_.rdp-months]:w-full [&_.rdp-month]:w-full [&_.rdp-caption]:text-xs [&_.rdp-caption]:font-semibold [&_.rdp-head_cell]:text-[11px] [&_.rdp-head_cell]:font-medium [&_.rdp-head_cell]:text-slate-500 [&_.rdp-day]:w-7 [&_.rdp-day]:h-7 [&_.rdp-day]:text-[11px] [&_.rdp-day_button]:w-7 [&_.rdp-day_button]:h-7 [&_.rdp-day_button]:text-[11px] [&_.rdp-day_button.rdp-day_button_selected]:bg-[#FF3030] [&_.rdp-day_button.rdp-day_button_selected]:text-white [&_.rdp-day_button:hover]:bg-[#FFE3D5] [&_.rdp-day_button.rdp-range_middle]:bg-[#FFE3D5] [&_.rdp-day_button.rdp-range_middle]:text-[#B71833]">
                  <CalendarComponent
                    mode="range"
                    selected={{ from: dateRange.from, to: dateRange.to }}
                    onSelect={(range) => {
                      setDateRange({ from: range?.from, to: range?.to });
                      setDatePreset("custom");
                    }}
                    numberOfMonths={1}
                  />
                </div>

                {/* Apply Button */}
                <div className="flex justify-end pt-1">
                  <Button
                    size="sm"
                    className="h-7 text-[11px] px-3 bg-[#FF3030] hover:bg-[#B71833]"
                    onClick={() => {}}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <div className="text-xs text-muted-foreground ml-auto">
            {filteredSearches.length} {filteredSearches.length === 1 ? 'result' : 'results'}
          </div>
        </div>

        <div className="flex-1 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-0">
          {/* Desktop Header */}
          <div className="hidden md:grid grid-cols-[3fr_2.5fr_1fr_1fr_2fr] items-center px-6 py-2.5 bg-gray-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider flex-shrink-0 sticky top-0 z-10">
            <div>Search Name</div>
            <div>Type</div>
            <div className="text-right pr-8 flex items-center justify-end gap-1 cursor-pointer hover:text-slate-700" onClick={() => {
              if (sortBy === "results") {
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
              } else {
                setSortBy("results");
                setSortOrder("desc");
              }
            }}>
              Results
              <ArrowUpDown className="h-3 w-3" />
            </div>
            <div>Updated</div>
            <div className="pl-2">Actions</div>
          </div>

          {/* Rows */}
          {filteredSearches.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <SavedSearchOnboarding />
            </div>
          ) : (
            <div className="flex-1 overflow-auto">
              {paginatedSearches.map((search) => (
                <div key={search.id} className="group border-b border-slate-100 last:border-0">
                  {/* Desktop Row */}
                  <div className="hidden md:grid grid-cols-[3fr_2.5fr_1fr_1fr_2fr] items-center px-6 py-2.5 hover:bg-gray-50 transition-colors">
                    <div className="text-sm font-semibold text-slate-800 truncate pr-6">{search.name}</div>
                    <div className="text-xs text-slate-500 truncate pr-6">{search.type}</div>
                    <div className="text-[13px] font-semibold text-red-700 text-right pr-8">{search.results.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">{formatDate(search.date)}</div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pl-2">
                      <button className="inline-flex items-center justify-center h-7 px-3 text-xs font-medium text-red-600 border border-red-600 rounded bg-white hover:bg-red-50 transition-colors shadow-sm">
                        Run
                      </button>
                      <div className="h-5 w-px bg-slate-200 mx-1"></div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent><p className="text-xs">View Results</p></TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded transition-all">
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent><p className="text-xs">Modify Search</p></TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-all">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent><p className="text-xs">Remove Search</p></TooltipContent>
                      </Tooltip>
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
                        <p className="text-xs text-slate-500 truncate">{search.type}</p>
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
                            <span className="text-xs text-slate-600 font-medium">{formatDate(search.date)}</span>
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

          {/* Pagination */}
          {filteredSearches.length > 0 && (
            <div className="flex items-center justify-between px-6 py-3 border-t border-slate-200 bg-gray-50 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Show</span>
                <Select value={itemsPerPage.toString()} onValueChange={(v) => {
                  setItemsPerPage(Number(v));
                  setCurrentPage(1);
                }}>
                  <SelectTrigger className="h-7 w-16 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-xs text-slate-500">per page</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-xs font-medium text-slate-600 border border-slate-200 rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="text-xs text-slate-500">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-xs font-medium text-slate-600 border border-slate-200 rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </LockedPageLayout>
  );
}
