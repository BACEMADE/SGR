import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PartnerLayout from "./components/partner/PartnerLayout";
import Dashboard from "./pages/partner/Dashboard";
import PartnerCalendar from "./pages/partner/PartnerCalendar";
import Content from "./pages/partner/Content";
import Performance from "./pages/partner/Performance";
import Profile from "./pages/partner/Profile";
import Billing from "./pages/partner/Billing";
import Support from "./pages/partner/Support";
import PartnerMessages from "./pages/partner/Messages";
import CreatorLayout from "./components/creator/CreatorLayout";
import CreatorLogin from "./pages/creator/CreatorLogin";
import CreatorDashboard from "./pages/creator/CreatorDashboard";
import CreatorVisits from "./pages/creator/CreatorVisits";
import CreatorSubmitContent from "./pages/creator/CreatorSubmitContent";
import CreatorMessages from "./pages/creator/CreatorMessages";
import CreatorProfile from "./pages/creator/CreatorProfile";
import CreatorSupport from "./pages/creator/CreatorSupport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Partner Portal */}
          <Route path="/partner" element={<PartnerLayout />}>
            <Route index element={<Navigate to="/partner/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="calendar" element={<PartnerCalendar />} />
            <Route path="content" element={<Content />} />
            <Route path="performance" element={<Performance />} />
            <Route path="profile" element={<Profile />} />
            <Route path="billing" element={<Billing />} />
            <Route path="support" element={<Support />} />
            <Route path="messages" element={<PartnerMessages />} />
          </Route>

          {/* Creator Portal */}
          <Route path="/creator/login" element={<CreatorLogin />} />
          <Route path="/creator" element={<CreatorLayout />}>
            <Route index element={<Navigate to="/creator/dashboard" replace />} />
            <Route path="dashboard" element={<CreatorDashboard />} />
            <Route path="visits" element={<CreatorVisits />} />
            <Route path="submit" element={<CreatorSubmitContent />} />
            <Route path="messages" element={<CreatorMessages />} />
            <Route path="profile" element={<CreatorProfile />} />
            <Route path="support" element={<CreatorSupport />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
