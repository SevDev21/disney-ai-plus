import { createClient } from '@/lib/supabase/server'
import MediaViewClient from './MediaViewClient'

interface Video {
  id: string
  title: string
  description: string | null
  thumbnail_url: string
  video_url: string
  uploaded_at: string
  duration: number | null
  file_size: number | null
  region: string | null
}

export default async function MediaView() {
  const supabase = await createClient()

  // Fetch all videos from the database
  const { data: videos, error } = await supabase
    .from('videos')
    .select('*')
    .order('uploaded_at', { ascending: false })

  if (error) {
    console.error('Error fetching videos:', error)
  }

  const videoList = (videos || []) as Video[]

  return <MediaViewClient initialVideos={videoList} />
}
