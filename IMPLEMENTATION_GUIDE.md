# Franchise Portal - Implementation Guide

This guide provides step-by-step instructions for completing the franchise operations portal setup.

## Current Status

✅ **Completed**:
- Complete UI/UX structure with responsive sidebar
- Multi-tenant route structure with location scoping
- All data type definitions
- Authentication utilities and context
- Custom hooks for data fetching with access control
- Middleware for route protection
- Architecture documentation

⏳ **Next Steps**:
- Implement API endpoints
- Connect to database (Supabase/Neon)
- Implement authentication
- Add real data fetching
- Integrate VAPI webhooks

## Step 1: Setup Database (Supabase Recommended)

### Create Supabase Project

1. [Connect to Supabase](#open-mcp-popover)
2. Create a new project or use existing one
3. Get your project URL and API keys

### Create Database Schema

Copy and run the SQL migration in Supabase SQL Editor:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(50) NOT NULL CHECK (role IN ('hq_admin', 'franchise_owner', 'staff')),
  location_ids UUID[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_users_email ON users(email);

-- Locations table
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
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

-- Leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  city VARCHAR(100),
  problem_type VARCHAR(50),
  problem_description TEXT,
  source VARCHAR(50),
  status VARCHAR(50) DEFAULT 'new',
  assigned_to_user_id UUID REFERENCES users(id),
  internal_notes TEXT,
  contacted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_leads_location ON leads(location_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created ON leads(created_at DESC);

-- Conversations table (for VAPI integration)
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id),
  lead_id UUID REFERENCES leads(id),
  vapi_call_id VARCHAR(255),
  caller_number VARCHAR(20),
  called_number VARCHAR(20),
  call_status VARCHAR(50),
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

-- Jobs table
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id),
  lead_id UUID REFERENCES leads(id),
  job_number VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  assigned_to_user_id UUID NOT NULL REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'scheduled',
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
  parts_used TEXT[],
  labor_hours DECIMAL(5,2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_jobs_location ON jobs(location_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_assigned_to ON jobs(assigned_to_user_id);
CREATE INDEX idx_jobs_scheduled_date ON jobs(scheduled_date);

-- Add sample data for testing
INSERT INTO users (email, password_hash, full_name, role, location_ids, is_active) VALUES
('admin@example.com', '$2a$10$...', 'John Admin', 'hq_admin', '{}', true),
('owner@example.com', '$2a$10$...', 'Jane Owner', 'franchise_owner', '{}', true),
('tech@example.com', '$2a$10$...', 'Mike Tech', 'staff', '{}', true);

COMMIT;
```

## Step 2: Implement Authentication

### Setup Supabase Auth

1. Enable "Email" provider in Supabase Authentication settings
2. Update `src/lib/auth.ts` to use Supabase client:

```typescript
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return {
    user: data.user,
    token: data.session?.access_token,
  };
}
```

### Test Login

1. Create a test user in Supabase
2. Test login at `/login`
3. Should redirect to `/dashboard`

## Step 3: Create API Routes

### Create directory structure:

```
src/app/api/
├── auth/
│   ├── login/
│   │   └── route.ts
│   ├── logout/
│   │   └── route.ts
│   ├── signup/
│   │   └── route.ts
│   ├── me/
│   │   └── route.ts
│   └── refresh/
│       └── route.ts
├── locations/
│   ├── route.ts                        # GET /api/locations
│   └── [locationId]/
│       ├── route.ts                    # GET /api/locations/[locationId]
│       ├── leads/
│       │   ├── route.ts                # GET/POST /api/locations/[locationId]/leads
│       │   └── [leadId]/
│       │       └── route.ts            # GET/PATCH/DELETE /api/locations/[locationId]/leads/[leadId]
│       ├── jobs/
│       │   ├── route.ts                # GET/POST /api/locations/[locationId]/jobs
│       │   └── [jobId]/
│       │       └── route.ts            # GET/PATCH/DELETE /api/locations/[locationId]/jobs/[jobId]
│       └── conversations/
│           ├── route.ts                # GET /api/locations/[locationId]/conversations
│           ├── [conversationId]/
│           │   └── route.ts            # GET /api/locations/[locationId]/conversations/[conversationId]
│           └── webhook/
│               └── vapi/
│                   └── route.ts        # POST /api/locations/[locationId]/conversations/webhook/vapi
└── users/
    ├── route.ts                        # GET /api/users (HQ only)
    └── me/
        └── route.ts                    # GET /api/users/me
```

### Example API Route: `src/app/api/locations/[locationId]/leads/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest,
  { params }: { params: { locationId: string } }
) {
  const supabase = createServerComponentClient({ cookies });
  
  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get user details to check location access
  const { data: userData } = await supabase
    .from('users')
    .select('role, location_ids')
    .eq('id', user.id)
    .single();

  // Check access control
  if (
    userData?.role !== 'hq_admin' &&
    !userData?.location_ids?.includes(params.locationId)
  ) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Fetch leads for location
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .eq('location_id', params.locationId)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(leads);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { locationId: string } }
) {
  const supabase = createServerComponentClient({ cookies });
  const body = await request.json();

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check access control (same as GET)
  // ... validation code ...

  // Insert new lead
  const { data: lead, error } = await supabase
    .from('leads')
    .insert([
      {
        location_id: params.locationId,
        first_name: body.firstName,
        last_name: body.lastName,
        email: body.email,
        phone: body.phone,
        problem_type: body.problemType,
        problem_description: body.problemDescription,
        source: body.source || 'web_form',
        status: 'new',
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(lead, { status: 201 });
}
```

## Step 4: Enable Real-Time Updates with Supabase

Update hooks to use real-time subscriptions:

```typescript
import { useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export function useLeads(locationId: string) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    // Subscribe to changes
    const subscription = supabase
      .from(`leads:location_id=eq.${locationId}`)
      .on('*', (payload) => {
        // Update leads in real-time
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [locationId]);

  return { leads, isLoading: false, error: null };
}
```

## Step 5: Integrate VAPI Webhooks

### Configure VAPI Webhook

In VAPI dashboard:
1. Set webhook URL to: `https://yourdomain.com/api/locations/[locationId]/conversations/webhook/vapi`
2. Subscribe to "call_ended" events

### Create webhook handler:

```typescript
// src/app/api/locations/[locationId]/conversations/webhook/vapi/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(
  request: NextRequest,
  { params }: { params: { locationId: string } }
) {
  const supabase = createServerComponentClient({ cookies });
  const body = await request.json();

  // Verify webhook signature from VAPI
  // ... verification code ...

  // Store call in database
  const { data: conversation, error } = await supabase
    .from('conversations')
    .insert([
      {
        location_id: params.locationId,
        vapi_call_id: body.callId,
        caller_number: body.phoneNumber,
        call_status: body.callStatus,
        call_duration_seconds: body.duration,
        transcript_snippet: body.transcript?.slice(0, 500),
        transcript_full: body.transcript,
        recording_url: body.recordingUrl,
        call_start_time: new Date(body.startTime).toISOString(),
        call_end_time: new Date(body.endTime).toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
```

## Step 6: Test the Application

### Create Test Data

1. Login with admin account
2. Navigate to `/locations` (HQ only)
3. Create a new location
4. Assign franchise owner
5. Switch to franchise owner account
6. Access `/locations/[slug]/leads`
7. Create test leads

### Test Location Scoping

```bash
# Try to access another location as franchise owner
# Should return 403 Forbidden

curl -H "Authorization: Bearer $TOKEN" \
  https://yourapp.com/api/locations/different-location-id/leads
```

### Test VAPI Integration

1. Configure VAPI webhook
2. Make a test call
3. Check database for recorded conversation

## Step 7: Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx
```

## Security Checklist

- [ ] All API routes check user authentication
- [ ] All data queries filter by `location_id` and user permissions
- [ ] RLS policies enabled in Supabase
- [ ] Webhook signatures verified
- [ ] Passwords hashed with bcrypt
- [ ] CORS configured correctly
- [ ] Rate limiting implemented
- [ ] Error messages don't leak sensitive info
- [ ] Audit logging for admin actions

## Common Issues & Solutions

### Users Can't Access Locations
- Verify `location_ids` array is populated in users table
- Check middleware is allowing requests to protected routes

### VAPI Calls Not Recording
- Verify webhook URL is correct
- Check webhook signature verification
- Review server logs for errors

### Data Not Updating in Real-Time
- Verify Supabase subscription is active
- Check for JavaScript errors in browser console
- Ensure client-side hooks are calling refresh

## Next Features to Build

1. **Reporting**: Generate PDF reports for leads/jobs
2. **SMS Integration**: Send texts to customers
3. **Calendar View**: Drag-and-drop job scheduling
4. **Mobile App**: React Native version for field techs
5. **AI Chat**: ChatBot for lead qualification
6. **Inventory Management**: Track parts and supplies
7. **Payment Processing**: Stripe integration for invoices
8. **Analytics**: Advanced dashboards and metrics

## Support & Resources

- [Supabase Docs](https://supabase.io/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [VAPI Docs](https://docs.vapi.ai)
- Architecture guide: See `FRANCHISE_PORTAL_ARCHITECTURE.md`
