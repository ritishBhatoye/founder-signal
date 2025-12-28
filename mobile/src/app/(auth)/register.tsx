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
    } catch (_error) {
      showToast.error("Error", "An unexpected error occurred");
    }
  };

  const isFormValid = name && email && password && agreeToTerms;

  return (
    <View className="flex-1 bg-neutral-950">
      <StatusBar barStyle="light-content" />

      {/* Background Accent */}
      <View
        className="absolute top-[-100] right-[-100] w-[400] h-[400] rounded-full bg-tertiary-600/10 blur-3xl"
        style={{ opacity: 0.3 }}
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
            <View className="mt-10 mb-8">
              <Text className="text-white text-4xl font-bold tracking-tight">
                Create account
              </Text>
              <Text className="text-neutral-400 text-lg mt-2">
                Join the elite circle of SaaS founders
              </Text>
            </View>

            {/* Form Section */}
            <View className="gap-5">
              <View>
                <Text className="text-neutral-300 font-semibold mb-2 ml-1 text-sm uppercase tracking-wider">
                  Full Name
                </Text>
                <Input
                  placeholder="John Doe"
                  value={name}
                  onChangeText={setName}
                  className="bg-neutral-900 border-neutral-800 h-16 rounded-2xl px-5 text-white"
                  placeholderTextColor="#4B5563"
                />
              </View>

              <View>
                <Text className="text-neutral-300 font-semibold mb-2 ml-1 text-sm uppercase tracking-wider">
                  Work Email
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
                <Text className="text-neutral-300 font-semibold mb-2 ml-1 text-sm uppercase tracking-wider">
                  Password
                </Text>
                <Input
                  placeholder="Min. 6 characters"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  className="bg-neutral-900 border-neutral-800 h-16 rounded-2xl px-5 text-white"
                  placeholderTextColor="#4B5563"
                />
              </View>

              {/* Terms Checkbox */}
              <Pressable
                onPress={() => setAgreeToTerms(!agreeToTerms)}
                className="flex-row items-center gap-3 mt-2 ml-1"
              >
                <View
                  className={`h-6 w-6 rounded-lg border-2 items-center justify-center ${
                    agreeToTerms
                      ? "bg-primary-600 border-primary-600"
                      : "border-neutral-800 bg-neutral-900"
                  }`}
                >
                  {agreeToTerms && (
                    <Ionicons name="checkmark" size={16} color="white" />
                  )}
                </View>
                <Text className="text-neutral-400 text-sm">
                  I agree to the{" "}
                  <Text className="text-primary-400 font-semibold">Terms</Text>{" "}
                  and{" "}
                  <Text className="text-primary-400 font-semibold">
                    Privacy Policy
                  </Text>
                </Text>
              </Pressable>

              <Button
                label={isLoading ? "Creating..." : "Get Started"}
                onPress={handleRegister}
                loading={isLoading}
                disabled={!isFormValid}
                className="bg-primary-600 h-16 rounded-2xl border-0 mt-4"
                labelClassName="text-lg font-bold"
                width="full"
              />
            </View>

            {/* Social Auth */}
            <View className="mt-8 gap-4">
              <View className="flex-row items-center gap-4 mb-2">
                <View className="flex-1 h-[1px] bg-neutral-900" />
                <Text className="text-neutral-500 font-medium">
                  social sign up
                </Text>
                <View className="flex-1 h-[1px] bg-neutral-900" />
              </View>

              <View className="flex-row gap-4">
                <Pressable
                  onPress={() => handleSocialSignUp("google")}
                  className="flex-1 h-16 flex-row items-center justify-center gap-3 bg-neutral-900 border border-neutral-800 rounded-2xl"
                >
                  <Ionicons name="logo-google" size={24} color="white" />
                  <Text className="text-white font-bold text-base">Google</Text>
                </Pressable>
                <Pressable
                  onPress={() => handleSocialSignUp("apple")}
                  className="flex-1 h-16 flex-row items-center justify-center gap-3 bg-neutral-900 border border-neutral-800 rounded-2xl"
                >
                  <Ionicons name="logo-apple" size={24} color="white" />
                  <Text className="text-white font-bold text-base">Apple</Text>
                </Pressable>
              </View>
            </View>

            {/* Footer */}
            <View className="mt-auto pt-10 items-center">
              <Pressable onPress={() => router.push("./sign-in")}>
                <Text className="text-neutral-400 text-base">
                  Already a member?{" "}
                  <Text className="text-primary-400 font-bold">Sign In</Text>
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
