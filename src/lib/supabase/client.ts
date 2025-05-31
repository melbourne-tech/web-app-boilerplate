import { createBrowserClient as _createBrowserClient } from '@supabase/ssr'

export function createBrowserClient() {
  return _createBrowserClient(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_ANON_KEY!
  )
}

export type SupabaseBrowserClient = ReturnType<typeof createBrowserClient>
