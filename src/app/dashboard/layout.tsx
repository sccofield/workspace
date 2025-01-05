'use client';
import { useState, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Correctly use this hook to get the current path
import Image from 'next/image';

interface LayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current route path

  const menuItems = [
    { name: 'Overview', href: '/dashboard' },
    { name: 'Subscription', href: '/dashboard/subscription' },
    { name: 'Profile', href: '/dashboard/profile' },
    { name: 'Log Out', href: '/dashboard/logout' },
  ];

  return (
    <div className="flex min-h-screen bg-white border border-gray-300">
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-300 p-4 space-y-6 z-50 transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:block`}
      >
        {/* Close Button for Mobile */}
        <button
          className="block md:hidden text-gray-500 mb-4"
          onClick={() => setMenuOpen(false)}
        >
          ✕
        </button>

        {/* Logo */}
        <div className="text-center mb-6">
          <Image
            src="/logo.png" // Replace with your actual logo path
            alt="Matriks Hub Logo"
            width={120}
            height={60}
            className="mx-auto"
          />
        </div>

        {/* Menu Items */}
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block text-center py-2 rounded ${
                pathname === item.href
                  ? 'bg-orange-500 text-white' // Active menu item
                  : 'text-gray-700 hover:bg-orange-500 hover:text-white' // Hover styles
              }`}
              onClick={() => setMenuOpen(false)} // Close menu on mobile
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Header */}
        <header className="flex items-center p-4 border-b border-gray-300 md:hidden">
          <button className="text-gray-500" onClick={() => setMenuOpen(true)}>
            ☰
          </button>
        </header>

        {/* Main Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
