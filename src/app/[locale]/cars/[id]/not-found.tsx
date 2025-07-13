import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <div className="text-gray-400 text-6xl mb-4">🚗</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Car Not Found</h1>
        <p className="text-gray-600 mb-8">
          The car you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/en"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
