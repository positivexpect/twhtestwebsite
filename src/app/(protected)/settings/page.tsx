'use client';

import { useState } from 'react';
import { Save, Lock, Bell, Users, Trash2 } from 'react-icons/fa';

/**
 * Settings Page
 * Allows users to manage:
 * - Account settings
 * - Notification preferences
 * - Team management (for location owners)
 * - Security settings
 */

export default function SettingsPage() {
  const [fullName, setFullName] = useState('John Smith');
  const [email, setEmail] = useState('john@example.com');
  const [phone, setPhone] = useState('(540) 555-0100');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    // TODO: Save settings to API
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Manage your account and preferences</p>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <span>👤</span>
          <span>Account Information</span>
        </h2>

        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center space-x-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              <Save size={18} />
              <span>Save Changes</span>
            </button>
            {isSaved && <p className="mt-2 text-green-600 text-sm">✓ Changes saved successfully</p>}
          </div>
        </form>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <Lock size={20} />
          <span>Security</span>
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Password</p>
              <p className="text-sm text-gray-600">Last changed 3 months ago</p>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Change Password
            </button>
          </div>

          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Add an extra layer of security</p>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Enable 2FA
            </button>
          </div>

          <div className="pt-2">
            <p className="text-sm text-gray-600">
              Active sessions: 1 | Last login: Jan 16, 2024 at 2:30 PM
            </p>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <Bell size={20} />
          <span>Notifications</span>
        </h2>

        <div className="space-y-4">
          {[
            { label: 'New Leads', desc: 'Get notified when new leads arrive' },
            { label: 'Job Status Updates', desc: 'Notifications for job status changes' },
            { label: 'Missed Calls', desc: 'Alert when calls are missed' },
            { label: 'Team Activity', desc: 'Team member activities and updates' },
            { label: 'Weekly Reports', desc: 'Weekly performance summaries' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-b-0">
              <div>
                <p className="font-medium text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-red-600" />
            </div>
          ))}
        </div>
      </div>

      {/* Team Management */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <Users size={20} />
          <span>Team Members</span>
        </h2>

        <div className="space-y-3 mb-6">
          {[
            { name: 'Sarah Chen', role: 'Technician', email: 'sarah@example.com' },
            { name: 'Mike Thompson', role: 'Technician', email: 'mike@example.com' },
            { name: 'Lisa Jackson', role: 'Manager', email: 'lisa@example.com' },
          ].map((member) => (
            <div key={member.email} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{member.name}</p>
                <p className="text-sm text-gray-600">{member.role} · {member.email}</p>
              </div>
              <button className="text-red-600 hover:text-red-700 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <button className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium">
          Invite Team Member
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-lg font-bold text-red-900 mb-4">Danger Zone</h2>
        <p className="text-sm text-red-700 mb-4">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
          Delete Account
        </button>
      </div>
    </div>
  );
}
