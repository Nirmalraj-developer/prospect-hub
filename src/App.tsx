import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlanProvider } from "@/contexts/PlanContext";
import AppLayout from "@/components/AppLayout";
import HomePage from "@/pages/HomePage";
import ProspectSearchPage from "@/pages/ProspectSearchPage";
import SavedSearchPage from "@/pages/SavedSearchPage";
import DataEnrichmentPage from "@/pages/DataEnrichmentPage";
import CustomDataPage from "@/pages/CustomDataPage";
import EmailValidationPage from "@/pages/EmailValidationPage";
import SuppressionPage from "@/pages/SuppressionPage";
import SettingsPage from "@/pages/SettingsPage";
import SubscriptionPage from "@/pages/SubscriptionPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PlanProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/prospect-search" element={<ProspectSearchPage />} />
              <Route path="/saved-search" element={<SavedSearchPage />} />
              <Route path="/data-enrichment" element={<DataEnrichmentPage />} />
              <Route path="/custom-data" element={<CustomDataPage />} />
              <Route path="/validations/email" element={<EmailValidationPage />} />
              <Route path="/validations/suppression" element={<SuppressionPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/subscription" element={<SubscriptionPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PlanProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
