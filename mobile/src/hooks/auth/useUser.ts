/**
 * Hook for accessing current user data
 */

import { useState, useEffect } from 'react'

import type { AuthUser } from './types'

// TODO: Import from Supabase client when installed
// import { supabase } from '@/lib/supabase';

export function useUser() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getCurrentUser()

    // TODO: Set up auth state listener when Supabase is installed
    // const { data: { subscription } } = supabase.auth.onAuthStateChange(
    //   (event, session) => {
    //     setUser(session?.user || null);
    //     setIsLoading(false);
    //   }
    // );

    // return () => subscription.unsubscribe();
  }, [])

  const getCurrentUser = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // TODO: Replace with actual Supabase user fetch
      // const { data: { user }, error } = await supabase.auth.getUser();

      // Mock implementation
      const user = null
      const error = null

      if (error) {
        setError(error.message)
        setUser(null)
      } else {
        setUser(user)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get user')
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    user,
    isLoading,
    error,
    refetch: getCurrentUser,
  }
}
