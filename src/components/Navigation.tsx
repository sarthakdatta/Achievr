
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/clerk-react";
import { useUser } from "@/context/UserContext";

const Navigation = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { userStats } = useUser();

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div 
            className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span 
            className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient-move bg-[length:200%_200%] text-transparent drop-shadow-[0_0_1px_rgba(0,0,255,0.6)] bg-clip-text cursor-pointer "
            onClick={() => navigate('/')}
          >
            Achievr
          </span>
        </div>
        
        {/* Show navigation links only when signed in */}
        {isSignedIn ? (
          <div className="hidden md:flex items-center space-x-8">
            <button 
              className="text-blue-900 hover:text-blue-600 font-medium transition-colors"
              onClick={() => navigate('/practice')}
            >
              Practice
            </button>
            <button 
              className="text-blue-900 hover:text-blue-600 font-medium transition-colors"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </button>
          </div>
        ) : null}
        
        <div className="flex items-center space-x-4">
          {isSignedIn ? (
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-center px-3 py-1 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600">Points</div>
                  <div className="font-bold text-blue-900">{userStats.points}</div>
                </div>
                <div className="text-center px-3 py-1 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600">Streak</div>
                  <div className="font-bold text-blue-900">{userStats.streak} days</div>
                </div>
              </div>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                  Login
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-500 drop-shadow-[0_0_2px_rgba(0,0,255,0.6)] text-white hover:scale-105 transition-all duration-300 ">
                  Sign Up
                </Button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
