import { NextRequest, NextResponse } from 'next/server';
import { validateSubmission } from '@/lib/validation';
import { subscribeToNewsletter } from '@/lib/newsletter';
import { saveTestResult, generateSessionId, logAnalyticsEvent } from '@/lib/database';
import { computeScores } from '@/lib/scoring';
import type { AnswerMap, EnneaTypeId } from '@/types';

type SubmitPayload = {
  email?: string;
  answers?: AnswerMap;
  timestamp?: string;
  type?: 'newsletter' | 'test_result' | string;
};

export async function POST(request: NextRequest) {
  let payload: SubmitPayload;

  try {
    payload = (await request.json()) as SubmitPayload;
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    );
  }

  try {

    // Valider innkommende data
    const validation = validateSubmission(payload);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Ugyldig data', details: validation.errors },
        { status: 422 }
      );
    }

    const sessionId = generateSessionId();

    // Logger kun i development/staging
    if (process.env.NODE_ENV !== 'production') {
      console.log('📝 Submission received:', {
        timestamp: new Date().toISOString(),
        sessionId,
        hasEmail: !!payload.email,
        hasAnswers: !!payload.answers,
        answersCount: payload.answers ? Object.keys(payload.answers).length : 0,
        type: payload.type || 'unknown'
      });
    }

    // Handle newsletter subscription
    if (payload.type === 'newsletter' && payload.email) {
      const result = await subscribeToNewsletter(payload.email, sessionId);

      // Log analytics event
      await logAnalyticsEvent('newsletter_signup', sessionId, {
        email: payload.email
      });

      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: result.message,
        data: result.data
      });
    }

    // Handle test result submission
    if (payload.type === 'test_result' && payload.answers) {
      const scores = computeScores(payload.answers);
      const topType = (Object.entries(scores) as [string, number][]).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0];

      const completionTime = 15; // TODO: Calculate actual completion time

      const result = await saveTestResult(
        sessionId,
        payload.answers,
        scores,
        Number(topType) as EnneaTypeId,
        completionTime
      );

      // Log analytics event
      await logAnalyticsEvent('test_completed', sessionId, {
        topType: Number(topType),
        completionTime,
        answersCount: Object.keys(payload.answers).length
      });

      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        data: result.data
      });
    }

    // Default response for other submission types
    return NextResponse.json({
      success: true,
      message: 'Data mottatt'
    });

  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json(
      { error: 'Intern serverfeil' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Metode ikke tillatt' },
    { status: 405 }
  );
}
