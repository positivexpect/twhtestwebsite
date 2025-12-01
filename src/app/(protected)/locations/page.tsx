'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * Locations Management Page (HQ Admin Only)
 * Allows HQ admins to:
 * - View all locations
 * - Create new locations
 * - Edit location details
 * - Assign franchise owners
 * - Invite staff
 */

export default function LocationsPage() {
  const [showNewLocationForm, setShowNewLocationForm] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // TODO: Fetch from API
  const locations = [
    {
      id: '1',
      name: 'Fredericksburg, VA',
      slug: 'fredericksburg-va',
      territory: 'Northern Virginia',
      franchiseOwner: 'John Smith',
      franchiseOwnerId: 'user-1',
      staff: 8,
      totalLeads: 156,
      status: 'active',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Richmond, VA',
      slug: 'richmond-va',
      territory: 'Central Virginia',
      franchiseOwner: 'Sarah Johnson',
      franchiseOwnerId: 'user-2',
      staff: 12,
      totalLeads: 203,
      status: 'active',
      createdAt: '2024-01-10',
    },
    {
      id: '3',
      name: 'Arlington, VA',
      slug: 'arlington-va',
      territory: 'Northern Virginia',
      franchiseOwner: 'Michael Brown',
      franchiseOwnerId: 'user-3',
      staff: 6,
      totalLeads: 89,
      status: 'active',
      createdAt: '2024-02-01',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Locations</h1>
          <p className="mt-2 text-gray-600">Manage all franchise locations</p>
        </div>
        <button
          onClick={() => setShowNewLocationForm(!showNewLocationForm)}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          <span>➕</span>
          <span>New Location</span>
        </button>
      </div>

      {/* New Location Form */}
      {showNewLocationForm && (
        <div className="bg-white rounded-lg shadow p-6 border-2 border-red-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Create New Location</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location Name</label>
                <input
                  type="text"
                  placeholder="e.g., Fredericksburg, VA"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Territory</label>
                <input
                  type="text"
                  placeholder="e.g., Northern Virginia"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                  <option>America/New_York</option>
                  <option>America/Chicago</option>
                  <option>America/Denver</option>
                  <option>America/Los_Angeles</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowNewLocationForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Create Location
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Locations Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Location</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Territory</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Franchise Owner</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Staff</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Leads</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {locations.map((location) => (
                <tr key={location.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    <Link
                      href={`/locations/${location.slug}/dashboard`}
                      className="text-red-600 hover:text-red-700"
                    >
                      {location.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{location.territory}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <span>👤</span>
                      <span>{location.franchiseOwner}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{location.staff} members</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{location.totalLeads}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-3 flex">
                    <button
                      onClick={() => {
                        setSelectedLocation(location.id);
                        setShowInviteModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                      title="Invite Staff"
                    >
                      ➕
                    </button>
                    <button
                      className="text-gray-600 hover:text-gray-700 transition-colors"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      className="text-red-600 hover:text-red-700 transition-colors"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Invite Staff Member</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="staff@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                  <option value="staff">Staff / Technician</option>
                  <option value="owner">Franchise Owner</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
