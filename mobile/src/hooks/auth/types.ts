/**
 * Authentication types for FounderOps
 */

export interface AuthUser {
  id: string
  email: string
  email_confirmed_at?: string
  created_at: string
  updated_at: string
  user_metadata?: Record<string, any>
  app_metadata?: Record<string, any>
}

export interface AuthSession {
  access_token: string
  refresh_token: string
  expires_in: number
  expires_at?: number
  token_type: string
  user: AuthUser
}

export interface UserProfile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface StripeAccount {
  id: string
  user_id: string
  stripe_account_id: string
  access_token: string
  refresh_token?: string
  livemode: boolean
  scope?: string
  token_type: string
  stripe_user_id?: string
  stripe_publishable_key?: string
  created_at: string
  updated_at: string
}

export interface AuthState {
  user: AuthUser | null
  session: AuthSession | null
  profile: UserProfile | null
  stripeAccount: StripeAccount | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
}

export interface SignInOptions {
  email: string
  redirectTo?: string
}

export interface SignInResult {
  success: boolean
  error?: string
  message?: string
}
