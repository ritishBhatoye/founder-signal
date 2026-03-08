import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React, { useState } from 'react'
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

import { AuthInput } from '@/components/auth/AuthInput'
import { useResetPasswordMutation } from '@/store/api/authApi'
import { showToast } from '@/utils/toast'

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('')
  const [resetPassword, { isLoading }] = useResetPasswordMutation()
  const [submitted, setSubmitted] = useState(false)

  const handleResetPassword = async () => {
    if (!email) {
      showToast.warning('Email Required', 'Please enter your email address')
      return
    }

    try {
      const result = await resetPassword({ email }).unwrap()

      if (result.error) {
        showToast.error(
          'Reset Failed',
          result.error.message || 'Failed to send reset link',
        )
        return
      }

      setSubmitted(true)
      showToast.success('Link Sent', 'Check your email for password reset instructions')
    } catch (error: any) {
      showToast.error('Error', error?.data?.message || 'An unexpected error occurred')
    }
  }

  return (
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />

      {/* Animated Background Gradients */}
      <LinearGradient
        colors={['#1e1b4b', '#312e81', '#1e40af']}
        className="absolute inset-0"
      />

      {/* Floating Gradient Orbs */}
      <View className="absolute inset-0">
        <LinearGradient
          colors={['#EC4899', '#F59E0B', '#EF4444']}
          className="absolute left-8 top-24 h-32 w-32 rounded-full opacity-15 blur-3xl"
        />
        <LinearGradient
          colors={['#3B82F6', '#06B6D4', '#10B981']}
          className="absolute bottom-32 right-12 h-28 w-28 rounded-full opacity-20 blur-2xl"
        />
      </View>

      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView
            className="flex-1"
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: 24,
              paddingBottom: 40,
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View className="mb-12 mt-4 flex-row items-center justify-between">
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

              <View className="w-12" />
            </View>

            {!submitted ? (
              <>
                {/* Icon and Title Section */}
                <View className="mb-12 items-center">
                  <View
                    className="mb-6 h-20 w-20 items-center justify-center rounded-3xl"
                    style={{
                      backgroundColor: 'rgba(99, 102, 241, 0.2)',
                      borderWidth: 1,
                      borderColor: 'rgba(99, 102, 241, 0.3)',
                    }}
                  >
                    <Ionicons name="key-outline" size={32} color="#6366F1" />
                  </View>

                  <Text className="mb-2 text-sm font-medium uppercase tracking-widest text-neutral-400">
                    DON&apos;T WORRY
                  </Text>
                  <Text className="mb-3 text-center text-3xl font-bold text-white">
                    Did you forget{'\n'}your password?
                  </Text>
                  <Text className="text-center text-base leading-6 text-neutral-400">
                    No worries, we&apos;ll send you{'\n'}reset instructions
                  </Text>
                </View>

                {/* Form Container with Glassmorphism */}
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
                    {/* Email Field */}
                    <View className="mb-6">
                      <Text className="mb-3 ml-1 text-sm font-medium text-neutral-300">
                        Email Address
                      </Text>
                      <View className="relative">
                        <View className="absolute left-4 top-4 z-10">
                          <Ionicons name="mail-outline" size={20} color="#6B7280" />
                        </View>
                        <AuthInput
                          placeholder="name@company.com"
                          value={email}
                          onChangeText={setEmail}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          style={{
                            paddingLeft: 48,
                            paddingRight: 16,
                          }}
                        />
                      </View>
                    </View>

                    {/* Reset Button */}
                    <Pressable
                      onPress={handleResetPassword}
                      disabled={!email || isLoading}
                      className="h-14 items-center justify-center rounded-2xl"
                    >
                      <LinearGradient
                        colors={['#6366F1', '#8B5CF6']}
                        className="h-14 w-full items-center justify-center rounded-2xl"
                      >
                        <Text className="text-base font-bold text-white">
                          {isLoading ? 'Sending...' : 'Reset Password'}
                        </Text>
                      </LinearGradient>
                    </Pressable>
                  </View>
                </BlurView>
              </>
            ) : (
              <View className="mt-12 items-center">
                {/* Success Icon */}
                <View
                  className="mb-8 h-20 w-20 items-center justify-center rounded-3xl"
                  style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    borderWidth: 1,
                    borderColor: 'rgba(16, 185, 129, 0.3)',
                  }}
                >
                  <Ionicons name="mail-unread-outline" size={32} color="#10B981" />
                </View>

                {/* Success Message */}
                <Text className="mb-4 text-center text-3xl font-bold text-white">
                  Check your Email!
                </Text>
                <Text className="mb-12 text-center text-base leading-6 text-neutral-400">
                  We&apos;ve sent a password reset link to{'\n'}
                  <Text className="font-semibold text-white">{email}</Text>
                </Text>

                {/* Action Buttons */}
                <View className="w-full gap-4">
                  <Pressable
                    onPress={() => {}} // Could add logic to open mail app
                    className="h-14 items-center justify-center rounded-2xl"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderWidth: 1,
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    <Text className="text-base font-medium text-white">
                      Open Email App
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => setSubmitted(false)}
                    className="h-12 items-center justify-center"
                  >
                    <Text className="text-base text-neutral-400">
                      Didn&apos;t receive the email?{' '}
                      <Text className="font-semibold text-primary-400">Try again</Text>
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}

            {/* Footer */}
            <View className="mt-auto items-center pt-10">
              <Pressable onPress={() => router.replace('./sign-in')}>
                <Text className="text-base text-neutral-400">
                  Back to <Text className="font-semibold text-primary-400">Sign In</Text>
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  )
}
