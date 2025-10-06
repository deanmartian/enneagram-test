'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/QuestionCard';
import ProgressBar from '@/components/ProgressBar';
import { saveAnswers, getAnswers, saveTestState, getTestState } from '@/lib/storage';
import { computeScores, topN } from '@/lib/scoring';
import { Question, AnswerMap } from '@/types';
import questions from '@/data/questions.json';

export default function TestPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [isLoaded, setIsLoaded] = useState(false);

  const typedQuestions = questions as Question[];
  const currentQuestion = typedQuestions[currentIndex];
  const isLastQuestion = currentIndex === typedQuestions.length - 1;

  useEffect(() => {
    // Last inn eksisterende data
    const savedAnswers = getAnswers();
    const savedState = getTestState();

    setAnswers(savedAnswers);

    if (savedState && savedState.currentQuestion < typedQuestions.length) {
      setCurrentIndex(savedState.currentQuestion);
    }

    setIsLoaded(true);
  }, [typedQuestions.length]);

  useEffect(() => {
    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return; // Skip når i input felt

      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        e.preventDefault();
        setCurrentIndex(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < typedQuestions.length - 1) {
        e.preventDefault();
        setCurrentIndex(currentIndex + 1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, typedQuestions.length]);

  const handleAnswerChange = (value: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value as 0 | 1 | 2 | 3 | 4 };
    setAnswers(newAnswers);

    // Lagre umiddelbart
    saveAnswers(newAnswers);
    saveTestState({
      currentQuestion: currentIndex,
      answers: newAnswers,
      isComplete: false,
      startedAt: new Date().toISOString()
    });
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    const scores = computeScores(answers);
    const topThree = topN(scores, 3);

    // Marker som fullført
    saveTestState({
      currentQuestion: currentIndex,
      answers,
      isComplete: true,
      completedAt: new Date().toISOString()
    });

    // Send til resultatside
    const queryParams = new URLSearchParams({
      top: topThree[0][0].toString(),
      scores: JSON.stringify(Object.fromEntries(topThree))
    });

    router.push(`/result?${queryParams.toString()}`);
  };

  if (!isLoaded) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">Laster test...</div>
      </div>
    );
  }

  const currentValue = answers[currentQuestion.id];
  const hasAnswer = currentValue !== undefined;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <ProgressBar
          current={currentIndex + 1}
          total={typedQuestions.length}
        />
      </div>

      <div className="mb-8">
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          totalQuestions={typedQuestions.length}
          value={currentValue}
          onChange={handleAnswerChange}
        />
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Forrige
        </button>

        <div className="text-sm text-gray-500">
          Bruk ←/→ tastene for å navigere
        </div>

        <button
          onClick={handleNext}
          disabled={!hasAnswer}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLastQuestion ? 'Send inn' : 'Neste →'}
        </button>
      </div>

      {/* Besvarte spørsmål oversikt */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-xs text-gray-500 mb-2">
          Besvarte spørsmål: {Object.keys(answers).length} av {typedQuestions.length}
        </div>
        <div className="flex flex-wrap gap-1">
          {typedQuestions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-8 h-8 text-xs rounded ${
                answers[typedQuestions[index].id] !== undefined
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-500'
              } ${index === currentIndex ? 'ring-2 ring-blue-500' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// TODO: Legg til autosave med debouncing
// TODO: Implementer tilbake-knapp med confirm dialog
// TODO: Legg til estimert tid igjen
// TODO: Støtte for å hoppe til spesifikke spørsmål
