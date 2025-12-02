-- Create subscriptions table
-- This table implements the 1-to-many relationship between users and subscriptions
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on user_id for faster queries (to support 1-to-many relationship)
CREATE INDEX IF NOT EXISTS subscriptions_user_id_idx ON public.subscriptions(user_id);

-- Create index on status for filtering queries
CREATE INDEX IF NOT EXISTS subscriptions_status_idx ON public.subscriptions(status);

-- Enable Row Level Security
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own subscriptions, admins can view all
CREATE POLICY "Users can view their own subscriptions, admins can view all"
  ON public.subscriptions
  FOR SELECT
  USING (
    auth.uid() = user_id
    OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Policy: Only authenticated users can insert subscriptions
CREATE POLICY "Authenticated users can insert subscriptions"
  ON public.subscriptions
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

-- Policy: Users can update their own subscriptions, admins can update any
CREATE POLICY "Users can update their own subscriptions, admins can update any"
  ON public.subscriptions
  FOR UPDATE
  USING (
    auth.uid() = user_id
    OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Policy: Users can delete their own subscriptions, admins can delete any
CREATE POLICY "Users can delete their own subscriptions, admins can delete any"
  ON public.subscriptions
  FOR DELETE
  USING (
    auth.uid() = user_id
    OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create trigger to automatically update updated_at
CREATE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Insert mock subscription data for testing
-- Note: Replace these UUIDs with actual user IDs from your auth.users table
INSERT INTO public.subscriptions (user_id, status, created_at)
SELECT
  id as user_id,
  CASE
    WHEN random() < 0.33 THEN 'active'
    WHEN random() < 0.66 THEN 'inactive'
    ELSE 'pending'
  END as status,
  NOW() - (random() * INTERVAL '30 days') as created_at
FROM auth.users
LIMIT 10
ON CONFLICT (id) DO NOTHING;
