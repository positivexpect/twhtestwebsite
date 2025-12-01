'use client';

import { useState } from 'react';
import { Search, Filter, Phone, Clock, Volume2 } from 'react-icons/fa';

/**
 * Conversations Page (VAPI Integration Placeholder)
 * Shows:
 * - Call logs from phone assistant
 * - Call metadata (time, duration, status)
 * - Transcript snippets
 * - Filtering by date and status
 */

export default function ConversationsPage({
  params,
}: {
  params: { locationSlug: string };
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  // TODO: Fetch real VAPI call data from API
  const conversations = [
    {
      id: 'CALL-001',
      callerNumber: '(540) 555-0201',
      callTime: '2024-01-16 14:30',
      duration: 5,
      status: 'completed',
      transcript: 'Customer inquired about window repair services. Discussed options for foggy glass replacement.',
      recordingUrl: null,
    },
    {
      id: 'CALL-002',
      callerNumber: '(540) 555-0202',
      callTime: '2024-01-16 13:15',
      duration: 8,
      status: 'answered',
      transcript: 'Customer called about broken window. Scheduled appointment for tomorrow.',
      recordingUrl: null,
    },
    {
      id: 'CALL-003',
      callerNumber: '(540) 555-0203',
      callTime: '2024-01-16 11:45',
      duration: 0,
      status: 'missed',
      transcript: null,
      recordingUrl: null,
    },
    {
      id: 'CALL-004',
      callerNumber: '(540) 555-0204',
      callTime: '2024-01-16 10:20',
      duration: 3,
      status: 'voicemail',
      transcript: 'Please call back regarding window service inquiry.',
      recordingUrl: null,
    },
    {
      id: 'CALL-005',
      callerNumber: '(540) 555-0205',
      callTime: '2024-01-15 15:30',
      duration: 12,
      status: 'completed',
      transcript: 'Long discussion about window types and repair options. Customer very interested.',
      recordingUrl: null,
    },
  ];

  const filteredConversations = conversations.filter((call) => {
    const matchesSearch = call.callerNumber.includes(search) || call.id.includes(search);
    const matchesStatus = statusFilter === 'all' || call.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'answered':
        return 'bg-blue-100 text-blue-700';
      case 'missed':
        return 'bg-red-100 text-red-700';
      case 'voicemail':
        return 'bg-yellow-100 text-yellow-700';
      case 'failed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      completed: 'Completed',
      answered: 'Answered',
      missed: 'Missed',
      voicemail: 'Voicemail',
      failed: 'Failed',
    };
    return labels[status] || status;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Conversations</h1>
        <p className="mt-2 text-gray-600">View all incoming calls and VAPI assistant interactions</p>
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
              placeholder="Search by phone number or call ID..."
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
            <option value="completed">Completed</option>
            <option value="answered">Answered</option>
            <option value="missed">Missed</option>
            <option value="voicemail">Voicemail</option>
            <option value="failed">Failed</option>
          </select>

          {/* Date Filter */}
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        <p className="text-sm text-gray-600">
          Showing {filteredConversations.length} call{filteredConversations.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Calls Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Call ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Phone Number</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date & Time</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Duration</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Transcript</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredConversations.map((call) => (
                <tr key={call.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-red-600">{call.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Phone size={14} className="text-gray-400" />
                      <span className="font-medium text-gray-900">{call.callerNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{call.callTime}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock size={14} className="text-gray-400" />
                      <span>{call.duration} min</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(call.status)}`}>
                      {getStatusLabel(call.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {call.transcript || <span className="text-gray-400">—</span>}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center space-x-3">
                      {call.recordingUrl && (
                        <button
                          className="text-blue-600 hover:text-blue-700 transition-colors"
                          title="Listen to recording"
                        >
                          <Volume2 size={16} />
                        </button>
                      )}
                      <button className="text-gray-600 hover:text-gray-700 font-medium transition-colors">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredConversations.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-600">No calls match your search criteria.</p>
          </div>
        )}
      </div>

      {/* Integration Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">VAPI Integration Placeholder</h3>
        <p className="text-sm text-blue-700">
          This page is ready to be integrated with VAPI call logs. Once connected, real call data will be displayed here
          including transcripts, recordings, and call quality metrics.
        </p>
      </div>
    </div>
  );
}
