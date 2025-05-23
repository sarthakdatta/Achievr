
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Clock, TrendingUp, Users, Award, BookOpen } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Target,
      title: "Targeted Practice",
      description: "Focus on specific SAT subtopics with curated question sets tailored to your needs."
    },
    {
      icon: Clock,
      title: "Timed & Untimed Modes",
      description: "Practice at your own pace or simulate real test conditions with timed sessions."
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Visualize your improvement with detailed analytics and performance charts."
    },
    {
      icon: Award,
      title: "Gamified Learning",
      description: "Earn points, maintain streaks, and unlock achievements as you practice."
    },
    {
      icon: BookOpen,
      title: "Expert Explanations",
      description: "Understand every answer with detailed explanations written by SAT experts."
    },
    {
      icon: Users,
      title: "Adaptive Learning",
      description: "Our system adapts to your performance, focusing on areas that need improvement."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            Why Choose 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient-move bg-[length:200%_200%] drop-shadow-[0_0_2px_rgba(0,0,255,0.6)]">
              {" "}Achievr?
            </span>
          </h2>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto">
            Our platform combines proven test prep strategies with artifical intelligence
            to help you achieve your target SAT score.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-blue-100 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-blue-600 text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
