/**
 * Hook for tracking authentication state changes
 */

import { useState, useEffect } from 'react'

import type { AuthUser, AuthSession } from './types'

// TODO: Import from Supabase client when installed
// import { supabase } from '@/lib/supabase';

type AuthEvent =
  | 'SIGNED_IN'
  | 'SIGNED_OUT'
  | 'TOKEN_REFRESHED'
  | 'USER_UPDATED'
  | 'PASSWORD_RECOVERY'

interface AuthStateChange {
  event: AuthEvent
  session: AuthSession | null
}

export function useAuthState() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [session, setSession] = useState<AuthSession | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [lastEvent, setLastEvent] = useState<AuthEvent | null>(null)

  useEffect(() => {
    // Get initial session
    getInitialSession()

    // TODO: Set up auth state listener when Supabase is installed
    // const { data: { subscription } } = supabase.auth.onAuthStateChange(
    //   (event, session) => {
    //     handleAuthStateChange({ event, session });
    //   }
    // );

    // return () => subscription.unsubscribe();
  }, [])

  const getInitialSession = async () => {
    try {
      // TODO: Replace with actual Supabase session check
      // const { data: { session } } = await supabase.auth.getSession();

      // Mock implementation
      const session = null

      handleAuthStateChange({
        event: session ? 'SIGNED_IN' : 'SIGNED_OUT',
        session,
      })
    } catch (err) {
      console.error('Failed to get initial session:', err)
      setIsLoading(false)
    }
  }

  const handleAuthStateChange = ({ event, session }: AuthStateChange) => {
    setLastEvent(event)
    setSession(session)
    setUser(session?.user || null)
    setIsAuthenticated(!!session)
    setIsLoading(false)

    // Log auth events for debugging
    console.log('Auth state changed:', { event, userId: session?.user?.id })
  }

  return {
    user,
    session,
    isAuthenticated,
    isLoading,
    lastEvent,
  }
}
