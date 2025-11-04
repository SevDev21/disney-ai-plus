import UserMediaView from '@/components/user/UserMediaView'

interface UserViewProps {
  userId: string
}

export default async function UserView({ userId }: UserViewProps) {
  return (
    <div className="space-y-6">
      <UserMediaView userId={userId} />
    </div>
  )
}
