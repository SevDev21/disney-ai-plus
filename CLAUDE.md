# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Disney AI Plus is a video management platform with region-based content filtering built with Next.js 16 (App Router), Supabase, and Tailwind CSS v4.

## Tech Stack

- **Framework**: Next.js 16.0.1 with App Router
- **React**: 19.2.0
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (email/password, role-based access)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (New York style)
- **Package Manager**: pnpm
- **TypeScript**: Strict mode enabled
- **Testing**: Playwright

## Essential Commands

All commands should be run from the `disney-ai-plus-app/` directory:

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Type checking
pnpm exec tsc --noEmit

# Linting
pnpm lint

# Playwright tests
pnpm exec playwright test
```

**Important**: Always use `--webpack` flag for dev/build (already configured in package.json scripts).

## Architecture

### Authentication & Authorization Flow

The app uses a role-based access control system with two user types:

1. **Admin users** (`role: 'admin'` in profiles table)
   - Redirected to `/admin/dashboard`
   - Can view all videos and manage users
   - Access protected by middleware

2. **Regular users** (`role: 'user'` in profiles table)
   - Redirected to `/dashboard`
   - See only videos matching their region (or region-neutral content)
   - Cannot access `/admin/*` routes

**Auth Flow**:
- `src/middleware.ts` - Handles session refresh, route protection, and role-based redirects
- `src/lib/supabase/server.ts` - Server-side Supabase client (use in Server Components)
- `src/lib/supabase/client.ts` - Browser Supabase client (use in Client Components)
- Auth routes: `/login`, `/auth/callback`, `/auth/auth-code-error`

**Critical**: Always validate auth and roles server-side. Never trust client-side role checks.

### Database Schema

**profiles table** (already exists - DO NOT recreate):
```sql
profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  role TEXT DEFAULT 'user',
  region TEXT,  -- for content filtering
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

**videos table**:
```sql
videos (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT NOT NULL,
  video_url TEXT NOT NULL,
  region TEXT,  -- content availability by region
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  uploader_id UUID REFERENCES auth.users(id),
  duration INTEGER,
  file_size BIGINT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

**Migration files**: `disney-ai-plus-app/supabase-videos-migration.sql`

### Region-Based Content Filtering

Users see videos based on their profile region:
- If user has `region` set → shows videos matching that region OR videos with `region: null`
- If user has no region → shows all videos
- Implementation: `src/components/user/UserMediaView.tsx:65-72`

### Component Architecture

```
src/
├── app/
│   ├── admin/dashboard/         # Admin routes
│   │   └── page.tsx             # Admin dashboard with Media/Users tabs
│   ├── dashboard/               # User routes
│   │   └── page.tsx             # User dashboard with region-filtered content
│   ├── login/                   # Auth pages
│   ├── auth/                    # Auth callbacks
│   └── api/
│       └── linear-webhook/      # Linear integration webhook
├── components/
│   ├── admin/
│   │   ├── MediaView.tsx        # Admin video grid view
│   │   └── UsersView.tsx        # Admin user list view
│   ├── user/
│   │   └── UserMediaView.tsx    # User video grid (region-filtered)
│   ├── ui/                      # shadcn/ui components
│   ├── AdminView.tsx            # Admin dashboard tabs container
│   ├── UserView.tsx             # User dashboard container
│   └── LogoutButton.tsx         # Logout functionality
└── lib/
    ├── supabase/
    │   ├── server.ts            # Server-side client (Server Components)
    │   └── client.ts            # Browser client (Client Components)
    └── utils.ts                 # Utility functions (cn() for class merging)
```

### Key Patterns

1. **Server Components by default**: Use `'use client'` directive only for interactive components (forms, buttons, state)

2. **Import aliases**: Always use `@/*` for imports:
   ```typescript
   import { Button } from "@/components/ui/button"
   import { createClient } from "@/lib/supabase/server"
   ```

3. **Supabase client usage**:
   - Server Components: `await createClient()` from `@/lib/supabase/server`
   - Client Components: `createClient()` from `@/lib/supabase/client`

4. **Styling conventions**:
   - Use Tailwind utility classes
   - Support dark mode with `dark:` variants
   - Use `cn()` from `@/lib/utils` for conditional class merging

5. **Data fetching**: Always fetch data in Server Components, not in middleware

## Conductor Workspace Setup

This repo uses Conductor for parallel development with workspaces:

- Workspaces located in `.conductor/` directory
- `.env.local` shared via symlinks across all workspaces
- `.clinerules` copied to each workspace
- Setup script: `./setup-workspace.sh /path/to/workspace`
- See `WORKSPACE_SETUP.md` for details

## Linear Integration

Webhook endpoint at `/api/linear-webhook` handles Linear issue events:
- Filters for issues with "autocode" label
- Placeholder for Conductor workflow integration
- Location: `src/app/api/linear-webhook/route.ts`

## Environment Variables

Required in `disney-ai-plus-app/.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Template available in `.env.example`. Never commit `.env.local` to git.

## Development Workflow Recommendations

1. **Before implementing features**: Check `.clinerules` for project-specific guidance including:
   - Database schema constraints (e.g., profiles table already exists)
   - AI assistant preferences (Context7, Playwright, CodeRabbit)
   - Code audit requirements before implementation

2. **Testing**: Use Playwright MCP tools for browser-based UI testing after implementing features

3. **Code review**: Use CodeRabbit CLI before commits

4. **Deployment**: Configured for Vercel (see `vercel.json`)

## Important Constraints

- **Never recreate the profiles table** - it already exists with admin users configured
- **Always server-side auth** - middleware and Server Components only for role checks
- **RLS policies** - leverage Supabase Row Level Security for data access control
- **Dark mode support** - all components must support dark mode variants
- **Audit before implementation** - review codebase and ask clarifying questions before starting work
- **TypeScript strict mode** - all code must pass strict type checking
