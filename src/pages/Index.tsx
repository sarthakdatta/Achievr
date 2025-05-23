
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, TrendingUp, Award, Clock, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Stats from "@/components/Stats";

const Index = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  const handleStartPractice = () => {
    if (isSignedIn) {
      navigate('/practice');
    } else {
      toast.error("Please sign in to access practice mode");
      // You could also open the sign-in modal here directly
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navigation />
      <Hero />
      <Features />
      <Stats />
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Ace Your SAT?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have improved their scores with our proven practice system.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-3"
            onClick={handleStartPractice}
          >
            {isSignedIn ? "Start Practicing Now" : "Sign In to Start Practicing"}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
