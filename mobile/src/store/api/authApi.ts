import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

import { supabase } from '@/lib/supabase'

import type { AuthUser, AuthSession } from '@/hooks/auth/types'

export interface SignInRequest {
  email: string
  password?: string
}

export interface SignUpRequest {
  email: string
  password?: string
  options?: {
    data?: Record<string, any>
    emailRedirectTo?: string
  }
}

export interface AuthResponse {
  user: AuthUser | null
  session: AuthSession | null
  error?: { message: string } | null
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['User', 'Session'],
  endpoints: (builder) => ({
    // Sign in with email/password
    signInWithEmail: builder.mutation<AuthResponse, SignInRequest>({
      queryFn: async ({ email, password }) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password: password || '',
          })

          if (error) {
            return { error: { message: error.message } }
          }

          return {
            data: {
              user: data.user ? (data.user as AuthUser) : null,
              session: data.session ? (data.session as AuthSession) : null,
              error: null,
            },
          }
        } catch (error) {
          return {
            error: {
              message: error instanceof Error ? error.message : 'Sign in failed',
            },
          }
        }
      },
      invalidatesTags: ['User', 'Session'],
    }),

    // Sign in with magic link (OTP)
    signInWithMagicLink: builder.mutation<
      AuthResponse,
      { email: string; redirectTo?: string }
    >({
      queryFn: async ({ email, redirectTo }) => {
        try {
          const { data, error } = await supabase.auth.signInWithOtp({
            email,
            options: {
              emailRedirectTo: redirectTo,
            },
          })

          if (error) {
            return { error: { message: error.message } }
          }

          return {
            data: {
              user: data.user ? (data.user as AuthUser) : null,
              session: data.session ? (data.session as AuthSession) : null,
              error: null,
            },
          }
        } catch (error) {
          return {
            error: {
              message: error instanceof Error ? error.message : 'Magic link failed',
            },
          }
        }
      },
      invalidatesTags: ['User', 'Session'],
    }),

    // Sign up with email
    signUpWithEmail: builder.mutation<AuthResponse, SignUpRequest>({
      queryFn: async ({ email, password, options }) => {
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password: password || '',
            options,
          })

          if (error) {
            return { error: { message: error.message } }
          }

          return {
            data: {
              user: data.user ? (data.user as AuthUser) : null,
              session: data.session ? (data.session as AuthSession) : null,
              error: null,
            },
          }
        } catch (error) {
          return {
            error: {
              message: error instanceof Error ? error.message : 'Sign up failed',
            },
          }
        }
      },
      invalidatesTags: ['User', 'Session'],
    }),

    // Reset password
    resetPassword: builder.mutation<
      { error?: { message: string } | null },
      { email: string; redirectTo?: string }
    >({
      queryFn: async ({ email, redirectTo }) => {
        try {
          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo,
          })

          if (error) {
            return { error: { message: error.message } }
          }

          return { data: { error: null } }
        } catch (error) {
          return {
            error: {
              message: error instanceof Error ? error.message : 'Reset password failed',
            },
          }
        }
      },
    }),

    // Sign out
    signOut: builder.mutation<{ error?: { message: string } | null }, void>({
      queryFn: async () => {
        try {
          const { error } = await supabase.auth.signOut()

          if (error) {
            return { error: { message: error.message } }
          }

          return { data: { error: null } }
        } catch (error) {
          return {
            error: {
              message: error instanceof Error ? error.message : 'Sign out failed',
            },
          }
        }
      },
      invalidatesTags: ['User', 'Session'],
    }),

    // Get current user
    getCurrentUser: builder.query<
      { user: AuthUser | null; error?: { message: string } | null },
      void
    >({
      queryFn: async () => {
        try {
          const { data, error } = await supabase.auth.getUser()

          if (error) {
            return { error: { message: error.message } }
          }

          return {
            data: {
              user: data.user ? (data.user as AuthUser) : null,
              error: null,
            },
          }
        } catch (error) {
          return {
            error: {
              message: error instanceof Error ? error.message : 'Failed to get user',
            },
          }
        }
      },
      providesTags: ['User'],
    }),

    // Get current session
    getCurrentSession: builder.query<AuthResponse, void>({
      queryFn: async () => {
        try {
          const { data, error } = await supabase.auth.getSession()

          if (error) {
            return { error: { message: error.message } }
          }

          return {
            data: {
              user: data.session?.user ? (data.session.user as AuthUser) : null,
              session: data.session ? (data.session as AuthSession) : null,
              error: null,
            },
          }
        } catch (error) {
          return {
            error: {
              message: error instanceof Error ? error.message : 'Failed to get session',
            },
          }
        }
      },
      providesTags: ['Session'],
    }),
  }),
})

export const {
  useSignInWithEmailMutation,
  useSignInWithMagicLinkMutation,
  useSignUpWithEmailMutation,
  useResetPasswordMutation,
  useSignOutMutation,
  useGetCurrentUserQuery,
  useGetCurrentSessionQuery,
} = authApi
