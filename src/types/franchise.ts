/**
 * Core data models for the franchise operations portal
 * All data is scoped by location_id to ensure multi-tenant isolation
 */

export type UserRole = 'hq_admin' | 'franchise_owner' | 'staff';

export interface User {
  id: string;
  email: string;
  password_hash: string;
  role: UserRole;
  full_name: string;
  phone: string;
  location_ids: string[]; // Array of location IDs this user can access
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface Location {
  id: string;
  name: string;
  slug: string; // URL-friendly identifier (e.g., "fredericksburg-va")
  territory: string; // Region/territory name
  time_zone: string; // IANA timezone (e.g., "America/New_York")
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  franchise_owner_id: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export type LeadSource = 'web_form' | 'vapi_call' | 'text' | 'walk_in' | 'referral';
export type LeadStatus = 'new' | 'contacted' | 'scheduled' | 'completed' | 'lost';
export type ProblemType = 'foggy_glass' | 'broken_glass' | 'parts' | 'screens' | 'other';

export interface Lead {
  id: string;
  location_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  problem_type: ProblemType;
  problem_description: string;
  source: LeadSource;
  status: LeadStatus;
  assigned_to_user_id?: string; // User who is managing this lead
  internal_notes: string;
  created_at: string;
  updated_at: string;
  contacted_at?: string;
}

export interface Conversation {
  id: string;
  location_id: string;
  lead_id?: string; // Optional link to a lead if from VAPI
  vapi_call_id?: string; // External VAPI call ID if from phone assistant
  caller_number: string;
  called_number: string;
  call_status: 'answered' | 'missed' | 'voicemail' | 'completed' | 'failed';
  call_duration_seconds: number;
  transcript_snippet?: string;
  transcript_full?: string;
  recording_url?: string;
  call_start_time: string;
  call_end_time?: string;
  handled_by_user_id?: string; // User who handled the call
  created_at: string;
  updated_at: string;
}

export type JobStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'on_hold';

export interface Job {
  id: string;
  location_id: string;
  lead_id?: string;
  job_number: string; // Unique job identifier per location
  title: string;
  description: string;
  assigned_to_user_id: string; // Assigned technician
  status: JobStatus;
  scheduled_date: string;
  scheduled_time_start?: string;
  scheduled_time_end?: string;
  completed_at?: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  customer_address: string;
  customer_city: string;
  customer_state: string;
  customer_zip: string;
  parts_used?: string[];
  labor_hours?: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

/**
 * Session/Auth related types
 */
export interface Session {
  user: User;
  token: string;
  expiresAt: string;
}

export interface AuthContext {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

/**
 * Dashboard/UI related types
 */
export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  scheduledJobs: number;
  completedJobs: number;
  missedCalls: number;
  avgResponseTime?: number; // in hours
}

export interface FilterParams {
  locationId?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  searchQuery?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
