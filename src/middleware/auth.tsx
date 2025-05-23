
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";

interface AuthMiddlewareProps {
  children: React.ReactNode;
}

export const RequireAuth = ({ children }: AuthMiddlewareProps) => {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      toast.error("You need to sign in to access this page");
      navigate("/");
    }
  }, [isSignedIn, isLoaded, navigate]);

  if (!isLoaded) {
    // Show loading state while Clerk loads
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return isSignedIn ? <>{children}</> : null;
};
