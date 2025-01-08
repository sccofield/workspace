'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <img
                src="/logo.png" // Replace with your logo path
                alt="Logo"
                className="h-8 w-auto cursor-pointer"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-black hover:text-gray-600">
              Features
            </Link>
            <Link href="#pricing" className="text-black hover:text-gray-600">
              Pricing
            </Link>
            <Link href="#contact" className="text-black hover:text-gray-600">
              Contact
            </Link>
            <Link
              href="/auth/login"
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-black focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="#features"
              className="block text-black hover:text-gray-600"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="block text-black hover:text-gray-600"
            >
              Pricing
            </Link>
            <Link
              href="#contact"
              className="block text-black hover:text-gray-600"
            >
              Contact
            </Link>
            <Link
              href="/auth/login"
              className="block bg-orange-500 text-white text-center px-4 py-2 rounded-md hover:bg-orange-600"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
