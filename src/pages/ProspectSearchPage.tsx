import { useState, useRef, useEffect } from "react";
import { Search, Sparkles, Building2, Users, MapPin, DollarSign, Briefcase, Target, Shield, ChevronRight, X, Info, GripVertical, Maximize2, ChevronDown, Plus, Minus, Bookmark, Eye, EyeOff, Mail, Phone, Linkedin, Download, BarChart3, User, Megaphone, FolderCheck, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LockedPageLayout, LockedButton } from "@/components/LockedPageLayout";

<style>{`
  [contentEditable][data-placeholder]:empty:before {
    content: attr(data-placeholder);
    color: #9CA3AF;
    pointer-events: none;
  }
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`}</style>
import { cn } from "@/lib/utils";

type SearchMode = "company" | "people";
type FilterCategory = "sector" | "companySize" | "companyInfo" | "location" | "marketing" | "dataControl" | "jobInfo" | "personalInfo";

interface FilterItem {
  id: FilterCategory;
  label: string;
  count?: number;
  category: string;
  hasAI?: boolean;
  icon?: any;
}

interface Prospect {
  id: string;
  company: string;
  industry: string;
  location: string;
  contactName: string;
  jobTitle: string;
  email: string;
  phone: string;
  companyEmail?: string;
  companyPhone?: string;
  companyMobile?: string;
  linkedin?: string;
  subSector?: string;
  companySize?: string;
}

const companyFilters: FilterItem[] = [
  { id: "sector", label: "Sector", category: "COMPANY PROFILE", hasAI: true, icon: Layers },
  { id: "companySize", label: "Company Size & Revenue", category: "COMPANY PROFILE", icon: BarChart3 },
  { id: "companyInfo", label: "Company Information", category: "COMPANY PROFILE", icon: Info },
  { id: "location", label: "Location", category: "COMPANY PROFILE", icon: MapPin },
  { id: "marketing", label: "Marketing Touchpoints", category: "ENGAGEMENT", icon: Megaphone },
  { id: "dataControl", label: "Inclusion / Exclusion", category: "DATA CONTROL", icon: FolderCheck },
];

const peopleFilters: FilterItem[] = [
  { id: "jobInfo", label: "Job Information", category: "PEOPLE PROFILE", hasAI: true, icon: Briefcase },
  { id: "personalInfo", label: "Personal Information", category: "PEOPLE PROFILE", icon: User },
  { id: "location", label: "Location", category: "PEOPLE PROFILE", icon: MapPin },
  { id: "sector", label: "Sector", category: "COMPANY PROFILE", hasAI: true, icon: Layers },
  { id: "companySize", label: "Company Size & Revenue", category: "COMPANY PROFILE", icon: BarChart3 },
  { id: "companyInfo", label: "Company Information", category: "COMPANY PROFILE", icon: Info },
  { id: "dataControl", label: "Inclusion / Exclusion", category: "DATA CONTROL", icon: FolderCheck },
];

const MOCK_PROSPECTS: Prospect[] = [
  { id: '1', company: 'NHS Digital', industry: 'Healthcare', location: 'London, UK', contactName: 'Sarah Johnson', jobTitle: 'Chief Technology Officer', email: 'sarah.johnson@nhs.uk', phone: '+44 20 7946 0958', companyEmail: 'info@nhs.uk', companyPhone: '+44 20 7946 0000', companyMobile: '+44 7700 900000', linkedin: 'linkedin.com/in/sarahjohnson', subSector: 'Digital Health', companySize: '5000+' },
  { id: '2', company: 'Revolut', industry: 'Fintech', location: 'London, UK', contactName: 'James Smith', jobTitle: 'VP of Engineering', email: 'james.smith@revolut.com', phone: '+44 20 7946 0234', companyEmail: 'contact@revolut.com', companyPhone: '+44 20 3322 8352', companyMobile: '+44 7700 900001', linkedin: 'linkedin.com/in/jamessmith', subSector: 'Banking', companySize: '1000-5000' },
  { id: '3', company: 'Tesco PLC', industry: 'Retail', location: 'Hertfordshire, UK', contactName: 'Emma Williams', jobTitle: 'Head of Digital', email: 'emma.williams@tesco.com', phone: '+44 1992 632222', companyEmail: 'customer.service@tesco.com', companyPhone: '+44 800 505 555', companyMobile: '+44 7700 900002', linkedin: 'linkedin.com/in/emmawilliams', subSector: 'Grocery', companySize: '5000+' },
  { id: '4', company: 'Deliveroo', industry: 'Technology', location: 'London, UK', contactName: 'Michael Brown', jobTitle: 'Director of Operations', email: 'michael.brown@deliveroo.co.uk', phone: '+44 20 3699 9977', companyEmail: 'hello@deliveroo.co.uk', companyPhone: '+44 20 3699 9900', companyMobile: '+44 7700 900003', linkedin: 'linkedin.com/in/michaelbrown', subSector: 'Food Delivery', companySize: '1000-5000' },
  { id: '5', company: 'AstraZeneca', industry: 'Pharmaceuticals', location: 'Cambridge, UK', contactName: 'Lisa Anderson', jobTitle: 'Senior Director', email: 'lisa.anderson@astrazeneca.com', phone: '+44 1223 245000', companyEmail: 'information.centre@astrazeneca.com', companyPhone: '+44 1223 245000', companyMobile: '+44 7700 900004', linkedin: 'linkedin.com/in/lisaanderson', subSector: 'Biotech', companySize: '5000+' },
  { id: '6', company: 'Barclays', industry: 'Financial Services', location: 'London, UK', contactName: 'David Taylor', jobTitle: 'Managing Director', email: 'david.taylor@barclays.com', phone: '+44 20 7116 1000', companyEmail: 'corporate@barclays.com', companyPhone: '+44 345 734 5345', companyMobile: '+44 7700 900005', linkedin: 'linkedin.com/in/davidtaylor', subSector: 'Investment Banking', companySize: '5000+' },
  { id: '7', company: 'Sainsbury\'s', industry: 'Retail', location: 'London, UK', contactName: 'Rachel Green', jobTitle: 'Head of Strategy', email: 'rachel.green@sainsburys.co.uk', phone: '+44 20 7695 6000', companyEmail: 'customer.services@sainsburys.co.uk', companyPhone: '+44 800 636 262', companyMobile: '+44 7700 900006', linkedin: 'linkedin.com/in/rachelgreen', subSector: 'Supermarket', companySize: '5000+' },
  { id: '8', company: 'Monzo Bank', industry: 'Fintech', location: 'London, UK', contactName: 'Tom Wilson', jobTitle: 'VP Product', email: 'tom.wilson@monzo.com', phone: '+44 20 3872 0620', companyEmail: 'help@monzo.com', companyPhone: '+44 20 3872 0620', companyMobile: '+44 7700 900007', linkedin: 'linkedin.com/in/tomwilson', subSector: 'Digital Banking', companySize: '500-1000' },
  { id: '9', company: 'GSK', industry: 'Pharmaceuticals', location: 'Brentford, UK', contactName: 'Sophie Martin', jobTitle: 'Chief Digital Officer', email: 'sophie.martin@gsk.com', phone: '+44 20 8047 5000', companyEmail: 'customercontactuk@gsk.com', companyPhone: '+44 20 8047 5000', companyMobile: '+44 7700 900008', linkedin: 'linkedin.com/in/sophiemartin', subSector: 'Pharmaceuticals', companySize: '5000+' },
  { id: '10', company: 'Ocado', industry: 'E-commerce', location: 'Hatfield, UK', contactName: 'Oliver Davis', jobTitle: 'Head of Technology', email: 'oliver.davis@ocado.com', phone: '+44 1707 228000', companyEmail: 'customer.services@ocado.com', companyPhone: '+44 345 656 1234', companyMobile: '+44 7700 900009', linkedin: 'linkedin.com/in/oliverdavis', subSector: 'Online Grocery', companySize: '1000-5000' },
  { id: '11', company: 'Wise', industry: 'Fintech', location: 'London, UK', contactName: 'Emily Clark', jobTitle: 'Director of Engineering', email: 'emily.clark@wise.com', phone: '+44 20 3695 2000', companyEmail: 'support@wise.com', companyPhone: '+44 20 3695 2000', companyMobile: '+44 7700 900010', linkedin: 'linkedin.com/in/emilyclark', subSector: 'Payments', companySize: '1000-5000' },
  { id: '12', company: 'Boots UK', industry: 'Retail', location: 'Nottingham, UK', contactName: 'Daniel White', jobTitle: 'Head of Digital Commerce', email: 'daniel.white@boots.co.uk', phone: '+44 115 950 6111', companyEmail: 'customer.care@boots.co.uk', companyPhone: '+44 345 609 0055', companyMobile: '+44 7700 900011', linkedin: 'linkedin.com/in/danielwhite', subSector: 'Pharmacy', companySize: '5000+' },
  { id: '13', company: 'Lloyds Banking Group', industry: 'Financial Services', location: 'London, UK', contactName: 'Victoria Lee', jobTitle: 'Chief Data Officer', email: 'victoria.lee@lloydsbanking.com', phone: '+44 20 7626 1500', companyEmail: 'customer.services@lloydsbanking.com', companyPhone: '+44 345 300 0000', companyMobile: '+44 7700 900012', linkedin: 'linkedin.com/in/victorialee', subSector: 'Retail Banking', companySize: '5000+' },
  { id: '14', company: 'Marks & Spencer', industry: 'Retail', location: 'London, UK', contactName: 'Andrew Harris', jobTitle: 'Director of IT', email: 'andrew.harris@marks-and-spencer.com', phone: '+44 20 7935 4422', companyEmail: 'customer.services@marks-and-spencer.com', companyPhone: '+44 333 014 8555', companyMobile: '+44 7700 900013', linkedin: 'linkedin.com/in/andrewharris', subSector: 'Department Store', companySize: '5000+' },
  { id: '15', company: 'Starling Bank', industry: 'Fintech', location: 'London, UK', contactName: 'Charlotte Moore', jobTitle: 'VP Engineering', email: 'charlotte.moore@starlingbank.com', phone: '+44 20 3818 2000', companyEmail: 'hello@starlingbank.com', companyPhone: '+44 20 3818 2000', companyMobile: '+44 7700 900014', linkedin: 'linkedin.com/in/charlottemoore', subSector: 'Challenger Bank', companySize: '500-1000' },
  { id: '16', company: 'Unilever', industry: 'Consumer Goods', location: 'London, UK', contactName: 'George Thompson', jobTitle: 'Head of Digital Transformation', email: 'george.thompson@unilever.com', phone: '+44 20 7822 5252', companyEmail: 'contact@unilever.com', companyPhone: '+44 20 7822 5252', companyMobile: '+44 7700 900015', linkedin: 'linkedin.com/in/georgethompson', subSector: 'FMCG', companySize: '5000+' },
  { id: '17', company: 'HSBC', industry: 'Financial Services', location: 'London, UK', contactName: 'Jessica Walker', jobTitle: 'Managing Director', email: 'jessica.walker@hsbc.com', phone: '+44 20 7991 8888', companyEmail: 'customer.service@hsbc.com', companyPhone: '+44 345 740 4404', companyMobile: '+44 7700 900016', linkedin: 'linkedin.com/in/jessicawalker', subSector: 'Global Banking', companySize: '5000+' },
  { id: '18', company: 'Morrisons', industry: 'Retail', location: 'Bradford, UK', contactName: 'Matthew Hall', jobTitle: 'Head of E-commerce', email: 'matthew.hall@morrisons.com', phone: '+44 1924 870000', companyEmail: 'customer.services@morrisons.com', companyPhone: '+44 345 611 6111', companyMobile: '+44 7700 900017', linkedin: 'linkedin.com/in/matthewhall', subSector: 'Supermarket', companySize: '5000+' },
  { id: '19', company: 'Nationwide', industry: 'Financial Services', location: 'Swindon, UK', contactName: 'Laura Young', jobTitle: 'Director of Technology', email: 'laura.young@nationwide.co.uk', phone: '+44 1793 513513', companyEmail: 'customer.services@nationwide.co.uk', companyPhone: '+44 345 266 0000', companyMobile: '+44 7700 900018', linkedin: 'linkedin.com/in/laurayoung', subSector: 'Building Society', companySize: '5000+' },
  { id: '20', company: 'John Lewis', industry: 'Retail', location: 'London, UK', contactName: 'Christopher King', jobTitle: 'Head of Digital', email: 'christopher.king@johnlewis.co.uk', phone: '+44 20 7828 1000', companyEmail: 'contact@johnlewis.co.uk', companyPhone: '+44 345 604 9049', companyMobile: '+44 7700 900019', linkedin: 'linkedin.com/in/christopherking', subSector: 'Department Store', companySize: '5000+' },
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
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Array<{ category: string; value: string; mode: 'include' | 'exclude' }>>([]);
  const [requestType, setRequestType] = useState<'order' | 'count' | 'sample' | 'count&sample'>('order');
  const [leadVolume, setLeadVolume] = useState<string>('');
  const [notesColor, setNotesColor] = useState<string>('#000000');
  const [orderName, setOrderName] = useState<string>('');
  const [deliveryEmail, setDeliveryEmail] = useState<string>('');
  const [displayedProspects, setDisplayedProspects] = useState<Prospect[]>([]);
  const [showInsights, setShowInsights] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedFields, setSelectedFields] = useState<string[]>(['Company Email', 'Company Phone', 'Company Mobile']);
  const [exportRecords, setExportRecords] = useState<number>(100);
  const [exportFileName, setExportFileName] = useState<string>('prospects_export');
  const [fieldSearch, setFieldSearch] = useState<string>('');
  const [availableCredits] = useState<number>(25000);
  const [phoneType, setPhoneType] = useState<'directDial' | 'landline'>('directDial');

  useEffect(() => {
    if (showExportModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showExportModal]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showCustomForm, setShowCustomForm] = useState(false);

  useEffect(() => {
    const handleCustomFormChange = () => {
      setShowCustomForm(localStorage.getItem('showCustomForm') === 'true');
    };
    window.addEventListener('customFormChanged', handleCustomFormChange);
    return () => window.removeEventListener('customFormChanged', handleCustomFormChange);
  }, []);
  const popupRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const hasPro = false; // Mock: user has trial access
  const userPlan: 'trial' | 'pro' | 'premium' | 'enterprise' = 'trial'; // Mock user plan
  const RESULTS_PER_PAGE = 10;

  const placeholders = [
    "Healthcare companies in London...",
    "Tech firms in Manchester...",
    "Hospitals with 1000+ employees...",
    "Retail companies in UK..."
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowAIAnimation(false), 3600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleFindProspects = () => {
    const customFormEnabled = localStorage.getItem('showCustomForm') === 'true';
    if (customFormEnabled) {
      setShowCustomForm(true);
      setShowResults(false);
      return;
    }
    setShowCustomForm(false);
    setShowResults(true);
    setCurrentPage(1);
    setDisplayedProspects(MOCK_PROSPECTS.slice(0, RESULTS_PER_PAGE));
    setHasMore(MOCK_PROSPECTS.length > RESULTS_PER_PAGE);
  };

  const handleTryAISearch = () => {
    setShowResults(false);
    setDisplayedProspects([]);
    setCurrentPage(1);
    setAiPrompt("");
  };

  const loadPage = (page: number) => {
    const hasAccess = userPlan === 'premium' || userPlan === 'enterprise' || userPlan === 'pro';
    if (!hasAccess && page > 1) return;
    const start = (page - 1) * RESULTS_PER_PAGE;
    const end = start + RESULTS_PER_PAGE;
    setDisplayedProspects(MOCK_PROSPECTS.slice(start, end));
    setCurrentPage(page);
    setHasMore(end < MOCK_PROSPECTS.length);
    resultsRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = 5; // Show 5 pages for trial demo

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
    <LockedPageLayout featureName="AI Prospect Discovery" requiredPlan="pro">
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
                    : "text-[#6B7280]",
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
                    : "text-[#6B7280]",
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
              <button
                onClick={() => setActiveFilters([])}
                className="text-xs font-medium text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] px-1.5 h-9 rounded transition-colors flex items-center"
              >
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
                {filters.map((filter) => {
                  const IconComponent = filter.icon;
                  const selectedCount = activeFilters.filter((f) => {
                    const categoryMap: Record<FilterCategory, string[]> = {
                      sector: [
                        "Major Sector",
                        "Group Sector",
                        "Sub Sector",
                        "SIC Code",
                      ],
                      companySize: ["Employee Count", "Annual Revenue (USD)"],
                      companyInfo: [
                        "Company Name",
                        "Website Domain",
                        "Year Founded",
                        "Company Type",
                      ],
                      location: ["Country", "State/Region", "City"],
                      marketing: ["Contact Availability"],
                      dataControl: ["Inclusion / Exclusion"],
                      jobInfo: [
                        "Job Title",
                        "Seniority Level",
                        "Department",
                        "Job Function",
                      ],
                      personalInfo: ["Personal Information"],
                    };
                    return categoryMap[filter.id]?.includes(f.category);
                  }).length;
                  return (
                    <button
                      key={filter.id}
                      onClick={() => handleFilterClick(filter.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2.5 text-[13px] transition-all h-9",
                        selectedFilter === filter.id
                          ? "bg-[#F9FAFB] text-foreground border-l-3 border-l-[#FF3030] font-semibold"
                          : "text-muted-foreground hover:bg-[#FAFAFA] hover:text-foreground font-normal",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {IconComponent && (
                          <IconComponent
                            className="h-3 w-3 text-[#111827] opacity-80"
                            strokeWidth={1.8}
                          />
                        )}
                        {filter.label}
                        {selectedCount > 0 && (
                          <span className="min-w-[18px] h-[18px] px-1.5 rounded-full bg-[#FF3030] text-white text-[11px] font-semibold inline-flex items-center justify-center">
                            {selectedCount}
                          </span>
                        )}
                      </span>
                      <div className="flex items-center gap-1">
                        {filter.hasAI && (
                          <span
                            onClick={() => setShowAIAnimation(false)}
                            className={cn(
                              "flex items-center gap-1 px-1.5 py-0.5 rounded bg-gradient-to-r from-[#FF4D4F] to-[#FF7875] text-white text-[10px] font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer",
                              showAIAnimation &&
                                "animate-[aiPulse_1.2s_ease-in-out_3]",
                            )}
                          >
                            <Sparkles
                              className={cn(
                                "h-2.5 w-2.5",
                                showAIAnimation &&
                                  "animate-[sparkleMove_1s_ease-in-out_3]",
                              )}
                            />
                            AI
                          </span>
                        )}
                        <ChevronRight className="h-3.5 w-3.5" />
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Sticky Footer */}
          <div className="sticky bottom-0 p-3 pb-2.5 border-t border-[#E5E7EB] bg-white mb-[-40px]">
            <div className="flex gap-2">
              <button
                onClick={handleFindProspects}
                className="flex-1 h-9 rounded-lg text-[13px] font-semibold bg-gradient-to-r from-[#FF4D4F] to-[#D9363E] hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all shadow-[0_4px_12px_rgba(255,77,79,0.25)] text-white"
              >
                AI Prospect Discovery
              </button>
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
              width: "360px",
              maxHeight: "75vh",
              zIndex: 1000,
              minWidth: "320px",
              maxWidth: "400px",
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
                  {selectedFilter.replace(/([A-Z])/g, " $1").trim()}
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
            <div
              className="overflow-y-auto overflow-x-hidden p-3 pr-1 [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#D1D5DB] [&::-webkit-scrollbar-thumb]:rounded-md [&::-webkit-scrollbar-thumb:hover]:bg-[#9CA3AF] [scrollbar-width:thin] [scrollbar-color:#D1D5DB_transparent]"
              style={{ maxHeight: "calc(75vh - 140px)" }}
            >
              <FilterDetailContent
                filterId={selectedFilter}
                activeFilters={activeFilters}
                onFilterChange={(category, selected) => {
                  setActiveFilters((prev) => [
                    ...prev.filter((f) => f.category !== category),
                    ...selected.map((s) => ({
                      category,
                      value: s.value,
                      mode: s.mode,
                    })),
                  ]);
                }}
              />
            </div>
          </div>
        )}

        {/* Right: Results Area */}
        <div className="flex-1 flex flex-col bg-[#FAFBFC]">
          {/* Top Bar - Only show when results are loaded */}
          {showResults && displayedProspects.length > 0 && (
            <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-border">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold text-[#1F2937]">
                  Prospects Found :
                </span>
                <span className="text-[15px] font-bold text-[#FF4D4F]">
                  {MOCK_PROSPECTS.length.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleTryAISearch}
                  className="gap-2 h-8 text-[12px] font-medium px-2.5 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md inline-flex items-center justify-center transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Try AI Search
                </button>
                <button
                  onClick={() => setShowInsights(true)}
                  className="h-8 px-2.5 text-[12px] font-medium bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#374151] rounded-md transition-colors flex items-center gap-1.5"
                >
                  <BarChart3 className="h-3.5 w-3.5" />
                  Data Insights
                </button>
                <button
                  onClick={() => setShowExportModal(true)}
                  className="h-8 px-3 text-[12px] font-semibold bg-gradient-to-r from-[#FF4D4F] to-[#E53935] hover:shadow-lg text-white rounded-md transition-all flex items-center gap-1.5"
                >
                  <Download className="h-3.5 w-3.5" />
                  Export
                </button>
              </div>
            </div>
          )}

          {/* Results */}
          {showCustomForm ? (
            <div className="flex-1 flex flex-col bg-white overflow-y-auto">
              <div className="p-3 border-b border-[#E5E7EB]">
                <h2 className="text-[15px] font-bold text-[#111827]">
                  Custom Data Order
                </h2>
                <p className="text-[12px] text-[#6B7280] mt-0.5">
                  Submit your requirements for a tailored prospect list
                </p>
              </div>

              <div className="flex-1 p-3 space-y-3">
                {/* Top Row - 4 Columns */}
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-[#374151] mb-1 block">
                      Order Name <span className="text-[#FF4D4F]">*</span>
                    </label>
                    <Input
                      placeholder="e.g., Q1 Tech Leads"
                      value={orderName}
                      onChange={(e) => setOrderName(e.target.value)}
                      className="h-9 text-[13px]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#374151] mb-1 block">
                      Target Lead Volume
                    </label>
                    <Input
                      placeholder="e.g., 500"
                      type="number"
                      value={leadVolume}
                      onChange={(e) => setLeadVolume(e.target.value)}
                      className="h-9 text-[13px]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#374151] mb-1 block">
                      Request Type <span className="text-[#FF4D4F]">*</span>
                    </label>
                    <select
                      value={requestType}
                      onChange={(e) => setRequestType(e.target.value as any)}
                      className="w-full h-9 px-3 text-[13px] border border-input rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#FF4D4F] focus:border-transparent"
                    >
                      <option value="order">Order</option>
                      <option value="count">Count</option>
                      <option value="sample">Sample</option>
                      <option value="count&sample">Count & Sample</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#374151] mb-1 block">
                      Delivery Email <span className="text-[#FF4D4F]">*</span>
                    </label>
                    <Input
                      placeholder="your@email.com"
                      type="email"
                      value={deliveryEmail}
                      onChange={(e) => setDeliveryEmail(e.target.value)}
                      className="h-9 text-[13px]"
                    />
                  </div>
                </div>

                {/* Credit Debit Info */}
                {requestType === "order" &&
                  leadVolume &&
                  parseInt(leadVolume) > 0 && (
                    <div className="bg-[#FFF7E6] border border-[#FFD591] rounded-md p-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 text-[#F57C00]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-[12px] font-semibold text-[#F57C00]">
                          Credit Debit Information
                        </span>
                      </div>
                      <div className="text-[12px] font-bold text-[#F57C00]">
                        {parseInt(leadVolume).toLocaleString()} leads × 1 credit
                        = {parseInt(leadVolume).toLocaleString()} credits will
                        be debited
                      </div>
                    </div>
                  )}

                {/* Current Search Criteria - Always Visible */}
                <div
                  className={`rounded-md p-2 border ${
                    activeFilters.length === 0
                      ? "bg-[#FEF2F2] border-[#FCA5A5]"
                      : "bg-[#F9FAFB] border-[#E5E7EB]"
                  }`}
                >
                  <label
                    className={`text-[11px] font-semibold mb-1.5 block ${
                      activeFilters.length === 0
                        ? "text-[#B91C1C]"
                        : "text-[#374151]"
                    }`}
                  >
                    Selected Filters:
                  </label>
                  {activeFilters.length === 0 ? (
                    <div className="flex items-center gap-1.5 text-[#B91C1C]">
                      <span className="text-[14px]">⚠</span>
                      <span className="text-[12px]">
                        Please select at least one filter to proceed
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {Object.entries(
                        activeFilters.reduce(
                          (acc, filter) => {
                            if (!acc[filter.category])
                              acc[filter.category] = [];
                            acc[filter.category].push(filter);
                            return acc;
                          },
                          {} as Record<string, typeof activeFilters>,
                        ),
                      ).map(([category, filters]) => {
                        const displayFilters = filters.slice(0, 2);
                        const overflowCount = filters.length - 2;
                        return (
                          <div key={category}>
                            <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide block mb-1">
                              {category}:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {displayFilters.map((filter, idx) => (
                                <span
                                  key={idx}
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border ${
                                    filter.mode === "include"
                                      ? "bg-[#ECFDF5] border-[#A7F3D0] text-[#047857]"
                                      : "bg-[#FEF2F2] border-[#FECACA] text-[#B91C1C]"
                                  }`}
                                >
                                  {filter.value}
                                  <span className="text-[9px] opacity-70">
                                    {filter.mode === "include" ? "✔" : "✖"}
                                  </span>
                                  <button
                                    onClick={() =>
                                      setActiveFilters((prev) =>
                                        prev.filter(
                                          (_, i) =>
                                            i !== activeFilters.indexOf(filter),
                                        ),
                                      )
                                    }
                                    className="hover:opacity-70"
                                  >
                                    <X className="h-2.5 w-2.5" />
                                  </button>
                                </span>
                              ))}
                              {overflowCount > 0 && (
                                <span className="inline-flex items-center px-2 py-0.5 bg-[#F3F4F6] text-[#6B7280] rounded text-[11px] font-medium">
                                  +{overflowCount}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Middle Section - 2 Columns */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#374151] mb-1 block">
                      Upload Suppression List
                    </label>
                    <div className="h-40 border border-dashed border-[#E5E7EB] rounded-md flex flex-col items-center justify-center gap-2 bg-[#FAFBFC] hover:bg-[#F5F5F5] transition-colors cursor-pointer">
                      <svg
                        className="h-8 w-8 text-[#9CA3AF]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span className="text-[12px] text-[#6B7280] font-medium">
                        Click to upload CSV
                      </span>
                      <span className="text-[10px] text-[#9CA3AF]">
                        Max 10MB
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#374151] mb-1 block">
                      Additional Notes
                    </label>
                    <div className="border border-input rounded-md bg-white">
                      <div className="flex items-center gap-1 p-1 border-b border-[#E5E7EB] bg-[#F9FAFB]">
                        <button
                          onClick={() => document.execCommand("bold")}
                          className="p-1 hover:bg-[#E5E7EB] rounded text-[#374151]"
                          title="Bold"
                        >
                          <svg
                            className="h-3.5 w-3.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M11 3H6v14h5.5c2.5 0 4.5-2 4.5-4.5 0-1.5-.7-2.8-1.8-3.7C15.3 7.8 16 6.5 16 5c0-2.5-2-5-5-5zm-1 6V5h1c1.1 0 2 .9 2 2s-.9 2-2 2h-1zm0 2h1.5c1.4 0 2.5 1.1 2.5 2.5S12.9 16 11.5 16H10v-5z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => document.execCommand("italic")}
                          className="p-1 hover:bg-[#E5E7EB] rounded text-[#374151]"
                          title="Italic"
                        >
                          <svg
                            className="h-3.5 w-3.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => document.execCommand("underline")}
                          className="p-1 hover:bg-[#E5E7EB] rounded text-[#374151]"
                          title="Underline"
                        >
                          <svg
                            className="h-3.5 w-3.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 18c3.3 0 6-2.7 6-6V3h-2v9c0 2.2-1.8 4-4 4s-4-1.8-4-4V3H4v9c0 3.3 2.7 6 6 6zm-6 2h12v2H4v-2z" />
                          </svg>
                        </button>
                        <div className="w-px h-4 bg-[#E5E7EB] mx-1"></div>
                        <input
                          type="color"
                          value={notesColor}
                          onChange={(e) => {
                            setNotesColor(e.target.value);
                            document.execCommand(
                              "foreColor",
                              false,
                              e.target.value,
                            );
                          }}
                          className="w-6 h-6 rounded cursor-pointer"
                          title="Text Color"
                        />
                        <div className="w-px h-4 bg-[#E5E7EB] mx-1"></div>
                        <button
                          onClick={() =>
                            document.execCommand("insertUnorderedList")
                          }
                          className="p-1 hover:bg-[#E5E7EB] rounded text-[#374151]"
                          title="Bullet List"
                        >
                          <svg
                            className="h-3.5 w-3.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M4 4h2v2H4V4zm4 0h10v2H8V4zM4 9h2v2H4V9zm4 0h10v2H8V9zm-4 5h2v2H4v-2zm4 0h10v2H8v-2z" />
                          </svg>
                        </button>
                        <button
                          onClick={() =>
                            document.execCommand("insertOrderedList")
                          }
                          className="p-1 hover:bg-[#E5E7EB] rounded text-[#374151]"
                          title="Numbered List"
                        >
                          <svg
                            className="h-3.5 w-3.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M3 4h1v4H3V4zm1 6H3v1h1v1H3v1h2V9H4v1zm-1 4h1.8L3 16.1v.9h3v-1H4.2L6 13.9V13H3v1zm5-10h10v2H8V4zm0 5h10v2H8V9zm0 5h10v2H8v-2z" />
                          </svg>
                        </button>
                      </div>
                      <div
                        contentEditable
                        className="w-full h-32 px-3 py-2 text-[12px] overflow-y-auto focus:outline-none [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:bg-[#D1D5DB] [&::-webkit-scrollbar-thumb]:rounded"
                        data-placeholder="Specify any custom requirements..."
                        style={{
                          minHeight: "128px",
                        }}
                        onInput={(e) => {
                          if (e.currentTarget.textContent === "") {
                            e.currentTarget.innerHTML = "";
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Included Data Attributes */}
                <div className="pt-2 border-t border-[#E5E7EB]">
                  <label className="text-[11px] font-semibold text-[#374151] block mb-1">
                    Included Data Attributes
                  </label>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-0.5 bg-[#F3F4F6] text-[#374151] text-[11px] rounded">
                      Email
                    </span>
                    <span className="px-2 py-0.5 bg-[#F3F4F6] text-[#374151] text-[11px] rounded">
                      Phone
                    </span>
                    <span className="px-2 py-0.5 bg-[#F3F4F6] text-[#374151] text-[11px] rounded">
                      LinkedIn
                    </span>
                    <span className="px-2 py-0.5 bg-[#F3F4F6] text-[#374151] text-[11px] rounded">
                      Company
                    </span>
                    <span className="px-2 py-0.5 bg-[#F3F4F6] text-[#374151] text-[11px] rounded">
                      Title
                    </span>
                  </div>
                </div>
              </div>

              {/* Sticky Submit CTA */}
              <div className="sticky bottom-0 bg-white border-t border-[#E5E7EB] p-2 flex gap-2">
                <button
                  disabled={
                    activeFilters.length === 0 ||
                    !orderName.trim() ||
                    !deliveryEmail.trim()
                  }
                  className="flex-1 h-9 rounded-md text-[13px] font-semibold bg-gradient-to-r from-[#FF4D4F] to-[#E53935] hover:shadow-lg text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  Submit Custom Order
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem("showCustomForm", "false");
                    setShowCustomForm(false);
                  }}
                  className="px-4 h-9 rounded-md text-[13px] font-medium bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#374151] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : showResults ? (
            showInsights ? (
              <div className="flex-1 flex flex-col bg-white animate-[slideInRight_180ms_ease-in-out]">
                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                  {/* Top Section: 2 Columns Grid */}
                  <div
                    className="grid gap-3 mb-3"
                    style={{ gridTemplateColumns: "1fr 1.4fr" }}
                  >
                    {/* Overall Count Card */}
                    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-3 flex flex-col">
                      <h3 className="text-[12px] font-semibold text-[#111827] mb-2.5">
                        Stats Count
                      </h3>
                      <div className="grid grid-cols-1 gap-2.5">
                        <div className="bg-white border border-[#E5E7EB] rounded-md p-3 flex justify-between items-center">
                          <span className="text-[13px] text-[#6B7280] font-medium">
                            Companies
                          </span>
                          <span className="text-[15px] text-[#111827] font-bold">
                            4,092,817
                          </span>
                        </div>
                        <div className="bg-white border border-[#E5E7EB] rounded-md p-3 flex justify-between items-center">
                          <span className="text-[13px] text-[#6B7280] font-medium">
                            Contacts
                          </span>
                          <span className="text-[15px] text-[#111827] font-bold">
                            18,344,446
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Marketability Breakdown Card */}
                    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-3 flex flex-col">
                      <h3 className="text-[12px] font-semibold text-[#111827] mb-2.5">
                        Marketability Breakdown
                      </h3>
                      <div className="grid grid-cols-3 gap-2.5">
                        <div className="bg-white border border-[#E5E7EB] rounded-md p-2.5 flex flex-col justify-between">
                          <span className="text-[12px] text-[#6B7280] font-semibold mb-2">
                            Mailable
                          </span>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-[11px] text-[#9CA3AF]">
                                Company
                              </span>
                              <span className="text-[11px] text-[#111827] font-semibold">
                                3,892,456
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[11px] text-[#9CA3AF]">
                                People
                              </span>
                              <span className="text-[11px] text-[#111827] font-semibold">
                                16,234,892
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white border border-[#E5E7EB] rounded-md p-2.5 flex flex-col justify-between">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[12px] text-[#6B7280] font-semibold">
                              Phoneable
                            </span>
                            <div
                              className="inline-flex rounded-md overflow-hidden"
                              style={{ height: "24px" }}
                            >
                              <button
                                onClick={() => setPhoneType("directDial")}
                                title="Direct Dial"
                                className={`px-2 cursor-pointer transition-colors flex items-center justify-center ${
                                  phoneType === "directDial"
                                    ? "bg-[#22C55E] text-white border border-[#22C55E]"
                                    : "bg-white text-[#6B7280] border border-dashed border-[#D1D5DB]"
                                }`}
                              >
                                <svg
                                  className="h-3.5 w-3.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => setPhoneType("landline")}
                                title="Landline"
                                className={`px-2 cursor-pointer transition-colors flex items-center justify-center border-l-0 ${
                                  phoneType === "landline"
                                    ? "bg-[#22C55E] text-white border border-[#22C55E]"
                                    : "bg-white text-[#6B7280] border border-dashed border-[#D1D5DB]"
                                }`}
                              >
                                <svg
                                  className="h-3.5 w-3.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div
                            className="space-y-1"
                            style={{
                              minHeight: "36px",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-[11px] text-[#9CA3AF]">
                                Company
                              </span>
                              <span className="text-[11px] text-[#111827] font-semibold">
                                {phoneType === "directDial"
                                  ? "1,892,345"
                                  : "564,778"}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[11px] text-[#9CA3AF]">
                                People
                              </span>
                              <span className="text-[11px] text-[#111827] font-semibold">
                                {phoneType === "directDial"
                                  ? "8,456,123"
                                  : "4,436,222"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white border border-[#E5E7EB] rounded-md p-2.5 flex flex-col justify-between">
                          <span className="text-[12px] text-[#6B7280] font-semibold mb-2">
                            Emailable
                          </span>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-[11px] text-[#9CA3AF]">
                                Company
                              </span>
                              <span className="text-[11px] text-[#111827] font-semibold">
                                3,234,567
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[11px] text-[#9CA3AF]">
                                People
                              </span>
                              <span className="text-[11px] text-[#111827] font-semibold">
                                14,567,234
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Column & Row Filter Section */}
                  <div className="flex justify-center gap-4 my-2.5">
                    <div className="flex items-center gap-2">
                      <label className="text-[12px] font-medium text-[#6B7280]">
                        Column Filter
                      </label>
                      <select className="h-8 px-3 text-[12px] border border-[#E5E7EB] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#FF4D4F] focus:border-transparent">
                        <option>Country</option>
                        <option>Region</option>
                        <option>City</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-[12px] font-medium text-[#6B7280]">
                        Row Filter
                      </label>
                      <select className="h-8 px-3 text-[12px] border border-[#E5E7EB] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#FF4D4F] focus:border-transparent">
                        <option>Major Sector</option>
                        <option>Sub Sector</option>
                        <option>Industry</option>
                      </select>
                    </div>
                  </div>

                  {/* Insights Breakdown Table */}
                  <div className="mt-2">
                    <h3 className="text-[12px] font-semibold text-[#111827] mb-2">
                      Insights Breakdown
                    </h3>
                    <div className="border border-[#E5E7EB] rounded-md overflow-hidden">
                      <div
                        className="overflow-y-auto"
                        style={{ maxHeight: "280px" }}
                      >
                        <table
                          className="w-full text-[12px]"
                          style={{
                            tableLayout: "fixed",
                            borderCollapse: "collapse",
                          }}
                        >
                          <thead className="bg-[#F3F4F6] sticky top-0">
                            <tr>
                              <th
                                className="px-3 py-2 text-left font-semibold text-[#374151]"
                                style={{ width: "200px" }}
                              >
                                Sector
                              </th>
                              <th
                                className="px-3 py-2 text-right font-semibold text-[#374151]"
                                style={{ width: "120px" }}
                              >
                                England
                              </th>
                              <th
                                className="px-3 py-2 text-right font-semibold text-[#374151]"
                                style={{ width: "140px" }}
                              >
                                Northern Ireland
                              </th>
                              <th
                                className="px-3 py-2 text-right font-semibold text-[#374151]"
                                style={{ width: "120px" }}
                              >
                                Scotland
                              </th>
                              <th
                                className="px-3 py-2 text-right font-semibold text-[#374151]"
                                style={{ width: "120px" }}
                              >
                                Wales
                              </th>
                              <th
                                className="px-3 py-2 text-right font-semibold text-[#374151]"
                                style={{ width: "120px" }}
                              >
                                UK
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="hover:bg-[#F9FAFB] transition-colors">
                              <td className="px-3 py-2 text-[#374151]">
                                Agriculture & Farming
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                45,234
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                3,456
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                8,923
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                5,678
                              </td>
                              <td className="px-3 py-2 text-right font-semibold text-[#111827]">
                                63,291
                              </td>
                            </tr>
                            <tr className="hover:bg-[#F9FAFB] transition-colors">
                              <td className="px-3 py-2 text-[#374151]">
                                Automotive
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                89,456
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                4,567
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                12,345
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                7,890
                              </td>
                              <td className="px-3 py-2 text-right font-semibold text-[#111827]">
                                114,258
                              </td>
                            </tr>
                            <tr className="hover:bg-[#F9FAFB] transition-colors">
                              <td className="px-3 py-2 text-[#374151]">
                                Construction & Materials
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                156,789
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                8,901
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                23,456
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                12,345
                              </td>
                              <td className="px-3 py-2 text-right font-semibold text-[#111827]">
                                201,491
                              </td>
                            </tr>
                            <tr className="hover:bg-[#F9FAFB] transition-colors">
                              <td className="px-3 py-2 text-[#374151]">
                                Consumer Goods & Services
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                234,567
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                12,345
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                34,567
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                18,901
                              </td>
                              <td className="px-3 py-2 text-right font-semibold text-[#111827]">
                                300,380
                              </td>
                            </tr>
                            <tr className="hover:bg-[#F9FAFB] transition-colors">
                              <td className="px-3 py-2 text-[#374151]">
                                Education
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                178,901
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                9,876
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                28,901
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                15,678
                              </td>
                              <td className="px-3 py-2 text-right font-semibold text-[#111827]">
                                233,356
                              </td>
                            </tr>
                            <tr className="hover:bg-[#F9FAFB] transition-colors">
                              <td className="px-3 py-2 text-[#374151]">
                                Financial Services
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                456,789
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                23,456
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                67,890
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                34,567
                              </td>
                              <td className="px-3 py-2 text-right font-semibold text-[#111827]">
                                582,702
                              </td>
                            </tr>
                            <tr className="hover:bg-[#F9FAFB] transition-colors">
                              <td className="px-3 py-2 text-[#374151]">
                                Healthcare
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                892,345
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                45,678
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                123,456
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                67,890
                              </td>
                              <td className="px-3 py-2 text-right font-semibold text-[#111827]">
                                1,129,369
                              </td>
                            </tr>
                            <tr className="hover:bg-[#F9FAFB] transition-colors">
                              <td className="px-3 py-2 text-[#374151]">
                                Technology
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                678,901
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                34,567
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                89,012
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                45,678
                              </td>
                              <td className="px-3 py-2 text-right font-semibold text-[#111827]">
                                848,158
                              </td>
                            </tr>
                            <tr className="hover:bg-[#F9FAFB] transition-colors">
                              <td className="px-3 py-2 text-[#374151]">
                                Manufacturing
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                345,678
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                18,901
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                56,789
                              </td>
                              <td className="px-3 py-2 text-right text-[#374151]">
                                28,901
                              </td>
                              <td className="px-3 py-2 text-right font-semibold text-[#111827]">
                                450,269
                              </td>
                            </tr>
                          </tbody>
                          <tfoot className="sticky bottom-0 bg-[#F3F4F6]">
                            <tr>
                              <td className="px-3 py-2 text-[#111827] font-semibold border-t-2 border-[#E5E7EB]">
                                Total
                              </td>
                              <td className="px-3 py-2 text-right text-[#111827] font-semibold border-t-2 border-[#E5E7EB]">
                                3,078,660
                              </td>
                              <td className="px-3 py-2 text-right text-[#111827] font-semibold border-t-2 border-[#E5E7EB]">
                                161,747
                              </td>
                              <td className="px-3 py-2 text-right text-[#111827] font-semibold border-t-2 border-[#E5E7EB]">
                                445,339
                              </td>
                              <td className="px-3 py-2 text-right text-[#111827] font-semibold border-t-2 border-[#E5E7EB]">
                                237,528
                              </td>
                              <td className="px-3 py-2 text-right text-[#111827] font-semibold border-t-2 border-[#E5E7EB]">
                                3,923,274
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col min-h-0">
                {/* Scrollable Table */}
                <div className="flex-1 overflow-y-auto min-h-0">
                  {/* Table Header */}
                  <div className="sticky top-0 bg-[#F9FAFB] border-b-2 border-[#E5E7EB] z-10">
                    <div className="grid grid-cols-[2fr_1.2fr_1.5fr_1fr_1fr_1.8fr] gap-4 px-5 py-2.5">
                      <div className="text-[11px] font-bold text-[#374151] uppercase tracking-wide">
                        {searchMode === "company" ? "Company" : "Name"}
                      </div>
                      <div className="text-[11px] font-bold text-[#374151] uppercase tracking-wide">
                        Contact
                      </div>
                      <div className="text-[11px] font-bold text-[#374151] uppercase tracking-wide">
                        {searchMode === "company" ? "Sub Sector" : "Company"}
                      </div>
                      <div className="text-[11px] font-bold text-[#374151] uppercase tracking-wide">
                        City
                      </div>
                      <div className="text-[11px] font-bold text-[#374151] uppercase tracking-wide">
                        Country
                      </div>
                      <div className="text-[11px] font-bold text-[#374151] uppercase tracking-wide">
                        {searchMode === "company"
                          ? "Company Size"
                          : "Job Title"}
                      </div>
                    </div>
                  </div>

                  {/* Table Body */}
                  <div>
                    {displayedProspects.map((prospect) => (
                      <ProspectCard
                        key={prospect.id}
                        prospect={prospect}
                        searchMode={searchMode}
                      />
                    ))}
                  </div>
                </div>

                {/* Fixed Pagination Footer */}
                <div className="flex-shrink-0 border-t border-[#E5E7EB] bg-white px-4 py-2 flex items-center justify-between shadow-[0_-2px_8px_rgba(0,0,0,0.06)] z-20">
                  <div className="text-[13px] text-[#6B7280]">
                    Showing {(currentPage - 1) * RESULTS_PER_PAGE + 1}-
                    {Math.min(
                      currentPage * RESULTS_PER_PAGE,
                      MOCK_PROSPECTS.length,
                    )}{" "}
                    of {MOCK_PROSPECTS.length}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => loadPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 text-[13px] font-medium text-[#6B7280] hover:bg-[#F3F4F6] rounded disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => {
                        const hasAccess =
                          userPlan === "premium" ||
                          userPlan === "enterprise" ||
                          userPlan === "pro";
                        const isLocked = !hasAccess && page > 1;
                        return (
                          <button
                            key={page}
                            onClick={() => !isLocked && loadPage(page)}
                            disabled={isLocked}
                            title={
                              isLocked
                                ? "Upgrade to Pro to access more results"
                                : ""
                            }
                            className={cn(
                              "relative w-9 h-9 text-[13px] rounded transition-all",
                              currentPage === page
                                ? "bg-[#FF3030] text-white font-bold"
                                : isLocked
                                  ? "text-[#6B7280] cursor-not-allowed font-bold"
                                  : "text-[#6B7280] hover:bg-[#F3F4F6] font-medium",
                            )}
                          >
                            <span className={isLocked ? "opacity-0" : ""}>
                              {page}
                            </span>
                            {isLocked && (
                              <div className="absolute inset-0 flex items-center justify-center gap-0.5 bg-white/95 rounded">
                                <span className="text-[13px] font-bold text-[#6B7280]">
                                  {page}
                                </span>
                                <svg
                                  className="w-3 h-3 text-[#9CA3AF]"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </button>
                        );
                      },
                    )}
                    <button
                      onClick={() => loadPage(currentPage + 1)}
                      disabled={
                        !hasMore || (userPlan === "trial" && currentPage >= 1)
                      }
                      className="px-3 py-1.5 text-[13px] font-medium text-[#6B7280] hover:bg-[#F3F4F6] rounded disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div
              className="flex-1 flex items-center justify-center"
              style={{
                background: "linear-gradient(to bottom, #ffffff, #fafafa)",
              }}
            >
              <AIDiscoveryPanel
                aiPrompt={aiPrompt}
                setAiPrompt={setAiPrompt}
                currentPlaceholder={placeholders[currentPlaceholder]}
              />
            </div>
          )}
        </div>
      </div>

      {/* Export Configuration Modal */}
      {showExportModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 overflow-y-auto animate-in fade-in duration-200"
          style={{ paddingTop: "80px" }}
          onClick={() => setShowExportModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl w-[900px] flex flex-col animate-in zoom-in-95 slide-in-from-top-4 duration-300"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: "calc(100vh - 120px)" }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#E5E7EB]">
              <h2 className="text-[15px] font-bold text-[#111827]">
                Configure Export
              </h2>
              <p className="text-[12px] text-[#6B7280] mt-1">
                Select fields and configure your export settings
              </p>
            </div>

            {/* 3-Panel Layout */}
            <div className="flex-1 overflow-hidden p-5">
              <div
                className="grid gap-3"
                style={{ gridTemplateColumns: "1fr 1.2fr 1fr", height: "100%" }}
              >
                {/* Left Panel - Fields List */}
                <div className="border border-[#E5E7EB] rounded-md p-3 flex flex-col">
                  <h3 className="text-[12px] font-semibold text-[#111827] mb-2">
                    Available Fields
                  </h3>
                  <input
                    type="text"
                    placeholder="Search fields..."
                    value={fieldSearch}
                    onChange={(e) => setFieldSearch(e.target.value)}
                    className="w-full h-8 px-2 text-[12px] border border-[#E5E7EB] rounded mb-2 focus:outline-none focus:ring-1 focus:ring-[#FF4D4F]"
                  />
                  <label className="flex items-center gap-2 text-[12px] text-[#374151] mb-2 pb-2 border-b border-[#E5E7EB] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFields.length === 15}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFields([
                            "Email Status",
                            "Blog",
                            "Company Phone",
                            "Company Mobile",
                            "Company Email",
                            "Job Title",
                            "Full Name",
                            "City",
                            "Country",
                            "LinkedIn",
                            "Website",
                            "Company Size",
                            "Industry",
                            "Revenue",
                            "Specialty",
                          ]);
                        } else {
                          setSelectedFields([
                            "Company Email",
                            "Company Phone",
                            "Company Mobile",
                          ]);
                        }
                      }}
                      className="h-3.5 w-3.5"
                    />
                    <span className="font-semibold">Select All</span>
                  </label>
                  <div
                    className="flex-1 overflow-y-auto space-y-1"
                    style={{ maxHeight: "260px" }}
                  >
                    {[
                      { name: "Email Status", credits: 0 },
                      { name: "Blog", credits: 0 },
                      { name: "Company Phone", credits: 2 },
                      { name: "Company Mobile", credits: 2 },
                      { name: "Company Email", credits: 5 },
                      { name: "Job Title", credits: 0 },
                      { name: "Full Name", credits: 0 },
                      { name: "City", credits: 0 },
                      { name: "Country", credits: 0 },
                      { name: "LinkedIn", credits: 3 },
                      { name: "Website", credits: 0 },
                      { name: "Company Size", credits: 0 },
                      { name: "Industry", credits: 0 },
                      { name: "Revenue", credits: 4 },
                      { name: "Specialty", credits: 0 },
                    ]
                      .filter((f) =>
                        f.name
                          .toLowerCase()
                          .includes(fieldSearch.toLowerCase()),
                      )
                      .map((field) => (
                        <label
                          key={field.name}
                          className="flex items-center gap-2 text-[12px] text-[#374151] cursor-pointer hover:bg-[#F9FAFB] p-1.5 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={selectedFields.includes(field.name)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedFields([
                                  ...selectedFields,
                                  field.name,
                                ]);
                              } else {
                                setSelectedFields(
                                  selectedFields.filter(
                                    (f) => f !== field.name,
                                  ),
                                );
                              }
                            }}
                            className="h-3.5 w-3.5"
                          />
                          <span className="flex-1">{field.name}</span>
                          {field.credits > 0 && (
                            <span className="text-[11px] text-[#FF4D4F]">
                              🪙 {field.credits}
                            </span>
                          )}
                        </label>
                      ))}
                  </div>
                </div>

                {/* Middle Panel - Selected Fields + Inputs */}
                <div className="border border-[#E5E7EB] rounded-md p-3 flex flex-col">
                  <h3 className="text-[12px] font-semibold text-[#111827] mb-2">
                    Selected Fields ({selectedFields.length})
                  </h3>
                  <div
                    className="flex flex-wrap gap-1.5 mb-3 overflow-y-auto"
                    style={{ maxHeight: "180px" }}
                  >
                    {selectedFields.map((field) => (
                      <span
                        key={field}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-[#F3F4F6] text-[#374151] text-[11px] rounded border border-[#E5E7EB]"
                      >
                        {field}
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-[#FF4D4F]"
                          onClick={() =>
                            setSelectedFields(
                              selectedFields.filter((f) => f !== field),
                            )
                          }
                        />
                      </span>
                    ))}
                    {selectedFields.length === 0 && (
                      <p className="text-[11px] text-[#9CA3AF] italic">
                        No fields selected
                      </p>
                    )}
                  </div>

                  {/* Export Name */}
                  <div className="mb-3">
                    <label className="text-[11px] font-semibold text-[#374151] block mb-1">
                      Export Name <span className="text-[#FF4D4F]">*</span>
                    </label>
                    <input
                      type="text"
                      value={exportFileName}
                      onChange={(e) => setExportFileName(e.target.value)}
                      placeholder="e.g. UK Data"
                      className="w-full h-9 px-3 text-[12px] border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4D4F] focus:border-transparent"
                    />
                  </div>

                  {/* Records Count */}
                  <div>
                    <label className="text-[11px] font-semibold text-[#374151] block mb-1">
                      No of Records to Download{" "}
                      <span className="text-[#FF4D4F]">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50000"
                      value={exportRecords}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1;
                        setExportRecords(Math.min(Math.max(value, 1), 50000));
                      }}
                      className="w-full h-9 px-3 text-[12px] border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4D4F] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Right Panel - Credit Calculation */}
                <div className="border border-[#E5E7EB] rounded-md flex flex-col relative">
                  <div className="p-3 pb-0">
                    <h3 className="text-[12px] font-semibold text-[#111827] mb-2">
                      Credit Calculation
                    </h3>
                  </div>
                  <div
                    className="flex-1 overflow-y-auto px-3 space-y-2"
                    style={{ maxHeight: "200px" }}
                  >
                    {(() => {
                      const creditFields = [
                        { name: "Company Phone", credits: 2 },
                        { name: "Company Mobile", credits: 2 },
                        { name: "Company Email", credits: 5 },
                        { name: "LinkedIn", credits: 3 },
                        { name: "Revenue", credits: 4 },
                      ].filter((f) => selectedFields.includes(f.name));

                      return (
                        <>
                          {creditFields.map((field) => (
                            <div
                              key={field.name}
                              className="text-[11px] text-[#374151] flex justify-between"
                            >
                              <span>
                                {exportRecords.toLocaleString()} ×{" "}
                                {field.credits} ({field.name})
                              </span>
                              <span className="font-semibold">
                                {(
                                  exportRecords * field.credits
                                ).toLocaleString()}
                              </span>
                            </div>
                          ))}
                          {creditFields.length === 0 && (
                            <p className="text-[11px] text-[#9CA3AF] italic">
                              No premium fields selected
                            </p>
                          )}
                        </>
                      );
                    })()}
                  </div>
                  <div
                    className="exportCreditsFooter bg-white pt-1.5 px-3 pb-3 border-t border-[#E5E7EB]"
                    style={{ position: "sticky", bottom: "52px", zIndex: 2 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[12px] font-semibold text-[#111827]">
                        Total Credits:
                      </span>
                      <span className="text-[14px] font-bold text-[#FF4D4F]">
                        {(() => {
                          const creditFields = [
                            { name: "Company Phone", credits: 2 },
                            { name: "Company Mobile", credits: 2 },
                            { name: "Company Email", credits: 5 },
                            { name: "LinkedIn", credits: 3 },
                            { name: "Revenue", credits: 4 },
                          ].filter((f) => selectedFields.includes(f.name));
                          return creditFields
                            .reduce(
                              (sum, f) => sum + exportRecords * f.credits,
                              0,
                            )
                            .toLocaleString();
                        })()}
                      </span>
                    </div>
                    {(() => {
                      const creditFields = [
                        { name: "Company Phone", credits: 2 },
                        { name: "Company Mobile", credits: 2 },
                        { name: "Company Email", credits: 5 },
                        { name: "LinkedIn", credits: 3 },
                        { name: "Revenue", credits: 4 },
                      ].filter((f) => selectedFields.includes(f.name));
                      const totalCredits = creditFields.reduce(
                        (sum, f) => sum + exportRecords * f.credits,
                        0,
                      );
                      const isInsufficient = totalCredits > availableCredits;

                      if (isInsufficient) {
                        return (
                          <div className="flex items-center gap-1.5 text-[11px] text-[#DC2626] font-semibold">
                            <svg
                              className="h-3.5 w-3.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Insufficient Credits
                          </div>
                        );
                      }
                      return (
                        <div className="flex items-center gap-1.5 text-[11px] text-[#22C55E] font-semibold">
                          <svg
                            className="h-3.5 w-3.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Sufficient Credits Available
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className="px-5 py-3 border-t border-[#E5E7EB] flex items-center justify-end gap-2 bg-white"
              style={{ position: "sticky", bottom: 0, zIndex: 3 }}
            >
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 h-9 text-[13px] font-medium text-[#6B7280] hover:bg-[#F3F4F6] rounded-md transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 h-9 text-[13px] font-medium border border-[#E5E7EB] hover:bg-[#F9FAFB] rounded-md transition-colors">
                Worksheet
              </button>
              {(() => {
                const creditFields = [
                  { name: "Company Phone", credits: 2 },
                  { name: "Company Mobile", credits: 2 },
                  { name: "Company Email", credits: 5 },
                  { name: "LinkedIn", credits: 3 },
                  { name: "Revenue", credits: 4 },
                ].filter((f) => selectedFields.includes(f.name));
                const totalCredits = creditFields.reduce(
                  (sum, f) => sum + exportRecords * f.credits,
                  0,
                );
                const isInsufficient = totalCredits > availableCredits;

                if (isInsufficient) {
                  return (
                    <button
                      onClick={() => {
                        window.location.href =
                          "/subscription?feature=export&plan=premium&returnUrl=/prospect-search";
                      }}
                      className="px-4 h-8 text-[13px] font-semibold rounded-md bg-[#F59E0B] text-white hover:shadow-lg transition-all flex items-center gap-1.5"
                    >
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                      Upgrade Subscription
                    </button>
                  );
                }
                return null;
              })()}
              <button
                onClick={() => {
                  const creditFields = [
                    { name: "Company Phone", credits: 2 },
                    { name: "Company Mobile", credits: 2 },
                    { name: "Company Email", credits: 5 },
                    { name: "LinkedIn", credits: 3 },
                    { name: "Revenue", credits: 4 },
                  ].filter((f) => selectedFields.includes(f.name));
                  const totalCredits = creditFields.reduce(
                    (sum, f) => sum + exportRecords * f.credits,
                    0,
                  );

                  if (totalCredits > availableCredits) {
                    return;
                  }
                  // Export logic here
                  setShowExportModal(false);
                }}
                disabled={(() => {
                  const creditFields = [
                    { name: "Company Phone", credits: 2 },
                    { name: "Company Mobile", credits: 2 },
                    { name: "Company Email", credits: 5 },
                    { name: "LinkedIn", credits: 3 },
                    { name: "Revenue", credits: 4 },
                  ].filter((f) => selectedFields.includes(f.name));
                  const totalCredits = creditFields.reduce(
                    (sum, f) => sum + exportRecords * f.credits,
                    0,
                  );
                  return (
                    selectedFields.length === 0 ||
                    !exportFileName.trim() ||
                    totalCredits > availableCredits
                  );
                })()}
                className="px-4 h-9 text-[13px] font-semibold rounded-md bg-[#FF4D4F] text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </LockedPageLayout>
  );
}

function FilterDetailContent({ filterId, activeFilters, onFilterChange }: { filterId: FilterCategory; activeFilters: Array<{ category: string; value: string; mode: 'include' | 'exclude' }>; onFilterChange?: (category: string, selected: Array<{ value: string; mode: 'include' | 'exclude' }>) => void }) {
  const renderContent = () => {
    switch (filterId) {
      case "sector":
        return (
          <div className="space-y-4">
            <FilterField label="Major Sector" aiSuggested filterId="sector" options={['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail']} activeFilters={activeFilters} onFilterChange={onFilterChange} />
            <FilterField label="Group Sector" filterId="sector" options={['Software', 'Hardware', 'Services', 'Consulting']} activeFilters={activeFilters} onFilterChange={onFilterChange} />
            <div>
              <label className="text-[13px] font-semibold text-foreground flex items-center gap-1.5 mb-2">
                Sub Sector
                <Sparkles className="h-3 w-3 text-[#FF3030]" />
              </label>
              <MultiSelectDropdown 
                options={['SaaS', 'Cloud Computing', 'AI/ML', 'Cybersecurity']} 
                placeholder="Select sub sector..." 
                initialSelected={activeFilters.filter(f => f.category === 'Sub Sector')}
                onSelectionChange={(selected) => onFilterChange?.('Sub Sector', selected)} 
              />
            </div>
            <FilterField label="SIC Code" filterId="sector" options={['7372', '7373', '7374', '7375']} activeFilters={activeFilters} onFilterChange={onFilterChange} />
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
            <FilterField label="Country" filterId="location" options={['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany']} activeFilters={activeFilters} onFilterChange={onFilterChange} />
            <FilterField label="State/Region" filterId="location" options={['California', 'New York', 'Texas', 'Florida', 'Illinois']} activeFilters={activeFilters} onFilterChange={onFilterChange} />
            <FilterField label="City" filterId="location" options={['San Francisco', 'New York', 'Los Angeles', 'Chicago', 'Boston']} activeFilters={activeFilters} onFilterChange={onFilterChange} />
          </div>
        );
      case "companyInfo":
        return (
          <div className="space-y-4">
            <FilterField label="Company Name" filterId="companyInfo" options={['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta']} activeFilters={activeFilters} onFilterChange={onFilterChange} />
            <FilterField label="Website Domain" filterId="companyInfo" options={['google.com', 'microsoft.com', 'amazon.com']} activeFilters={activeFilters} onFilterChange={onFilterChange} />
            <FilterField label="Year Founded" filterId="companyInfo" options={['2020-2024', '2015-2019', '2010-2014', '2000-2009']} activeFilters={activeFilters} onFilterChange={onFilterChange} />
            <FilterField label="Company Type" filterId="companyInfo" options={['Public', 'Private', 'Startup', 'Non-Profit']} activeFilters={activeFilters} onFilterChange={onFilterChange} />
          </div>
        );
      case "marketing":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-[13px] font-semibold text-foreground mb-2 block">Contact Availability</label>
              <MultiSelectDropdown 
                options={['Mailable', 'Emailable', 'Phoneable']} 
                placeholder="Select availability..." 
                initialSelected={activeFilters.filter(f => f.category === 'Contact Availability')}
                onSelectionChange={(selected) => onFilterChange?.('Contact Availability', selected)} 
              />
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
            <FilterField label="Job Title" aiSuggested filterId="jobInfo" options={['CEO', 'CTO', 'VP Engineering', 'Director', 'Manager']} activeFilters={activeFilters} onFilterChange={onFilterChange} />
            <FilterField label="Seniority Level" filterId="jobInfo" options={['C-Level', 'VP', 'Director', 'Manager', 'Individual Contributor']} activeFilters={activeFilters} onFilterChange={onFilterChange} />
            <FilterField label="Department" filterId="jobInfo" options={['Engineering', 'Sales', 'Marketing', 'Operations', 'Finance']} activeFilters={activeFilters} onFilterChange={onFilterChange} />
            <FilterField label="Job Function" filterId="jobInfo" options={['Leadership', 'Technical', 'Business Development', 'Operations']} activeFilters={activeFilters} onFilterChange={onFilterChange} />
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

function MultiSelectDropdown({ options, placeholder, initialSelected = [], onSelectionChange }: { options: string[]; placeholder?: string; initialSelected?: Array<{ value: string; mode: 'include' | 'exclude' }>; onSelectionChange?: (selected: Array<{ value: string; mode: 'include' | 'exclude' }>) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Array<{ value: string; mode: 'include' | 'exclude' }>>(initialSelected);
  const [customOptions, setCustomOptions] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync with initialSelected when it changes
  useEffect(() => {
    setSelected(initialSelected);
  }, [JSON.stringify(initialSelected)]);

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
    setSelected(prev => {
      const newSelected = prev.some(s => s.value === option) ? prev.filter(s => s.value !== option) : [...prev, { value: option, mode: 'include' }];
      onSelectionChange?.(newSelected);
      return newSelected;
    });
  };

  const toggleMode = (value: string) => {
    setSelected(prev => {
      const newSelected = prev.map(s => 
        s.value === value ? { ...s, mode: s.mode === 'include' ? 'exclude' : 'include' } : s
      );
      onSelectionChange?.(newSelected);
      return newSelected;
    });
  };

  const removeChip = (value: string) => {
    setSelected(prev => {
      const newSelected = prev.filter(s => s.value !== value);
      onSelectionChange?.(newSelected);
      return newSelected;
    });
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

function FilterField({ label, aiSuggested, filterId, options, activeFilters, onFilterChange }: { label: string; aiSuggested?: boolean; filterId?: FilterCategory; options?: string[]; activeFilters?: Array<{ category: string; value: string; mode: 'include' | 'exclude' }>; onFilterChange?: (category: string, selected: Array<{ value: string; mode: 'include' | 'exclude' }>) => void }) {
  return (
    <div>
      <label className="text-[13px] font-semibold text-foreground flex items-center gap-1.5 mb-2">
        {label}
      </label>
      <MultiSelectDropdown 
        options={options || []} 
        placeholder={`Select ${label.toLowerCase()}...`}
        initialSelected={activeFilters?.filter(f => f.category === label) || []}
        onSelectionChange={(selected) => onFilterChange?.(label, selected)}
      />
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
          <div className="absolute w-full mt-1 bg-white border border-[#E5E7EB] rounded-md shadow-md overflow-hidden z-[1000]">
            <div className="overflow-y-auto min-h-[108px] max-h-[240px] pr-1 [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#D1D5DB] [&::-webkit-scrollbar-thumb]:rounded-md [&::-webkit-scrollbar-thumb:hover]:bg-[#9CA3AF] [scrollbar-width:thin] [scrollbar-color:#D1D5DB_transparent]">
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

function AIDiscoveryPanel({ aiPrompt, setAiPrompt, currentPlaceholder }: { aiPrompt: string; setAiPrompt: (value: string) => void; currentPlaceholder: string }) {
  const promptChips = [
    "Healthcare Providers – UK",
    "Fintech Startups – London",
    "Retail Chains – 500+ Staff",
    "SaaS Companies – Global",
    "Private Hospitals – UK",
    "Logistics Firms – EU"
  ];

  return (
    <div className="flex items-center justify-center w-full h-full relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #FF4D4F 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />
      
      {/* Floating Orbs */}
      <div className="absolute top-[15%] left-[10%] w-32 h-32 bg-gradient-to-br from-[#FF4D4F]/10 to-transparent rounded-full blur-3xl animate-[floatAI_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-[20%] right-[15%] w-40 h-40 bg-gradient-to-br from-[#FFA940]/10 to-transparent rounded-full blur-3xl animate-[floatAI_10s_ease-in-out_infinite_2s]" />
      
      {/* Content */}
      <div className="relative w-full max-w-[480px] mx-8">
        {/* Header */}
        <div className="text-center mb-4 animate-[fadeInUp_0.6s_ease-out]">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF4D4F] to-[#FF7A45] mb-2.5 shadow-lg shadow-[#FF4D4F]/20 animate-[scaleIn_0.5s_ease-out]">
            <Sparkles className="h-6 w-6 text-white animate-[spin_3s_linear_infinite]" style={{ animationDirection: 'reverse' }} />
          </div>
          <h2 className="text-[22px] font-bold bg-gradient-to-r from-[#FF4D4F] to-[#FF7A45] bg-clip-text text-transparent mb-1">AI Prospect Discovery</h2>
          <p className="text-[12px] text-[#9CA3AF]">Describe your ideal customer and let AI build your search</p>
        </div>

        {/* AI Input */}
        <div className="relative mb-3 animate-[fadeInUp_0.6s_ease-out_0.1s] opacity-0" style={{ animationFillMode: 'forwards' }}>
          <div className="absolute -inset-[2px] bg-gradient-to-r from-[#FF4D4F] via-[#FF7A45] to-[#FFA940] rounded-xl opacity-60 blur-md animate-[aiGradient_4s_ease_infinite]" />
          <div className="relative bg-white rounded-xl shadow-xl">
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder={currentPlaceholder}
              className="w-full h-12 px-4 py-2.5 text-[13px] bg-transparent rounded-xl outline-none resize-none placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full h-11 rounded-xl text-[14px] font-bold text-white mb-3 relative overflow-hidden group transition-all hover:shadow-2xl hover:shadow-[#FF4D4F]/50 hover:-translate-y-1 hover:scale-[1.02] shadow-xl shadow-[#FF4D4F]/40 animate-[fadeInUp_0.6s_ease-out_0.2s] opacity-0" style={{ background: 'linear-gradient(135deg, #FF4D4F 0%, #FF7A45 100%)', animationFillMode: 'forwards' }}>
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4" />
            Generate AI Filters
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </button>

        {/* Quick Prompts */}
        <div className="flex items-center gap-2 mb-2.5 animate-[fadeInUp_0.6s_ease-out_0.3s] opacity-0" style={{ animationFillMode: 'forwards' }}>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#E5E7EB] to-transparent" />
          <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Quick Start</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#E5E7EB] to-transparent" />
        </div>

        <div className="flex flex-wrap gap-1.5 justify-center mb-3">
          {promptChips.map((chip, index) => (
            <button
              key={chip}
              onClick={() => setAiPrompt(chip)}
              className="px-3 py-1.5 text-[11px] font-semibold text-[#6B7280] bg-white hover:text-[#FF4D4F] border border-[#E5E7EB] hover:border-[#FF4D4F] rounded-full transition-all hover:shadow-md hover:-translate-y-0.5 opacity-0 animate-[chipFadeIn_0.4s_ease_forwards]"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Features */}
        <div className="flex items-center justify-center gap-4 text-[11px] text-[#9CA3AF] animate-[fadeInUp_0.6s_ease-out_0.8s] opacity-0" style={{ animationFillMode: 'forwards' }}>
          <div className="flex items-center gap-1">
            <span className="text-[#22C55E] text-[12px]">✓</span>
            <span>Auto-Apply</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[#22C55E] text-[12px]">✓</span>
            <span>Smart Target</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[#22C55E] text-[12px]">✓</span>
            <span>Instant</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProspectCard({ prospect, searchMode }: { prospect: Prospect; searchMode: SearchMode }) {
  const [revealedEmail, setRevealedEmail] = useState(false);
  const [revealedPhone, setRevealedPhone] = useState(false);
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const TruncatedText = ({ text, field }: { text: string; field: string }) => (
    <div 
      className="relative"
      onMouseEnter={(e) => {
        setHoveredField(field);
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltipPos({ x: rect.left, y: rect.bottom + 4 });
      }}
      onMouseLeave={() => setHoveredField(null)}
    >
      <span className="block truncate max-w-[160px] text-[12px] text-[#374151] font-normal">{text}</span>
      {hoveredField === field && (
        <div 
          className="fixed bg-[#111827] text-white px-2 py-1 text-[12px] rounded shadow-lg z-50 max-w-[240px]"
          style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
        >
          {text}
        </div>
      )}
    </div>
  );

  const CompactContactCell = ({ email, phone }: { email?: string; phone?: string }) => (
    <div className="flex items-center gap-1.5">
      <button
        className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#F3F4F6] transition-colors group"
        onClick={(e) => {
          e.stopPropagation();
          if (revealedEmail && email) {
            navigator.clipboard.writeText(email);
          } else {
            setRevealedEmail(true);
          }
        }}
        title={revealedEmail ? email : 'Click to reveal email'}
      >
        <Mail className={cn(
          "h-4 w-4 transition-colors",
          revealedEmail ? "text-[#10B981]" : "text-[#9CA3AF] group-hover:text-[#6B7280]"
        )} />
      </button>
      <button
        className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#F3F4F6] transition-colors group"
        onClick={(e) => {
          e.stopPropagation();
          if (revealedPhone && phone) {
            navigator.clipboard.writeText(phone);
          } else {
            setRevealedPhone(true);
          }
        }}
        title={revealedPhone ? phone : 'Click to reveal phone'}
      >
        <Phone className={cn(
          "h-4 w-4 transition-colors",
          revealedPhone ? "text-[#10B981]" : "text-[#9CA3AF] group-hover:text-[#6B7280]"
        )} />
      </button>
      <button
        className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#F3F4F6] transition-colors group"
        title="More actions"
      >
        <ChevronDown className="h-4 w-4 text-[#9CA3AF] group-hover:text-[#6B7280]" />
      </button>
    </div>
  );

  const [city, country] = prospect.location.split(',').map(s => s.trim());

  if (searchMode === 'company') {
    return (
      <div className="grid grid-cols-[2fr_1.2fr_1.5fr_1fr_1fr_1.8fr] gap-4 items-center bg-white px-5 h-[42px] border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
        <div className="flex items-center gap-2">
          <Building2 className="h-3.5 w-3.5 text-[#FF4D4F] flex-shrink-0" />
          <TruncatedText text={prospect.company} field={`company-${prospect.id}`} />
        </div>
        <CompactContactCell email={prospect.companyEmail} phone={prospect.companyPhone} />
        <TruncatedText text={prospect.subSector || 'N/A'} field={`sector-${prospect.id}`} />
        <TruncatedText text={city} field={`city-${prospect.id}`} />
        <TruncatedText text={country} field={`country-${prospect.id}`} />
        <TruncatedText text={prospect.companySize || 'N/A'} field={`size-${prospect.id}`} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[2fr_1.2fr_1.5fr_1fr_1fr_1.8fr] gap-4 items-center bg-white px-5 h-[42px] border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
      <TruncatedText text={prospect.contactName} field={`name-${prospect.id}`} />
      <CompactContactCell email={prospect.email} phone={prospect.phone} />
      <div className="flex items-center gap-1.5">
        <Building2 className="h-3.5 w-3.5 text-[#FF4D4F] flex-shrink-0" />
        <TruncatedText text={prospect.company} field={`company-${prospect.id}`} />
      </div>
      <TruncatedText text={city} field={`city-${prospect.id}`} />
      <TruncatedText text={country} field={`country-${prospect.id}`} />
      <TruncatedText text={prospect.jobTitle} field={`title-${prospect.id}`} />
    </div>
  );
}
