import { User } from '@supabase/supabase-js'

interface UserViewProps {
  user: User
}

export default function UserView({ user }: UserViewProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          User Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Welcome back! Here's your personalized dashboard.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">
              Your Projects
            </h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              12
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="text-sm font-semibold text-green-900 dark:text-green-300 mb-1">
              Tasks Completed
            </h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              45
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 text-left border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
              My Profile
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              View and edit your profile information
            </p>
          </button>

          <button className="p-4 text-left border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
              My Projects
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              View all your projects
            </p>
          </button>

          <button className="p-4 text-left border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
              Settings
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage your account settings
            </p>
          </button>

          <button className="p-4 text-left border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
              Help & Support
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get help and support
            </p>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Completed task: Design review
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                1 hour ago
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Started new project: Mobile App
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                3 hours ago
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Updated profile information
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Yesterday
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
        <p className="text-sm text-indigo-900 dark:text-indigo-300">
          <strong>Account Email:</strong> {user.email || 'Not available'}
        </p>
        <p className="text-sm text-indigo-900 dark:text-indigo-300">
          <strong>Member Since:</strong>{' '}
          {new Date(user.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
