-- Create videos table
CREATE TABLE IF NOT EXISTS public.videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT NOT NULL,
  video_url TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  uploader_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  duration INTEGER, -- duration in seconds
  file_size BIGINT, -- file size in bytes
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on uploader_id for faster queries
CREATE INDEX IF NOT EXISTS videos_uploader_id_idx ON public.videos(uploader_id);

-- Create index on uploaded_at for sorting
CREATE INDEX IF NOT EXISTS videos_uploaded_at_idx ON public.videos(uploaded_at DESC);

-- Enable Row Level Security
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view videos
CREATE POLICY "Videos are viewable by everyone"
  ON public.videos
  FOR SELECT
  USING (true);

-- Policy: Only authenticated users can insert videos
CREATE POLICY "Authenticated users can insert videos"
  ON public.videos
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: Users can update their own videos, admins can update any video
CREATE POLICY "Users can update their own videos, admins can update any"
  ON public.videos
  FOR UPDATE
  USING (
    auth.uid() = uploader_id
    OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Policy: Users can delete their own videos, admins can delete any video
CREATE POLICY "Users can delete their own videos, admins can delete any"
  ON public.videos
  FOR DELETE
  USING (
    auth.uid() = uploader_id
    OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Insert mock video data
INSERT INTO public.videos (title, description, thumbnail_url, video_url, duration, file_size, uploaded_at)
VALUES
  (
    'Welcome to Disney AI Plus',
    'Introduction video showcasing the platform features and capabilities',
    'https://placehold.co/640x360/4f46e5/ffffff?text=Welcome+Video',
    'https://storage.example.com/videos/welcome.mp4',
    180, -- 3 minutes
    45000000, -- 45MB
    NOW() - INTERVAL '2 hours'
  ),
  (
    'AI-Powered Video Editing Tutorial',
    'Learn how to use our AI tools to enhance your video content',
    'https://placehold.co/640x360/7c3aed/ffffff?text=AI+Tutorial',
    'https://storage.example.com/videos/ai-tutorial.mp4',
    420, -- 7 minutes
    98000000, -- 98MB
    NOW() - INTERVAL '1 day'
  ),
  (
    'Character Animation Showcase',
    'Amazing character animations created with Disney AI Plus',
    'https://placehold.co/640x360/ec4899/ffffff?text=Animation+Showcase',
    'https://storage.example.com/videos/character-animation.mp4',
    245, -- 4 minutes 5 seconds
    67000000, -- 67MB
    NOW() - INTERVAL '3 days'
  ),
  (
    'Behind the Scenes: Magic Kingdom',
    'Exclusive behind-the-scenes footage from Magic Kingdom',
    'https://placehold.co/640x360/f59e0b/ffffff?text=Behind+the+Scenes',
    'https://storage.example.com/videos/magic-kingdom-bts.mp4',
    600, -- 10 minutes
    156000000, -- 156MB
    NOW() - INTERVAL '1 week'
  ),
  (
    'Advanced Effects Workshop',
    'Master advanced visual effects with this comprehensive workshop',
    'https://placehold.co/640x360/10b981/ffffff?text=Effects+Workshop',
    'https://storage.example.com/videos/effects-workshop.mp4',
    890, -- 14 minutes 50 seconds
    234000000, -- 234MB
    NOW() - INTERVAL '2 weeks'
  );

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER videos_updated_at
  BEFORE UPDATE ON public.videos
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
