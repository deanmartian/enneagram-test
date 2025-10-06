import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-600">
            © 2025 Enneagramtest. Kun for refleksjon og selvutvikling.
          </div>
          <nav className="flex space-x-6">
            <Link
              href="/privacy"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Personvern
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Cookies
            </Link>
            <a
              href="mailto:kontakt@example.com"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Kontakt
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
