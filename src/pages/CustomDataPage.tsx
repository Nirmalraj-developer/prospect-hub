import { FileSpreadsheet, Send, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LockedPageLayout, LockedButton } from "@/components/LockedPageLayout";

const pastRequests = [
  { id: 1, title: "UK SaaS Decision Makers", status: "completed", date: "Jan 15, 2026" },
  { id: 2, title: "APAC Retail Chain Contacts", status: "in_progress", date: "Feb 8, 2026" },
];

export default function CustomDataPage() {
  return (
    <LockedPageLayout featureName="Custom Data Request" requiredPlan="pro">
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Custom Data Request</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Tell us your requirement and we'll build the dataset for you
        </p>
      </div>

      {/* Request form */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <h3 className="font-semibold text-foreground mb-4">New Request</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Request Title
            </label>
            <Input placeholder="e.g., Healthcare CTOs in DACH region" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Description
            </label>
            <Textarea
              placeholder="Describe the data you need — target industries, job titles, geographies, company size, and any other criteria..."
              rows={4}
            />
          </div>
          <div className="flex justify-end">
            <LockedButton requiredPlan="pro" tooltipText="Upgrade to Pro to submit custom data requests">
              <Send className="h-4 w-4 mr-2" />
              Submit Request
            </LockedButton>
          </div>
        </div>
      </div>

      {/* Past requests */}
      <h3 className="font-semibold text-foreground mb-3">Past Requests</h3>
      <div className="space-y-3">
        {pastRequests.map((req) => (
          <div
            key={req.id}
            className="bg-card border border-border rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center">
                <FileSpreadsheet className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground text-sm">{req.title}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Clock className="h-3 w-3" /> {req.date}
                </div>
              </div>
            </div>
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                req.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {req.status === "completed" ? "Completed" : "In Progress"}
            </span>
          </div>
        ))}
      </div>
    </div>
    </LockedPageLayout>
  );
}
