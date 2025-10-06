'use client';

import { useState, useEffect } from 'react';
import { getCookieConsent, saveCookieConsent } from '@/lib/storage';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = getCookieConsent();
    if (consent === null) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    saveCookieConsent(true);
    setShowBanner(false);
  };

  const handleDecline = () => {
    saveCookieConsent(false);
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              Vi bruker kun nødvendige cookies for å lagre dine testsvar lokalt i nettleseren.
              Ingen data sendes til tredjeparter.{' '}
              <a href="/cookies" className="text-blue-600 hover:underline">
                Les mer om cookies
              </a>
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Avslå
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Godta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
