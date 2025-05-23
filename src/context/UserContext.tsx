
import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { UserStats, initialUserStats, PracticeSession } from "@/lib/userTypes";

interface UserContextProps {
  userStats: UserStats;
  addPoints: (points: number) => void;
  recordPracticeSession: (session: Omit<PracticeSession, "date">) => void;
  updateStreak: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSignedIn, userId } = useAuth();
  const [userStats, setUserStats] = useState<UserStats>(initialUserStats);
  
  // Load user data from localStorage on initial load
  useEffect(() => {
    if (isSignedIn && userId) {
      const savedStats = localStorage.getItem(`user-stats-${userId}`);
      if (savedStats) {
        try {
          const parsedStats = JSON.parse(savedStats);
          // Convert string dates back to Date objects
          parsedStats.startDate = new Date(parsedStats.startDate);
          parsedStats.lastLoginDate = new Date(parsedStats.lastLoginDate);
          parsedStats.history = parsedStats.history.map((session: any) => ({
            ...session,
            date: new Date(session.date)
          }));
          setUserStats(parsedStats);
        } catch (e) {
          console.error("Error parsing saved user stats:", e);
          setUserStats(initialUserStats);
        }
      }
      
      // Update streak on login
      updateStreakOnLogin();
    }
  }, [isSignedIn, userId]);
  
  // Save to localStorage whenever stats change
  useEffect(() => {
    if (isSignedIn && userId) {
      localStorage.setItem(`user-stats-${userId}`, JSON.stringify(userStats));
    }
  }, [userStats, isSignedIn, userId]);
  
  const updateStreakOnLogin = () => {
    const today = new Date().setHours(0, 0, 0, 0);
    const lastLogin = new Date(userStats.lastLoginDate).setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    let newStreak = userStats.streak;
    
    // If last login was yesterday, continue streak
    if (lastLogin === yesterday.setHours(0, 0, 0, 0)) {
      newStreak = userStats.streak;
    }
    // If last login was before yesterday, reset streak
    else if (lastLogin < yesterday.setHours(0, 0, 0, 0)) {
      newStreak = 0;
    }
    // If it's a new day (not the same as last login), increment streak
    if (today !== lastLogin) {
      newStreak += 1;
      
      setUserStats(prev => ({
        ...prev,
        streak: newStreak,
        lastLoginDate: new Date()
      }));
    }
  };
  
  const updateStreak = () => {
    updateStreakOnLogin();
  };
  
  const addPoints = (points: number) => {
    setUserStats(prev => ({
      ...prev,
      points: prev.points + points
    }));
  };
  
  const recordPracticeSession = (session: Omit<PracticeSession, "date">) => {
    // Update total accuracy
    const newAccuracy = { ...userStats.accuracy };
    
    if (session.subject in newAccuracy) {
      newAccuracy[session.subject as keyof typeof newAccuracy].correct += session.correct;
      newAccuracy[session.subject as keyof typeof newAccuracy].total += session.total;
    }
    
    // Add session to history
    const newSession = {
      ...session,
      date: new Date()
    };
    
    setUserStats(prev => ({
      ...prev,
      accuracy: newAccuracy,
      history: [...prev.history, newSession]
    }));
    
    // Add points based on correct answers
    addPoints(session.correct * 10);
  };
  
  return (
    <UserContext.Provider value={{
      userStats,
      addPoints,
      recordPracticeSession,
      updateStreak
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  
  return context;
};
