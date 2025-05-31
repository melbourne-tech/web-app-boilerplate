import type { Factor, Session, User } from '@supabase/supabase-js'
import { createServerFn } from '@tanstack/react-start'
import { jwtVerify } from 'jose'
import { supabaseClientMiddleware } from '~/middleware'

const SECRET = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET)

type SSRSafeUser = User & {
  factors: (Factor & { factor_type: 'phone' | 'totp' })[]
}

export type SSRSafeSession = Session & {
  user: SSRSafeUser
}

export const fetchSession: () => Promise<SSRSafeSession | null> =
  createServerFn({
    method: 'GET',
  })
    .middleware([supabaseClientMiddleware])
    .handler(async ({ context }) => {
      const {
        data: { session },
      } = await context.supabase.auth.getSession()
      if (!session) {
        return null
      }

      try {
        await jwtVerify(session.access_token, SECRET, {
          algorithms: ['HS256'],
        })

        return session as SSRSafeSession
      } catch {
        return null
      }
    })
