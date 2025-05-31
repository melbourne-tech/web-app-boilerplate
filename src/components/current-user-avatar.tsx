import { useMemo } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { useUser } from '~/lib/app-context'

export const CurrentUserAvatar = () => {
  const user = useUser()
  const profileImage = user?.user_metadata.avatar_url ?? null
  const name = (user?.user_metadata.full_name as string | undefined) ?? '?'
  const initials = useMemo(
    () =>
      name
        ?.split(' ')
        ?.map((word) => word[0])
        ?.join('')
        ?.toUpperCase(),
    [name]
  )

  return (
    <Avatar>
      {profileImage && <AvatarImage src={profileImage} alt={initials} />}
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}
