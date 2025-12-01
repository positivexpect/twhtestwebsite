'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

/**
 * Leads Management Page
 * Shows all leads for a location with:
 * - Filterable table view
 * - Search functionality
 * - Status filtering
 * - Quick actions (contact, schedule, etc.)
 */

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Map location slugs to location IDs
const LOCATION_MAPPING: Record<string, { id: string; name: string }> = {
  'fredericksburg-va': { id: '1', name: 'Fredericksburg, VA' },
  'nova-va': { id: '2', name: 'Northern Virginia' },
  'florida': { id: '3', name: 'Florida' }
};

export default function LeadsPage({
  params,
}: {
  params: { locationSlug: string };
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const location = LOCATION_MAPPING[params.locationSlug];

  useEffect(() => {
    async function fetchLeads() {
      try {
        if (!location) {
          setError('Location not found');
          setLoading(false);
          return;
        }

        const { data, error: fetchError } = await supabase
          .from('form_submissions')
          .select('*')
          .eq('location_id', location.id)
          .order('created_at', { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        const formattedLeads = (data || []).map((submission: any) => {
          const formData = submission.form_data || {};
          const issueTypes = formData.issueTypes || [];

          return {
            id: submission.id,
            name: submission.name || 'Unknown',
            email: submission.email || '',
            phone: submission.phone || '',
            city: submission.address?.city || '',
            problemType: issueTypes.length > 0 ? issueTypes[0] : 'Assessment Request',
            source: 'web_form',
            status: submission.status || 'new',
            createdAt: submission.created_at ? new Date(submission.created_at).toLocaleDateString() : '',
          };
        });

        setLeads(formattedLeads);
      } catch (err) {
        console.error('Error fetching leads:', err);
        setError('Failed to load leads');
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, [location]);

  if (!location) {
    return (
      <div className="space-y-6">
        <div className="text-red-600">Location not found</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

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
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads - {location.name}</h1>
          <p className="mt-2 text-gray-600">Manage and track all leads for this location</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
          <span>➕</span>
          <span>New Lead</span>
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
                        <span>📧</span>
                        <a href={`mailto:${lead.email}`} className="text-red-600 hover:text-red-700">
                          {lead.email}
                        </a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>📱</span>
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
