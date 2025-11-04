export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center" role="status" aria-live="polite">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" aria-hidden="true"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
      </div>
    </div>
  )
}
