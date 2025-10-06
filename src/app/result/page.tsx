'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import ExpertImage from '@/components/ExpertImage';
import {
  ENNEA_TYPE_NAMES,
  ENNEA_TYPE_BLURBS,
  ENNEA_TYPE_DESCRIPTIONS,
  ENNEA_TYPE_STRENGTHS,
  ENNEA_TYPE_CHALLENGES,
  ENNEA_TYPE_GROWTH_PATHS,
  ENNEA_TYPE_MOTIVATIONS
} from '@/data/types';
import { EXPERT_INFO } from '@/data/expert';
import { clearTestData } from '@/lib/storage';
import NewsletterSignup from '@/components/NewsletterSignup';
import { EnneaTypeId } from '@/types';

function ResultPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  type TabType = 'overview' | 'strengths' | 'challenges' | 'growth';
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const topType = searchParams.get('top');
  const scoresParam = searchParams.get('scores');

  let parsedScores: [EnneaTypeId, number][] = [];

  try {
    if (scoresParam) {
      const scoresObj = JSON.parse(scoresParam);
      parsedScores = (Object.entries(scoresObj) as [string, number][])
        .map(([type, score]) => [Number(type) as EnneaTypeId, Number(score)] as [EnneaTypeId, number])
        .sort((a, b) => b[1] - a[1]);
    }
  } catch (error) {
    console.error('Error parsing scores:', error);
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const handleStartOver = () => {
    clearTestData();
    router.push('/test');
  };

  if (!topType || parsedScores.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Ingen resultater funnet
          </h1>
          <p className="text-gray-600 mb-6">
            Du må fullføre testen først for å se resultater.
          </p>
          <button
            onClick={() => router.push('/test')}
            className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Start testen
          </button>
        </div>
      </div>
    );
  }

  const topThree = parsedScores.slice(0, 3);
  const mainType = Number(topType) as EnneaTypeId;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Dine Enneagram-resultater
        </h1>
        <p className="text-gray-600">
          Basert på dine svar er dette dine mest sannsynlige Enneagram-typer:
        </p>
      </div>

      {/* Top 3 Results Overview */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {topThree.map(([typeId, score], index) => (
          <div
            key={typeId}
            className={`bg-white border rounded-lg p-6 ${
              index === 0 ? 'border-blue-200 bg-blue-50 md:col-span-3' : 'border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className={`text-xl font-semibold ${
                  index === 0 ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  #{index + 1} - {ENNEA_TYPE_NAMES[typeId]}
                </h2>
                <div className="text-sm text-gray-600 mt-1">
                  Poeng: {score}
                </div>
              </div>
              {index === 0 && (
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  Hovedtype
                </span>
              )}
            </div>
            <p className="text-gray-700">
              {ENNEA_TYPE_BLURBS[typeId]}
            </p>
          </div>
        ))}
      </div>

      {/* Detailed Information for Main Type */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
            {mainType}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {ENNEA_TYPE_NAMES[mainType]}
            </h2>
            <p className="text-gray-600">Din mest sannsynlige Enneagram-type</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          {([
            { id: 'overview' as const, label: 'Oversikt' },
            { id: 'strengths' as const, label: 'Styrker' },
            { id: 'challenges' as const, label: 'Utfordringer' },
            { id: 'growth' as const, label: 'Vekst' }
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Beskrivelse
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {ENNEA_TYPE_DESCRIPTIONS[mainType]}
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Kjernemotivasjon
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {ENNEA_TYPE_MOTIVATIONS[mainType]}
              </p>
            </div>
          )}

          {activeTab === 'strengths' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Dine styrker som {ENNEA_TYPE_NAMES[mainType].split(' – ')[1]}
              </h3>
              <ul className="space-y-3">
                {ENNEA_TYPE_STRENGTHS[mainType].map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'challenges' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Områder for bevissthet
              </h3>
              <ul className="space-y-3">
                {ENNEA_TYPE_CHALLENGES[mainType].map((challenge, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 mr-3 mt-1">⚠</span>
                    <span className="text-gray-700">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'growth' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Vekstområder og tips
              </h3>
              <ul className="space-y-3">
                {ENNEA_TYPE_GROWTH_PATHS[mainType].map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">→</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Expert Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mb-8">
        <div className="flex items-start space-x-4">
          <ExpertImage
            size="small"
            name={EXPERT_INFO.name}
            className="flex-shrink-0"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Fra eksperten: {EXPERT_INFO.name}
            </h3>
            <p className="text-gray-600 text-sm mb-3">{EXPERT_INFO.title}</p>
            <blockquote className="text-gray-700 italic border-l-4 border-blue-600 pl-4">
              "{EXPERT_INFO.quote}"
            </blockquote>
          </div>
        </div>
      </div>

      {/* Important Reminder */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h3 className="font-medium text-yellow-800 mb-2">
          Viktig å huske:
        </h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Alle mennesker har trekk fra flere Enneagram-typer</li>
          <li>• Dette er et utgangspunkt for refleksjon, ikke en fasit</li>
          <li>• Personlighetsutvikling er en livslang prosess</li>
          <li>• Vurder å snakke med en sertifisert Enneagram-coach for dypere innsikt</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={handleShare}
          className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {copied ? 'Kopiert!' : 'Del resultater'}
        </button>
        <button
          onClick={handleStartOver}
          className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Ta testen på nytt
        </button>
      </div>

      {/* Newsletter Signup */}
      <div className="border-t border-gray-200 pt-8">
        <NewsletterSignup />
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Laster resultater...
          </h1>
        </div>
      </div>
    }>
      <ResultPageContent />
    </Suspense>
  );
}

// TODO: Legg til PDF-eksport av resultater
// TODO: Implementer sammenligning mellom typer
// TODO: Legg til anbefalte bøker og ressurser
// TODO: Integrer med sosiale medier for deling
// TODO: Legg til mulighet for å booke konsultasjon med ekspert
