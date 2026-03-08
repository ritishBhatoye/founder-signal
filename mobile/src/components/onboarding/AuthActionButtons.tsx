import { useRouter } from 'expo-router'
import { View } from 'react-native'

import Button from '@/components/atoms/Button'
import { useAuthContext } from '@/contexts'

export const AuthActionButtons = () => {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuthContext()

  const handleGetStarted = () => {
    if (isAuthenticated) {
      // User is signed in, go to Stripe connect
      router.push('/stripe-connect')
    } else {
      // User needs to sign in first
      router.push('/(auth)/sign-in')
    }
  }

  const handleSkip = () => {
    if (isAuthenticated) {
      // User is signed in, go to main app
      router.push('/(tabs)')
    } else {
      // Show demo mode or require sign in
      router.push('/(auth)/sign-in')
    }
  }

  return (
    <View className="w-full">
      <View className="gap-5 px-5">
        {/* Get Started Button */}
        <Button
          variant="primary"
          size="lg"
          width="full"
          onPress={handleGetStarted}
          disabled={isLoading}
          // className="bg-white active:bg-white/90 shadow-xl"
          label={isAuthenticated ? 'Connect Stripe & Start' : 'Sign In to Start'}
          labelClassName="text-primary-600 font-bold text-lg"
        />

        <Button
          variant="white"
          size="lg"
          width="full"
          onPress={handleSkip}
          disabled={isLoading}
          className="border-2 border-white/50 bg-white/10 active:bg-white/20"
          label={isAuthenticated ? 'Skip for Now' : 'Sign In'}
          labelClassName="text-white font-semibold text-lg"
        />
      </View>
    </View>
  )
}
