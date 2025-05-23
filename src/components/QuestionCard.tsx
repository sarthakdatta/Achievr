
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { satQuestions } from "@/lib/satQuestions";

interface QuestionCardProps {
  subject: string;
  category: string;
  isTimedMode: boolean;
  onComplete: () => void;
}

const QuestionCard = ({ subject, category, isTimedMode, onComplete }: QuestionCardProps) => {
  const { recordPracticeSession } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [startTime] = useState(new Date());

  // Filter questions based on subject and category
  const questions = satQuestions.filter(
    q => q.subject === subject && q.category === category
  );

  useEffect(() => {
    setAnswers(new Array(questions.length).fill(null));
  }, [questions.length]);

  useEffect(() => {
    if (isTimedMode && timeLeft > 0 && !showExplanation) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isTimedMode && timeLeft === 0 && !showExplanation) {
      // Auto-submit when time runs out
      handleSubmitAnswer();
    }
  }, [timeLeft, isTimedMode, showExplanation]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 10);
      setCorrectAnswers(correctAnswers + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
      setShowExplanation(false);
      setTimeLeft(60);
    } else {
      // Record session when complete
      const endTime = new Date();
      const timeTaken = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
      
      recordPracticeSession({
        subject,
        category,
        correct: correctAnswers,
        total: questions.length,
        timeTaken: isTimedMode ? timeTaken : undefined
      });
      
      onComplete();
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  if (!currentQ) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900">No questions available</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700 mb-4">
              There are no questions available for {subject} - {category} at the moment.
            </p>
            <Button onClick={onComplete} className="bg-blue-600 hover:bg-blue-700">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-blue-900">{subject}</h1>
              <p className="text-blue-600">{category}</p>
            </div>
            <div className="flex items-center gap-4">
              {isTimedMode && (
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="font-mono text-blue-900">{timeLeft}s</span>
                </div>
              )}
              <Badge className="bg-blue-600">
                Question {currentQuestion + 1} of {questions.length}
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <Card className="mb-6 border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900 text-xl">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQ.choices.map((choice, index) => (
                <button
                  key={index}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ${
                    selectedAnswer === choice
                      ? showExplanation
                        ? choice === currentQ.correctAnswer
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-blue-500 bg-blue-50'
                      : showExplanation && choice === currentQ.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => !showExplanation && handleAnswerSelect(choice)}
                  disabled={showExplanation}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-blue-900">{choice}</span>
                    {showExplanation && (
                      <div>
                        {choice === currentQ.correctAnswer && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                        {selectedAnswer === choice && choice !== currentQ.correctAnswer && (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Explanation */}
        {showExplanation && (
          <Card className="mb-6 border-green-100 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Explanation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700">{currentQ.explanation}</p>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="text-blue-600">
            Score: <span className="font-bold text-blue-900">{score} points</span>
          </div>
          
          <div className="flex gap-3">
            {!showExplanation ? (
              <Button 
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Submit Answer
              </Button>
            ) : (
              <Button 
                onClick={handleNextQuestion}
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Practice'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
