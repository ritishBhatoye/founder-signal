import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { AuthInput } from "@/components/auth/AuthInput";
import { useResetPasswordMutation } from "@/store/api/authApi";
import { showToast } from "@/utils/toast";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [submitted, setSubmitted] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      showToast.warning("Email Required", "Please enter your email address");
      return;
    }

    try {
      const result = await resetPassword({ email }).unwrap();

      if (result.error) {
        showToast.error(
          "Reset Failed",
          result.error.message || "Failed to send reset link"
        );
        return;
      }

      setSubmitted(true);
      showToast.success(
        "Link Sent",
        "Check your email for password reset instructions"
      );
    } catch (error: any) {
      showToast.error(
        "Error",
        error?.data?.message || "An unexpected error occurred"
      );
    }
  };

  return (
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />

      {/* Animated Background Gradients */}
      <LinearGradient
        colors={["#1e1b4b", "#312e81", "#1e40af"]}
        className="absolute inset-0"
      />

      {/* Floating Gradient Orbs */}
      <View className="absolute inset-0">
        <LinearGradient
          colors={["#EC4899", "#F59E0B", "#EF4444"]}
          className="absolute top-24 left-8 w-32 h-32 rounded-full opacity-15 blur-3xl"
        />
        <LinearGradient
          colors={["#3B82F6", "#06B6D4", "#10B981"]}
          className="absolute bottom-32 right-12 w-28 h-28 rounded-full opacity-20 blur-2xl"
        />
      </View>

      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
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
            <View className="flex-row justify-between items-center mt-4 mb-12">
              <Pressable
                onPress={() => router.back()}
                className="h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.2)",
                }}
              >
                <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
              </Pressable>

              <View className="w-12" />
            </View>

            {!submitted ? (
              <>
                {/* Icon and Title Section */}
                <View className="items-center mb-12">
                  <View
                    className="h-20 w-20 rounded-3xl items-center justify-center mb-6"
                    style={{
                      backgroundColor: "rgba(99, 102, 241, 0.2)",
                      borderWidth: 1,
                      borderColor: "rgba(99, 102, 241, 0.3)",
                    }}
                  >
                    <Ionicons name="key-outline" size={32} color="#6366F1" />
                  </View>

                  <Text className="text-neutral-400 text-sm font-medium uppercase tracking-widest mb-2">
                    DON&apos;T WORRY
                  </Text>
                  <Text className="text-white text-3xl font-bold text-center mb-3">
                    Did you forget{"\n"}your password?
                  </Text>
                  <Text className="text-neutral-400 text-base text-center leading-6">
                    No worries, we&apos;ll send you{"\n"}reset instructions
                  </Text>
                </View>

                {/* Form Container with Glassmorphism */}
                <BlurView
                  intensity={20}
                  tint="dark"
                  className="rounded-3xl overflow-hidden mb-8"
                >
                  <View
                    className="p-6"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      borderWidth: 1,
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {/* Email Field */}
                    <View className="mb-6">
                      <Text className="text-neutral-300 text-sm font-medium mb-3 ml-1">
                        Email Address
                      </Text>
                      <View className="relative">
                        <View className="absolute left-4 top-4 z-10">
                          <Ionicons
                            name="mail-outline"
                            size={20}
                            color="#6B7280"
                          />
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
                      className="h-14 rounded-2xl items-center justify-center"
                    >
                      <LinearGradient
                        colors={["#6366F1", "#8B5CF6"]}
                        className="h-14 rounded-2xl items-center justify-center w-full"
                      >
                        <Text className="text-white text-base font-bold">
                          {isLoading ? "Sending..." : "Reset Password"}
                        </Text>
                      </LinearGradient>
                    </Pressable>
                  </View>
                </BlurView>
              </>
            ) : (
              <View className="items-center mt-12">
                {/* Success Icon */}
                <View
                  className="h-20 w-20 rounded-3xl items-center justify-center mb-8"
                  style={{
                    backgroundColor: "rgba(16, 185, 129, 0.2)",
                    borderWidth: 1,
                    borderColor: "rgba(16, 185, 129, 0.3)",
                  }}
                >
                  <Ionicons
                    name="mail-unread-outline"
                    size={32}
                    color="#10B981"
                  />
                </View>

                {/* Success Message */}
                <Text className="text-white text-3xl font-bold text-center mb-4">
                  Check your Email!
                </Text>
                <Text className="text-neutral-400 text-base text-center leading-6 mb-12">
                  We&apos;ve sent a password reset link to{"\n"}
                  <Text className="text-white font-semibold">{email}</Text>
                </Text>

                {/* Action Buttons */}
                <View className="w-full gap-4">
                  <Pressable
                    onPress={() => {}} // Could add logic to open mail app
                    className="h-14 rounded-2xl items-center justify-center"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderWidth: 1,
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <Text className="text-white text-base font-medium">
                      Open Email App
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => setSubmitted(false)}
                    className="h-12 items-center justify-center"
                  >
                    <Text className="text-neutral-400 text-base">
                      Didn&apos;t receive the email?{" "}
                      <Text className="text-primary-400 font-semibold">
                        Try again
                      </Text>
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}

            {/* Footer */}
            <View className="mt-auto pt-10 items-center">
              <Pressable onPress={() => router.replace("./sign-in")}>
                <Text className="text-neutral-400 text-base">
                  Back to{" "}
                  <Text className="text-primary-400 font-semibold">
                    Sign In
                  </Text>
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
