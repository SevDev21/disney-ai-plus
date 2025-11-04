# Disney AI+ Project Requirements Document

## Project Overview

**Project Name**: Disney AI+ (demo)  
**Type**: Web Application  
**Purpose**: A demonstration platform for AI-powered video/media management with role-based access control, authentication, and administrative tools.

This document serves as a comprehensive guide for AI assistants and developers to understand the project structure, architecture, and requirements.

---

## Technology Stack

### Core Technologies
- **Framework**: Next.js 16.0.1 (App Router)
- **Runtime**: React 19.2.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Authentication & Database**: Supabase (PostgreSQL)
  - `@supabase/ssr` v0.7.0
  - `@supabase/supabase-js` v2.78.0

### UI Components
- **Component Library**: shadcn/ui (Radix UI + Tailwind)
- **Icons**: Lucide React
- **Utilities**: 
  - `class-variance-authority` (component variants)
  - `clsx` (conditional classes)
  - `tailwind-merge` (Tailwind class merging)

### Development Tools
- **Testing**: Playwright 1.56.1 (E2E tests)
- **Linting**: ESLint 9
- **Package Manager**: pnpm

---

## Project Structure

```
disney-ai-plus-app/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── admin/
│   │   │   └── dashboard/            # Admin-only dashboard
│   │   ├── auth/
│   │   │   ├── callback/            # OAuth callback handler
│   │   │   └── auth-code-error/     # Auth error page
│   │   ├── dashboard/               # User dashboard
│   │   ├── login/                   # Login/signup page
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                 # Home (redirects to login/dashboard)
│   ├── components/
│   │   ├── admin/
│   │   │   ├── MediaView.tsx        # Admin media grid view
│   │   │   └── UsersView.tsx        # Admin users list view
│   │   ├── ui/                      # shadcn/ui components
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── tabs.tsx
│   │   ├── AdminView.tsx            # Legacy admin view (may be deprecated)
│   │   ├── LogoutButton.tsx         # Logout functionality
│   │   └── UserView.tsx              # User dashboard view
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts            # Browser Supabase client
│   │   │   └── server.ts             # Server Supabase client
│   │   └── utils.ts                 # Utility functions
│   └── middleware.ts                # Route protection middleware
├── tests/
│   └── login.spec.ts                # Playwright E2E tests
├── supabase-videos-migration.sql    # Database migration for videos table
├── SETUP.md                         # Authentication setup guide
├── ADMIN_DASHBOARD_SETUP.md         # Admin dashboard setup guide
└── package.json
```

---

## Core Features

### 1. Authentication System

**Implementation**: Supabase Email/Password Authentication

**Features**:
- User sign-up with email/password
- User sign-in with email/password
- Email confirmation (optional, configured in Supabase)
- OAuth callback handling for email verification
- Session management with automatic token refresh
- Secure cookie-based session storage

**Routes**:
- `/login` - Login and signup page (redirects if already authenticated)
- `/auth/callback` - OAuth/email confirmation callback handler
- `/auth/auth-code-error` - Error page for failed authentication

**Key Files**:
- `src/app/login/page.tsx` - Login/signup UI
- `src/app/auth/callback/route.ts` - OAuth callback handler
- `src/lib/supabase/client.ts` - Browser Supabase client
- `src/lib/supabase/server.ts` - Server Supabase client

### 2. Role-Based Access Control (RBAC)

**User Roles**:
- **Admin**: Full system access, can manage users and media
- **User**: Standard access, personal dashboard

**Implementation**:
- Roles stored in `public.profiles` table in Supabase
- Role checked via middleware and server components
- Automatic redirects based on role:
  - Admin users → `/admin/dashboard`
  - Regular users → `/dashboard`
  - Non-admin accessing `/admin/*` → redirected to `/dashboard`

**Database Schema**:
```sql
profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  role TEXT DEFAULT 'user',  -- 'admin' or 'user'
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

**Key Files**:
- `src/middleware.ts` - Route protection and role-based redirects
- `src/app/dashboard/page.tsx` - User dashboard with role check
- `src/app/admin/dashboard/page.tsx` - Admin dashboard with role check

### 3. Protected Routes & Middleware

**Protected Routes**:
- `/dashboard` - Requires authentication
- `/admin/*` - Requires authentication AND admin role

**Middleware Logic**:
1. Validates Supabase environment variables
2. Creates Supabase client with cookie-based session
3. Refreshes expired sessions automatically
4. Redirects unauthenticated users to `/login`
5. Redirects authenticated users from `/login` to appropriate dashboard
6. Enforces admin-only access for `/admin/*` routes

**Key File**: `src/middleware.ts`

### 4. Admin Dashboard

**Location**: `/admin/dashboard`

**Features**:
- **Two Tabs**:
  1. **Media View**: Displays all videos in a grid layout
     - Video thumbnails, titles, descriptions
     - Duration (formatted as MM:SS)
     - File size (in MB)
     - Upload timestamp (relative time, e.g., "2 hours ago")
     - Region badges (if applicable)
  2. **Users View**: Lists all user accounts
     - Email addresses
     - User IDs (truncated)
     - Role badges (Admin/User)
     - Join dates and last updated dates
     - Summary badges showing total users and admins

**Access Control**:
- Only users with `role = 'admin'` in `profiles` table can access
- Non-admin users are automatically redirected to `/dashboard`

**Key Files**:
- `src/app/admin/dashboard/page.tsx` - Admin dashboard page
- `src/components/admin/MediaView.tsx` - Media grid component
- `src/components/admin/UsersView.tsx` - Users list component

### 5. User Dashboard

**Location**: `/dashboard`

**Features**:
- Personalized welcome message
- Quick action cards (placeholder for future features)
- Recent activity feed (placeholder)
- Account information display
- Logout functionality

**Access Control**:
- Requires authentication
- Admin users are automatically redirected to `/admin/dashboard`

**Key Files**:
- `src/app/dashboard/page.tsx` - User dashboard page
- `src/components/UserView.tsx` - User dashboard content

### 6. Media/Video Management System

**Database Schema**:
```sql
videos (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT NOT NULL,
  video_url TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  uploader_id UUID REFERENCES auth.users(id),
  duration INTEGER,           -- in seconds
  file_size BIGINT,          -- in bytes
  region TEXT,               -- optional region identifier
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

**Row Level Security (RLS) Policies**:
- **SELECT**: Anyone can view videos
- **INSERT**: Only authenticated users can insert videos
- **UPDATE**: Users can update their own videos, admins can update any
- **DELETE**: Users can delete their own videos, admins can delete any

**Current State**:
- Database table exists with 5 mock videos
- Admin can view all videos in Media tab
- Upload functionality not yet implemented (future feature)

**Key Files**:
- `supabase-videos-migration.sql` - Database migration
- `src/components/admin/MediaView.tsx` - Media display component

---

## Database Schema

### Tables

#### `auth.users` (Supabase managed)
- Managed by Supabase Auth
- Contains user authentication data

#### `public.profiles`
```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**RLS Policies**:
- Users can view their own profile
- Users can update their own profile (except role)
- Admins can view all profiles
- Admins can update any profile (including role)

#### `public.videos`
See Media/Video Management System section above.

---

## Environment Variables

**Required Environment Variables**:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Setup**:
1. Create `.env.local` file in `disney-ai-plus-app/` directory
2. Copy variables from Supabase Dashboard → Settings → API
3. Restart dev server after changes

---

## Development Setup

### Prerequisites
- Node.js (version compatible with Next.js 16)
- pnpm package manager
- Supabase account and project

### Installation Steps

1. **Install Dependencies**:
   ```bash
   cd disney-ai-plus-app
   pnpm install
   ```

2. **Configure Environment**:
   - Copy `.env.example` to `.env.local` (if exists)
   - Add Supabase credentials

3. **Set Up Database**:
   - Run `supabase-videos-migration.sql` in Supabase SQL Editor
   - Create `profiles` table (see SETUP.md for SQL)

4. **Set Admin User**:
   ```sql
   UPDATE public.profiles
   SET role = 'admin'
   WHERE email = 'your-admin-email@example.com';
   ```

5. **Run Development Server**:
   ```bash
   pnpm dev
   ```

6. **Run Tests**:
   ```bash
   pnpm exec playwright install chromium  # First time only
   pnpm exec playwright test
   ```

---

## Authentication Flow

1. **User visits `/`** → Redirected to `/login` or `/dashboard` based on auth status
2. **User signs up/signs in** → Supabase creates/validates session
3. **Email confirmation** (if enabled) → User clicks link → `/auth/callback` → Redirects to dashboard
4. **Middleware checks** → Validates session on protected routes
5. **Role check** → Redirects to appropriate dashboard based on role

---

## Authorization Architecture

### Route Protection Flow

```
User Request → Middleware → Check Auth → Check Role → Route Decision
```

**Decision Matrix**:
- Unauthenticated + Protected Route → `/login`
- Authenticated + `/login` → Role-based dashboard redirect
- Authenticated + User Role + `/admin/*` → `/dashboard`
- Authenticated + Admin Role + `/dashboard` → `/admin/dashboard`
- Authenticated + Admin Role + `/admin/*` → Allow access

---

## Future Features (Planned)

Based on the codebase and documentation:

1. **Video Upload Functionality**
   - Supabase Storage bucket setup
   - Upload form component
   - File upload to Supabase Storage
   - Video metadata insertion
   - Video player implementation

2. **Enhanced Authentication**
   - Password reset functionality
   - OAuth providers (Google, GitHub, etc.)
   - Email verification requirement enforcement
   - Session management UI

3. **User Management**
   - Profile management page
   - User role editing UI (admin only)
   - User deletion functionality

4. **Media Management**
   - Video editing/deletion UI
   - Video playback functionality
   - Thumbnail generation
   - Video metadata editing

5. **Streaming Demo** (from issues/mvp-streaming-demo-issues.md)
   - Backend API with streaming support
   - AI service integration
   - Frontend streaming UI
   - WebSocket/SSE connection layer

---

## Testing

### E2E Tests
- **Framework**: Playwright
- **Location**: `tests/login.spec.ts`
- **Coverage**: Login/signup flow testing

### Running Tests
```bash
pnpm exec playwright test
pnpm exec playwright test --headed  # With UI
```

---

## Security Considerations

1. **Authentication**: Supabase handles secure session management
2. **Authorization**: Role-based checks at middleware and component levels
3. **Database Security**: Row Level Security (RLS) policies enforce data access
4. **Route Protection**: Middleware prevents unauthorized access
5. **OAuth Redirects**: Whitelist validation prevents open redirect attacks
6. **Environment Variables**: Sensitive keys stored in `.env.local` (not committed)

---

## Common Tasks for AI Assistants

### Adding a New Protected Route
1. Route automatically protected if path matches middleware matcher
2. Add server component that checks authentication
3. Optionally check role if admin-only

### Adding a New Database Table
1. Create migration SQL file
2. Define RLS policies
3. Run migration in Supabase SQL Editor
4. Update TypeScript types if needed

### Creating a New Admin Feature
1. Add component in `src/components/admin/`
2. Add route in `src/app/admin/` if needed
3. Ensure role check in component
4. Update admin dashboard if needed

### Modifying Authentication
1. Update `src/app/login/page.tsx` for UI changes
2. Modify `src/middleware.ts` for flow changes
3. Update Supabase settings if needed

---

## Key Design Patterns

1. **Server Components**: Most pages are server components for better performance
2. **Client Components**: Only used when needed (e.g., interactive forms, logout button)
3. **Middleware Protection**: Routes protected at middleware level
4. **Role-Based Rendering**: Different components for different roles
5. **Automatic Redirects**: Seamless user experience based on auth state and role

---

## Dependencies Overview

### Production Dependencies
- `next` - React framework
- `react`, `react-dom` - UI library
- `@supabase/ssr`, `@supabase/supabase-js` - Authentication and database
- `@radix-ui/*` - Accessible UI primitives
- `tailwindcss` - Styling
- `lucide-react` - Icons

### Development Dependencies
- `typescript` - Type checking
- `@playwright/test` - E2E testing
- `eslint` - Code linting

---

## Troubleshooting

### Common Issues

1. **"Invalid API Key" Error**
   - Verify Supabase credentials in `.env.local`
   - Restart dev server after changing env variables

2. **Can't Access Admin Dashboard**
   - Verify user has `role = 'admin'` in `profiles` table
   - Check browser console for errors
   - Ensure environment variables are set correctly

3. **Middleware Deprecation Warning**
   - Next.js 16 deprecation warning (non-breaking)
   - Can be ignored for now

4. **No Videos Found**
   - Ensure `supabase-videos-migration.sql` has been run
   - Check Supabase Table Editor to verify videos exist

---

## Documentation References

- **Setup Guide**: `disney-ai-plus-app/SETUP.md`
- **Admin Dashboard Setup**: `disney-ai-plus-app/ADMIN_DASHBOARD_SETUP.md`
- **Authorization Architecture**: `docs/diagrams/authorization-architecture.md`
- **Streaming Demo Issues**: `docs/issues/mvp-streaming-demo-issues.md`

---

## Project Status

**Current Version**: 0.1.0 (demo)

**Status**: 
- ✅ Authentication system implemented
- ✅ Role-based access control working
- ✅ Admin dashboard with Media and Users views
- ✅ User dashboard implemented
- ✅ Database schema and migrations in place
- ⏳ Video upload functionality (planned)
- ⏳ Enhanced user management (planned)
- ⏳ Streaming demo features (planned)

---

## Notes for AI Assistants

When working on this project:

1. **Always check authentication** before accessing protected routes
2. **Verify role permissions** when implementing admin features
3. **Use server components** when possible for better performance
4. **Follow existing patterns** for consistency (e.g., Supabase client creation)
5. **Test with both admin and user roles** when implementing features
6. **Check middleware** when adding new routes
7. **Update RLS policies** when modifying database access patterns
8. **Use TypeScript types** from Supabase when possible

---

*Last Updated: Based on codebase analysis after pulling latest changes from master branch*

