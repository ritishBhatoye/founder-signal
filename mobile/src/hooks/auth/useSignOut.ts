/**
 * Sign Out Hook using Redux Toolkit
 */

import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { useSignOutMutation } from '@/store/api/authApi'
import { clearAuth, setError } from '@/store/slices/authSlice'

export function useSignOut() {
  const dispatch = useDispatch()
  const [signOutMutation] = useSignOutMutation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setErrorState] = useState<string | null>(null)

  const signOut = useCallback(async (): Promise<{
    success: boolean
    error?: string
  }> => {
    try {
      setIsLoading(true)
      setErrorState(null)

      const result = await signOutMutation().unwrap()

      if (result.error) {
        setErrorState(result.error.message)
        dispatch(setError(result.error.message))
        return { success: false, error: result.error.message }
      }

      // Clear Redux auth state
      dispatch(clearAuth())

      return { success: true }
    } catch (err: any) {
      const errorMessage = err?.data?.message || err?.message || 'Sign out failed'
      setErrorState(errorMessage)
      dispatch(setError(errorMessage))
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }, [signOutMutation, dispatch])

  const clearError = useCallback(() => {
    setErrorState(null)
    dispatch(setError(null))
  }, [dispatch])

  return {
    signOut,
    isLoading,
    error,
    clearError,
  }
}
