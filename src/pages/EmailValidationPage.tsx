import { Upload, Mail, CheckCircle, XCircle, AlertTriangle, FileUp, ArrowRight, AtSign, FileText, Check, Loader2, Server, Shield, Gauge, ArrowDown, Table, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LockedPageLayout, LockedButton } from "@/components/LockedPageLayout";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";

const singleValidationFlow = [
  { id: 1, label: "User Enters Email", icon: Mail, color: "text-blue-500" },
  { id: 2, label: "Secure Server Reach", icon: Server, color: "text-purple-500" },
  { id: 3, label: "Mailbox Verification", icon: CheckCircle, color: "text-green-500" },
  { id: 4, label: "Risk Detection", icon: Shield, color: "text-amber-500" },
  { id: 5, label: "Score Generated", icon: Gauge, color: "text-red-500" },
  { id: 6, label: "Response Returned", icon: ArrowRight, color: "text-slate-500" },
];

const bulkValidationFlow = [
  { id: 1, label: "Upload File", icon: Upload, color: "text-blue-500" },
  { id: 2, label: "Detect Column", icon: Table, color: "text-purple-500" },
  { id: 3, label: "Map Field", icon: ArrowDown, color: "text-green-500" },
  { id: 4, label: "Evaluate Data", icon: Scan, color: "text-amber-500" },
  { id: 5, label: "SMTP Check", icon: Server, color: "text-red-500" },
  { id: 6, label: "Segmentation", icon: Shield, color: "text-orange-500" },
];

const validationChecks = [
  { label: "Domain Check", delay: 0 },
  { label: "SMTP Mailbox Check", delay: 400 },
  { label: "Disposable Email Detection", delay: 800 },
  { label: "Catch-All Risk Check", delay: 1200 },
  { label: "Role-Based Email Detection", delay: 1600 },
];

const sampleResults = [
  { email: "john@acme.com", date: "February 10, 2026", score: 99, status: "valid", deliverability: 99, spamTrap: "Low", mailboxExists: "Yes" },
  { email: "jane@unknown.xyz", date: "February 10, 2026", score: 10, status: "invalid", deliverability: 10, spamTrap: "High", mailboxExists: "No" },
  { email: "info@oldsite.co", date: "February 09, 2026", score: 45, status: "risky", deliverability: 45, spamTrap: "Medium", mailboxExists: "Unknown" },
];

export default function EmailValidationPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"single" | "bulk">("single");
  const [isValidating, setIsValidating] = useState(false);
  const [completedChecks, setCompletedChecks] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [validationScore, setValidationScore] = useState(0);
  const [bulkProgress, setBulkProgress] = useState(0);
  const [bulkStats, setBulkStats] = useState({ total: 0, valid: 0, risky: 0, invalid: 0 });

  const [processStep, setProcessStep] = useState(0);
  const [hasCompletedOnce, setHasCompletedOnce] = useState(false);
  const [hasBulkAnimated, setHasBulkAnimated] = useState(false);

  useEffect(() => {
    if (activeTab === "single") {
      setProcessStep(0);
      setHasCompletedOnce(false);
      setHasBulkAnimated(false);
      
      if (!isValidating && !hasCompletedOnce) {
        const interval = setInterval(() => {
          setProcessStep(prev => {
            if (prev >= singleValidationFlow.length - 1) {
              setHasCompletedOnce(true);
              clearInterval(interval);
              return prev;
            }
            return prev + 1;
          });
        }, 1500);
        return () => clearInterval(interval);
      }
    } else if (activeTab === "bulk") {
      if (!hasBulkAnimated) {
        setProcessStep(0);
        const interval = setInterval(() => {
          setProcessStep(prev => {
            if (prev >= bulkValidationFlow.length - 1) {
              setHasBulkAnimated(true);
              clearInterval(interval);
              return prev;
            }
            return prev + 1;
          });
        }, 1500);
        return () => clearInterval(interval);
      }
    }
  }, [activeTab, isValidating, hasCompletedOnce, hasBulkAnimated]);

  useEffect(() => {
    if (isValidating && activeTab === "single") {
      validationChecks.forEach((check, index) => {
        setTimeout(() => {
          setCompletedChecks(prev => [...prev, index]);
        }, check.delay);
      });

      setTimeout(() => {
        setIsValidating(false);
        setShowResult(true);
        // Animate score
        let score = 0;
        const targetScore = 87;
        const interval = setInterval(() => {
          score += 3;
          if (score >= targetScore) {
            score = targetScore;
            clearInterval(interval);
          }
          setValidationScore(score);
        }, 30);
      }, 2000);
    }

    if (isValidating && activeTab === "bulk") {
      const interval = setInterval(() => {
        setBulkProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsValidating(false);
            setBulkStats({ total: 1000, valid: 650, risky: 200, invalid: 150 });
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    }
  }, [isValidating, activeTab]);

  const handleValidate = () => {
    setIsValidating(true);
    setCompletedChecks([]);
    setShowResult(false);
    setValidationScore(0);
    setBulkProgress(0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", fill: "#10b981" };
    if (score >= 50) return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", fill: "#f59e0b" };
    return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", fill: "#ef4444" };
  };

  return (
    <LockedPageLayout featureName="Email Validation" requiredPlan="premium">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 md:p-6 mb-3 shadow-sm">
          <div className="flex gap-4 md:gap-6 border-b border-slate-100 pb-3 md:pb-4">
            <button
              onClick={() => setActiveTab("single")}
              className={cn(
                "flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium pb-2 transition-all relative",
                activeTab === "single" ? "text-slate-800" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <AtSign className="h-3.5 w-3.5 md:h-4 md:w-4" /> <span className="hidden sm:inline">Single Validation</span><span className="sm:hidden">Single</span>
              {activeTab === "single" && (
                <div className="absolute -bottom-3 md:-bottom-4 left-0 right-0 h-0.5 bg-[#FF3030] rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("bulk")}
              className={cn(
                "flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium pb-2 transition-all relative",
                activeTab === "bulk" ? "text-slate-800" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <FileText className="h-3.5 w-3.5 md:h-4 md:w-4" /> <span className="hidden sm:inline">Bulk Validation</span><span className="sm:hidden">Bulk</span>
              {activeTab === "bulk" && (
                <div className="absolute -bottom-3 md:-bottom-4 left-0 right-0 h-0.5 bg-[#FF3030] rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Process Flow Panel */}
        <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg p-3 md:p-4 mb-4 md:mb-6 shadow-sm transition-all overflow-x-auto">
          <h2 className="text-[10px] md:text-xs font-semibold text-slate-600 mb-2 md:mb-3">
            {activeTab === "single" ? "📩 Email Validation Lifecycle" : "📁 File Validation Pipeline"}
          </h2>
          
          <div className="flex items-center justify-between gap-2 md:gap-4 w-full min-w-[600px] md:min-w-0">
            {(activeTab === "single" ? singleValidationFlow : bulkValidationFlow).map((step, index) => {
              const isActive = processStep === index;
              const isCompleted = processStep > index;
              const Icon = step.icon;
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-1 md:gap-1.5 w-full">
                    {/* Expandable Response Node */}
                    {index === (activeTab === "single" ? singleValidationFlow : bulkValidationFlow).length - 1 && showResult && activeTab === "single" ? (
                      <div
                        className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-full transition-all animate-in fade-in scale-in-95 duration-200"
                        style={{
                          backgroundColor: validationScore >= 80 ? '#f0fdf4' : validationScore >= 50 ? '#fef3c7' : '#fef2f2',
                          border: `2px solid ${validationScore >= 80 ? '#86efac' : validationScore >= 50 ? '#fbbf24' : '#fca5a5'}`,
                        }}
                      >
                        {validationScore >= 80 ? (
                          <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
                        ) : validationScore >= 50 ? (
                          <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 text-amber-600" />
                        ) : (
                          <XCircle className="h-3 w-3 md:h-4 md:w-4 text-red-600" />
                        )}
                        <div className="flex items-center gap-1 md:gap-1.5">
                          <span className={cn(
                            "text-[10px] md:text-xs font-semibold",
                            validationScore >= 80 ? "text-green-700" : validationScore >= 50 ? "text-amber-700" : "text-red-700"
                          )}>
                            {validationScore >= 80 ? 'Valid' : validationScore >= 50 ? 'Risky' : 'Invalid'}
                          </span>
                          <div className="h-2.5 md:h-3 w-px bg-slate-300" />
                          <span className="text-[9px] md:text-[10px] font-medium text-slate-600">{validationScore}/100</span>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center transition-all",
                          isActive && "animate-pulse ring-2 md:ring-4 ring-[#FFE3D5] scale-110",
                          isCompleted ? "bg-green-100" : isActive ? "bg-[#FFE3D5]" : "bg-slate-100"
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-3.5 w-3.5 md:h-4 md:w-4 transition-all",
                            isCompleted ? "text-green-600" : isActive ? step.color : "text-slate-400"
                          )}
                        />
                      </div>
                    )}
                    <span
                      className={cn(
                        "text-center font-medium transition-colors leading-tight",
                        isActive ? "text-slate-800" : "text-slate-500"
                      )}
                      style={{ fontSize: '9px', whiteSpace: 'nowrap' }}
                    >
                      {step.label}
                    </span>
                  </div>
                  
                  {index < (activeTab === "single" ? singleValidationFlow : bulkValidationFlow).length - 1 && (
                    <div className="flex items-center px-1 md:px-1.5">
                      <div className="flex gap-0.5">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className={cn(
                              "h-0.5 w-0.5 md:h-1 md:w-1 rounded-full transition-all",
                              processStep > index ? "bg-green-500" : processStep === index ? "bg-[#FF3030]" : "bg-slate-300"
                            )}
                            style={{
                              animationDelay: `${i * 100}ms`,
                              animation: processStep === index ? 'pulse 1s ease-in-out infinite' : 'none',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Panel */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 md:p-6 mb-4 md:mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 md:gap-4">
            {activeTab === "single" ? (
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-600 mb-2">Enter email address</label>
                <input
                  type="email"
                  placeholder="e.g. name@company.com"
                  disabled={isValidating}
                  className="w-full h-10 px-4 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#FF3030] focus:ring-2 focus:ring-[#FFE3D5] placeholder:text-slate-400 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all"
                />
              </div>
            ) : (
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-600 mb-2">Upload CSV or TXT</label>
                <div className="relative">
                  <input type="file" className="hidden" id="file-upload" disabled={isValidating} />
                  <label
                    htmlFor="file-upload"
                    className={cn(
                      "flex items-center justify-between w-full h-10 px-4 text-sm border-2 border-dashed rounded-lg cursor-pointer transition-all",
                      isValidating
                        ? "border-slate-200 bg-slate-50 cursor-not-allowed"
                        : "border-slate-300 hover:border-[#FF3030] hover:bg-[#FFE3D5]/20"
                    )}
                  >
                    <span className="text-slate-500">Choose file...</span>
                    <FileUp className="h-4 w-4 text-slate-400" />
                  </label>
                </div>
              </div>
            )}

            <LockedButton
              requiredPlan="premium"
              tooltipText="Upgrade to Premium to validate emails"
              onClick={handleValidate}
              disabled={isValidating}
              className="h-10 px-4 md:px-6 text-xs md:text-sm bg-[#FF3030] hover:bg-[#B71833] text-white border-0 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {isValidating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Validating...
                </>
              ) : (
                "Validate"
              )}
            </LockedButton>
          </div>
        </div>

        {/* Results Table */}
        <div>
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h3 className="text-xs md:text-sm font-semibold text-slate-800">Validation Results</h3>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-3 md:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</th>
                    <th className="px-3 md:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">Date</th>
                    <th className="px-3 md:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold text-slate-600 uppercase tracking-wider">Score</th>
                    <th className="px-3 md:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sampleResults.map((row, index) => {
                    const scoreColor = getScoreColor(row.score);
                    return (
                      <tr key={row.email} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-3 md:px-4 py-2 md:py-3 text-slate-700 font-medium text-xs md:text-sm">{row.email}</td>
                        <td className="px-3 md:px-4 py-2 md:py-3 text-slate-500 text-[10px] md:text-xs hidden sm:table-cell">{row.date}</td>
                        <td className="px-3 md:px-4 py-2 md:py-3">
                          <div className="flex items-center gap-1.5 md:gap-2">
                            <span className="text-slate-700 font-semibold text-xs md:text-sm">{row.score}</span>
                            <div className="w-12 md:w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full transition-all"
                                style={{
                                  width: `${row.score}%`,
                                  backgroundColor: scoreColor.fill,
                                  transitionDuration: '400ms',
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-3 md:px-4 py-2 md:py-3">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium",
                              row.status === "valid" && "bg-green-50 text-green-700 border border-green-200",
                              row.status === "risky" && "bg-amber-50 text-amber-700 border border-amber-200",
                              row.status === "invalid" && "bg-red-50 text-red-700 border border-red-200"
                            )}
                          >
                            {row.status === "valid" && <CheckCircle className="h-2.5 w-2.5 md:h-3 md:w-3" />}
                            {row.status === "risky" && <AlertTriangle className="h-2.5 w-2.5 md:h-3 md:w-3" />}
                            {row.status === "invalid" && <XCircle className="h-2.5 w-2.5 md:h-3 md:w-3" />}
                            <span className="capitalize">{row.status}</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </LockedPageLayout>
  );
}
