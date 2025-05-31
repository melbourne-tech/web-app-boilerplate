import { type EmailOtpType } from '@supabase/supabase-js'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import { createServerClient } from '~/lib/supabase/server'

export const APIRoute = createAPIFileRoute('/api/auth/confirm')({
  async GET({ request }) {
    const searchParams = new URL(request.url).searchParams

    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type') as EmailOtpType | null
    const next = (searchParams.get('next') ?? '/') as string

    if (
      typeof token_hash !== 'string' ||
      typeof type !== 'string' ||
      typeof next !== 'string' ||
      !next.startsWith('/')
    ) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: `/auth/error?error=${encodeURIComponent('No token hash or type')}`,
        },
      })
    }

    const supabase = createServerClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error) {
      // redirect user to specified redirect URL or root of app
      return new Response(null, {
        status: 302,
        headers: {
          Location: next,
        },
      })
    } else {
      // redirect the user to an error page with some instructions
      return new Response(null, {
        status: 302,
        headers: {
          Location: `/auth/error?error=${encodeURIComponent(error?.message || 'Authentication error')}`,
        },
      })
    }
  },
})
