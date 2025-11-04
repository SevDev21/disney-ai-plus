import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Calendar } from 'lucide-react'

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

function formatDuration(seconds: number | null): string {
  if (!seconds) return 'Unknown'
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

function formatFileSize(bytes: number | null): string {
  if (!bytes) return 'Unknown'
  const mb = bytes / (1024 * 1024)
  return `${mb.toFixed(1)} MB`
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  const diffWeeks = Math.floor(diffMs / 604800000)

  if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`
  if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
  if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`
  return `${diffWeeks} ${diffWeeks === 1 ? 'week' : 'weeks'} ago`
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Media Library
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your uploaded videos and media content
          </p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {videoList.length} {videoList.length === 1 ? 'Video' : 'Videos'}
        </Badge>
      </div>

      {videoList.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No videos found. Upload your first video to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoList.map((video) => (
            <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative bg-gray-200 dark:bg-gray-700">
                <img
                  src={video.thumbnail_url}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                {video.region && (
                  <div className="absolute top-2 left-2">
                    <Badge
                      variant={video.region === 'USA' ? 'default' : 'secondary'}
                      className={
                        video.region === 'USA'
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : video.region === 'Asia'
                          ? 'bg-green-600 hover:bg-green-700'
                          : ''
                      }
                    >
                      {video.region}
                    </Badge>
                  </div>
                )}
                {video.duration && (
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDuration(video.duration)}
                  </div>
                )}
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-1">{video.title}</CardTitle>
                {video.description && (
                  <CardDescription className="line-clamp-2">
                    {video.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatTimeAgo(video.uploaded_at)}</span>
                  </div>
                  {video.file_size && (
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                      </svg>
                      <span>{formatFileSize(video.file_size)}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
