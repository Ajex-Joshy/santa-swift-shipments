import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Index from "./pages/Index";
import RoutePlanner from "./pages/RoutePlanner";
import FleetStatus from "./pages/FleetStatus";
import Deliveries from "./pages/Deliveries";
import WeatherCenter from "./pages/WeatherCenter";
import Emergencies from "./pages/Emergencies";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/routes" element={<RoutePlanner />} />
            <Route path="/fleet" element={<FleetStatus />} />
            <Route path="/deliveries" element={<Deliveries />} />
            <Route path="/weather" element={<WeatherCenter />} />
            <Route path="/emergencies" element={<Emergencies />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
