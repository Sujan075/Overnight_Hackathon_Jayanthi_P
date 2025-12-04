import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import Transactions from "./pages/Transactions";
import RiskScore from "./pages/RiskScore";
import Sandbox from "./pages/Sandbox";
import TrustGraph from "./pages/TrustGraph";
import FraudStories from "./pages/FraudStories";
import ScamNews from "./pages/ScamNews";
import Features from "./pages/Features";
import VoiceAssistant from "./pages/VoiceAssistant";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/risk-score" element={<RiskScore />} />
          <Route path="/sandbox" element={<Sandbox />} />
          <Route path="/trust-graph" element={<TrustGraph />} />
          <Route path="/fraud-stories" element={<FraudStories />} />
          <Route path="/scam-news" element={<ScamNews />} />
          <Route path="/features" element={<Features />} />
          <Route path="/voice-assistant" element={<VoiceAssistant />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/*" element={<Dashboard />} />
          <Route path="/settings" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
