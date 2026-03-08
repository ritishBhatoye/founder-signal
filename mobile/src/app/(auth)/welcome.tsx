import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React from 'react'
import { View, Text, Pressable, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function WelcomeScreen() {
  return (
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />

      {/* Animated Background Gradients */}
      <LinearGradient
        colors={['#0a0a0a', '#1a1a2e', '#16213e']}
        className="absolute inset-0"
      />

      {/* Floating Gradient Orbs */}
      <View className="absolute inset-0">
        <LinearGradient
          colors={['#6366F1', '#8B5CF6', '#EC4899']}
          className="absolute right-8 top-32 h-40 w-40 rounded-full opacity-20 blur-3xl"
        />
        <LinearGradient
          colors={['#10B981', '#06B6D4', '#3B82F6']}
          className="absolute left-4 top-64 h-32 w-32 rounded-full opacity-15 blur-2xl"
        />
        <LinearGradient
          colors={['#F59E0B', '#EF4444', '#EC4899']}
          className="absolute bottom-48 right-12 h-36 w-36 rounded-full opacity-10 blur-3xl"
        />
      </View>

      <SafeAreaView className="flex-1 px-6">
        {/* Header with Logo */}
        <View className="mb-12 mt-16 items-center">
          <View
            className="mb-6 h-20 w-20 items-center justify-center rounded-3xl"
            style={{
              backgroundColor: 'rgba(99, 102, 241, 0.2)',
              borderWidth: 1,
              borderColor: 'rgba(99, 102, 241, 0.3)',
            }}
          >
            <Ionicons name="rocket-outline" size={36} color="#6366F1" />
          </View>
          <Text className="mb-3 text-center text-4xl font-bold text-white">
            FounderOps
          </Text>
          <Text className="text-center text-lg leading-7 text-neutral-400">
            Track, analyze, and optimize{'\n'}your SaaS business growth
          </Text>
        </View>

        {/* Feature Highlights */}
        <View className="flex-1 justify-center">
          <View className="mb-12 gap-6">
            <View className="flex-row items-center gap-4">
              <View
                className="h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.2)',
                  borderWidth: 1,
                  borderColor: 'rgba(16, 185, 129, 0.3)',
                }}
              >
                <Ionicons name="analytics-outline" size={24} color="#10B981" />
              </View>
              <View className="flex-1">
                <Text className="mb-1 text-lg font-semibold text-white">
                  Real-time Analytics
                </Text>
                <Text className="text-base text-neutral-400">
                  Monitor your key metrics and growth trends
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-4">
              <View
                className="h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: 'rgba(139, 92, 246, 0.2)',
                  borderWidth: 1,
                  borderColor: 'rgba(139, 92, 246, 0.3)',
                }}
              >
                <Ionicons name="notifications-outline" size={24} color="#8B5CF6" />
              </View>
              <View className="flex-1">
                <Text className="mb-1 text-lg font-semibold text-white">
                  Smart Alerts
                </Text>
                <Text className="text-base text-neutral-400">
                  Get notified about important changes instantly
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-4">
              <View
                className="h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: 'rgba(236, 72, 153, 0.2)',
                  borderWidth: 1,
                  borderColor: 'rgba(236, 72, 153, 0.3)',
                }}
              >
                <Ionicons name="trending-up-outline" size={24} color="#EC4899" />
              </View>
              <View className="flex-1">
                <Text className="mb-1 text-lg font-semibold text-white">
                  Growth Insights
                </Text>
                <Text className="text-base text-neutral-400">
                  Discover opportunities to scale your business
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="mb-8 gap-4">
          {/* Create Account Button */}
          <Pressable
            onPress={() => router.push('/(auth)/register')}
            className="h-16 items-center justify-center rounded-2xl"
          >
            <LinearGradient
              colors={['#10B981', '#22C55E']}
              className="h-16 w-full flex-row items-center justify-center gap-3 rounded-2xl"
            >
              <Ionicons name="mail-outline" size={20} color="white" />
              <Text className="text-lg font-bold text-white">Sign In with Email</Text>
            </LinearGradient>
          </Pressable>

          {/* Divider */}
          <View className="my-2 flex-row items-center">
            <View className="h-px flex-1 bg-neutral-800" />
            <Text className="mx-4 text-sm font-medium text-neutral-500">or</Text>
            <View className="h-px flex-1 bg-neutral-800" />
          </View>

          {/* Social Sign In Options */}
          <View className="flex-row gap-4">
            <Pressable
              onPress={() => router.push('/(auth)/sign-in')}
              className="h-14 flex-1 flex-row items-center justify-center gap-3 rounded-2xl"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <Ionicons name="logo-apple" size={20} color="white" />
              <Text className="text-base font-medium text-white">Apple</Text>
            </Pressable>

            <Pressable
              onPress={() => router.push('/(auth)/sign-in')}
              className="h-14 flex-1 flex-row items-center justify-center gap-3 rounded-2xl"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <Ionicons name="logo-google" size={20} color="white" />
              <Text className="text-base font-medium text-white">Google</Text>
            </Pressable>
          </View>

          {/* Sign In Link */}
          <View className="mt-6 items-center">
            <Pressable onPress={() => router.push('/(auth)/sign-in')}>
              <Text className="text-base text-neutral-400">
                Already have an account?{' '}
                <Text className="font-semibold text-primary-400">Sign In</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}
