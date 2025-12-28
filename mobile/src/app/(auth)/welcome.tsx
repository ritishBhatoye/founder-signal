import { router } from "expo-router";
import React from "react";
import { View, Text, Pressable, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  return (
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />

      {/* Animated Background Gradients */}
      <LinearGradient
        colors={["#0a0a0a", "#1a1a2e", "#16213e"]}
        className="absolute inset-0"
      />

      {/* Floating Gradient Orbs */}
      <View className="absolute inset-0">
        <LinearGradient
          colors={["#6366F1", "#8B5CF6", "#EC4899"]}
          className="absolute top-32 right-8 w-40 h-40 rounded-full opacity-20 blur-3xl"
        />
        <LinearGradient
          colors={["#10B981", "#06B6D4", "#3B82F6"]}
          className="absolute top-64 left-4 w-32 h-32 rounded-full opacity-15 blur-2xl"
        />
        <LinearGradient
          colors={["#F59E0B", "#EF4444", "#EC4899"]}
          className="absolute bottom-48 right-12 w-36 h-36 rounded-full opacity-10 blur-3xl"
        />
      </View>

      <SafeAreaView className="flex-1 px-6">
        {/* Header with Logo */}
        <View className="items-center mt-16 mb-12">
          <View
            className="h-20 w-20 rounded-3xl items-center justify-center mb-6"
            style={{
              backgroundColor: "rgba(99, 102, 241, 0.2)",
              borderWidth: 1,
              borderColor: "rgba(99, 102, 241, 0.3)",
            }}
          >
            <Ionicons name="rocket-outline" size={36} color="#6366F1" />
          </View>
          <Text className="text-white text-4xl font-bold text-center mb-3">
            FounderOps
          </Text>
          <Text className="text-neutral-400 text-lg text-center leading-7">
            Track, analyze, and optimize{"\n"}your SaaS business growth
          </Text>
        </View>

        {/* Feature Highlights */}
        <View className="flex-1 justify-center">
          <View className="gap-6 mb-12">
            <View className="flex-row items-center gap-4">
              <View
                className="h-12 w-12 rounded-2xl items-center justify-center"
                style={{
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                  borderWidth: 1,
                  borderColor: "rgba(16, 185, 129, 0.3)",
                }}
              >
                <Ionicons name="analytics-outline" size={24} color="#10B981" />
              </View>
              <View className="flex-1">
                <Text className="text-white text-lg font-semibold mb-1">
                  Real-time Analytics
                </Text>
                <Text className="text-neutral-400 text-base">
                  Monitor your key metrics and growth trends
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-4">
              <View
                className="h-12 w-12 rounded-2xl items-center justify-center"
                style={{
                  backgroundColor: "rgba(139, 92, 246, 0.2)",
                  borderWidth: 1,
                  borderColor: "rgba(139, 92, 246, 0.3)",
                }}
              >
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="#8B5CF6"
                />
              </View>
              <View className="flex-1">
                <Text className="text-white text-lg font-semibold mb-1">
                  Smart Alerts
                </Text>
                <Text className="text-neutral-400 text-base">
                  Get notified about important changes instantly
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-4">
              <View
                className="h-12 w-12 rounded-2xl items-center justify-center"
                style={{
                  backgroundColor: "rgba(236, 72, 153, 0.2)",
                  borderWidth: 1,
                  borderColor: "rgba(236, 72, 153, 0.3)",
                }}
              >
                <Ionicons
                  name="trending-up-outline"
                  size={24}
                  color="#EC4899"
                />
              </View>
              <View className="flex-1">
                <Text className="text-white text-lg font-semibold mb-1">
                  Growth Insights
                </Text>
                <Text className="text-neutral-400 text-base">
                  Discover opportunities to scale your business
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="gap-4 mb-8">
          {/* Create Account Button */}
          <Pressable
            onPress={() => router.push("/(auth)/register")}
            className="h-16 rounded-2xl items-center justify-center"
          >
            <LinearGradient
              colors={["#10B981", "#22C55E"]}
              className="h-16 rounded-2xl items-center justify-center w-full flex-row gap-3"
            >
              <Ionicons name="mail-outline" size={20} color="white" />
              <Text className="text-white text-lg font-bold">
                Sign In with Email
              </Text>
            </LinearGradient>
          </Pressable>

          {/* Divider */}
          <View className="flex-row items-center my-2">
            <View className="flex-1 h-px bg-neutral-800" />
            <Text className="text-neutral-500 text-sm mx-4 font-medium">
              or
            </Text>
            <View className="flex-1 h-px bg-neutral-800" />
          </View>

          {/* Social Sign In Options */}
          <View className="flex-row gap-4">
            <Pressable
              onPress={() => router.push("/(auth)/sign-in")}
              className="flex-1 h-14 rounded-2xl items-center justify-center flex-row gap-3"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <Ionicons name="logo-apple" size={20} color="white" />
              <Text className="text-white text-base font-medium">Apple</Text>
            </Pressable>

            <Pressable
              onPress={() => router.push("/(auth)/sign-in")}
              className="flex-1 h-14 rounded-2xl items-center justify-center flex-row gap-3"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <Ionicons name="logo-google" size={20} color="white" />
              <Text className="text-white text-base font-medium">Google</Text>
            </Pressable>
          </View>

          {/* Sign In Link */}
          <View className="items-center mt-6">
            <Pressable onPress={() => router.push("/(auth)/sign-in")}>
              <Text className="text-neutral-400 text-base">
                Already have an account?{" "}
                <Text className="text-primary-400 font-semibold">Sign In</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
