import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Mail, Calendar, Shield } from 'lucide-react'

interface Profile {
  id: string
  email: string
  role: string
  created_at: string
  updated_at: string
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default async function UsersView() {
  const supabase = await createClient()

  // Fetch all user profiles
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching profiles:', error)
  }

  const userList = (profiles || []) as Profile[]
  const adminCount = userList.filter(p => p.role === 'admin').length
  const userCount = userList.filter(p => p.role === 'user').length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            User Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View and manage all user accounts and permissions
          </p>
        </div>
        <div className="flex gap-3">
          <Badge variant="secondary" className="px-4 py-2">
            {userCount} {userCount === 1 ? 'User' : 'Users'}
          </Badge>
          <Badge variant="default" className="bg-indigo-600 px-4 py-2">
            {adminCount} {adminCount === 1 ? 'Admin' : 'Admins'}
          </Badge>
        </div>
      </div>

      {userList.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No users found.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {userList.map((profile) => (
            <Card key={profile.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                      {profile.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {profile.email}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                          ID: {profile.id.slice(0, 8)}...
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={profile.role === 'admin' ? 'default' : 'secondary'}
                    className={profile.role === 'admin' ? 'bg-indigo-600' : ''}
                  >
                    <Shield className="w-3 h-3 mr-1" />
                    {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <div>
                      <span className="font-medium">Joined:</span>{' '}
                      {formatDate(profile.created_at)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <div>
                      <span className="font-medium">Updated:</span>{' '}
                      {formatDate(profile.updated_at)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="16" y2="12" />
                <line x1="12" x2="12.01" y1="8" y2="8" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">
                User Management Actions
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-400">
                To modify user roles, edit, or delete users, run SQL commands in the Supabase dashboard
                or implement additional action buttons with proper authorization checks.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
