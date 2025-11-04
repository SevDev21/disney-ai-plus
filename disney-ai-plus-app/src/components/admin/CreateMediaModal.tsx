'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface CreateMediaModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function CreateMediaModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateMediaModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail_url: '',
    video_url: '',
    duration: '',
    file_size: '',
    region: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          duration: formData.duration ? parseInt(formData.duration) : null,
          file_size: formData.file_size ? parseInt(formData.file_size) : null,
          region: formData.region || null,
          description: formData.description || null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create media')
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        thumbnail_url: '',
        video_url: '',
        duration: '',
        file_size: '',
        region: '',
      })

      onSuccess()
      onClose()
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open && !loading) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Media</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
              placeholder="Enter media title"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
              rows={3}
              placeholder="Enter media description (optional)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="thumbnail_url"
                className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
              >
                Thumbnail URL <span className="text-red-500">*</span>
              </label>
              <input
                id="thumbnail_url"
                type="url"
                name="thumbnail_url"
                value={formData.thumbnail_url}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                placeholder="https://example.com/thumbnail.jpg"
              />
            </div>

            <div>
              <label
                htmlFor="video_url"
                className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
              >
                Video URL <span className="text-red-500">*</span>
              </label>
              <input
                id="video_url"
                type="url"
                name="video_url"
                value={formData.video_url}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                placeholder="https://example.com/video.mp4"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
              >
                Duration (seconds)
              </label>
              <input
                id="duration"
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                placeholder="120"
              />
            </div>

            <div>
              <label
                htmlFor="file_size"
                className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
              >
                File Size (bytes)
              </label>
              <input
                id="file_size"
                type="number"
                name="file_size"
                value={formData.file_size}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                placeholder="1048576"
              />
            </div>

            <div>
              <label
                htmlFor="region"
                className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
              >
                Region
              </label>
              <input
                id="region"
                type="text"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                placeholder="US, EU, Asia, etc."
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onClose()}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Creating...' : 'Create Media'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
