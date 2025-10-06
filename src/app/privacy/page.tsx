import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personvern - Enneagramtest',
  description: 'Informasjon om hvordan vi behandler personopplysninger',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Personvernerklæring
      </h1>

      <div className="prose prose-gray max-w-none">
        <h2>Dataansvarlig</h2>
        <p>
          [Firmanavn og kontaktinformasjon skal fylles inn her]
        </p>

        <h2>Hvilke opplysninger samler vi inn?</h2>
        <p>
          Vi samler inn følgende informasjon:
        </p>
        <ul>
          <li>Dine testsvar (lagres kun lokalt i nettleseren din)</li>
          <li>E-postadresse (kun hvis du melder deg på nyhetsbrev)</li>
          <li>Teknisk informasjon som IP-adresse og nettlesertype</li>
        </ul>

        <h2>Hvordan bruker vi informasjonen?</h2>
        <p>
          Informasjonen brukes til:
        </p>
        <ul>
          <li>Å vise deg testresultater</li>
          <li>Å sende nyhetsbrev (kun med ditt samtykke)</li>
          <li>Å forbedre tjenesten vår</li>
        </ul>

        <h2>Deling med tredjeparter</h2>
        <p>
          Vi deler ikke dine personopplysninger med tredjeparter,
          unntatt hvor vi er pålagt av loven.
        </p>

        <h2>Dine rettigheter</h2>
        <p>
          Du har rett til å:
        </p>
        <ul>
          <li>Få innsyn i hvilke opplysninger vi har om deg</li>
          <li>Få rettet feil informasjon</li>
          <li>Få slettet dine opplysninger</li>
          <li>Trekke tilbake samtykke</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          Vi bruker kun nødvendige cookies for å lagre dine testsvar lokalt.
          Les mer på vår <a href="/cookies" className="text-blue-600 hover:underline">
          cookie-side</a>.
        </p>

        <h2>Kontakt oss</h2>
        <p>
          Har du spørsmål om personvern, kan du kontakte oss på:{' '}
          <a href="mailto:personvern@example.com" className="text-blue-600 hover:underline">
            personvern@example.com
          </a>
        </p>

        <p className="text-sm text-gray-600 mt-8">
          Sist oppdatert: [Dato skal fylles inn]
        </p>
      </div>
    </div>
  );
}

// TODO: Fyll inn ekte firmaopplysninger
// TODO: Oppdater med spesifikke cookies og tracking-teknologier
// TODO: Legg til informasjon om datalagring og sletting
// TODO: Juster etter gjeldende personvernlovgivning
