import Link from 'next/link';
import { EXPERT_INFO } from '@/data/expert';
import ExpertImage from '@/components/ExpertImage';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
          Utforsk din personlighet
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Denne norske Enneagram-testen hjelper deg å forstå dine drivkrefter,
          motivasjoner og mønstre. Kun for refleksjon og selvutvikling.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
          <p className="text-sm text-yellow-800">
            <strong>Viktig:</strong> Dette er ikke en medisinsk diagnose eller profesjonell
            veiledning. Resultatene er ment som utgangspunkt for personlig refleksjon.
          </p>
        </div>

        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link
            href="/test"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Start testen
          </Link>
        </div>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-blue-600 text-xl">📝</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">99 spørsmål</h3>
          <p className="text-gray-600 text-sm">
            Omfattende spørsmål som gir deg en nøyaktig type-profil (15-20 min).
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-green-600 text-xl">🎯</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Personlig innsikt</h3>
          <p className="text-gray-600 text-sm">
            Få en oversikt over dine topp 3 Enneagram-typer og hva de betyr.
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-purple-600 text-xl">🔒</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Privat og trygt</h3>
          <p className="text-gray-600 text-sm">
            Dine svar lagres kun lokalt i nettleseren din. Ingen deling med tredjeparter.
          </p>
        </div>
      </div>

      {/* Expert Section */}
      <div className="mt-20 bg-gray-50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Utviklet med ekspertise
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Denne testen er utviklet i samarbeid med sertifiserte Enneagram-eksperter
            for å gi deg de mest presise og innsiktsfulle resultatene.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center max-w-4xl mx-auto">
          <div className="md:w-1/3 mb-6 md:mb-0">
            <ExpertImage
              size="large"
              name={EXPERT_INFO.name}
              className="mx-auto"
            />
          </div>

          <div className="md:w-2/3 md:pl-8 text-center md:text-left">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {EXPERT_INFO.name}
            </h3>
            <p className="text-blue-600 font-medium mb-4">{EXPERT_INFO.title}</p>

            <blockquote className="text-gray-700 italic text-lg leading-relaxed mb-4">
              "{EXPERT_INFO.quote}"
            </blockquote>

            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {EXPERT_INFO.credentials.slice(0, 2).map((credential, index) => (
                <span
                  key={index}
                  className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                >
                  {credential}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
