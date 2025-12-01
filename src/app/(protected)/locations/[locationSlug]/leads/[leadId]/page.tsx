'use client';

import { useState } from 'react';
import { ArrowLeft, Edit, Send, Phone, Mail } from 'react-icons/fa';
import Link from 'next/link';

/**
 * Lead Detail Page
 * Shows:
 * - Full lead information
 * - Contact history
 * - Internal notes
 * - Status management
 * - Action buttons (schedule job, send follow-up, etc.)
 */

export default function LeadDetailPage({
  params,
}: {
  params: { locationSlug: string; leadId: string };
}) {
  const [notes, setNotes] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState('contacted');

  // TODO: Fetch real lead data from API
  const lead = {
    id: params.leadId,
    name: 'Robert Martinez',
    email: 'robert@example.com',
    phone: '(540) 555-0101',
    city: 'Fredericksburg',
    state: 'VA',
    zip: '22401',
    address: '123 Main Street',
    problemType: 'Foggy Glass',
    problemDescription: 'Double-pane windows in living room have become foggy. Appears to be seal failure.',
    source: 'web_form',
    status: 'contacted',
    createdAt: '2024-01-15',
    lastContactedAt: '2024-01-16',
    internalNotes: 'Called customer, interested in repair. Scheduled for tomorrow at 2 PM.',
  };

  const contactHistory = [
    {
      id: '1',
      type: 'call',
      date: '2024-01-16 14:30',
      notes: 'Spoke with customer, discussed repair options. Customer seems interested.',
      by: 'Sarah Chen',
    },
    {
      id: '2',
      type: 'email',
      date: '2024-01-15 16:45',
      notes: 'Sent quote for window repair service',
      by: 'System',
    },
    {
      id: '3',
      type: 'form_submission',
      date: '2024-01-15 10:20',
      notes: 'Lead submitted via web form',
      by: 'System',
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
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      case 'lost':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href={`/locations/${params.locationSlug}/leads`}
        className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
      >
        <ArrowLeft size={18} />
        <span>Back to Leads</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lead Overview */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{lead.name}</h1>
                <p className="mt-2 text-gray-600">{lead.address}, {lead.city}, {lead.state} {lead.zip}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(lead.status)}`}>
                  {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <a href={`tel:${lead.phone}`} className="mt-1 flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium">
                  <Phone size={16} />
                  <span>{lead.phone}</span>
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <a href={`mailto:${lead.email}`} className="mt-1 flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium">
                  <Mail size={16} />
                  <span>{lead.email}</span>
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-600">Problem Type</p>
                <p className="mt-1 font-medium text-gray-900">{lead.problemType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Source</p>
                <p className="mt-1 font-medium text-gray-900">Web Form</p>
              </div>
            </div>
          </div>

          {/* Problem Description */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Problem Description</h2>
            <p className="text-gray-700 leading-relaxed">{lead.problemDescription}</p>
          </div>

          {/* Contact History */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Contact History</h2>
            <div className="space-y-4">
              {contactHistory.map((contact) => (
                <div key={contact.id} className="pb-4 border-b border-gray-200 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">
                        {contact.type === 'call' && '📞 Phone Call'}
                        {contact.type === 'email' && '📧 Email'}
                        {contact.type === 'form_submission' && '📋 Form Submission'}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{contact.notes}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{contact.date}</p>
                      <p className="text-xs text-gray-500 mt-1">by {contact.by}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                <Phone size={16} />
                <span>Call Lead</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                <Mail size={16} />
                <span>Send Email</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                <span>📅</span>
                <span>Schedule Job</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                <Edit size={16} />
                <span>Edit Lead</span>
              </button>
            </div>
          </div>

          {/* Status Update */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Update Status</h2>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="lost">Lost</option>
            </select>
            <button className="w-full mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
              Save Status
            </button>
          </div>

          {/* Internal Notes */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Internal Notes</h2>
            <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
              <p className="text-sm text-gray-700">{lead.internalNotes}</p>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add a note..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              rows={4}
            />
            <button className="w-full mt-3 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
              <Send size={16} />
              <span>Add Note</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
