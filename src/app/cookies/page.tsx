import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookies - Enneagramtest',
  description: 'Informasjon om hvordan vi bruker cookies',
};

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Cookie-policy
      </h1>

      <div className="prose prose-gray max-w-none">
        <h2>Hva er cookies?</h2>
        <p>
          Cookies er små tekstfiler som lagres på din datamaskin,
          nettbrett eller mobiltelefon når du besøker en nettside.
        </p>

        <h2>Hvordan bruker vi cookies?</h2>
        <p>
          Vi bruker kun nødvendige cookies for å:
        </p>
        <ul>
          <li>Lagre dine testsvar lokalt i nettleseren</li>
          <li>Huske dine cookie-preferanser</li>
          <li>Sørge for at nettsiden fungerer som den skal</li>
        </ul>

        <h2>Hvilke typer cookies bruker vi?</h2>

        <h3>Nødvendige cookies</h3>
        <p>
          Disse cookies er nødvendige for at nettsiden skal fungere:
        </p>
        <ul>
          <li><strong>enneagram_test_answers</strong> - Lagrer dine testsvar</li>
          <li><strong>enneagram_test_testState</strong> - Lagrer hvor du er i testen</li>
          <li><strong>enneagram_test_cookieConsent</strong> - Lagrer dine cookie-preferanser</li>
        </ul>

        <h3>Analytiske cookies</h3>
        <p>
          Vi bruker ikke analytiske cookies i denne versjonen av tjenesten.
        </p>

        <h3>Markedsføringscookies</h3>
        <p>
          Vi bruker ikke markedsføringscookies.
        </p>

        <h2>Hvordan kontrollere cookies?</h2>
        <p>
          Du kan kontrollere og slette cookies gjennom nettleserinnstillingene dine.
          Merk at hvis du sletter nødvendige cookies, kan det påvirke hvordan
          nettsiden fungerer.
        </p>

        <h3>Slette cookies i din nettleser:</h3>
        <ul>
          <li>
            <strong>Chrome:</strong> Innstillinger → Personvern og sikkerhet →
            Slett nettleserdata
          </li>
          <li>
            <strong>Firefox:</strong> Innstillinger → Personvern og sikkerhet →
            Cookies og nettstedsdata
          </li>
          <li>
            <strong>Safari:</strong> Innstillinger → Personvern → Administrer
            nettstedsdata
          </li>
        </ul>

        <h2>Tredjepartscookies</h2>
        <p>
          Vi bruker ikke tredjepartscookies på denne nettsiden.
        </p>

        <h2>Oppdateringer av denne policyen</h2>
        <p>
          Vi kan oppdatere denne cookie-policyen fra tid til annen.
          Endringer vil bli publisert på denne siden.
        </p>

        <h2>Kontakt oss</h2>
        <p>
          Har du spørsmål om cookies, kan du kontakte oss på:{' '}
          <a href="mailto:cookies@example.com" className="text-blue-600 hover:underline">
            cookies@example.com
          </a>
        </p>

        <p className="text-sm text-gray-600 mt-8">
          Sist oppdatert: [Dato skal fylles inn]
        </p>
      </div>
    </div>
  );
}

// TODO: Legg til spesifikke cookie-navn og formål
// TODO: Oppdater hvis analytiske eller markedsføringscookies legges til
// TODO: Legg til informasjon om varighet på cookies
// TODO: Oppdater kontaktinformasjon
