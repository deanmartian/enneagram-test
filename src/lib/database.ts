import { AnswerMap, Scores, EnneaTypeId, DatabaseTestResult, DatabaseNewsletter, DatabaseAnalytics, ApiResponse, TestResultResponse } from '@/types';
import type { Json } from './supabase-types';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './supabase-types';

// Initialize Supabase client
let supabaseClient: SupabaseClient<Database> | null = null;

// Initialize Supabase client when credentials are available
export function initializeSupabase() {
  if (typeof window !== 'undefined' || process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

      if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('Supabase credentials not found in environment variables');
        return null;
      }

      supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
      console.log('Supabase client initialized successfully');
      return supabaseClient;
    } catch (error) {
      console.error('Failed to initialize Supabase client:', error);
      return null;
    }
  }
  return null;
}

// Get or initialize Supabase client
function getSupabaseClient(): SupabaseClient<Database> | null {
  if (!supabaseClient) {
    return initializeSupabase();
  }
  return supabaseClient;
}

// Generate unique session ID for tracking
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Save test result to database
export async function saveTestResult(
  sessionId: string,
  answers: AnswerMap,
  scores: Scores,
  topType: EnneaTypeId,
  completionTimeMinutes: number
): Promise<ApiResponse<TestResultResponse>> {
  try {
    const client = getSupabaseClient();

    if (!client) {
      console.log('Database save (mock - no client):', {
        sessionId,
        answersCount: Object.keys(answers).length,
        topType,
        completionTimeMinutes
      });

      // Return mock response when client is not available
      return {
        success: true,
        data: {
          id: `result_${sessionId}`,
          topType,
          scores,
          shareUrl: typeof window !== 'undefined' ? `${window.location.origin}/result?id=${sessionId}` : `/result?id=${sessionId}`
        }
      };
    }

    const testResult = {
      session_id: sessionId,
      answers,
      scores,
      top_type: topType,
      completion_time_minutes: completionTimeMinutes,
      user_agent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
      is_complete: true
    };

    const { data, error } = await client
      .from('test_results')
      .insert([testResult])
      .select()
      .single();

    if (error) {
      console.error('Supabase error saving test result:', error);
      throw error;
    }

    return {
      success: true,
      data: {
        id: data.id,
        topType,
        scores,
        shareUrl: typeof window !== 'undefined' ? `${window.location.origin}/result?id=${data.id}` : `/result?id=${data.id}`
      }
    };

  } catch (error) {
    console.error('Error saving test result:', error);
    return {
      success: false,
      error: 'Kunne ikke lagre testresultat'
    };
  }
}

// Get test result by ID
export async function getTestResult(resultId: string): Promise<ApiResponse<DatabaseTestResult>> {
  try {
    const client = getSupabaseClient();

    if (!client) {
      return {
        success: false,
        error: 'Database ikke tilgjengelig'
      };
    }

    const { data, error } = await client
      .from('test_results')
      .select('*')
      .eq('id', resultId)
      .single();

    if (error) {
      console.error('Supabase error fetching test result:', error);
      throw error;
    }

    return {
      success: true,
      data
    };

  } catch (error) {
    console.error('Error fetching test result:', error);
    return {
      success: false,
      error: 'Kunne ikke hente testresultat'
    };
  }
}

// Save newsletter subscription
export async function saveNewsletterSubscription(
  email: string,
  sessionId?: string
): Promise<ApiResponse<{ subscriptionId: string }>> {
  try {
    const client = getSupabaseClient();

    if (!client) {
      console.log('Newsletter subscription (mock):', email);
      return {
        success: true,
        data: { subscriptionId: `sub_${Date.now()}` }
      };
    }

    const unsubscribeToken = generateUnsubscribeToken();
    const subscription = {
      email,
      is_subscribed: true,
      unsubscribe_token: unsubscribeToken
    };

    const { data, error } = await client
      .from('newsletter_subscriptions')
      .insert([subscription])
      .select()
      .single();

    if (error) {
      console.error('Supabase error saving newsletter subscription:', error);
      throw error;
    }

    return {
      success: true,
      data: { subscriptionId: data.unsubscribe_token }
    };

  } catch (error) {
    console.error('Error saving newsletter subscription:', error);
    return {
      success: false,
      error: 'Kunne ikke registrere nyhetsbrev-abonnement'
    };
  }
}

// Unsubscribe from newsletter
export async function unsubscribeNewsletter(token: string): Promise<ApiResponse<void>> {
  try {
    const client = getSupabaseClient();

    if (!client) {
      console.log('Newsletter unsubscribe (mock):', token);
      return { success: true };
    }

    const { error } = await client
      .from('newsletter_subscriptions')
      .update({
        is_subscribed: false,
        unsubscribed_at: new Date().toISOString()
      })
      .eq('unsubscribe_token', token);

    if (error) {
      console.error('Supabase error unsubscribing from newsletter:', error);
      throw error;
    }

    return { success: true };

  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    return {
      success: false,
      error: 'Kunne ikke avmelde nyhetsbrev'
    };
  }
}

// Log analytics event
export async function logAnalyticsEvent(
  eventType: 'test_started' | 'test_completed' | 'newsletter_signup' | 'page_view',
  sessionId: string,
  metadata?: Json
): Promise<void> {
  try {
    const client = getSupabaseClient();

    if (!client) {
      console.log('Analytics event (mock):', { eventType, sessionId, metadata });
      return;
    }

    const { error } = await client
      .from('analytics_events')
      .insert([{
        event_type: eventType,
        session_id: sessionId,
        metadata
      }]);

    if (error) {
      console.error('Supabase error logging analytics event:', error);
      throw error;
    }

  } catch (error) {
    console.error('Error logging analytics event:', error);
  }
}

// Get test statistics (for admin dashboard)
export async function getTestStatistics(): Promise<ApiResponse<{
  totalTests: number;
  testsLast30Days: number;
  averageCompletionTime: number;
  typeDistribution: Record<EnneaTypeId, number>;
}>> {
  try {
    const client = getSupabaseClient();

    if (!client) {
      // Return mock statistics
      return {
        success: true,
        data: {
          totalTests: 1247,
          testsLast30Days: 156,
          averageCompletionTime: 8.5,
          typeDistribution: {
            1: 12, 2: 15, 3: 18, 4: 8, 5: 14,
            6: 16, 7: 11, 8: 9, 9: 17
          }
        }
      };
    }

    // Get total tests
    const { count: totalTests } = await client
      .from('test_results')
      .select('*', { count: 'exact', head: true })
      .eq('is_complete', true);

    // Get tests from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { count: testsLast30Days } = await client
      .from('test_results')
      .select('*', { count: 'exact', head: true })
      .eq('is_complete', true)
      .gte('created_at', thirtyDaysAgo.toISOString());

    // Get average completion time
    const { data: completionTimes } = await client
      .from('test_results')
      .select('completion_time_minutes')
      .eq('is_complete', true)
      .not('completion_time_minutes', 'is', null);

    const averageCompletionTime = completionTimes && completionTimes.length > 0
      ? completionTimes.reduce((sum, result) => sum + (result.completion_time_minutes || 0), 0) / completionTimes.length
      : 0;

    // Get type distribution
    const { data: typeData } = await client
      .from('test_results')
      .select('top_type')
      .eq('is_complete', true);

    const typeDistribution: Record<EnneaTypeId, number> = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0,
      6: 0, 7: 0, 8: 0, 9: 0
    };

    if (typeData) {
      typeData.forEach(result => {
        if (result.top_type >= 1 && result.top_type <= 9) {
          typeDistribution[result.top_type as EnneaTypeId]++;
        }
      });
    }

    return {
      success: true,
      data: {
        totalTests: totalTests || 0,
        testsLast30Days: testsLast30Days || 0,
        averageCompletionTime: averageCompletionTime,
        typeDistribution
      }
    };

  } catch (error) {
    console.error('Error fetching test statistics:', error);
    return {
      success: false,
      error: 'Kunne ikke hente statistikk'
    };
  }
}

// Helper function to generate unsubscribe token
function generateUnsubscribeToken(): string {
  return `unsub_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`;
}

// Initialize client on import (for browser)
if (typeof window !== 'undefined') {
  initializeSupabase();
}
