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
import { Input } from "@/components/atoms";
import { useSignUp } from "@/hooks/auth/useSignUp";
import { showToast } from "@/utils/toast";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { signUp, isLoading } = useSignUp();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      showToast.warning("Missing Fields", "Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      showToast.warning(
        "Weak Password",
        "Password must be at least 6 characters"
      );
      return;
    }

    if (!agreeToTerms) {
      showToast.warning(
        "Terms Required",
        "Please agree to Terms & Privacy Policy"
      );
      return;
    }

    try {
      const result = await signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      });

      if (result.success) {
        if (result.needsEmailConfirmation) {
          showToast.info(
            "Verify Email",
            result.message || "Please check your email"
          );
          router.replace("./sign-in");
        } else {
          showToast.success(
            "Welcome!",
            result.message || "Account created successfully"
          );
          router.replace("/(tabs)");
        }
      } else {
        showToast.error(
          "Registration Failed",
          result.error || "Failed to create account"
        );
      }
    } catch (_err: any) {
      showToast.error("Error", _err?.message || "An unexpected error occurred");
    }
  };

  const handleSocialSignUp = async (provider: "google" | "apple") => {
    try {
      showToast.info(
        "Coming Soon",
        `${provider} sign-up will be available soon`
      );
    } catch {
      showToast.error("Error", "An unexpected error occurred");
    }
  };

  const isFormValid = name && email && password && agreeToTerms;

  return (
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />

      {/* Animated Background Gradients */}
      <LinearGradient
        colors={["#0f172a", "#1e293b", "#334155"]}
        className="absolute inset-0"
      />

      {/* Floating Gradient Orbs */}
      <View className="absolute inset-0">
        <LinearGradient
          colors={["#8B5CF6", "#EC4899", "#F59E0B"]}
          className="absolute top-16 right-12 w-36 h-36 rounded-full opacity-15 blur-3xl"
        />
        <LinearGradient
          colors={["#06B6D4", "#3B82F6", "#6366F1"]}
          className="absolute top-48 left-6 w-28 h-28 rounded-full opacity-20 blur-2xl"
        />
        <LinearGradient
          colors={["#10B981", "#22C55E", "#84CC16"]}
          className="absolute bottom-40 right-8 w-32 h-32 rounded-full opacity-12 blur-3xl"
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
            <View className="flex-row justify-between items-center mt-4 mb-10">
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

              <View className="items-center">
                <View
                  className="h-12 w-12 rounded-2xl items-center justify-center mb-2"
                  style={{
                    backgroundColor: "rgba(139, 92, 246, 0.2)",
                    borderWidth: 1,
                    borderColor: "rgba(139, 92, 246, 0.3)",
                  }}
                >
                  <Ionicons
                    name="person-add-outline"
                    size={24}
                    color="#8B5CF6"
                  />
                </View>
              </View>

              <View className="w-12" />
            </View>

            {/* Welcome Section */}
            <View className="items-center mb-10">
              <Text className="text-neutral-400 text-sm font-medium uppercase tracking-widest mb-2">
                HELLO
              </Text>
              <Text className="text-white text-3xl font-bold text-center mb-3">
                Sign Up Now
              </Text>
              <Text className="text-neutral-400 text-base text-center leading-6">
                Join the elite circle of{"\n"}SaaS founders
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
                {/* Full Name Field */}
                <View className="mb-5">
                  <Text className="text-neutral-300 text-sm font-medium mb-3 ml-1">
                    Full Name
                  </Text>
                  <View className="relative">
                    <View className="absolute left-4 top-4 z-10">
                      <Ionicons
                        name="person-outline"
                        size={20}
                        color="#6B7280"
                      />
                    </View>
                    <Input
                      placeholder="John Doe"
                      value={name}
                      onChangeText={setName}
                      className="h-14 rounded-2xl pl-12 pr-4 text-white border-0"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        borderWidth: 1,
                        borderColor: "rgba(255, 255, 255, 0.15)",
                      }}
                      placeholderTextColor="#6B7280"
                    />
                  </View>
                </View>

                {/* Email Field */}
                <View className="mb-5">
                  <Text className="text-neutral-300 text-sm font-medium mb-3 ml-1">
                    Email
                  </Text>
                  <View className="relative">
                    <View className="absolute left-4 top-4 z-10">
                      <Ionicons name="mail-outline" size={20} color="#6B7280" />
                    </View>
                    <Input
                      placeholder="canandoe@gmail.com"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      className="h-14 rounded-2xl pl-12 pr-4 text-white border-0"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        borderWidth: 1,
                        borderColor: "rgba(255, 255, 255, 0.15)",
                      }}
                      placeholderTextColor="#6B7280"
                    />
                  </View>
                </View>

                {/* Phone Field */}
                <View className="mb-5">
                  <Text className="text-neutral-300 text-sm font-medium mb-3 ml-1">
                    Phone
                  </Text>
                  <View className="relative">
                    <View className="absolute left-4 top-4 z-10">
                      <Ionicons name="call-outline" size={20} color="#6B7280" />
                    </View>
                    <Input
                      placeholder="Please enter your phone number"
                      value=""
                      onChangeText={() => {}}
                      keyboardType="phone-pad"
                      className="h-14 rounded-2xl pl-12 pr-4 text-white border-0"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        borderWidth: 1,
                        borderColor: "rgba(255, 255, 255, 0.15)",
                      }}
                      placeholderTextColor="#6B7280"
                    />
                  </View>
                </View>

                {/* Password Field */}
                <View className="mb-6">
                  <Text className="text-neutral-300 text-sm font-medium mb-3 ml-1">
                    Password
                  </Text>
                  <View className="relative">
                    <View className="absolute left-4 top-4 z-10">
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#6B7280"
                      />
                    </View>
                    <View className="absolute right-4 top-4 z-10">
                      <Ionicons
                        name="eye-off-outline"
                        size={20}
                        color="#6B7280"
                      />
                    </View>
                    <Input
                      placeholder="123456"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      className="h-14 rounded-2xl pl-12 pr-12 text-white border-0"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        borderWidth: 1,
                        borderColor: "rgba(255, 255, 255, 0.15)",
                      }}
                      placeholderTextColor="#6B7280"
                    />
                  </View>
                </View>

                {/* Terms Checkbox */}
                <View className="flex-row items-start gap-3 mb-6">
                  <Pressable
                    onPress={() => setAgreeToTerms(!agreeToTerms)}
                    className="mt-1"
                  >
                    <View
                      className={`h-5 w-5 rounded-lg items-center justify-center ${
                        agreeToTerms ? "bg-primary-600" : ""
                      }`}
                      style={{
                        backgroundColor: agreeToTerms
                          ? "#6366F1"
                          : "rgba(255, 255, 255, 0.08)",
                        borderWidth: 1,
                        borderColor: agreeToTerms
                          ? "#6366F1"
                          : "rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      {agreeToTerms && (
                        <Ionicons name="checkmark" size={14} color="white" />
                      )}
                    </View>
                  </Pressable>
                  <View className="flex-1">
                    <Text className="text-neutral-400 text-sm leading-5">
                      I will also accept these terms
                    </Text>
                    <Text className="text-primary-400 text-sm">
                      I accept the terms
                    </Text>
                  </View>
                </View>

                {/* Sign Up Button */}
                <Pressable
                  onPress={handleRegister}
                  disabled={!isFormValid || isLoading}
                  className="h-14 rounded-2xl items-center justify-center mb-4"
                >
                  <LinearGradient
                    colors={["#8B5CF6", "#EC4899"]}
                    className="h-14 rounded-2xl items-center justify-center w-full"
                  >
                    <Text className="text-white text-base font-bold">
                      {isLoading ? "Creating Account..." : "Get Started"}
                    </Text>
                  </LinearGradient>
                </Pressable>
              </View>
            </BlurView>

            {/* Social Sign Up */}
            <View className="mb-8">
              <View className="flex-row items-center mb-6">
                <View className="flex-1 h-px bg-neutral-800" />
                <Text className="text-neutral-500 text-sm mx-4 font-medium">
                  social sign up
                </Text>
                <View className="flex-1 h-px bg-neutral-800" />
              </View>

              <View className="flex-row gap-4">
                <Pressable
                  onPress={() => handleSocialSignUp("google")}
                  className="flex-1 h-14 rounded-2xl items-center justify-center flex-row gap-3"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderWidth: 1,
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <Ionicons name="logo-google" size={20} color="white" />
                  <Text className="text-white text-sm font-medium">Google</Text>
                </Pressable>

                <Pressable
                  onPress={() => handleSocialSignUp("apple")}
                  className="flex-1 h-14 rounded-2xl items-center justify-center flex-row gap-3"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderWidth: 1,
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <Ionicons name="logo-apple" size={20} color="white" />
                  <Text className="text-white text-sm font-medium">Apple</Text>
                </Pressable>
              </View>
            </View>

            {/* Footer */}
            <View className="items-center mt-auto">
              <Pressable onPress={() => router.push("./sign-in")}>
                <Text className="text-neutral-400 text-base">
                  Already a member?{" "}
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
