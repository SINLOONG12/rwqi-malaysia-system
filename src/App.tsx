
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import SalesPage from "./pages/SalesPage";
import CustomersPage from "./pages/CustomersPage";
import OperationsPage from "./pages/OperationsPage";
import MarketingPage from "./pages/MarketingPage";
import FinancePage from "./pages/FinancePage";
import RiverMonitoringPage from "./pages/RiverMonitoringPage";
import DataCollectionPage from "./pages/DataCollectionPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Dashboard />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/operations" element={<OperationsPage />} />
            <Route path="/marketing" element={<MarketingPage />} />
            <Route path="/finance" element={<FinancePage />} />
            <Route path="/river-monitoring" element={<RiverMonitoringPage />} />
            <Route path="/data-collection" element={<DataCollectionPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
