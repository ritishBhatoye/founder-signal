/**
 * Main Authentication Hook using Redux Toolkit
 */

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { supabase } from '@/lib/supabase'
import { useGetCurrentSessionQuery } from '@/store/api/authApi'
import { setAuth, setLoading, clearAuth } from '@/store/slices/authSlice'

import { useSignIn } from './useSignIn'
import { useSignOut } from './useSignOut'

import type { RootState } from '@/store'

export function useAuth() {
  const dispatch = useDispatch()
  const authState = useSelector((state: RootState) => state.auth)
  const { data: sessionData, isLoading: sessionLoading } = useGetCurrentSessionQuery()
  const { signIn, signInWithMagicLink, signInWithPassword } = useSignIn()
  const { signOut } = useSignOut()

  // Initialize auth state and listen to changes
  useEffect(() => {
    // Set initial loading state
    dispatch(setLoading(true))

    // Listen to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id)

      if (session?.user) {
        dispatch(
          setAuth({
            user: session.user as any,
            session: session as any,
          }),
        )
      } else {
        dispatch(clearAuth())
      }

      dispatch(setLoading(false))
    })

    return () => subscription.unsubscribe()
  }, [dispatch])

  // Update state when session data changes
  useEffect(() => {
    if (sessionData && !sessionLoading) {
      if (sessionData.user && sessionData.session) {
        dispatch(
          setAuth({
            user: sessionData.user,
            session: sessionData.session,
          }),
        )
      } else {
        dispatch(clearAuth())
      }
      dispatch(setLoading(false))
    }
  }, [sessionData, sessionLoading, dispatch])

  const refreshSession = async () => {
    try {
      dispatch(setLoading(true))
      const { data, error } = await supabase.auth.refreshSession()

      if (error) {
        dispatch(clearAuth())
        return
      }

      if (data.session) {
        dispatch(
          setAuth({
            user: data.session.user as any,
            session: data.session as any,
          }),
        )
      }
    } catch (_err) {
      dispatch(clearAuth())
    } finally {
      dispatch(setLoading(false))
    }
  }

  return {
    ...authState,
    signIn,
    signInWithMagicLink,
    signInWithPassword,
    signOut,
    refreshSession,
  }
}
