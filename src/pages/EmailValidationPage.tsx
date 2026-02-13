import { Upload, Mail, CheckCircle, XCircle, AlertTriangle, FileUp, ArrowRight, AtSign, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LockedPageLayout, LockedButton } from "@/components/LockedPageLayout";
import { useState } from "react";

const validationTabs = [
  { label: "Email Validation", path: "/validations/email" },
  { label: "Suppression", path: "/validations/suppression" },
];

const sampleResults = [
  { email: "john@acme.com", date: "February 10, 2026", score: 99, status: "valid", icon: CheckCircle, color: "text-green-600" },
  { email: "jane@unknown.xyz", date: "February 10, 2026", score: 10, status: "invalid", icon: XCircle, color: "text-red-500" },
  { email: "info@oldsite.co", date: "February 09, 2026", score: 45, status: "risky", icon: AlertTriangle, color: "text-yellow-500" },
];

export default function EmailValidationPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"single" | "bulk">("single");

  return (
    <LockedPageLayout featureName="Email Validation" requiredPlan="premium">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-slate-800">Email Validation</h1>
          <p className="text-xs text-slate-500 mt-1">
            Validate individual or bulk email addresses to reduce bounce rates and protect sender reputation.
          </p>
        </div>

        {/* Action Panel */}
        <div className="bg-white border border-slate-200 rounded-md p-4 mb-4 shadow-sm">
          <div className="flex gap-4 border-b border-slate-100 pb-3 mb-4">
            <button
              onClick={() => setActiveTab("single")}
              className={cn(
                "flex items-center gap-2 text-sm font-medium pb-1 transition-colors relative",
                activeTab === "single" ? "text-slate-800" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <AtSign className="h-4 w-4" /> Single Validation
              {activeTab === "single" && <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-red-500"></div>}
            </button>
            <button
              onClick={() => setActiveTab("bulk")}
              className={cn(
                "flex items-center gap-2 text-sm font-medium pb-1 transition-colors relative",
                activeTab === "bulk" ? "text-slate-800" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <FileText className="h-4 w-4" /> Bulk Validation
              {activeTab === "bulk" && <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-red-500"></div>}
            </button>
          </div>

          <div className="flex items-end gap-3">
            {activeTab === "single" ? (
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-500 mb-1.5 ml-1">Enter email address</label>
                <input
                  type="email"
                  placeholder="e.g. name@company.com"
                  className="w-full h-9 px-3 text-sm border border-slate-300 rounded focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder:text-slate-300"
                />
              </div>
            ) : (
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-500 mb-1.5 ml-1">Upload CSV or TXT</label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-between w-full h-9 px-3 text-sm border border-dashed border-slate-300 rounded cursor-pointer hover:border-red-400 hover:bg-slate-50 transition-colors text-slate-400"
                  >
                    <span>Choose file...</span>
                    <FileUp className="h-4 w-4 text-slate-400" />
                  </label>
                </div>
              </div>
            )}

            <LockedButton
              requiredPlan="premium"
              tooltipText="Upgrade to Premium to validate emails"
              className="h-8 px-4 text-xs bg-red-600 hover:bg-red-700 text-white border-0"
            >
              Validate
            </LockedButton>
          </div>
        </div>

        {/* Process Flow */}
        <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-8 pl-1">
          <span>Upload</span> <ArrowRight className="h-3 w-3" />
          <span>Validate</span> <ArrowRight className="h-3 w-3" />
          <span>Review</span> <ArrowRight className="h-3 w-3" />
          <span>Export</span>
        </div>

        {/* Results Table */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[13px] font-semibold text-slate-800">Validation Results</h3>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase font-semibold">
                <tr>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3">Result</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sampleResults.map((row) => (
                  <tr key={row.email} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-slate-700 font-medium">{row.email}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{row.date}</td>
                    <td className="px-4 py-3 text-slate-600 font-medium">{row.score}</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium border",
                        row.status === 'valid' ? "bg-red-50 text-red-700 border-red-100" :
                          row.status === 'invalid' ? "bg-slate-100 text-slate-600 border-slate-200" :
                            "bg-yellow-50 text-yellow-700 border-yellow-100"
                      )}>
                        <row.icon className="h-3 w-3" />
                        <span className="capitalize">{row.status}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-slate-500 text-xs border border-slate-200 rounded px-2 py-0.5 bg-white">
                        <CheckCircle className="h-3 w-3 text-green-500" /> Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </LockedPageLayout>
  );
}
