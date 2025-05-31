import { createMiddleware } from '@tanstack/react-start'
import { getEvent } from '@tanstack/react-start/server'
import postgres from 'postgres'
import { createServerClient } from './lib/supabase/server'
import { getBindings } from './utils/cloudflare'

export const databaseClientMiddleware = createMiddleware().server(
  async ({ next }) => {
    const bindings = await getBindings()
    const sql = postgres(bindings.HYPERDRIVE.connectionString, {
      fetch_types: false,
      max: 5,
      prepare: false,
    })

    const result = await next({
      context: {
        sql,
      },
    })

    const event = getEvent()
    if (
      typeof event === 'object' &&
      event !== null &&
      'waitUntil' in event &&
      typeof event.waitUntil === 'function'
    ) {
      event.waitUntil(sql.end())
    } else {
      await sql.end()
    }

    return result
  }
)

export const supabaseClientMiddleware = createMiddleware().server(
  async ({ next }) => {
    const supabase = createServerClient()

    return next({
      context: {
        supabase,
      },
    })
  }
)
