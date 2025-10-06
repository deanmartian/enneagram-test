import type { Json } from '../lib/supabase-types';
export type EnneaTypeId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Question = {
  id: string;          // "q1"
  text: string;        // norsk tekst (placeholder)
  type: EnneaTypeId;   // hvilken type spørsmålet primært måler
  weight?: number;     // default 1
};

export type AnswerMap = Record<string, 0 | 1 | 2 | 3 | 4>;

export type Scores = Record<EnneaTypeId, number>;

export type TestState = {
  currentQuestion: number;
  answers: Json;
  isComplete: boolean;
  startedAt?: string;
  completedAt?: string;
};

export type SubmissionData = {
  email?: string;
  answers?: AnswerMap;
  timestamp?: string;
  type?: string;
};

// Database types for Supabase integration
export type DatabaseTestResult = {
  id: string;
  created_at: string | null;
  user_id?: string | null;
  session_id: string;
  answers: Json;
  scores: Json;
  top_type: number;
  completion_time_minutes: number | null;
  user_agent?: string | null;
  is_complete: boolean | null;
};

export type DatabaseNewsletter = {
  id: string;
  created_at: string | null;
  email: string;
  is_subscribed: boolean;
  unsubscribe_token: string;
  confirmed_at?: string | null;
  unsubscribed_at?: string | null;
};

export type DatabaseAnalytics = {
  id: string;
  created_at: string | null;
  event_type: 'test_started' | 'test_completed' | 'newsletter_signup' | 'page_view';
  session_id: string;
  metadata?: Json;
};

// API response types
export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type TestResultResponse = {
  id: string;
  topType: EnneaTypeId;
  scores: Json;
  percentile?: number;
  shareUrl?: string;
};
