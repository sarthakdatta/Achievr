
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, TrendingUp, Award } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-20 pb-32 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-blue-900 mb-6 leading-tight">
            Master the
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient-move bg-[length:200%_200%] drop-shadow-[0_0_4px_rgba(0,0,255,0.6)]">
              {" "}Digital SAT
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Practice with real SAT-style questions, improve your scores with personalized AI feedback, & 
            track your progress with our gamified learning platform, designed by SAT experts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <SignInButton mode="modal">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-500 drop-shadow-[0_0_4px_rgba(0,0,255,0.6)] text-lg px-8 py-4 hover:scale-105 transition-all duration-300"
              onClick={() => navigate('/practice')}
            >
              Start Today
            </Button>
            </SignInButton>
          
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-900">500+</div>
              <div className="text-blue-600">Practice Questions</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-900">+150</div>
              <div className="text-blue-600">Average Score Improvement</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-900">10K+</div>
              <div className="text-blue-600">Students Helped</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
