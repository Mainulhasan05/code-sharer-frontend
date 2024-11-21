export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center space-x-2">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Md. Mainul Hasan. All rights reserved.
            </p>
            <a
              href="https://github.com/Mainulhasan05"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:text-blue-600"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    );
  }
  