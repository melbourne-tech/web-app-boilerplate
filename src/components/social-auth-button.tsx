import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { useSupabaseBrowserClient } from '~/lib/app-context'

interface SocialAuthButtonProps {
  redirectPath?: string
  onError?: (error: string) => void
}

export function SocialAuthButton({
  redirectPath = '/protected',
  onError,
}: SocialAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = useSupabaseBrowserClient()

  const handleSocialLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/oauth?next=${redirectPath}`,
        },
      })

      if (error) throw error
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred'
      onError?.(errorMessage)
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSocialLogin}>
      <Button
        type="submit"
        variant="outline"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Continue with Github'}
      </Button>
    </form>
  )
}
