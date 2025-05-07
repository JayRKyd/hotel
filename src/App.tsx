import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Quote from "./pages/Quote";
import DetailedQuote from "./pages/DetailedQuote";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import AdminLayoutRoute from "./components/admin/AdminLayoutRoute";
import Dashboard from "./pages/admin/components/Dashboard";
import Hotels from "./pages/admin/Hotels";
import NewHotel from "./pages/admin/NewHotel";
import Trips from "./pages/admin/Trips";
import NewTrip from "./pages/admin/NewTrip";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/detailed-quote" element={<DetailedQuote />} />
          <Route path="/about" element={<AboutUs />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayoutRoute />}>
            <Route index element={<Dashboard />} />
            <Route path="hotels" element={<Hotels />} />
            <Route path="hotels/new" element={<NewHotel />} />
            <Route path="trips" element={<Trips />} />
            <Route path="trips/new" element={<NewTrip />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
