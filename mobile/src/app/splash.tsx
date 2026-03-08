import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useRef } from 'react'
import { Animated, Text, View } from 'react-native'

export default function SplashScreen() {
  const router = useRouter()

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.3)).current
  const rotateAnim = useRef(new Animated.Value(0)).current
  const pulseAnim = useRef(new Animated.Value(1)).current
  const slideUpAnim = useRef(new Animated.Value(50)).current

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      // Logo appears with scale and fade
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // Rotate animation
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Text slides up
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()

    // Pulse animation loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start()

    // Navigate after 3 seconds
    const timer = setTimeout(() => {
      router.replace('/(onboarding)')
    }, 3500)

    return () => clearTimeout(timer)
  }, [fadeAnim, scaleAnim, rotateAnim, slideUpAnim, pulseAnim, router])

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <LinearGradient
        colors={['#2563EB', '#1D4ED8', '#1E40AF']}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Animated Background Circles */}
        <Animated.View
          style={{
            transform: [{ scale: pulseAnim }],
          }}
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10"
        />
        <Animated.View
          style={{
            transform: [{ scale: pulseAnim }],
          }}
          className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-white/10"
        />

        {/* Main Content */}
        <View className="flex-1 items-center justify-center">
          {/* Logo Container */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }, { rotate: spin }],
            }}
            className="mb-8"
          >
            <View className="h-32 w-32 items-center justify-center rounded-3xl bg-white/20 shadow-2xl backdrop-blur-xl">
              <View className="h-28 w-28 items-center justify-center rounded-3xl bg-white/30">
                <Text className="text-7xl">📊</Text>
              </View>
            </View>
          </Animated.View>

          {/* App Name & Tagline */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }],
            }}
            className="items-center"
          >
            <Text className="mb-3 text-5xl font-bold tracking-wider text-white">
              FounderOps
            </Text>
            <Text className="text-lg tracking-wide text-white/90">
              See the truth in 60 seconds
            </Text>
          </Animated.View>

          {/* Loading Indicator */}
          <Animated.View
            style={{
              opacity: fadeAnim,
            }}
            className="absolute bottom-20"
          >
            <View className="flex-row gap-2">
              {[0, 1, 2].map((index) => (
                <Animated.View
                  key={index}
                  style={{
                    transform: [
                      {
                        scale: pulseAnim.interpolate({
                          inputRange: [1, 1.1],
                          outputRange: [1, 1.5],
                        }),
                      },
                    ],
                  }}
                  className="h-2 w-2 rounded-full bg-white/80"
                />
              ))}
            </View>
          </Animated.View>
        </View>

        {/* Bottom Branding */}
        <Animated.View
          style={{
            opacity: fadeAnim,
          }}
          className="pb-8"
        >
          <Text className="text-center text-sm text-white/60">Powered by Innovation</Text>
        </Animated.View>
      </LinearGradient>
    </View>
  )
}
