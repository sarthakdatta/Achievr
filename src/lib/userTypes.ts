
export interface UserStats {
  points: number;
  streak: number;
  startDate: Date;
  lastLoginDate: Date;
  accuracy: {
    Math: { correct: number; total: number };
    "Reading and Writing": { correct: number; total: number };
  };
  history: PracticeSession[];
}

export interface PracticeSession {
  date: Date;
  subject: string;
  category: string;
  correct: number;
  total: number;
  timeTaken?: number; // in seconds, for timed sessions
}

// Initial stats for new users
export const initialUserStats: UserStats = {
  points: 0,
  streak: 0,
  startDate: new Date(),
  lastLoginDate: new Date(),
  accuracy: {
    Math: { correct: 0, total: 0 },
    "Reading and Writing": { correct: 0, total: 0 }
  },
  history: []
};
