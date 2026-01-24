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
import { useSignUp } from "@/hooks/auth/useSignUp";
import { showToast } from "@/utils/toast";
import { SafeAreaView } from "react-native-safe-area-context";
import RegisterForm from "@/components/auth/Register";

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
          style={{
            position: "absolute",
            top: 64,
            right: 48,
            width: 144,
            height: 144,
            borderRadius: "100%",
            opacity: 0.15,
          }}
          // className="absolute top-16 right-12 w-36 h-36 rounded-full opacity-15 blur-3xl"
        />
        <LinearGradient
          colors={["#06B6D4", "#3B82F6", "#6366F1"]}
          style={{
            position: "absolute",
            top: 192,
            left: 24,
            width: 112,
            height: 112,
            borderRadius: "100%",
            opacity: 0.2,
          }}
          // className="absolute top-48 left-6 w-28 h-28 rounded-full opacity-20 blur-2xl"
        />
        <LinearGradient
          colors={["#10B981", "#22C55E", "#84CC16"]}
          style={{
            position: "absolute",
            bottom: 160,
            right: 32,
            width: 128,
            height: 128,
            borderRadius: "100%",
            opacity: 0.12,
          }}
          // className="absolute bottom-40 right-8 w-32 h-32 rounded-full opacity-12 blur-3xl"
        />
      </View>

      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
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
                <Ionicons name="person-add-outline" size={24} color="#8B5CF6" />
              </View>
            </View>

            <View className="w-12" />
          </View>
          <ScrollView
            className="flex-1"
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: 24,
              paddingBottom: 40,
            }}
            showsVerticalScrollIndicator={false}
          >
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
              <RegisterForm
                loading={false}
                onSubmit={function (
                  values: RegisterFormTypes,
                  actions?: ResetFormType
                ): void {
                  throw new Error("Function not implemented.");
                }}
                handleSocialSignUp={function (provider: SocialProvider): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </BlurView>

            {/* Footer */}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
