import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and brand */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold mr-2">
                  B
                </div>
                <span className="text-xl font-bold text-gray-900">BUNAI</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:ml-8 lg:block">
              <div className="flex space-x-8">
                <Link to="/" className="text-sm font-medium text-amber-600">
                  Home
                </Link>
                <Link to="/shop" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                  Shop
                </Link>
                <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                  About Us
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open menu</span>
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 pb-3 pt-2">
            <Link
              to="/"
              className="block border-l-4 border-amber-500 bg-amber-50 py-2 pl-3 pr-4 text-base font-medium text-amber-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
