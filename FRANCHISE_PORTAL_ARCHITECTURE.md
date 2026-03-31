# Franchise Operations Portal - Architecture Guide

This document outlines the architecture, data models, and implementation strategy for the multi-tenant franchise operations portal.

## Overview

The franchise operations portal is a separate Next.js application that serves as the internal ops software for The Window Hospital franchise network. It's designed as a true multi-tenant system where:

- **HQ Admins** can see all locations, manage franchises, and oversee operations
- **Franchise Owners** can only access their assigned locations
- **Staff/Technicians** have limited access to their assigned jobs and leads

All data is scoped by `location_id` to ensure complete isolation between franchises.

## Project Structure

```
src/
├── app/
│   ├── login/
│   │   └── page.tsx                    # Public login page
│   ├── signup/
│   │   └── page.tsx                    # Public signup page (future)
│   └── (protected)/
│       ├── layout.tsx                  # Protected layout wrapper
│       ├── ProtectedLayoutClient.tsx   # Sidebar & navigation
│       ├── dashboard/
│       │   └── page.tsx                # HQ Dashboard (all locations)
│       ├── settings/
│       │   └── page.tsx                # User settings
│       └── locations/
│           ├── page.tsx                # Locations list (HQ only)
│           └── [locationSlug]/
│               ├── dashboard/
│               │   └── page.tsx        # Location dashboard
│               ├── leads/
│               │   ├── page.tsx        # Leads list for location
│               │   └── [leadId]/
│               │       └── page.tsx    # Lead detail view
│               ├── jobs/
│               │   ├── page.tsx        # Jobs list for location
│               │   └── [jobId]/
│               │       └── page.tsx    # Job detail view
│               └── conversations/
│                   └── page.tsx        # Call logs for location
├── components/
│   └── (shared components)
├── types/
│   └── franchise.ts                    # All data type definitions
├── lib/
│   ├── auth.ts                         # Auth utilities
│   ├── db.ts                           # Database client (Supabase/Postgres)
│   └── api.ts                          # API utilities
├── middleware.ts                       # Route protection middleware
└── utils/
    └── (utility functions)
```

## Database Schema

### Core Tables

#### `users`
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(50) NOT NULL, -- 'hq_admin', 'franchise_owner', 'staff'
  location_ids UUID[] NOT NULL, -- Array of accessible locations
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_users_email ON users(email);
```

#### `locations`
```sql
CREATE TABLE locations (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL, -- URL-friendly: 'fredericksburg-va'
  territory VARCHAR(255),
  time_zone VARCHAR(50) NOT NULL,
  address VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(2),
  zip VARCHAR(10),
  phone VARCHAR(20),
  email VARCHAR(255),
  franchise_owner_id UUID REFERENCES users(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_locations_slug ON locations(slug);
CREATE INDEX idx_locations_franchise_owner ON locations(franchise_owner_id);
```

#### `leads`
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY,
  location_id UUID NOT NULL REFERENCES locations(id),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  city VARCHAR(100),
  problem_type VARCHAR(50), -- 'foggy_glass', 'broken_glass', 'parts', 'screens', 'other'
  problem_description TEXT,
  source VARCHAR(50), -- 'web_form', 'vapi_call', 'text', 'walk_in', 'referral'
  status VARCHAR(50) DEFAULT 'new', -- 'new', 'contacted', 'scheduled', 'completed', 'lost'
  assigned_to_user_id UUID REFERENCES users(id),
  internal_notes TEXT,
  contacted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_leads_location ON leads(location_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created ON leads(created_at DESC);
```

#### `conversations` (VAPI Call Logs)
```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY,
  location_id UUID NOT NULL REFERENCES locations(id),
  lead_id UUID REFERENCES leads(id),
  vapi_call_id VARCHAR(255), -- External VAPI call ID
  caller_number VARCHAR(20),
  called_number VARCHAR(20),
  call_status VARCHAR(50), -- 'answered', 'missed', 'voicemail', 'completed', 'failed'
  call_duration_seconds INTEGER DEFAULT 0,
  transcript_snippet TEXT,
  transcript_full TEXT,
  recording_url TEXT,
  call_start_time TIMESTAMP,
  call_end_time TIMESTAMP,
  handled_by_user_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_conversations_location ON conversations(location_id);
CREATE INDEX idx_conversations_call_time ON conversations(call_start_time DESC);
```

#### `jobs`
```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY,
  location_id UUID NOT NULL REFERENCES locations(id),
  lead_id UUID REFERENCES leads(id),
  job_number VARCHAR(50) NOT NULL, -- Unique per location: 'WH-2024-001'
  title VARCHAR(255) NOT NULL,
  description TEXT,
  assigned_to_user_id UUID NOT NULL REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'scheduled', -- 'scheduled', 'in_progress', 'completed', 'cancelled', 'on_hold'
  scheduled_date DATE,
  scheduled_time_start TIME,
  scheduled_time_end TIME,
  completed_at TIMESTAMP,
  customer_name VARCHAR(255),
  customer_phone VARCHAR(20),
  customer_email VARCHAR(255),
  customer_address VARCHAR(255),
  customer_city VARCHAR(100),
  customer_state VARCHAR(2),
  customer_zip VARCHAR(10),
  parts_used TEXT[], -- Array of part names/IDs
  labor_hours DECIMAL(5,2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_jobs_location ON jobs(location_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_assigned_to ON jobs(assigned_to_user_id);
CREATE INDEX idx_jobs_scheduled_date ON jobs(scheduled_date);
```

### Database Setup Instructions

1. **Create Neon Project** or **Supabase Project** with PostgreSQL
2. **Run migrations** using the SQL above
3. **Set up Row-Level Security (RLS)** policies to enforce location_id scoping:

```sql
-- Example RLS policy for leads table
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see leads from their locations"
ON leads FOR SELECT
USING (
  location_id = ANY(
    (SELECT location_ids FROM users WHERE id = auth.uid())
  )
);
```

## Key Features by Role

### HQ Admin
- View all locations with performance metrics
- Create/edit/delete locations
- Invite franchise owners to locations
- View aggregate data across all franchises
- Manage user accounts and permissions
- Access to audit logs

### Franchise Owner
- View dashboard for assigned location(s)
- Manage leads for their location
- View/manage jobs and technicians
- See conversations and call logs
- Limited reporting
- Team management for their location

### Staff / Technician
- View assigned jobs only
- See relevant lead information
- Update job status
- Access to their schedule
- Limited conversation history (calls related to their jobs)

## Authentication & Authorization

### Implementation Strategy

We recommend **Supabase Auth** for this project because:

1. **Built-in JWT tokens** - Easy to implement role-based access
2. **RLS (Row-Level Security)** - Enforce location_id scoping at the database level
3. **Real-time subscriptions** - Perfect for live updates on calls, jobs, leads
4. **Webhook support** - Easy VAPI integration

### Setup Steps

1. **Connect to Supabase**: Use [Connect to Supabase](#open-mcp-popover)

2. **Create Auth context** (`src/lib/auth.ts`):
```typescript
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export function useAuth() {
  const supabase = createClientComponentClient();
  // Implement auth hooks here
}
```

3. **Implement middleware protection** (`src/middleware.ts`):
```typescript
// Check user roles and location access before allowing route access
```

4. **Enable RLS policies** in Supabase to enforce data scoping

## API Routes (To Be Built)

```
/api/auth/
  POST /login           - Email/password login
  POST /logout          - Logout user
  POST /signup          - Create new account
  POST /refresh         - Refresh JWT token

/api/locations/
  GET  /                - List all locations (HQ only)
  POST /                - Create new location (HQ only)
  GET  /:id             - Get location details
  PATCH /:id            - Update location (HQ only)
  DELETE /:id           - Delete location (HQ only)

/api/locations/:id/leads/
  GET  /                - List leads for location
  POST /                - Create new lead
  GET  /:leadId         - Get lead details
  PATCH /:leadId        - Update lead
  DELETE /:leadId       - Delete lead

/api/locations/:id/jobs/
  GET  /                - List jobs for location
  POST /                - Create new job
  GET  /:jobId          - Get job details
  PATCH /:jobId         - Update job status
  DELETE /:jobId        - Delete job

/api/locations/:id/conversations/
  GET  /                - List calls for location
  GET  /:callId         - Get call details
  POST /webhook/vapi    - VAPI webhook endpoint for new calls

/api/users/
  GET  /                - List users (HQ only)
  POST /                - Create/invite user (HQ only)
  GET  /me              - Get current user profile
  PATCH /me             - Update current user
```

## Integration Roadmap

### Phase 1: Foundation (Current)
- ✅ UI/UX structure and layout
- ✅ Route structure with location scoping
- ✅ Data type definitions
- ⏳ Basic authentication (email/password)
- ⏳ Mock data and components

### Phase 2: Database Integration
- Database schema setup (Neon/Supabase)
- API endpoints for CRUD operations
- RLS policies for data scoping
- Real authentication implementation

### Phase 3: Advanced Features
- VAPI webhook integration for call logs
- Real-time updates with Supabase subscriptions
- Advanced reporting and analytics
- Email notifications
- SMS integration for lead follow-ups

### Phase 4: Optimization
- Performance optimization
- Search and filtering enhancements
- Bulk operations
- Data export features

## Important Notes

### Multi-Tenant Data Scoping

**CRITICAL**: Every database query MUST filter by location_id to ensure data isolation.

```typescript
// ✅ CORRECT: Scoped by location_id
const leads = await db.leads.findMany({
  where: {
    location_id: userLocationId,
  }
});

// ❌ WRONG: Not scoped - security risk!
const leads = await db.leads.findMany();
```

### Role-Based Access Control

Use the `user.role` and `user.location_ids` to enforce permissions:

```typescript
// Only HQ admins can access /locations route
if (user.role !== 'hq_admin') {
  return redirect('/dashboard');
}

// Users can only access their assigned locations
if (!user.location_ids.includes(locationId)) {
  return redirect('/dashboard');
}
```

## Recommended Tech Stack

- **Frontend**: Next.js 14+ with TypeScript ✅
- **Database**: Supabase PostgreSQL (recommended) or Neon
- **Auth**: Supabase Auth
- **UI Framework**: Tailwind CSS ✅
- **Form Handling**: React Hook Form
- **State Management**: React Context + Supabase Real-time
- **VAPI Integration**: Webhook handlers + webhooks from VAPI
- **Hosting**: Vercel

## Next Steps

1. **Connect to Supabase** and create the database schema
2. **Implement authentication** in `src/lib/auth.ts`
3. **Create API routes** for CRUD operations
4. **Build data fetching hooks** with proper location scoping
5. **Integrate with VAPI** for call logs
6. **Add real-time updates** using Supabase subscriptions
7. **Deploy to Vercel**

## Testing the Portal

For local development, you can test different user roles:

1. **HQ Admin**: Can access `/locations` and see all franchises
2. **Franchise Owner**: Can access `/locations/[slug]/dashboard` for their location(s)
3. **Staff**: Can access `/locations/[slug]/jobs` to see assigned jobs

Mock data is currently used. Replace with real API calls once backend is ready.

## Troubleshooting

### Users Can't See Their Locations
- Check that `location_ids` array in users table is populated
- Verify RLS policies are correctly configured
- Check middleware is allowing access to the right routes

### Data Appearing for Wrong Location
- Verify all queries filter by `location_id`
- Check RLS policies in Supabase
- Review middleware logic for location extraction

### Leads/Jobs Not Loading
- Check API endpoints are returning data
- Verify location slug matches database
- Check browser console for API errors

## Support

For implementation help or questions, refer to:
- [Supabase Documentation](https://supabase.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
