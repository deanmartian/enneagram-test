import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex justify-start">
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700">
              Enneagramtest
            </Link>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Hjem
            </Link>
            <Link
              href="/test"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Test
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
