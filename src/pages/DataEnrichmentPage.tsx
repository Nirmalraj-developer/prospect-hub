import { Upload, FileUp, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LockedPageLayout, LockedButton } from "@/components/LockedPageLayout";

const steps = [
  { step: 1, title: "Upload your file", description: "CSV or Excel with company or contact data" },
  { step: 2, title: "Map your columns", description: "Match your fields to our enrichment schema" },
  { step: 3, title: "Get enriched data", description: "Download your file with verified, appended data" },
];

export default function DataEnrichmentPage() {
  return (
    <LockedPageLayout featureName="Data Enrichment" requiredPlan="premium">
      <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Data Enrichment</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Upload your file and enrich it with verified, real-time data
        </p>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-between mb-10">
        {steps.map((s, i) => (
          <div key={s.step} className="flex items-center">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-primary">
                {s.step}
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{s.title}</div>
                <div className="text-xs text-muted-foreground">{s.description}</div>
              </div>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="h-4 w-4 text-muted-foreground mx-6" />
            )}
          </div>
        ))}
      </div>

      {/* Upload area */}
      <div className="border-2 border-dashed border-border rounded-xl p-12 text-center bg-card hover:border-primary/40 transition-colors">
        <div className="h-16 w-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Drag & drop your file here
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Supports CSV, XLSX up to 50MB
        </p>
        <LockedButton requiredPlan="premium" tooltipText="Upgrade to Premium to enrich data">
          <FileUp className="h-4 w-4 mr-2" />
          Browse Files
        </LockedButton>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        {[
          { label: "Enrichment Fields", value: "50+" },
          { label: "Avg. Match Rate", value: "92%" },
          { label: "Processing Time", value: "< 5 min" },
        ].map((item) => (
          <div key={item.label} className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="text-xl font-bold text-foreground">{item.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
          </div>
        ))}
      </div>
      </div>
    </LockedPageLayout>
  );
}
