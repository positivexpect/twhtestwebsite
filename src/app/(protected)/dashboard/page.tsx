'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * HQ Dashboard Page
 * Shows high-level overview for HQ admins:
 * - All locations' performance metrics
 * - Recent activity across all franchises
 * - Key metrics and KPIs
 */

export default function DashboardPage() {
  // TODO: Fetch real data from API
  const stats = [
    { label: 'Total Leads', value: '1,247', change: '+12%', trend: 'up' },
    { label: 'Completed Jobs', value: '892', change: '+8%', trend: 'up' },
    { label: 'Active Locations', value: '8', change: '0%', trend: 'neutral' },
    { label: 'Pending Calls', value: '23', change: '-5%', trend: 'down' },
  ];

  const recentLocations = [
    { id: '1', name: 'Fredericksburg, VA', slug: 'fredericksburg-va', leads: 287, jobsThisWeek: 58, status: 'active' },
    { id: '2', name: 'Northern Virginia', slug: 'nova-va', leads: 156, jobsThisWeek: 34, status: 'active' },
    { id: '3', name: 'Florida', slug: 'florida', leads: 0, jobsThisWeek: 0, status: 'planned' },
  ];

  const chartData = [
    { name: 'Mon', leads: 45, jobs: 32, calls: 28 },
    { name: 'Tue', leads: 52, jobs: 38, calls: 32 },
    { name: 'Wed', leads: 48, jobs: 35, calls: 30 },
    { name: 'Thu', leads: 61, jobs: 42, calls: 35 },
    { name: 'Fri', leads: 55, jobs: 40, calls: 33 },
    { name: 'Sat', leads: 38, jobs: 28, calls: 25 },
    { name: 'Sun', leads: 22, jobs: 15, calls: 18 },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Operations Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to The Window Hospital Operations Portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
            <p
              className={`mt-2 text-sm font-medium ${
                stat.trend === 'up'
                  ? 'text-green-600'
                  : stat.trend === 'down'
                  ? 'text-red-600'
                  : 'text-gray-600'
              }`}
            >
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Weekly Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="leads" fill="#CD2028" name="Leads" />
              <Bar dataKey="jobs" fill="#059669" name="Jobs" />
              <Bar dataKey="calls" fill="#2563eb" name="Calls" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/locations"
              className="block w-full text-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              View All Locations
            </Link>
            <Link
              href="/locations"
              className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Add New Location
            </Link>
            <Link
              href="/settings"
              className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Settings
            </Link>
          </div>
        </div>
      </div>

      {/* Locations Overview */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Location Overview</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Location</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Total Leads</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Jobs (This Week)</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentLocations.map((location) => (
                <tr key={location.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{location.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{location.leads}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{location.jobsThisWeek}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                      {location.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Link
                      href={`/locations/${location.name.toLowerCase().replace(/,/g, '').replace(/\s+/g, '-')}/dashboard`}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
