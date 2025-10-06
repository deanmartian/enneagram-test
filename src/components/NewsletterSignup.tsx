'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Vennligst fyll inn e-postadresse');
      return;
    }

    if (!consent) {
      setError('Du må samtykke til å motta nyhetsbrev');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          type: 'newsletter'
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail('');
        setConsent(false);
      } else {
        setError('Noe gikk galt. Prøv igjen senere.');
      }
    } catch (err) {
      setError('Noe gikk galt. Prøv igjen senere.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-green-800 text-sm">
          Takk! Vi har registrert din interesse for nyhetsbrev.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Få tips om Enneagram
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        Motta oppdateringer og refleksjoner om personlighetsutvikling.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="newsletter-email" className="block text-sm font-medium text-gray-700 mb-1">
            E-postadresse
          </label>
          <input
            type="email"
            id="newsletter-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="din@epost.no"
            disabled={isSubmitting}
          />
        </div>

        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="newsletter-consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            disabled={isSubmitting}
          />
          <label htmlFor="newsletter-consent" className="text-sm text-gray-700">
            Jeg samtykker til å motta nyhetsbrev og kan melde meg av når som helst.
          </label>
        </div>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Registrerer...' : 'Meld meg på'}
        </button>
      </form>
    </div>
  );
}

// TODO: Integrer med ekstern nyhetsbrevtjeneste (MailChimp, ConvertKit, etc.)
// TODO: Legg til double opt-in funksjonalitet
// TODO: Implementer utmelding-lenke
