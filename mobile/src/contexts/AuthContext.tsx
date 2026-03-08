/**
 * Authentication Context Provider using Redux
 */

import React from 'react'
import { Provider } from 'react-redux'

import { store } from '@/store'

import type { ReactNode } from 'react'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  return <Provider store={store}>{children}</Provider>
}

// For backward compatibility, export useAuth hook
export { useAuth as useAuthContext } from '@/hooks/auth/useAuth'
