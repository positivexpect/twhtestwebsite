'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, Phone, Mail } from 'react-icons/fa';

/**
 * Leads Management Page
 * Shows all leads for a location with:
 * - Filterable table view
 * - Search functionality
 * - Status filtering
 * - Quick actions (contact, schedule, etc.)
 */

export default function LeadsPage({
  params,
}: {
  params: { locationSlug: string };
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');

  // TODO: Fetch real data from API filtered by location_id
  const leads = [
    {
      id: 'L001',
      name: 'Robert Martinez',
      email: 'robert@example.com',
      phone: '(540) 555-0101',
      city: 'Fredericksburg',
      problemType: 'Foggy Glass',
      source: 'web_form',
      status: 'new',
      createdAt: '2024-01-15',
    },
    {
      id: 'L002',
      name: 'Jennifer Lee',
      email: 'jennifer@example.com',
      phone: '(540) 555-0102',
      city: 'Stafford',
      problemType: 'Broken Glass',
      source: 'vapi_call',
      status: 'contacted',
      createdAt: '2024-01-14',
    },
    {
      id: 'L003',
      name: 'David Wilson',
      email: 'david@example.com',
      phone: '(540) 555-0103',
      city: 'Woodbridge',
      problemType: 'Window Parts',
      source: 'web_form',
      status: 'scheduled',
      createdAt: '2024-01-13',
    },
    {
      id: 'L004',
      name: 'Patricia Anderson',
      email: 'patricia@example.com',
      phone: '(540) 555-0104',
      city: 'Alexandria',
      problemType: 'Screens',
      source: 'referral',
      status: 'completed',
      createdAt: '2024-01-12',
    },
    {
      id: 'L005',
      name: 'James Taylor',
      email: 'james@example.com',
      phone: '(540) 555-0105',
      city: 'Manassas',
      problemType: 'Foggy Glass',
      source: 'text',
      status: 'lost',
      createdAt: '2024-01-11',
    },
  ];

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search);

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-700';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-700';
      case 'scheduled':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      case 'lost':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getSourceLabel = (source: string) => {
    const labels: Record<string, string> = {
      web_form: 'Web Form',
      vapi_call: 'Phone Call',
      text: 'Text Message',
      referral: 'Referral',
      walk_in: 'Walk-in',
    };
    return labels[source] || source;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
          <p className="mt-2 text-gray-600">Manage and track all leads for this location</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
          <Plus size={18} />
          <span>New Lead</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 space-y-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <Filter size={16} />
          <span className="text-sm font-medium">Filters</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
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
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="lost">Lost</option>
          </select>

          {/* Source Filter */}
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">All Sources</option>
            <option value="web_form">Web Form</option>
            <option value="vapi_call">Phone Call</option>
            <option value="text">Text Message</option>
            <option value="referral">Referral</option>
          </select>
        </div>

        <p className="text-sm text-gray-600">
          Showing {filteredLeads.length} lead{filteredLeads.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Contact</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Source</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <Link
                      href={`/locations/${params.locationSlug}/leads/${lead.id}`}
                      className="font-medium text-red-600 hover:text-red-700"
                    >
                      {lead.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail size={14} className="text-gray-400" />
                        <a href={`mailto:${lead.email}`} className="text-red-600 hover:text-red-700">
                          {lead.email}
                        </a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone size={14} className="text-gray-400" />
                        <a href={`tel:${lead.phone}`} className="text-red-600 hover:text-red-700">
                          {lead.phone}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{lead.problemType}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{getSourceLabel(lead.source)}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{lead.createdAt}</td>
                  <td className="px-6 py-4 text-sm">
                    <Link
                      href={`/locations/${params.locationSlug}/leads/${lead.id}`}
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

        {filteredLeads.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-600">No leads match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
