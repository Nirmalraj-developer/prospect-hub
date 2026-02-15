import { useState, useRef, useEffect } from "react";
import { Search, Sparkles, Building2, Users, MapPin, DollarSign, Briefcase, Target, Shield, ChevronRight, X, Info, GripVertical, Maximize2, ChevronDown, Plus, Minus, Bookmark } from "lucide-react";
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
  const [showAIAnimation, setShowAIAnimation] = useState(true);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowAIAnimation(false), 3600);
    return () => clearTimeout(timer);
  }, []);

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
                        <span 
                          onClick={() => setShowAIAnimation(false)}
                          className={cn(
                            "flex items-center gap-1 px-1.5 py-0.5 rounded bg-gradient-to-r from-[#FF4D4F] to-[#FF7875] text-white text-[10px] font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer",
                            showAIAnimation && "animate-[aiPulse_1.2s_ease-in-out_3]"
                          )}
                        >
                          <Sparkles className={cn("h-2.5 w-2.5", showAIAnimation && "animate-[sparkleMove_1s_ease-in-out_3]")} />
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
            <div className="flex gap-2">
              <LockedButton 
                className="flex-1 h-9 rounded-lg text-[13px] font-semibold bg-gradient-to-r from-[#FF4D4F] to-[#D9363E] hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all shadow-[0_4px_12px_rgba(255,77,79,0.25)]" 
                size="sm" 
                requiredPlan="pro"
              >
                Find Prospects
              </LockedButton>
              <LockedButton
                variant="outline"
                className="h-9 px-3 rounded-lg text-[13px] font-medium border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors"
                size="sm"
                requiredPlan="pro"
              >
                <Bookmark className="h-4 w-4" />
              </LockedButton>
            </div>
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

            {/* AI Assisted Layer - Hidden */}

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
            <div>
              <label className="text-[13px] font-semibold text-foreground flex items-center gap-1.5 mb-2">
                Sub Sector
                <Sparkles className="h-3 w-3 text-[#FF3030]" />
              </label>
              <MultiSelectDropdown options={['SaaS', 'Cloud Computing', 'AI/ML', 'Cybersecurity']} placeholder="Select sub sector..." />
            </div>
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
      case "dataControl":
        return (
          <div className="space-y-4">
            <FileBasedFilter />
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
  const [selected, setSelected] = useState<Array<{ value: string; mode: 'include' | 'exclude' }>>([]);
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
  const selectedValues = selected.map(s => s.value);
  const filteredOptions = allOptions.filter(opt => 
    opt.toLowerCase().includes(search.toLowerCase()) && !selectedValues.includes(opt)
  );
  const allSelected = filteredOptions.length > 0 && filteredOptions.every(opt => selectedValues.includes(opt));
  const someSelected = filteredOptions.some(opt => selectedValues.includes(opt)) && !allSelected;
  const canCreateCustom = search.trim() && !allOptions.some(opt => opt.toLowerCase() === search.trim().toLowerCase());

  const toggleAll = () => {
    if (allSelected) {
      setSelected(selected.filter(s => !filteredOptions.includes(s.value)));
    } else {
      const newSelections = filteredOptions.map(opt => ({ value: opt, mode: 'include' as const }));
      setSelected([...selected, ...newSelections]);
    }
  };

  const toggleOption = (option: string) => {
    setSelected(prev => 
      prev.some(s => s.value === option) ? prev.filter(s => s.value !== option) : [...prev, { value: option, mode: 'include' }]
    );
  };

  const toggleMode = (value: string) => {
    setSelected(prev => prev.map(s => 
      s.value === value ? { ...s, mode: s.mode === 'include' ? 'exclude' : 'include' } : s
    ));
  };

  const removeChip = (value: string) => {
    setSelected(prev => prev.filter(s => s.value !== value));
  };

  const handleCreateCustom = () => {
    if (canCreateCustom) {
      const newOption = search.trim();
      setCustomOptions(prev => [...prev, newOption]);
      setSelected(prev => [...prev, { value: newOption, mode: 'include' }]);
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
    const copyText = selected.map(s => `${s.value} (${s.mode === 'include' ? 'Include' : 'Exclude'})`).join(', ');
    navigator.clipboard.writeText(copyText);
  };

  const isCustom = (option: string) => customOptions.includes(option);
  const displayChips = selected.slice(0, 2);
  const overflowCount = selected.length - 2;

  const renderChip = (item: { value: string; mode: 'include' | 'exclude' }) => {
    const isInclude = item.mode === 'include';
    const custom = isCustom(item.value);
    
    return (
      <span
        key={item.value}
        className={cn(
          "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[12px] font-medium h-6 border",
          custom ? "bg-[#FFF7E6] border-dashed border-[#FFB74D] text-[#F57C00]" :
          isInclude ? "bg-[#ECFDF5] border-[#A7F3D0] text-[#047857]" : "bg-[#FEF2F2] border-[#FECACA] text-[#B91C1C]"
        )}
      >
        <span className="truncate" style={{ maxWidth: '120px' }}>{item.value}</span>
        {!custom && (
          <button
            onClick={(e) => { e.stopPropagation(); toggleMode(item.value); }}
            className={cn(
              "w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0",
              isInclude ? "bg-[#22C55E] text-white" : "bg-[#EF4444] text-white"
            )}
          >
            {isInclude ? <Plus className="h-2 w-2" /> : <Minus className="h-2 w-2" />}
          </button>
        )}
        <button onClick={(e) => { e.stopPropagation(); removeChip(item.value); }} className="flex-shrink-0">
          <X className="h-3 w-3 cursor-pointer hover:opacity-70" />
        </button>
      </span>
    );
  };

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
            {selected.map(renderChip)}
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
            {displayChips.map(renderChip)}
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
            {filteredOptions.length === 0 && !canCreateCustom && (
              <div className="px-2 py-4 text-center text-[13px] text-[#9CA3AF]">
                No options found
              </div>
            )}
            {filteredOptions.map((option) => (
              <label
                key={option}
                className={cn(
                  "flex items-center gap-2 h-8 px-2 text-[13px] cursor-pointer hover:bg-[#F3F4F6]",
                  selectedValues.includes(option) && "bg-[#E6F0FF]"
                )}
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option)}
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
              {selected.filter(s => !isCustom(s.value)).length > 0 && (
                <div className="mb-3">
                  <h4 className="text-[12px] font-semibold text-[#6B7280] uppercase mb-2">Predefined Filters</h4>
                  {selected.filter(s => !isCustom(s.value)).map((item) => (
                    <div key={item.value} className="flex items-center gap-2 py-1.5 group">
                      <input 
                        type="checkbox" 
                        checked 
                        onChange={() => removeChip(item.value)}
                        className="h-3.5 w-3.5 cursor-pointer" 
                      />
                      <span className="text-[13px] text-foreground flex-1">{item.value}</span>
                      <select
                        value={item.mode}
                        onChange={(e) => toggleMode(item.value)}
                        className={cn(
                          "text-[11px] font-medium px-2 py-0.5 rounded border cursor-pointer",
                          item.mode === 'include' 
                            ? "bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]" 
                            : "bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]"
                        )}
                      >
                        <option value="include">Include</option>
                        <option value="exclude">Exclude</option>
                      </select>
                      <button
                        onClick={() => removeChip(item.value)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3.5 w-3.5 text-[#6B7280] hover:text-[#111827]" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {selected.filter(s => isCustom(s.value)).length > 0 && (
                <div>
                  <h4 className="text-[12px] font-semibold text-[#6B7280] uppercase mb-2">Custom Filters</h4>
                  {selected.filter(s => isCustom(s.value)).map((item) => (
                    <div key={item.value} className="flex items-center gap-2 py-1.5 group">
                      <input 
                        type="checkbox" 
                        checked 
                        onChange={() => removeChip(item.value)}
                        className="h-3.5 w-3.5 cursor-pointer" 
                      />
                      <span className="text-[13px] text-foreground flex-1">{item.value}</span>
                      <button
                        onClick={() => removeChip(item.value)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3.5 w-3.5 text-[#6B7280] hover:text-[#111827]" />
                      </button>
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
  return (
    <div>
      <label className="text-[13px] font-semibold text-foreground flex items-center gap-1.5 mb-2">
        {label}
      </label>
      <MultiSelectDropdown options={options || []} placeholder={`Select ${label.toLowerCase()}...`} />
    </div>
  );
}

function FileBasedFilter() {
  const [mode, setMode] = useState<'include' | 'exclude'>('include');
  const [selectedFile, setSelectedFile] = useState<{ fileId: string; fileName: string } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const uploadedFiles = [
    { fileId: '1', fileName: 'Uploaded_List_Jan.csv' },
    { fileId: '2', fileName: 'Healthcare_Accounts.xlsx' },
    { fileId: '3', fileName: 'AI_Targeted_Companies.csv' },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFileSelect = (file: { fileId: string; fileName: string }) => {
    setSelectedFile(file);
    setIsOpen(false);
  };

  return (
    <div>
      <label className="text-[13px] font-semibold text-foreground mb-2 block">Select filter options</label>
      
      {/* Include/Exclude Toggle */}
      <div className="h-8 bg-[#F3F4F6] rounded-md p-0.5 flex gap-0.5 w-fit mb-1.5">
        <button
          onClick={() => setMode('include')}
          className={cn(
            "px-3 h-full rounded text-[13px] font-medium transition-all",
            mode === 'include'
              ? "bg-[#ECFDF5] text-[#047857]"
              : "text-[#6B7280] hover:text-[#111827]"
          )}
        >
          Include
        </button>
        <button
          onClick={() => setMode('exclude')}
          className={cn(
            "px-3 h-full rounded text-[13px] font-medium transition-all",
            mode === 'exclude'
              ? "bg-[#FEF2F2] text-[#B91C1C]"
              : "text-[#6B7280] hover:text-[#111827]"
          )}
        >
          Exclude
        </button>
      </div>

      {/* File Dropdown */}
      <div className="relative w-full" ref={dropdownRef}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-9 px-3 text-[13px] border border-input rounded-md bg-white hover:border-[#9CA3AF] cursor-pointer flex items-center justify-between"
        >
          <span className={selectedFile ? "text-foreground" : "text-[#9CA3AF]"}>
            {selectedFile ? selectedFile.fileName : "Select Uploaded File"}
          </span>
          <ChevronDown className={cn("h-4 w-4 text-[#6B7280] transition-transform", isOpen && "rotate-180")} />
        </div>

        {isOpen && (
          <div className="absolute w-full mt-1 bg-white border border-[#E5E7EB] rounded-md shadow-md overflow-hidden z-50">
            <div className="overflow-y-auto max-h-[180px] pr-1 [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#D1D5DB] [&::-webkit-scrollbar-thumb]:rounded-md [&::-webkit-scrollbar-thumb:hover]:bg-[#9CA3AF] [scrollbar-width:thin] [scrollbar-color:#D1D5DB_transparent]">
              {uploadedFiles.map((file) => (
                <div
                  key={file.fileId}
                  onClick={() => handleFileSelect(file)}
                  className={cn(
                    "flex items-center h-9 px-3 text-[13px] cursor-pointer hover:bg-[#F3F4F6] transition-colors",
                    selectedFile?.fileId === file.fileId && "bg-[#E6F0FF] text-[#2563EB] font-medium"
                  )}
                >
                  {file.fileName}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
