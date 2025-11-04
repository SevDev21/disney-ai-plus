# Admin Dashboard Setup Guide

This guide walks you through setting up the new admin dashboard with Media and Users management tabs.

## Overview

The admin dashboard has been implemented with the following features:

- **Two Tabs**: Media view and Users view
- **Media View**: Grid display of uploaded videos with thumbnails, titles, duration, file size, and upload time
- **Users View**: List of all users with their roles, email addresses, join dates, and profile information
- **Role-Based Access**: Only admin users can access `/admin/dashboard`
- **Automatic Routing**: Admin users are automatically redirected to the admin dashboard upon login

## Routes

- `/dashboard` - Regular user dashboard (non-admin users)
- `/admin/dashboard` - Admin dashboard (admin users only)
- Regular users trying to access `/admin/dashboard` are redirected to `/dashboard`
- Admin users accessing `/dashboard` are redirected to `/admin/dashboard`

## Setup Instructions

### 1. Run the Database Migration

You need to create the `videos` table in Supabase to store video data:

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents from `supabase-videos-migration.sql`
4. Click **Run** to execute the migration

This migration will:
- Create the `videos` table with proper schema
- Set up Row Level Security (RLS) policies
- Insert 5 mock videos for testing
- Create indexes for better query performance
- Set up automatic timestamp updates

### 2. Verify Your Admin User

Make sure you have at least one admin user in your database:

```sql
-- Check your current role
SELECT id, email, role FROM public.profiles;

-- Set yourself as admin (if needed)
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

### 3. Install Dependencies (Already Done)

The following packages have been installed:
- `class-variance-authority` - For component variants
- `clsx` - For conditional classes
- `tailwind-merge` - For merging Tailwind classes
- `lucide-react` - For icons
- shadcn/ui components: `tabs`, `card`, `badge`, `button`

### 4. Start the Development Server

```bash
cd disney-ai-plus-app
pnpm dev
```

### 5. Test the Admin Dashboard

1. Login with your admin account
2. You should be automatically redirected to `/admin/dashboard`
3. You'll see two tabs:
   - **Media**: Displays the 5 mock videos in a grid
   - **Users**: Shows all users with their roles and information

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   └── dashboard/
│   │       └── page.tsx          # Admin dashboard with tabs
│   └── dashboard/
│       └── page.tsx               # Regular user dashboard
├── components/
│   ├── admin/
│   │   ├── MediaView.tsx          # Media grid component
│   │   └── UsersView.tsx          # Users list component
│   └── ui/                        # shadcn/ui components
│       ├── tabs.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       └── button.tsx
└── middleware.ts                  # Updated with admin route protection
```

## Features

### Media View
- Displays videos in a responsive grid (1 column on mobile, 2 on tablet, 3 on desktop)
- Each video card shows:
  - Thumbnail image (placeholder for now)
  - Title and description
  - Duration (formatted as MM:SS)
  - File size (in MB)
  - Time since upload (e.g., "2 hours ago")
- Empty state message when no videos exist

### Users View
- Lists all users with their profiles
- Shows for each user:
  - Email address
  - User ID (truncated)
  - Role badge (Admin or User)
  - Join date
  - Last updated date
- Color-coded role badges (indigo for admin, gray for user)
- Responsive card layout
- Summary badges showing total users and admins

## Database Schema

### Videos Table

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
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

### Mock Data

The migration includes 5 mock videos:
1. Welcome to Disney AI Plus (3 min, 45 MB)
2. AI-Powered Video Editing Tutorial (7 min, 98 MB)
3. Character Animation Showcase (4:05 min, 67 MB)
4. Behind the Scenes: Magic Kingdom (10 min, 156 MB)
5. Advanced Effects Workshop (14:50 min, 234 MB)

## Next Steps

To add video upload functionality:

1. Set up Supabase Storage bucket for videos and thumbnails
2. Create upload form component
3. Implement file upload to Supabase Storage
4. Insert video metadata into the videos table
5. Add video player functionality
6. Implement video deletion and editing

## Security

The admin dashboard is protected by:
- **Middleware**: Checks authentication and role before allowing access
- **Server-side validation**: Page components verify admin role
- **RLS Policies**: Database-level security for videos table
- **Automatic redirects**: Non-admin users are redirected away from admin routes

## Troubleshooting

### "No videos found" message
- Ensure you've run the migration SQL that inserts the 5 mock videos
- Check the Supabase Table Editor to verify videos exist

### Can't access admin dashboard
- Verify your user has `role = 'admin'` in the profiles table
- Check the browser console for any errors
- Ensure environment variables are set correctly

### Thumbnails not loading
- The mock data uses placeholder images from placehold.co
- Replace with real thumbnail URLs when uploading actual videos

## UI Components

This implementation uses shadcn/ui, a collection of re-usable components built with Radix UI and Tailwind CSS:
- Components are located in `src/components/ui/`
- Fully customizable and accessible
- Dark mode support included
