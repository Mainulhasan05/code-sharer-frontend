import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-xl mb-6">Oops! We couldn't find the page you're looking for.</p>
        <Link href="/" className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-6 rounded-lg text-xl font-semibold transition-all duration-300">
            Return Home
          
        </Link>
      </div>
    </div>
  );
}
