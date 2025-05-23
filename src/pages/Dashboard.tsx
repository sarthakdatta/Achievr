
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import { TrendingUp, Calendar, Award, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useUser } from "@/context/UserContext";

const Dashboard = () => {
  const { userStats } = useUser();
  
  // Process user stats for charts
  const getLast7DaysData = () => {
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - i));
      return {
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        formattedDate: date.toISOString().split('T')[0]
      };
    });
    
    // Map user history to these dates
    return last7Days.map(day => {
      const sessionsOnDay = userStats.history.filter(session => 
        new Date(session.date).toISOString().split('T')[0] === day.formattedDate
      );
      
      let score = 0;
      let total = 0;
      
      sessionsOnDay.forEach(session => {
        score += session.correct;
        total += session.total;
      });
      
      return {
        date: day.date,
        score: total > 0 ? Math.round((score / total) * 100) : 0
      };
    });
  };
  
  const getCategoryData = () => {
    const categories = new Map();
    
    userStats.history.forEach(session => {
      if (!categories.has(session.category)) {
        categories.set(session.category, { correct: 0, total: 0 });
      }
      
      const current = categories.get(session.category);
      current.correct += session.correct;
      current.total += session.total;
    });
    
    return Array.from(categories.entries()).map(([category, data]) => ({
      category,
      accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
      total: data.total
    }));
  };
  
  const performanceData = getLast7DaysData();
  const categoryData = getCategoryData();
  
  // Calculate overall stats
  const calculateOverallAccuracy = () => {
    let totalCorrect = 0;
    let totalQuestions = 0;
    
    Object.values(userStats.accuracy).forEach(subject => {
      totalCorrect += subject.correct;
      totalQuestions += subject.total;
    });
    
    return totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  };
  
  const getTotalQuestions = () => {
    return userStats.history.reduce((sum, session) => sum + session.total, 0);
  };
  
  const getPointsLastWeek = () => {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    return userStats.history
      .filter(session => new Date(session.date) >= lastWeek)
      .reduce((sum, session) => sum + (session.correct * 10), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Dashboard</h1>
            <p className="text-xl text-blue-700">Track your progress and analyze your performance</p>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-blue-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-600">Total Points</CardTitle>
                <Award className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">{userStats.points}</div>
                <p className="text-xs text-blue-600">+{getPointsLastWeek()} from last week</p>
              </CardContent>
            </Card>

            <Card className="border-blue-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-600">Current Streak</CardTitle>
                <Calendar className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">{userStats.streak} days</div>
                <p className="text-xs text-blue-600">
                  {userStats.streak > 0 ? "Keep it up!" : "Start practicing today!"}
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-600">Overall Accuracy</CardTitle>
                <Target className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">{calculateOverallAccuracy()}%</div>
                <p className="text-xs text-blue-600">Based on all your practice sessions</p>
              </CardContent>
            </Card>

            <Card className="border-blue-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-600">Questions Solved</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">{getTotalQuestions()}</div>
                <p className="text-xs text-blue-600">Keep practicing for better results</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">Performance Trend</CardTitle>
                <CardDescription>Your daily accuracy over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">Category Performance</CardTitle>
                <CardDescription>Accuracy by subject category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="accuracy" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Category Breakdown */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-900">Subject Breakdown</CardTitle>
              <CardDescription>Detailed performance by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {categoryData.map((category, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-blue-900">{category.category}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-blue-200 text-blue-600">
                          {category.total} questions
                        </Badge>
                        <span className="text-blue-600 font-medium">{category.accuracy}%</span>
                      </div>
                    </div>
                    <Progress value={category.accuracy} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
