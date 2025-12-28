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
import { authService } from "@/services/auth.service";
import { showToast } from "@/utils/toast";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      showToast.warning("Email Required", "Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authService.resetPassword(email);

      if (error) {
        showToast.error(
          "Reset Failed",
          error.message || "Failed to send reset link"
        );
        setLoading(false);
        return;
      }

      setSubmitted(true);
      showToast.success(
        "Link Sent",
        "Check your email for password reset instructions"
      );
    } catch (error) {
      showToast.error("Error", "An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-neutral-950">
      <StatusBar barStyle="light-content" />

      {/* Background Accent */}
      <View
        className="absolute bottom-[-100] left-[-100] w-[400] h-[400] rounded-full bg-primary-600/10 blur-3xl"
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

            {!submitted ? (
              <>
                {/* Title Section */}
                <View className="mt-12 mb-10">
                  <View className="h-20 w-20 items-center justify-center rounded-3xl bg-neutral-900 border border-neutral-800 mb-6">
                    <Ionicons name="key-outline" size={32} color="#6366F1" />
                  </View>
                  <Text className="text-white text-4xl font-bold tracking-tight">
                    Forgot password?
                  </Text>
                  <Text className="text-neutral-400 text-lg mt-2">
                    No worries, we&apos;ll send you reset instructions.
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

                  <Button
                    label={loading ? "Sending..." : "Reset Password"}
                    onPress={handleResetPassword}
                    loading={loading}
                    disabled={!email}
                    className="bg-primary-600 h-16 rounded-2xl border-0 mt-2"
                    labelClassName="text-lg font-bold"
                    width="full"
                  />
                </View>
              </>
            ) : (
              <View className="mt-12 items-center">
                <View className="h-20 w-20 items-center justify-center rounded-3xl bg-green-900/20 border border-green-800/30 mb-6">
                  <Ionicons
                    name="mail-unread-outline"
                    size={32}
                    color="#10B981"
                  />
                </View>
                <Text className="text-white text-3xl font-bold text-center">
                  Check your email
                </Text>
                <Text className="text-neutral-400 text-lg mt-4 text-center">
                  We&apos;ve sent a password reset link to{"\n"}
                  <Text className="text-white font-semibold">{email}</Text>
                </Text>

                <Button
                  label="Open Email App"
                  onPress={() => {}} // Could add logic to open mail app
                  className="bg-neutral-900 border-neutral-800 h-16 rounded-2xl mt-12 px-8"
                  labelClassName="text-lg font-bold"
                  variant="tertiary"
                  width="full"
                />

                <Pressable onPress={() => setSubmitted(false)} className="mt-8">
                  <Text className="text-neutral-500 text-base">
                    Didn&apos;t receive the email?{" "}
                    <Text className="text-primary-400 font-bold">
                      Try again
                    </Text>
                  </Text>
                </Pressable>
              </View>
            )}

            {/* Footer */}
            <View className="mt-auto pt-10 items-center">
              <Pressable onPress={() => router.replace("./sign-in")}>
                <Text className="text-neutral-400 text-base">
                  Back to{" "}
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
