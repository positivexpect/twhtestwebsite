'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertCircle, CheckCircle, Clock, Phone } from 'react-icons/fa';

/**
 * Location Dashboard Page
 * Shows location-specific metrics and status:
 * - Leads overview
 * - Jobs status
 * - Recent calls
 * - Team status
 * - Key metrics for this location only
 */

export default function LocationDashboardPage({
  params,
}: {
  params: { locationSlug: string };
}) {
  const locationName = params.locationSlug.replace(/-/g, ' ').toUpperCase();

  // TODO: Fetch real data from API scoped to this location_id
  const stats = [
    { label: 'New Leads (This Week)', value: '24', icon: '📋', color: 'bg-blue-50' },
    { label: 'Scheduled Jobs', value: '12', icon: '📅', color: 'bg-green-50' },
    { label: 'Pending Calls', value: '5', icon: '☎️', color: 'bg-orange-50' },
    { label: 'Team Members', value: '8', icon: '👥', color: 'bg-purple-50' },
  ];

  const recentLeads = [
    {
      id: '1',
      name: 'Robert Martinez',
      phone: '(540) 555-0101',
      type: 'Foggy Glass',
      status: 'new',
      date: '2024-01-15',
    },
    {
      id: '2',
      name: 'Jennifer Lee',
      phone: '(540) 555-0102',
      type: 'Broken Glass',
      status: 'contacted',
      date: '2024-01-14',
    },
    {
      id: '3',
      name: 'David Wilson',
      phone: '(540) 555-0103',
      type: 'Window Parts',
      status: 'scheduled',
      date: '2024-01-13',
    },
  ];

  const upcomingJobs = [
    {
      id: 'J001',
      customer: 'Patricia Anderson',
      address: '123 Oak Street',
      tech: 'Mike Thompson',
      scheduledDate: '2024-01-18',
      status: 'scheduled',
    },
    {
      id: 'J002',
      customer: 'James Taylor',
      address: '456 Pine Avenue',
      tech: 'Sarah Chen',
      scheduledDate: '2024-01-19',
      status: 'scheduled',
    },
    {
      id: 'J003',
      customer: 'Lisa Jackson',
      address: '789 Elm Road',
      tech: 'Mike Thompson',
      scheduledDate: '2024-01-20',
      status: 'in_progress',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-700';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-700';
      case 'scheduled':
        return 'bg-green-100 text-green-700';
      case 'in_progress':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{locationName}</h1>
        <p className="mt-2 text-gray-600">Location Overview & Activity</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className={`${stat.color} rounded-lg p-6 border border-gray-200`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Leads & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Recent Leads</h2>
            <Link
              href={`/locations/${params.locationSlug}/leads`}
              className="text-red-600 hover:text-red-700 font-medium text-sm"
            >
              View All →
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{lead.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{lead.type}</p>
                    <p className="text-xs text-gray-500 mt-1">{lead.phone}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href={`/locations/${params.locationSlug}/leads`}
              className="block w-full text-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
            >
              Manage Leads
            </Link>
            <Link
              href={`/locations/${params.locationSlug}/jobs`}
              className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
            >
              View Jobs
            </Link>
            <Link
              href={`/locations/${params.locationSlug}/conversations`}
              className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
            >
              Call History
            </Link>
            <button className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm">
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Jobs */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Upcoming Jobs</h2>
          <Link
            href={`/locations/${params.locationSlug}/jobs`}
            className="text-red-600 hover:text-red-700 font-medium text-sm"
          >
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Job ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Address</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Technician</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {upcomingJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-red-600">{job.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{job.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{job.address}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{job.tech}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{job.scheduledDate}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
                      {job.status === 'in_progress' ? 'In Progress' : 'Scheduled'}
                    </span>
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
