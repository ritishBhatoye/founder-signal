import { Text } from "@/components/atoms";
import { colors } from "@/constants/theme";
import { useAuthState } from "@/hooks/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthCallbackScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuthState();

  useEffect(() => {
    // Handle auth callback logic here
    // TODO: Process magic link token when Supabase is integrated

    if (!isLoading) {
      if (isAuthenticated && user) {
        // Redirect to main app
        router.replace("/(tabs)");
      } else {
        // Redirect back to sign in
        router.replace("/auth/sign-in");
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.bg }}>
      <View className="flex-1 items-center justify-center p-8">
        <View
          className="mb-6 h-20 w-20 items-center justify-center rounded-3xl"
          style={{ backgroundColor: colors.primary[500] + "20" }}
        >
          <Ionicons
            name="checkmark-circle"
            size={40}
            color={colors.primary[500]}
          />
        </View>

        <ActivityIndicator size="large" color={colors.primary[500]} />

        <Text
          style={{ color: colors.text }}
          className="mt-4 text-xl font-semibold text-center"
        >
          Signing you in...
        </Text>

        <Text
          style={{ color: colors.textMuted }}
          className="mt-2 text-center text-base"
        >
          Please wait while we verify your magic link
        </Text>
      </View>
    </SafeAreaView>
  );
}
