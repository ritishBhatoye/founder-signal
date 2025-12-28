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
import { Input, Button } from "@/components/atoms";
import { useSignIn } from "@/hooks/auth";
import { showToast } from "@/utils/toast";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInWithPassword, signInWithMagicLink, isLoading } = useSignIn();

  const handleSignIn = async () => {
    if (!email || !password) {
      showToast.warning("Missing Fields", "Please fill in all fields");
      return;
    }

    const result = await signInWithPassword(email, password);

    if (result.error) {
      showToast.error("Sign In Failed", result.error);
      return;
    }

    if (result.success) {
      showToast.success("Welcome Back!", "Successfully signed in");
      router.replace("/(tabs)");
    }
  };

  const handleMagicLinkSignIn = async () => {
    if (!email) {
      showToast.warning("Email Required", "Please enter your email address");
      return;
    }

    const result = await signInWithMagicLink(email);

    if (result.error) {
      showToast.error("Magic Link Failed", result.error);
      return;
    }

    if (result.success) {
      showToast.success(
        "Check Your Email",
        result.message || "Magic link sent!"
      );
    }
  };

  const handleSocialSignIn = async (provider: "google" | "apple") => {
    try {
      showToast.info(
        "Coming Soon",
        `${provider} sign-in will be available soon`
      );
    } catch (_err) {
      showToast.error("Error", "An unexpected error occurred");
    }
  };

  return (
    <View className="flex-1 bg-neutral-950">
      <StatusBar barStyle="light-content" />

      {/* Header with Background Accent */}
      <View
        className="absolute top-[-50] left-[-50] w-[300] h-[300] rounded-full bg-primary-600/10 blur-3xl"
        style={{ opacity: 0.4 }}
      />

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
            {/* Back Button */}
            <Pressable
              onPress={() => router.back()}
              className="mt-4 h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900 border border-neutral-800"
            >
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </Pressable>

            {/* Title Section */}
            <View className="mt-12 mb-10">
              <Text className="text-white text-4xl font-bold tracking-tight">
                Welcome back
              </Text>
              <Text className="text-neutral-400 text-lg mt-2">
                Enter your details to track your SaaS growth
              </Text>
            </View>

            {/* Form Section */}
            <View className="gap-6">
              <View>
                <Text className="text-neutral-300 font-semibold mb-2 ml-1 text-sm uppercase tracking-wider">
                  Email Address
                </Text>
                <Input
                  placeholder="name@company.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="bg-neutral-900 border-neutral-800 h-16 rounded-2xl px-5 text-white"
                  placeholderTextColor="#4B5563"
                />
              </View>

              <View>
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-neutral-300 font-semibold ml-1 text-sm uppercase tracking-wider">
                    Password
                  </Text>
                  <Pressable
                    onPress={() => router.push("/(auth)/forgot-password")}
                  >
                    <Text className="text-primary-400 font-semibold text-sm">
                      Forgot?
                    </Text>
                  </Pressable>
                </View>
                <Input
                  placeholder="Your secure password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  className="bg-neutral-900 border-neutral-800 h-16 rounded-2xl px-5 text-white"
                  placeholderTextColor="#4B5563"
                />
              </View>

              <Button
                label={isLoading ? "Verifying..." : "Sign In"}
                onPress={handleSignIn}
                loading={isLoading}
                disabled={!email || !password}
                className="bg-primary-600 h-16 rounded-2xl border-0 mt-2"
                labelClassName="text-lg font-bold"
                width="full"
              />

              {/* Magic Link Option */}
              <Button
                label="Send Magic Link Instead"
                onPress={handleMagicLinkSignIn}
                loading={isLoading}
                disabled={!email}
                className="bg-neutral-900 border-neutral-800 h-16 rounded-2xl mt-2"
                labelClassName="text-lg font-bold text-primary-400"
                variant="tertiary"
                width="full"
              />
            </View>

            {/* Divider */}
            <View className="my-10 flex-row items-center gap-4">
              <View className="flex-1 h-[1px] bg-neutral-900" />
              <Text className="text-neutral-500 font-medium">
                more sign in options
              </Text>
              <View className="flex-1 h-[1px] bg-neutral-900" />
            </View>

            {/* Social Auth */}
            <View className="gap-4">
              <Pressable
                onPress={() => handleSocialSignIn("google")}
                className="h-16 flex-row items-center justify-center gap-3 bg-neutral-900 border border-neutral-800 rounded-2xl"
              >
                <Ionicons name="logo-google" size={24} color="white" />
                <Text className="text-white font-bold text-base">
                  Continue with Google
                </Text>
              </Pressable>

              <Pressable
                onPress={() => handleSocialSignIn("apple")}
                className="h-16 flex-row items-center justify-center gap-3 bg-neutral-900 border border-neutral-800 rounded-2xl"
              >
                <Ionicons name="logo-apple" size={24} color="white" />
                <Text className="text-white font-bold text-base">
                  Continue with Apple
                </Text>
              </Pressable>
            </View>

            {/* Footer */}
            <View className="mt-auto pt-10 items-center">
              <Pressable onPress={() => router.push("./register")}>
                <Text className="text-neutral-400 text-base">
                  New here?{" "}
                  <Text className="text-primary-400 font-bold">
                    Create an account
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
