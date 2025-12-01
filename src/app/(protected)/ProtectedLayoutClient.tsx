'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut, Settings } from 'react-icons/fa';

/**
 * Protected Layout Client Component
 * Provides sidebar navigation and main layout for authenticated users
 * 
 * Features:
 * - Responsive sidebar (collapsible on mobile)
 * - Global navigation (Dashboard, Locations, Settings)
 * - Location-aware secondary navigation
 * - User menu with logout
 */

export default function ProtectedLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Extract location slug from pathname if present
  const locationMatch = pathname.match(/\/locations\/([^/]+)/);
  const currentLocationSlug = locationMatch ? locationMatch[1] : null;

  // Determine if user is HQ admin (can access /locations list)
  // TODO: Get this from user context/auth
  const isHQAdmin = true;

  // Navigation items that are always visible
  const mainNavItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    ...(isHQAdmin ? [{ label: 'Locations', href: '/locations', icon: '🏢' }] : []),
    { label: 'Settings', href: '/settings', icon: '⚙️' },
  ];

  // Secondary navigation for location-specific views
  const locationNavItems = currentLocationSlug ? [
    { label: 'Overview', href: `/locations/${currentLocationSlug}/dashboard` },
    { label: 'Leads', href: `/locations/${currentLocationSlug}/leads` },
    { label: 'Jobs', href: `/locations/${currentLocationSlug}/jobs` },
    { label: 'Conversations', href: `/locations/${currentLocationSlug}/conversations` },
  ] : [];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-red-600">The Window Hospital</h1>
            <p className="text-sm text-gray-600 mt-1">Operations Portal</p>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-red-50 text-red-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Location-Specific Navigation */}
            {locationNavItems.length > 0 && (
              <div className="pt-4 mt-4 border-t border-gray-200">
                <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Location
                </p>
                {locationNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                      isActive(item.href)
                        ? 'bg-red-50 text-red-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </nav>

          {/* User Menu Footer */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <button className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Settings size={16} />
              <span className="text-sm">Account Settings</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium">
              <LogOut size={16} />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Breadcrumb or Title */}
            <div className="flex-1 ml-4 lg:ml-0">
              <p className="text-sm text-gray-600">
                {currentLocationSlug
                  ? `Location: ${currentLocationSlug.replace('-', ' ')}`
                  : 'Operations Dashboard'}
              </p>
            </div>

            {/* User Avatar Placeholder */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                JZ
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="px-6 py-8">{children}</div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
