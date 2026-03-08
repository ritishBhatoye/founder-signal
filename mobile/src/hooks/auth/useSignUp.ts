/**
 * Sign Up Hook using Redux Toolkit
 */

import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { useSignUpWithEmailMutation } from '@/store/api/authApi'
import { setAuth, setError } from '@/store/slices/authSlice'

export interface SignUpOptions {
  email: string
  password: string
  options?: {
    data?: Record<string, any>
    emailRedirectTo?: string
  }
}

export interface SignUpResult {
  success: boolean
  error?: string
  message?: string
  needsEmailConfirmation?: boolean
}

export function useSignUp() {
  const dispatch = useDispatch()
  const [signUpWithEmailMutation] = useSignUpWithEmailMutation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setErrorState] = useState<string | null>(null)

  const signUp = useCallback(
    async (options: SignUpOptions): Promise<SignUpResult> => {
      try {
        setIsLoading(true)
        setErrorState(null)

        const { email, password, options: signUpOptions } = options

        // Validate inputs
        if (!email?.includes('@')) {
          const errorMsg = 'Please enter a valid email address'
          setErrorState(errorMsg)
          dispatch(setError(errorMsg))
          return { success: false, error: errorMsg }
        }

        if (!password || password.length < 6) {
          const errorMsg = 'Password must be at least 6 characters'
          setErrorState(errorMsg)
          dispatch(setError(errorMsg))
          return { success: false, error: errorMsg }
        }

        const result = await signUpWithEmailMutation({
          email,
          password,
          options: signUpOptions,
        }).unwrap()

        if (result.error) {
          setErrorState(result.error.message)
          dispatch(setError(result.error.message))
          return { success: false, error: result.error.message }
        }

        // Update Redux state if user is immediately available
        if (result.user && result.session) {
          dispatch(setAuth({ user: result.user, session: result.session }))
        }

        // Check if email confirmation is needed
        const needsEmailConfirmation = result.user && !result.user.email_confirmed_at

        return {
          success: true,
          message: needsEmailConfirmation
            ? 'Please check your email to confirm your account'
            : 'Account created successfully!',
          needsEmailConfirmation,
        }
      } catch (err: any) {
        const errorMessage = err?.data?.message || err?.message || 'Sign up failed'
        setErrorState(errorMessage)
        dispatch(setError(errorMessage))
        return { success: false, error: errorMessage }
      } finally {
        setIsLoading(false)
      }
    },
    [signUpWithEmailMutation, dispatch],
  )

  const clearError = useCallback(() => {
    setErrorState(null)
    dispatch(setError(null))
  }, [dispatch])

  return {
    signUp,
    isLoading,
    error,
    clearError,
  }
}
