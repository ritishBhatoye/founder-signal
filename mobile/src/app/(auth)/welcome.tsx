import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/atoms";

const { width } = Dimensions.get("window");

export default function WelcomeScreen() {
  return (
    <View className="flex-1 bg-neutral-950">
      <StatusBar barStyle="light-content" />

      {/* Background Glow Effect */}
      <View
        className="absolute top-[-100] right-[-100] w-[400] h-[400] rounded-full bg-primary-600/20 blur-3xl"
        style={{ opacity: 0.5 }}
      />
      <View
        className="absolute bottom-[-50] left-[-50] w-[300] h-[300] rounded-full bg-tertiary-600/10 blur-3xl"
        style={{ opacity: 0.3 }}
      />

      <SafeAreaView className="flex-1 justify-between px-6 py-8">
        {/* Top Section: Logo & Brand */}
        <View className="items-center pt-8">
          <View className="mb-6 h-20 w-20 items-center justify-center rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl">
            <LinearGradient
              colors={["#6366F1", "#A855F7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="h-12 w-12 items-center justify-center rounded-2xl"
            >
              <Ionicons name="stats-chart" size={28} color="white" />
            </LinearGradient>
          </View>
          <Text className="text-white text-4xl font-bold tracking-tight">
            FounderSignal
          </Text>
          <Text className="text-neutral-400 text-lg mt-2 text-center px-4">
            Master your SaaS metrics.{"\n"}Signal your next big move.
          </Text>
        </View>

        {/* Middle Section: Visual/Hero */}
        <View className="items-center justify-center py-10">
          <View className="w-full h-64 bg-neutral-900/50 rounded-[40px] border border-neutral-800 overflow-hidden relative">
            <LinearGradient
              colors={["transparent", "rgba(99, 102, 241, 0.1)", "transparent"]}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
            {/* Mock Chart/Metric Visual */}
            <View className="flex-1 justify-center items-center">
              <View className="flex-row items-end gap-2">
                {[40, 70, 45, 90, 65, 80, 55].map((height, i) => (
                  <View
                    key={i}
                    className="w-4 bg-primary-500 rounded-t-lg"
                    style={{ height: height, opacity: 0.3 + i * 0.1 }}
                  />
                ))}
              </View>
              <View className="mt-6 items-center">
                <Text className="text-primary-400 text-3xl font-bold">
                  $124,500
                </Text>
                <Text className="text-neutral-500 font-medium">
                  Monthly Recurring Revenue
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Section: Actions */}
        <View className="gap-4">
          <Button
            label="Get Started"
            onPress={() => router.push("/(auth)/register")}
            className="bg-primary-600 border-0 h-16 rounded-2xl"
            labelClassName="text-lg font-bold"
            width="full"
          />

          <Pressable
            onPress={() => router.push("/(auth)/sign-in")}
            className="h-16 items-center justify-center"
          >
            <Text className="text-white text-lg font-semibold">
              Already have an account?{" "}
              <Text className="text-primary-400">Sign In</Text>
            </Text>
          </Pressable>

          <View className="flex-row items-center gap-4 my-2">
            <View className="flex-1 h-[1px] bg-neutral-800" />
            <Text className="text-neutral-500 font-medium">or join with</Text>
            <View className="flex-1 h-[1px] bg-neutral-800" />
          </View>

          <View className="flex-row gap-4">
            <Pressable
              className="flex-1 h-16 flex-row items-center justify-center gap-3 bg-neutral-900 border border-neutral-800 rounded-2xl"
              style={{ elevation: 2 }}
            >
              <Ionicons name="logo-google" size={24} color="white" />
              <Text className="text-white font-bold text-base">Google</Text>
            </Pressable>
            <Pressable
              className="flex-1 h-16 flex-row items-center justify-center gap-3 bg-neutral-900 border border-neutral-800 rounded-2xl"
              style={{ elevation: 2 }}
            >
              <Ionicons name="logo-apple" size={24} color="white" />
              <Text className="text-white font-bold text-base">Apple</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
