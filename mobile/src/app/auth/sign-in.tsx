import { Text } from "@/components/atoms";
import Button from "@/components/atoms/Button";
import { colors } from "@/constants/theme";
import { useSignIn } from "@/hooks/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const router = useRouter();
  const { signInWithMagicLink, isLoading, error, clearError } = useSignIn();
  const [email, setEmail] = useState("");

  const handleSignIn = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    const result = await signInWithMagicLink(email.trim().toLowerCase());

    if (result.success) {
      Alert.alert(
        "Check Your Email",
        "We&apos;ve sent you a magic link to sign in. Click the link in your email to continue.",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    } else {
      Alert.alert("Sign In Failed", result.error || "Something went wrong");
    }
  };

  const isValidEmail = email.includes("@") && email.includes(".");

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.bg }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
          {/* Header */}
          <View className="mb-8 mt-8 items-center">
            <View
              className="mb-4 h-20 w-20 items-center justify-center rounded-3xl"
              style={{ backgroundColor: colors.primary[500] + "20" }}
            >
              <Ionicons name="mail" size={40} color={colors.primary[500]} />
            </View>
            <Text style={{ color: colors.text }} className="text-3xl font-bold">
              Welcome Back
            </Text>
            <Text
              style={{ color: colors.textMuted }}
              className="mt-2 text-center text-base"
            >
              Enter your email to receive a magic link
            </Text>
          </View>

          {/* Email Input */}
          <View className="mb-6">
            <Text
              style={{ color: colors.text }}
              className="mb-2 text-sm font-medium"
            >
              Email Address
            </Text>
            <TextInput
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (error) clearError();
              }}
              placeholder="founder@example.com"
              placeholderTextColor={colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              className="rounded-2xl border px-4 py-4 text-base"
              style={{
                backgroundColor: colors.card,
                borderColor: error ? colors.danger[500] : colors.border,
                color: colors.text,
              }}
            />
            {error && (
              <Text
                style={{ color: colors.danger[500] }}
                className="mt-2 text-sm"
              >
                {error}
              </Text>
            )}
          </View>

          {/* Magic Link Info */}
          <View
            className="mb-6 rounded-2xl border p-4"
            style={{
              backgroundColor: colors.primary[500] + "10",
              borderColor: colors.primary[500] + "30",
            }}
          >
            <View className="flex-row items-start">
              <Ionicons
                name="information-circle"
                size={20}
                color={colors.primary[500]}
              />
              <View className="ml-3 flex-1">
                <Text
                  style={{ color: colors.primary[500] }}
                  className="text-sm font-semibold"
                >
                  Magic Link Sign In
                </Text>
                <Text style={{ color: colors.text }} className="mt-1 text-sm">
                  No passwords needed. We&apos;ll send you a secure link to sign
                  in instantly.
                </Text>
              </View>
            </View>
          </View>

          {/* Sign In Button */}
          <Button
            variant="primary"
            size="lg"
            onPress={handleSignIn}
            disabled={isLoading || !isValidEmail}
            className="mb-4"
            label={isLoading ? "Sending Magic Link..." : "Send Magic Link"}
            labelClassName="text-lg font-semibold"
          />

          {/* Back Button */}
          <TouchableOpacity onPress={() => router.back()} className="py-3">
            <Text
              style={{ color: colors.textMuted }}
              className="text-center text-sm"
            >
              Go Back
            </Text>
          </TouchableOpacity>

          {/* Footer */}
          <View className="mt-8 items-center">
            <Text
              style={{ color: colors.textMuted }}
              className="text-center text-xs"
            >
              By signing in, you agree to our Terms of Service
            </Text>
            <Text
              style={{ color: colors.textMuted }}
              className="text-center text-xs"
            >
              and Privacy Policy
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
