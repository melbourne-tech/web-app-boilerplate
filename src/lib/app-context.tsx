import type { Session } from '@supabase/supabase-js'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { createBrowserClient, SupabaseBrowserClient } from './supabase/client'
import type { SSRSafeSession } from './supabase/fetch-session'

const AppContext = createContext<{
  session: Session | SSRSafeSession | null
  supabaseBrowserClient: SupabaseBrowserClient
} | null>(null)

type AppContextProviderProps = {
  initialSession: Session | SSRSafeSession | null
}

export function AppContextProvider({
  children,
  initialSession,
}: PropsWithChildren<AppContextProviderProps>) {
  const [session, setSession] = useState<Session | SSRSafeSession | null>(
    initialSession
  )
  const [supabaseBrowserClient, setSupabaseBrowserClient] =
    useState<SupabaseBrowserClient>(() => createBrowserClient())

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseBrowserClient.auth.onAuthStateChange((event, session) => {
      if (event !== 'INITIAL_SESSION') {
        setSession(session)
      }
    })

    return subscription.unsubscribe
  }, [initialSession])

  const value = useMemo(
    () => ({ session, supabaseBrowserClient }),
    [session, supabaseBrowserClient]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider')
  }

  return context
}

export function useSupabaseBrowserClient() {
  const context = useAppContext()

  return context.supabaseBrowserClient
}

export function useSession() {
  const context = useAppContext()

  return context.session
}

export function useUser() {
  const session = useSession()

  return session?.user ?? null
}
