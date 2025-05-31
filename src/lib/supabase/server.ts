import { createServerClient as _createServerClient } from '@supabase/ssr'
import { parseCookies, setCookie } from '@tanstack/react-start/server'

export function createServerClient() {
  const supabase = _createServerClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return Object.entries(parseCookies()).map(([name, value]) => ({
            name,
            value,
          }))
        },
        setAll(cookies) {
          cookies.forEach((cookie) => {
            setCookie(cookie.name, cookie.value)
          })
        },
      },
    }
  )

  // @ts-expect-error – we're validating the jwt secret in app/lib/auth/server.ts
  supabase.auth.suppressGetSessionWarning = true

  return supabase
}
