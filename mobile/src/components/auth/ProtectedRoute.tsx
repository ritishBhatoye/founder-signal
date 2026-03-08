/**
 * Protected Route Component
 * Redirects to sign-in if user is not authenticated
 */

import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Text } from '@/components/atoms'
import { colors } from '@/constants/theme'
import { useAuthContext } from '@/contexts'

import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  fallback?: ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/auth/sign-in')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      fallback || (
        <SafeAreaView className="flex-1" style={{ backgroundColor: colors.bg }}>
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color={colors.primary[500]} />
            <Text style={{ color: colors.textMuted }} className="mt-4 text-base">
              Loading...
            </Text>
          </View>
        </SafeAreaView>
      )
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return <>{children}</>
}
