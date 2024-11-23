import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 flex flex-col justify-center items-center text-white">
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold">
          Welcome to Codesharer
        </h1>
        <p className="mt-4 text-lg sm:text-xl">
          A platform where you can share and discover code with the community
        </p>
      </header>

      {/* Button to Share Code */}
      <Link
        href="/share-code"
        className="text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 py-3 px-6 rounded-lg text-lg font-semibold transform hover:scale-105 transition duration-300"
      >
        Share Your Code
      </Link>

      {/* Features Section */}
      <section className="mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-semibold text-white">Why Codesharer?</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">
              Collaborate with Ease
            </h3>
            <p>
              Share your code with others and work together to improve your
              projects.
            </p>
          </div>
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">
              Learn from the Community
            </h3>
            <p>
              Explore code from others and learn new programming techniques and
              tricks.
            </p>
          </div>
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">Safe and Secure</h3>
            <p>Your code is safe with us. Share with peace of mind.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="mt-16 bg-gray-800 text-white py-12 text-center">
        <h2 className="text-3xl font-semibold mb-4">Join Us Today!</h2>
        <p className="text-lg mb-6">
          Start sharing your code and discover amazing projects.
        </p>
        <Link
          href="/signup"
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold"
        >
          Sign Up Now
        </Link>
      </section>
    </div>
  );
}
