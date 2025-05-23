
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SubjectSelector from "@/components/SubjectSelector";
import QuestionCard from "@/components/QuestionCard";
import { useUser } from "@/context/UserContext";
import { BookOpen, Clock, Target, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Practice = () => {
  const navigate = useNavigate();
  const { userStats, updateStreak } = useUser();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isTimedMode, setIsTimedMode] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  // Update streak when practice page is visited
  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  const handleStartPractice = () => {
    if (selectedSubject && selectedCategory) {
      setShowQuestions(true);
    }
  };

  const handlePracticeComplete = () => {
    setShowQuestions(false);
    setSelectedSubject(null);
    setSelectedCategory(null);
  };

  // Calculate accuracy percentage
  const calculateAccuracy = () => {
    const totalCorrect = Object.values(userStats.accuracy).reduce(
      (sum, subject) => sum + subject.correct, 0
    );
    const totalQuestions = Object.values(userStats.accuracy).reduce(
      (sum, subject) => sum + subject.total, 0
    );
    return totalQuestions > 0 
      ? Math.round((totalCorrect / totalQuestions) * 100) 
      : 0;
  };

  if (showQuestions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <Navigation />
        <QuestionCard 
          subject={selectedSubject!}
          category={selectedCategory!}
          isTimedMode={isTimedMode}
          onComplete={handlePracticeComplete}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-blue-900 mb-2">Practice Mode</h1>
            <p className="text-xl text-blue-700">
              Choose a subject and topic to start practicing
            </p>
          </div>

          {/* Stats cards with icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-blue-100 transition-all duration-200 hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-blue-800">Points</h3>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Target className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-blue-900">{userStats.points}</p>
                <p className="text-sm text-blue-600">Keep practicing to earn more points</p>
              </CardContent>
            </Card>
            
            <Card className="border-blue-100 transition-all duration-200 hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-blue-800">Streak</h3>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-blue-900">{userStats.streak}</p>
                <p className="text-sm text-blue-600">Days in a row</p>
              </CardContent>
            </Card>
            
            <Card className="border-blue-100 transition-all duration-200 hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-blue-800">Accuracy</h3>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-blue-900">{calculateAccuracy()}%</p>
                  <Progress className="h-2 flex-1" value={calculateAccuracy()} />
                </div>
                <p className="text-sm text-blue-600">Overall performance</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8 border-blue-100 overflow-hidden">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <CardTitle className="text-blue-900">Choose your practice materials</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <SubjectSelector 
                selectedSubject={selectedSubject}
                selectedCategory={selectedCategory}
                onSubjectSelect={setSelectedSubject}
                onCategorySelect={setSelectedCategory}
              />
            </CardContent>
          </Card>

          <Card className="border-blue-100 overflow-hidden">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <CardTitle className="text-blue-900">Practice Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">Mode</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={isTimedMode ? "outline" : "default"}
                    className={`${isTimedMode ? "border-blue-200 text-blue-600" : "bg-blue-600 hover:bg-blue-700"} flex items-center gap-2`}
                    onClick={() => setIsTimedMode(false)}
                  >
                    <BookOpen className="w-4 h-4" />
                    Standard Mode
                  </Button>
                  <Button
                    variant={isTimedMode ? "default" : "outline"}
                    className={`${isTimedMode ? "bg-blue-600 hover:bg-blue-700" : "border-blue-200 text-blue-600"} flex items-center gap-2`}
                    onClick={() => setIsTimedMode(true)}
                  >
                    <Clock className="w-4 h-4" />
                    Timed Mode
                  </Button>
                </div>
                <p className="mt-2 text-sm text-blue-600">
                  {isTimedMode 
                    ? "You'll have 60 seconds per question in timed mode" 
                    : "Take your time to answer each question"}
                </p>
              </div>

              <Button 
                className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 transition-all duration-200"
                onClick={handleStartPractice}
                disabled={!selectedSubject || !selectedCategory}
              >
                {!selectedSubject || !selectedCategory 
                  ? "First select a subject and topic" 
                  : `Start ${isTimedMode ? "Timed" : "Standard"} Practice`}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Practice;
