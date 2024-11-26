"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Logout handler
  const handleLogout = () => {
    Cookies.remove("codesharer_token");
    setIsLoggedIn(false);
  };

  // Check login status on mount
  useEffect(() => {
    const token = Cookies.get("codesharer_token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-white">
              Codesharer
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <Link href="/pricing" className="hover:text-gray-300">
              Pricing
            </Link>
            {!isLoggedIn ? (
              <>
                <Link href="/signup" className="hover:text-gray-300">
                  Signup
                </Link>
                <Link href="/login" className="hover:text-gray-300">
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="hover:text-gray-300">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-300 focus:outline-none"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/pricing"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            >
              Pricing
            </Link>
            {!isLoggedIn ? (
              <>
                <Link
                  href="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                >
                  Signup
                </Link>
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
