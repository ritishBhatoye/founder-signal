import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React from 'react'
import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import SignInForm from '@/components/auth/SignInForm'
import { useSignIn } from '@/hooks/auth'
import { showToast } from '@/utils/toast'

export default function SignInScreen() {
  const { signInWithPassword, signInWithMagicLink, isLoading } = useSignIn()

  const handleSignIn = async (values: SignInFormTypes) => {
    if (!values.email || !values.password) {
      showToast.warning('Missing Fields', 'Please fill in all fields')
      return
    }

    const result = await signInWithPassword(values.email, values.password)

    if (result.error) {
      showToast.error('Sign In Failed', result.error)
      return
    }

    if (result.success) {
      showToast.success('Welcome Back!', 'Successfully signed in')
      router.replace('/(tabs)/index')
    }
  }

  const handleMagicLinkSignIn = async (email: string) => {
    if (!email) {
      showToast.warning('Email Required', 'Please enter your email address')
      return
    }

    const result = await signInWithMagicLink(email)

    if (result.error) {
      showToast.error('Magic Link Failed', result.error)
      return
    }

    if (result.success) {
      showToast.success('Check Your Email', result.message || 'Magic link sent!')
    }
  }

  const handleSocialSignIn = async (provider: 'google' | 'apple') => {
    try {
      showToast.info('Coming Soon', `${provider} sign-in will be available soon`)
    } catch {
      showToast.error('Error', 'An unexpected error occurred')
    }
  }

  return (
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />

      {/* Animated Background Gradients */}
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={{ position: 'absolute', inset: 0 }}
      />

      {/* Floating Gradient Orbs */}
      <View className="absolute inset-0">
        <LinearGradient
          colors={['#6366F1', '#8B5CF6', '#EC4899']}
          className="absolute right-10 top-20 h-32 w-32 rounded-full opacity-20 blur-3xl"
        />
        <LinearGradient
          colors={['#10B981', '#06B6D4', '#3B82F6']}
          className="absolute left-8 top-40 h-24 w-24 rounded-full opacity-15 blur-2xl"
        />
        <LinearGradient
          colors={['#F59E0B', '#EF4444', '#EC4899']}
          className="absolute bottom-32 right-16 h-28 w-28 rounded-full opacity-10 blur-3xl"
        />
      </View>

      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          {/* Header */}
          <View className="mb-12 mt-4 flex-row items-center justify-between px-5">
            <Pressable
              onPress={() => router.back()}
              className="h-12 w-12 items-center justify-center rounded-2xl"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </Pressable>

            <View className="items-center">
              <View
                className="mb-2 h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: 'rgba(99, 102, 241, 0.2)',
                  borderWidth: 1,
                  borderColor: 'rgba(99, 102, 241, 0.3)',
                }}
              >
                <Ionicons name="log-in-outline" size={24} color="#6366F1" />
              </View>
            </View>

            <View className="w-12" />
          </View>
          <ScrollView
            className="flex-1"
            contentContainerClassName="px-10 pb-7"
            showsVerticalScrollIndicator={false}
          >
            {/* Welcome Section */}
            <View className="mb-12 items-center">
              <Text className="mb-2 text-sm font-medium uppercase tracking-widest text-neutral-400">
                WELCOME
              </Text>
              <Text className="mb-3 text-center text-3xl font-bold text-white">
                Log In Again
              </Text>
              <Text className="text-center text-base leading-6 text-neutral-400">
                Enter your credentials to access{'\n'}your founder dashboard
              </Text>
            </View>

            <BlurView
              intensity={20}
              tint="dark"
              className="mb-8 overflow-hidden rounded-3xl"
            >
              <View
                className="p-6"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <SignInForm
                  isLoading={isLoading}
                  onSubmit={handleSignIn}
                  onMagicLinkSignIn={handleMagicLinkSignIn}
                  onSocialSignIn={handleSocialSignIn}
                />
              </View>
            </BlurView>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  )
}
