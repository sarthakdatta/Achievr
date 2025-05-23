
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ClerkProvider, ClerkLoading, SignIn, SignUp, useAuth } from "@clerk/clerk-react";
import { UserProvider } from "@/context/UserContext";
import Index from "./pages/Index";
import Practice from "./pages/Practice";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { RequireAuth } from "./middleware/auth";
import { toast } from "sonner";
import { useEffect } from "react";

// Get Clerk publishable key from environment variables or use the provided key
const PUBLISHABLE_KEY = "pk_test_c3VpdGFibGUtYmx1ZWpheS0yMy5jbGVyay5hY2NvdW50cy5kZXYk";

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Redirect component that checks auth state and redirects accordingly
const RedirectAfterAuth = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isSignedIn) {
      navigate('/practice');
    }
  }, [isSignedIn, navigate]);
  
  return null;
};

const App = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <BrowserRouter>
            <TooltipProvider>
              <RedirectAfterAuth />
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
                <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
                <Route path="/practice" element={<RequireAuth><Practice /></RequireAuth>} />
                <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </BrowserRouter>
        </UserProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default App;
