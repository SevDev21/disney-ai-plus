# Supabase Authentication Setup

This project implements a complete authentication system using Supabase with separate Admin and User views.

## Features

- ✅ Email/Password authentication with Supabase
- ✅ Login and Sign-up pages
- ✅ Protected routes with middleware
- ✅ Separate Admin and User dashboards
- ✅ Responsive design with Tailwind CSS
- ✅ Dark mode support
- ✅ Playwright E2E tests

## Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Supabase

1. Copy the environment variables file:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your Supabase credentials:
   - Go to https://app.supabase.com/
   - Select your project (or create a new one)
   - Go to Settings > API
   - Copy the `Project URL` and `anon/public key`

3. Update `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

### 3. Enable Email Authentication in Supabase

1. Go to Authentication > Providers in your Supabase dashboard
2. Enable Email provider
3. Configure email templates (optional)

### 4. Set Up Database Tables and User Roles

**IMPORTANT**: Run the database migration to create the profiles table:

1. Go to Supabase Dashboard > SQL Editor
2. Copy the contents from `../supabase-setup.sql` (in the parent directory)
3. Click "Run" to execute the migration

This will:
- Create a `public.profiles` table with role management
- Set up Row Level Security (RLS) policies
- Create triggers to auto-populate profiles when users sign up
- Create profiles for any existing users

**To set a user as admin:**
```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'your-admin-email@example.com';
```

### 5. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Testing

Run Playwright tests:

```bash
# Install Playwright browsers (first time only)
pnpm exec playwright install chromium

# Run tests
pnpm exec playwright test

# Run tests with UI
pnpm exec playwright test --headed
```

## Project Structure

```
src/
├── app/
│   ├── auth/
│   │   ├── callback/          # OAuth callback handler
│   │   └── auth-code-error/   # Error page for failed auth
│   ├── dashboard/             # Protected dashboard page
│   ├── login/                 # Login/signup page
│   └── page.tsx               # Home page (redirects)
├── components/
│   ├── AdminView.tsx          # Admin dashboard view
│   ├── UserView.tsx           # Regular user dashboard view
│   └── LogoutButton.tsx       # Logout functionality
├── lib/
│   └── supabase/
│       ├── client.ts          # Browser Supabase client
│       └── server.ts          # Server Supabase client
└── middleware.ts              # Auth middleware for protected routes
```

## How It Works

1. **Authentication Flow**:
   - Users can sign up or sign in via `/login`
   - Email confirmation is sent for new signups
   - Authenticated users are redirected to `/dashboard`

2. **Authorization**:
   - Middleware protects the `/dashboard` route
   - Redirects unauthenticated users to `/login`
   - Redirects authenticated users from `/login` to `/dashboard`

3. **Role-Based Views**:
   - Admin users see `AdminView` component with admin controls
   - Regular users see `UserView` component with user features
   - Role is determined by email pattern or user metadata

## Troubleshooting

### "Invalid API Key" Error
- Verify your Supabase credentials in `.env.local`
- Restart the dev server after changing env variables

### Email Confirmation Not Received
- Check Supabase Dashboard > Authentication > Email Templates
- Verify SMTP settings in Supabase project settings
- Check spam folder

### Middleware Deprecation Warning
- Next.js 16 has deprecated the middleware convention in favor of "proxy"
- This is a deprecation warning and doesn't affect functionality
- We'll update to the new pattern in a future update

## Next Steps

- [ ] Add password reset functionality
- [ ] Implement OAuth providers (Google, GitHub, etc.)
- [ ] Add email verification requirement
- [ ] Implement role-based access control with Supabase RLS
- [ ] Add profile management page
- [ ] Implement session management
