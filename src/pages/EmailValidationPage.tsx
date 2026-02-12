import { Upload, Mail, CheckCircle, XCircle, AlertTriangle, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const validationTabs = [
  { label: "Email Validation", path: "/validations/email" },
  { label: "Suppression", path: "/validations/suppression" },
];

const sampleResults = [
  { email: "john@acme.com", status: "valid", icon: CheckCircle, color: "text-green-600" },
  { email: "jane@unknown.xyz", status: "invalid", icon: XCircle, color: "text-red-500" },
  { email: "info@oldsite.co", status: "risky", icon: AlertTriangle, color: "text-yellow-500" },
];

export default function EmailValidationPage() {
  const location = useLocation();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Validations</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Verify email addresses and manage suppression lists
        </p>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1 bg-muted rounded-lg p-1 mb-8 w-fit">
        {validationTabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-colors",
              location.pathname === tab.path
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      {/* Upload area */}
      <div className="border-2 border-dashed border-border rounded-xl p-10 text-center bg-card hover:border-primary/40 transition-colors mb-8">
        <div className="h-14 w-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
          <Mail className="h-7 w-7 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Upload email list for validation
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          CSV or TXT file with one email per line
        </p>
        <Button>
          <FileUp className="h-4 w-4 mr-2" />
          Upload File
        </Button>
      </div>

      {/* Sample results */}
      <h3 className="font-semibold text-foreground mb-3">Sample Results</h3>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {sampleResults.map((row) => (
              <tr key={row.email} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-foreground">{row.email}</td>
                <td className="px-4 py-3">
                  <span className={`flex items-center gap-1.5 ${row.color}`}>
                    <row.icon className="h-4 w-4" />
                    <span className="capitalize font-medium">{row.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {[
          { label: "Accuracy Rate", value: "99.5%" },
          { label: "Avg. Speed", value: "10K/min" },
          { label: "Catch-All Detection", value: "Yes" },
        ].map((item) => (
          <div key={item.label} className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-xl font-bold text-foreground">{item.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
