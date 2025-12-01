'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * Jobs / Work Orders Page
 * Shows:
 * - All jobs/work orders for the location
 * - Status tracking
 * - Assigned technician
 * - Scheduling information
 * - Filtering and search
 */

export default function JobsPage({
  params,
}: {
  params: { locationSlug: string };
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // TODO: Fetch real data from API filtered by location_id
  const jobs = [
    {
      id: 'J001',
      jobNumber: 'WH-2024-001',
      title: 'Double Pane Window Repair',
      customer: 'Patricia Anderson',
      address: '123 Oak Street',
      city: 'Fredericksburg',
      tech: 'Mike Thompson',
      status: 'scheduled',
      scheduledDate: '2024-01-18',
      scheduledTime: '09:00 AM',
      problemType: 'Foggy Glass',
    },
    {
      id: 'J002',
      jobNumber: 'WH-2024-002',
      title: 'Broken Glass Replacement',
      customer: 'James Taylor',
      address: '456 Pine Avenue',
      city: 'Stafford',
      tech: 'Sarah Chen',
      status: 'scheduled',
      scheduledDate: '2024-01-19',
      scheduledTime: '02:00 PM',
      problemType: 'Broken Glass',
    },
    {
      id: 'J003',
      jobNumber: 'WH-2024-003',
      title: 'Window Parts Installation',
      customer: 'Lisa Jackson',
      address: '789 Elm Road',
      city: 'Woodbridge',
      tech: 'Mike Thompson',
      status: 'in_progress',
      scheduledDate: '2024-01-17',
      scheduledTime: '10:30 AM',
      problemType: 'Parts',
    },
    {
      id: 'J004',
      jobNumber: 'WH-2024-004',
      title: 'Screen Repair',
      customer: 'Margaret Harris',
      address: '321 Maple Lane',
      city: 'Alexandria',
      tech: 'David Kim',
      status: 'completed',
      scheduledDate: '2024-01-16',
      scheduledTime: '01:00 PM',
      problemType: 'Screens',
    },
    {
      id: 'J005',
      jobNumber: 'WH-2024-005',
      title: 'Foggy Window Repair',
      customer: 'Kevin White',
      address: '654 Cedar Street',
      city: 'Arlington',
      tech: 'Unassigned',
      status: 'on_hold',
      scheduledDate: '2024-01-20',
      scheduledTime: '03:00 PM',
      problemType: 'Foggy Glass',
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.customer.toLowerCase().includes(search.toLowerCase()) ||
      job.address.toLowerCase().includes(search.toLowerCase()) ||
      job.jobNumber.includes(search);

    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'in_progress':
        return 'bg-purple-100 text-purple-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'on_hold':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Jobs & Work Orders</h1>
          <p className="mt-2 text-gray-600">Track and manage all scheduled work</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
          <span>➕</span>
          <span>New Job</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 space-y-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <span>🔍</span>
          <span className="text-sm font-medium">Filters</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">🔎</span>
            <input
              type="text"
              placeholder="Search by customer, address, or job ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="on_hold">On Hold</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div></div>
        </div>

        <p className="text-sm text-gray-600">
          Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Job ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Location</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Problem Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Technician</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Scheduled</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <Link
                      href={`/locations/${params.locationSlug}/jobs/${job.id}`}
                      className="font-medium text-red-600 hover:text-red-700"
                    >
                      {job.jobNumber}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{job.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <span>📍</span>
                      <span>{job.address}, {job.city}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{job.problemType}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <span>👤</span>
                      <span>{job.tech}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div>
                      <p className="font-medium">{job.scheduledDate}</p>
                      <p className="text-xs text-gray-500">{job.scheduledTime}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
                      {job.status === 'in_progress' ? 'In Progress' : job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Link
                      href={`/locations/${params.locationSlug}/jobs/${job.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredJobs.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-600">No jobs match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
