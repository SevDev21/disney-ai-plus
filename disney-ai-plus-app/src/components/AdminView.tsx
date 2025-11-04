import { User } from '@supabase/supabase-js'

interface AdminViewProps {
  user: User
}

export default function AdminView({ user }: AdminViewProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Admin Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Welcome back, Administrator! You have full access to manage the system.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
            <h3 className="text-sm font-semibold text-indigo-900 dark:text-indigo-300 mb-1">
              Total Users
            </h3>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              1,234
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="text-sm font-semibold text-green-900 dark:text-green-300 mb-1">
              Active Sessions
            </h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              567
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-300 mb-1">
              System Health
            </h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              98%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Admin Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 text-left border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
              User Management
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              View and manage all user accounts
            </p>
          </button>

          <button className="p-4 text-left border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
              Analytics
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              View detailed system analytics
            </p>
          </button>

          <button className="p-4 text-left border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
              Settings
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Configure system settings
            </p>
          </button>

          <button className="p-4 text-left border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
              Reports
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Generate and view reports
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
                New user registered
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                2 minutes ago
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                System backup completed
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                1 hour ago
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Security update available
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                3 hours ago
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-900 dark:text-blue-300">
          <strong>User ID:</strong> {user.id}
        </p>
        <p className="text-sm text-blue-900 dark:text-blue-300">
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  )
}
