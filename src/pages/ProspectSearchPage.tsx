import { useState, useRef, useEffect } from "react";
import { Search, Sparkles, Building2, Users, MapPin, DollarSign, Briefcase, Target, Shield, ChevronRight, X, Info, GripVertical, Maximize2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LockedPageLayout, LockedButton } from "@/components/LockedPageLayout";
import { cn } from "@/lib/utils";

type SearchMode = "company" | "people";
type FilterCategory = "sector" | "companySize" | "companyInfo" | "location" | "marketing" | "dataControl" | "jobInfo" | "personalInfo";

interface FilterItem {
  id: FilterCategory;
  label: string;
  count?: number;
  category: string;
  hasAI?: boolean;
}

const companyFilters: FilterItem[] = [
  { id: "sector", label: "Sector", category: "COMPANY PROFILE", hasAI: true },
  { id: "companySize", label: "Company Size & Revenue", category: "COMPANY PROFILE" },
  { id: "companyInfo", label: "Company Information", category: "COMPANY PROFILE" },
  { id: "location", label: "Location", category: "COMPANY PROFILE" },
  { id: "marketing", label: "Marketing Touchpoints", category: "ENGAGEMENT" },
  { id: "dataControl", label: "Inclusion / Exclusion", category: "DATA CONTROL" },
];

const peopleFilters: FilterItem[] = [
  { id: "jobInfo", label: "Job Information", category: "PEOPLE PROFILE", hasAI: true },
  { id: "personalInfo", label: "Personal Information", category: "PEOPLE PROFILE" },
  { id: "location", label: "Location", category: "PEOPLE PROFILE" },
  { id: "sector", label: "Sector", category: "COMPANY PROFILE", hasAI: true },
  { id: "companySize", label: "Company Size & Revenue", category: "COMPANY PROFILE" },
  { id: "companyInfo", label: "Company Information", category: "COMPANY PROFILE" },
  { id: "dataControl", label: "Inclusion / Exclusion", category: "DATA CONTROL" },
];

export default function ProspectSearchPage() {
  const [searchMode, setSearchMode] = useState<SearchMode>("company");
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory | null>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [appliedFiltersCount, setAppliedFiltersCount] = useState(0);
  const [popupPosition, setPopupPosition] = useState({ x: 340, y: 120 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const popupRef = useRef<HTMLDivElement>(null);

  const handleFilterClick = (filterId: FilterCategory) => {
    setSelectedFilter(selectedFilter === filterId ? null : filterId);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - popupPosition.x,
      y: e.clientY - popupPosition.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPopupPosition({
          x: Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - 360)),
          y: Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - 300))
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const currentFilters = searchMode === "company" ? companyFilters : peopleFilters;
  const groupedFilters = currentFilters.reduce((acc, filter) => {
    if (!acc[filter.category]) acc[filter.category] = [];
    acc[filter.category].push(filter);
    return acc;
  }, {} as Record<string, FilterItem[]>);

  return (
    <LockedPageLayout featureName="Find Leads" requiredPlan="pro">
      <div className="flex h-[calc(100vh-6.5rem)]">
        {/* Left: Filter Navigation Sidebar */}
        <div className="w-[260px] border-r border-border bg-white flex flex-col">
          {/* Mode Toggle */}
          <div className="p-3 border-b border-border">
            <div className="h-9 bg-[#F3F4F6] rounded-md p-0.5 flex gap-0.5">
              <button
                onClick={() => setSearchMode("company")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1 rounded text-[13px] font-medium transition-all",
                  searchMode === "company"
                    ? "bg-white text-[#111827] shadow-sm"
                    : "text-[#6B7280]"
                )}
              >
                <Building2 className="h-3.5 w-3.5 opacity-70" />
                Company
              </button>
              <button
                onClick={() => setSearchMode("people")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1 rounded text-[13px] font-medium transition-all",
                  searchMode === "people"
                    ? "bg-white text-[#111827] shadow-sm"
                    : "text-[#6B7280]"
                )}
              >
                <Users className="h-3.5 w-3.5 opacity-70" />
                People
              </button>
            </div>
          </div>

          {/* Smart Search */}
          <div className="px-3 pb-3 border-b border-border">
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9CA3AF]" />
                <Input
                  placeholder="Quick search filters..."
                  className="pl-7 pr-2.5 h-9 text-[13px] bg-[#F9FAFB] border-[#E5E7EB] rounded-md focus:bg-white focus:border-[#FF4D4F]"
                />
              </div>
              <button className="text-xs font-medium text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] px-1.5 h-9 rounded transition-colors flex items-center">
                Clear All
              </button>
            </div>
          </div>

          {/* Filter Navigation */}
          <div className="flex-1 overflow-y-auto">
            {Object.entries(groupedFilters).map(([category, filters]) => (
              <div key={category}>
                <div className="px-3 py-2 text-[11px] font-bold text-[#FF3030] uppercase tracking-wider">
                  {category}
                </div>
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => handleFilterClick(filter.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 text-[13px] transition-all min-h-[40px]",
                      selectedFilter === filter.id
                        ? "bg-[#F9FAFB] text-foreground border-l-3 border-l-[#FF3030] font-semibold"
                        : "text-muted-foreground hover:bg-[#FAFAFA] hover:text-foreground font-normal"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {filter.label}
                      {filter.count && (
                        <span className="px-1.5 py-0.5 rounded-full bg-[#FF3030] text-white text-[10px] font-semibold">
                          {filter.count}
                        </span>
                      )}
                    </span>
                    <div className="flex items-center gap-1">
                      {filter.hasAI && (
                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-gradient-to-r from-[#FF4D4F] to-[#FF7875] text-white text-[10px] font-semibold shadow-sm">
                          <Sparkles className="h-2.5 w-2.5" />
                          AI
                        </span>
                      )}
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Sticky Footer */}
          <div className="sticky bottom-0 p-3 pb-2.5 border-t border-[#E5E7EB] bg-white mb-[-40px]">
            <LockedButton 
              className="w-full h-11 rounded-lg text-[14px] font-semibold bg-gradient-to-r from-[#FF4D4F] to-[#D9363E] hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all shadow-[0_4px_12px_rgba(255,77,79,0.25)]" 
              size="sm" 
              requiredPlan="pro"
            >
              Apply Filters
            </LockedButton>
          </div>
        </div>

        {/* Middle: Filter Detail Panel - Removed */}

        {/* Floating Filter Popup */}
        {selectedFilter && (
          <div
            ref={popupRef}
            className="fixed bg-white rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.12)] overflow-hidden"
            style={{
              left: `${popupPosition.x}px`,
              top: `${popupPosition.y}px`,
              width: '360px',
              maxHeight: '75vh',
              zIndex: 1000,
              minWidth: '320px',
              maxWidth: '400px'
            }}
          >
            {/* Draggable Header */}
            <div
              className="sticky top-0 flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB] bg-white cursor-move select-none z-10"
              onMouseDown={handleMouseDown}
            >
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-[#9CA3AF]" />
                <h3 className="text-[14px] font-semibold text-foreground capitalize">
                  {selectedFilter.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
              </div>
              <button
                onClick={() => setSelectedFilter(null)}
                className="p-1 hover:bg-[#F3F4F6] rounded transition-colors"
              >
                <X className="h-4 w-4 text-[#6B7280]" />
              </button>
            </div>

            {/* AI Assisted Layer */}
            {(selectedFilter === "sector" || selectedFilter === "jobInfo") && (
              <div className="p-3 border-b border-[#E5E7EB] bg-gradient-to-br from-[#FFF9F5] to-white">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-3.5 w-3.5 text-[#FF3030]" />
                  <span className="text-[12px] font-bold text-foreground">AI Assisted Filter</span>
                </div>
                <Input
                  placeholder="e.g., Tech companies in London"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="h-8 text-[12px] bg-white"
                />
              </div>
            )}

            {/* Scrollable Content */}
            <div className="overflow-y-auto overflow-x-hidden p-3 pr-1 [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#D1D5DB] [&::-webkit-scrollbar-thumb]:rounded-md [&::-webkit-scrollbar-thumb:hover]:bg-[#9CA3AF] [scrollbar-width:thin] [scrollbar-color:#D1D5DB_transparent]" style={{ maxHeight: 'calc(75vh - 140px)' }}>
              <FilterDetailContent filterId={selectedFilter} />
            </div>
          </div>
        )}

        {/* Right: Results Area */}
        <div className="flex-1 flex flex-col overflow-auto bg-[#FAFBFC]">
          {/* Top Bar */}
          <div className="flex items-center justify-between p-4 bg-white border-b border-border">
            <div className="flex items-center gap-2">
              <LockedButton variant="outline" size="sm" className="gap-2 h-9 text-[13px] font-medium" requiredPlan="pro">
                <Sparkles className="h-4 w-4" />
                AI Prompt Search
              </LockedButton>
            </div>
            <div className="text-[13px] text-muted-foreground font-medium">
              0 results found
            </div>
          </div>

          {/* Results Placeholder */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Search className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-20" />
              <p className="text-[13px] text-muted-foreground font-medium">Apply filters to see results</p>
            </div>
          </div>
        </div>
      </div>
    </LockedPageLayout>
  );
}

function FilterDetailContent({ filterId }: { filterId: FilterCategory }) {
  const renderContent = () => {
    switch (filterId) {
      case "sector":
        return (
          <div className="space-y-4">
            <FilterField label="Major Sector" aiSuggested filterId="sector" options={['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail']} />
            <FilterField label="Group Sector" filterId="sector" options={['Software', 'Hardware', 'Services', 'Consulting']} />
            <FilterField label="Sub Sector" filterId="sector" options={['SaaS', 'Cloud Computing', 'AI/ML', 'Cybersecurity']} />
            <FilterField label="SIC Code" filterId="sector" options={['7372', '7373', '7374', '7375']} />
          </div>
        );
      case "companySize":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-[13px] font-semibold text-foreground mb-2 block">Employee Count</label>
              <div className="flex gap-2">
                <Input placeholder="Min" className="h-9 text-[13px]" />
                <Input placeholder="Max" className="h-9 text-[13px]" />
              </div>
            </div>
            <div>
              <label className="text-[13px] font-semibold text-foreground mb-2 block">Annual Revenue (USD)</label>
              <div className="flex gap-2">
                <Input placeholder="Min" className="h-9 text-[13px]" />
                <Input placeholder="Max" className="h-9 text-[13px]" />
              </div>
            </div>
          </div>
        );
      case "location":
        return (
          <div className="space-y-4">
            <FilterField label="Country" filterId="location" options={['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany']} />
            <FilterField label="State/Region" filterId="location" options={['California', 'New York', 'Texas', 'Florida', 'Illinois']} />
            <FilterField label="City" filterId="location" options={['San Francisco', 'New York', 'Los Angeles', 'Chicago', 'Boston']} />
          </div>
        );
      case "companyInfo":
        return (
          <div className="space-y-4">
            <FilterField label="Company Name" filterId="companyInfo" options={['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta']} />
            <FilterField label="Website Domain" filterId="companyInfo" options={['google.com', 'microsoft.com', 'amazon.com']} />
            <FilterField label="Year Founded" filterId="companyInfo" options={['2020-2024', '2015-2019', '2010-2014', '2000-2009']} />
            <FilterField label="Company Type" filterId="companyInfo" options={['Public', 'Private', 'Startup', 'Non-Profit']} />
          </div>
        );
      case "marketing":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-[13px] font-semibold text-foreground mb-2 block">Contact Availability</label>
              <MultiSelectDropdown options={['Mailable', 'Emailable', 'Phoneable']} placeholder="Select availability..." />
            </div>
          </div>
        );
      case "jobInfo":
        return (
          <div className="space-y-4">
            <FilterField label="Job Title" aiSuggested filterId="jobInfo" options={['CEO', 'CTO', 'VP Engineering', 'Director', 'Manager']} />
            <FilterField label="Seniority Level" filterId="jobInfo" options={['C-Level', 'VP', 'Director', 'Manager', 'Individual Contributor']} />
            <FilterField label="Department" filterId="jobInfo" options={['Engineering', 'Sales', 'Marketing', 'Operations', 'Finance']} />
            <FilterField label="Job Function" filterId="jobInfo" options={['Leadership', 'Technical', 'Business Development', 'Operations']} />
          </div>
        );
      default:
        return (
          <div className="text-sm text-muted-foreground">
            Select filter options
          </div>
        );
    }
  };

  return <div>{renderContent()}</div>;
}

function MultiSelectDropdown({ options, placeholder }: { options: string[]; placeholder?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [customOptions, setCustomOptions] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        handleCreateCustom();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [search]);

  const allOptions = [...options, ...customOptions];
  const filteredOptions = allOptions.filter(opt => opt.toLowerCase().includes(search.toLowerCase()));
  const allSelected = filteredOptions.length > 0 && filteredOptions.every(opt => selected.includes(opt));
  const someSelected = filteredOptions.some(opt => selected.includes(opt)) && !allSelected;
  const canCreateCustom = search.trim() && !allOptions.some(opt => opt.toLowerCase() === search.trim().toLowerCase());

  const toggleAll = () => {
    if (allSelected) {
      setSelected(selected.filter(s => !filteredOptions.includes(s)));
    } else {
      setSelected([...new Set([...selected, ...filteredOptions])]);
    }
  };

  const toggleOption = (option: string) => {
    setSelected(prev => 
      prev.includes(option) ? prev.filter(s => s !== option) : [...prev, option]
    );
  };

  const removeChip = (option: string) => {
    setSelected(prev => prev.filter(s => s !== option));
  };

  const handleCreateCustom = () => {
    if (canCreateCustom) {
      const newOption = search.trim();
      setCustomOptions(prev => [...prev, newOption]);
      setSelected(prev => [...prev, newOption]);
      setSearch("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      handleCreateCustom();
    }
  };

  const copyAll = () => {
    navigator.clipboard.writeText(selected.join(', '));
  };

  const isCustom = (option: string) => customOptions.includes(option);
  const displayChips = selected.slice(0, 2);
  const overflowCount = selected.length - 2;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        onClick={() => !isOpen && setIsOpen(true)}
        className="w-full min-h-[36px] px-2 py-1.5 text-[13px] border border-input rounded-md bg-white hover:border-[#9CA3AF] cursor-text flex flex-wrap gap-1 items-center"
      >
        {selected.length === 0 ? (
          <input
            type="text"
            placeholder={placeholder || "Select..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            className="flex-1 outline-none bg-transparent text-[13px] min-w-[120px]"
          />
        ) : selected.length <= 3 ? (
          <>
            {selected.map((item) => (
              <span key={item} className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[12px] font-medium",
                isCustom(item) ? "bg-[#FFF7E6] border border-dashed border-[#FFB74D] text-[#F57C00]" : "bg-[#E6F0FF] text-[#2563EB]"
              )}>
                {item}
                <X className="h-3 w-3 cursor-pointer hover:opacity-70" onClick={(e) => { e.stopPropagation(); removeChip(item); }} />
              </span>
            ))}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              className="flex-1 outline-none bg-transparent text-[13px] min-w-[60px]"
            />
          </>
        ) : (
          <>
            {displayChips.map((item) => (
              <span key={item} className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[12px] font-medium",
                isCustom(item) ? "bg-[#FFF7E6] border border-dashed border-[#FFB74D] text-[#F57C00]" : "bg-[#E6F0FF] text-[#2563EB]"
              )}>
                {item}
                <X className="h-3 w-3 cursor-pointer hover:opacity-70" onClick={(e) => { e.stopPropagation(); removeChip(item); }} />
              </span>
            ))}
            <span
              onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
              className="inline-flex items-center px-2 py-0.5 bg-[#F3F4F6] text-[#6B7280] rounded text-[12px] font-medium cursor-pointer hover:bg-[#E5E7EB]"
            >
              +{overflowCount}
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              className="flex-1 outline-none bg-transparent text-[13px] min-w-[60px]"
            />
          </>
        )}
      </div>

      {isOpen && (
        <div className="w-full mt-1 bg-white border border-[#E5E7EB] rounded-md shadow-md overflow-hidden flex flex-col" style={{ maxHeight: '220px' }}>
          <div className="overflow-y-auto flex-1 pr-1 [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#D1D5DB] [&::-webkit-scrollbar-thumb]:rounded-md [&::-webkit-scrollbar-thumb:hover]:bg-[#9CA3AF] [scrollbar-width:thin] [scrollbar-color:#D1D5DB_transparent]" style={{ maxHeight: '180px' }}>
            <label className="flex items-center gap-2 h-8 px-2 text-[13px] cursor-pointer hover:bg-[#F3F4F6] border-b border-[#E5E7EB]">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => el && (el.indeterminate = someSelected)}
                onChange={toggleAll}
                className="h-3.5 w-3.5 flex-shrink-0"
              />
              <span className="font-semibold">Select All</span>
            </label>
            {canCreateCustom && (
              <div
                onClick={handleCreateCustom}
                className="flex items-center gap-2 h-8 px-2 text-[13px] cursor-pointer hover:bg-[#F3F4F6] text-[#2563EB] font-medium border-b border-[#E5E7EB]"
              >
                Create "{search.trim()}"
              </div>
            )}
            {filteredOptions.map((option) => (
              <label
                key={option}
                className={cn(
                  "flex items-center gap-2 h-8 px-2 text-[13px] cursor-pointer hover:bg-[#F3F4F6]",
                  selected.includes(option) && "bg-[#E6F0FF]"
                )}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleOption(option)}
                  className="h-3.5 w-3.5 flex-shrink-0"
                />
                <span className="truncate">{option}</span>
              </label>
            ))}
          </div>

          <div className="bg-white border-t border-[#E5E7EB] px-2 py-1.5 flex items-center justify-between text-[12px] flex-shrink-0">
            <span className="text-[#6B7280]">{selected.length} selected</span>
            <button
              onClick={() => setSelected([])} 
              className="text-[#2563EB] font-medium hover:text-[#1D4ED8]"
            >
              Clear all
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-lg shadow-xl w-[420px] max-h-[60vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="px-4 py-3 border-b border-[#E5E7EB]">
              <h3 className="text-[14px] font-semibold text-foreground">Selected Filters</h3>
            </div>
            <div className="overflow-y-auto flex-1 p-4 pr-2 [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#D1D5DB] [&::-webkit-scrollbar-thumb]:rounded-md [&::-webkit-scrollbar-thumb:hover]:bg-[#9CA3AF] [scrollbar-width:thin] [scrollbar-color:#D1D5DB_transparent]">
              {selected.filter(s => !isCustom(s)).length > 0 && (
                <div className="mb-3">
                  <h4 className="text-[12px] font-semibold text-[#6B7280] uppercase mb-2">Predefined Filters</h4>
                  {selected.filter(s => !isCustom(s)).map((item) => (
                    <div key={item} className="flex items-center gap-2 py-1.5">
                      <input type="checkbox" checked readOnly className="h-3.5 w-3.5" />
                      <span className="text-[13px] text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              )}
              {selected.filter(s => isCustom(s)).length > 0 && (
                <div>
                  <h4 className="text-[12px] font-semibold text-[#6B7280] uppercase mb-2">Custom Filters</h4>
                  {selected.filter(s => isCustom(s)).map((item) => (
                    <div key={item} className="flex items-center gap-2 py-1.5">
                      <input type="checkbox" checked readOnly className="h-3.5 w-3.5" />
                      <span className="text-[13px] text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="px-4 py-3 border-t border-[#E5E7EB] flex items-center justify-between">
              <button onClick={copyAll} className="px-3 py-1.5 text-[13px] font-medium text-[#2563EB] hover:bg-[#F3F4F6] rounded">
                Copy All
              </button>
              <button onClick={() => setShowModal(false)} className="px-3 py-1.5 text-[13px] font-medium bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterField({ label, aiSuggested, filterId, options }: { label: string; aiSuggested?: boolean; filterId?: FilterCategory; options?: string[] }) {
  const showAISuggested = aiSuggested && (filterId === "sector" || filterId === "jobInfo");
  
  return (
    <div>
      <label className="text-[13px] font-semibold text-foreground flex items-center gap-1.5 mb-2">
        {label}
        {showAISuggested && (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FFE3D5] text-[#B71833]">
            AI Suggested
          </span>
        )}
      </label>
      <MultiSelectDropdown options={options || []} placeholder={`Select ${label.toLowerCase()}...`} />
    </div>
  );
}
