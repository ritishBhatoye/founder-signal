import { Text } from "@/components/atoms";
import { colors } from "@/constants/theme";
import { useAuthContext } from "@/contexts";
import { useStripeAccount } from "@/hooks/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StripeConnectScreen() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthContext();
  const { connectStripeAccount, isConnecting, isConnected } = useStripeAccount(
    user?.id
  );
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/sign-in");
    }
  }, [isAuthenticated, router]);

  // If already connected, redirect to main app
  useEffect(() => {
    if (isConnected) {
      router.replace("/(tabs)");
    }
  }, [isConnected, router]);

  const handleConnect = async () => {
    if (!user) {
      Alert.alert("Error", "Please sign in first");
      router.push("/auth/sign-in");
      return;
    }

    setIsProcessing(true);

    try {
      const result = await connectStripeAccount();

      if (result.success && result.url) {
        // TODO: Open Stripe OAuth URL in browser
        // For now, simulate connection process
        Alert.alert(
          "Stripe Connection",
          "In a real app, this would open Stripe's OAuth flow. For demo purposes, we'll simulate a successful connection.",
          [
            {
              text: "Simulate Success",
              onPress: () => {
                setTimeout(() => {
                  setIsProcessing(false);
                  router.replace("/(tabs)");
                }, 1000);
              },
            },
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => setIsProcessing(false),
            },
          ]
        );
      } else {
        Alert.alert(
          "Connection Failed",
          result.error || "Failed to connect to Stripe"
        );
        setIsProcessing(false);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleSkip = () => {
    Alert.alert(
      "Skip Stripe Connection",
      "You can connect Stripe later from Settings. Some features will be limited without Stripe data.",
      [
        {
          text: "Connect Now",
          style: "default",
        },
        {
          text: "Skip for Now",
          style: "cancel",
          onPress: () => router.replace("/(tabs)"),
        },
      ]
    );
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.bg }}>
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <View className="mb-8 mt-8 items-center">
          <View
            className="mb-4 h-20 w-20 items-center justify-center rounded-3xl"
            style={{ backgroundColor: colors.stripe + "20" }}
          >
            <Ionicons name="card" size={40} color={colors.stripe} />
          </View>
          <Text style={{ color: colors.text }} className="text-3xl font-bold">
            Connect Stripe
          </Text>
          <Text
            style={{ color: colors.textMuted }}
            className="mt-2 text-center text-base"
          >
            We need access to your Stripe data to show you the truth
          </Text>
        </View>

        {/* User Info */}
        <View
          className="mb-6 rounded-2xl border p-4"
          style={{
            backgroundColor: colors.primary[500] + "10",
            borderColor: colors.primary[500] + "30",
          }}
        >
          <View className="flex-row items-center">
            <Ionicons
              name="person-circle"
              size={24}
              color={colors.primary[500]}
            />
            <View className="ml-3">
              <Text
                style={{ color: colors.text }}
                className="text-base font-medium"
              >
                Signed in as
              </Text>
              <Text style={{ color: colors.textMuted }} className="text-sm">
                {user?.email}
              </Text>
            </View>
          </View>
        </View>

        {/* What We'll Access */}
        <View
          className="mb-6 rounded-2xl border border p-5"
          style={{ backgroundColor: colors.card }}
        >
          <Text
            style={{ color: colors.text }}
            className="mb-4 text-lg font-semibold"
          >
            What we&apos;ll access:
          </Text>

          {[
            {
              icon: "cash",
              label: "Subscription data",
              desc: "MRR, active subs, changes",
            },
            {
              icon: "people",
              label: "Customer info",
              desc: "Churn tracking only",
            },
            {
              icon: "card",
              label: "Payment events",
              desc: "Failed payments, recoveries",
            },
            {
              icon: "shield-checkmark",
              label: "Read-only access",
              desc: "We never modify data",
            },
          ].map((item, index) => (
            <View key={index} className="mb-3 flex-row items-start">
              <View
                className="mr-3 h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: colors.success + "20" }}
              >
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={colors.success}
                />
              </View>
              <View className="flex-1">
                <Text
                  style={{ color: colors.text }}
                  className="text-base font-medium"
                >
                  {item.label}
                </Text>
                <Text style={{ color: colors.textMuted }} className="text-sm">
                  {item.desc}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Security Note */}
        <View
          className="mb-6 rounded-2xl border p-4"
          style={{
            backgroundColor: colors.success + "10",
            borderColor: colors.success + "30",
          }}
        >
          <View className="flex-row items-start">
            <Ionicons name="lock-closed" size={20} color={colors.success} />
            <View className="ml-3 flex-1">
              <Text
                style={{ color: colors.success }}
                className="text-sm font-semibold"
              >
                Secure OAuth Connection
              </Text>
              <Text style={{ color: colors.text }} className="mt-1 text-sm">
                We use Stripe&apos;s official OAuth. Your credentials never
                touch our servers.
              </Text>
            </View>
          </View>
        </View>

        {/* Connect Button */}
        <TouchableOpacity
          onPress={handleConnect}
          disabled={isConnecting || isProcessing}
          className="mb-4 rounded-2xl py-4"
          style={{ backgroundColor: colors.stripe }}
        >
          {isConnecting || isProcessing ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-center text-lg font-semibold text-white">
              Connect with Stripe
            </Text>
          )}
        </TouchableOpacity>

        {/* Skip for now */}
        <TouchableOpacity
          onPress={handleSkip}
          disabled={isConnecting || isProcessing}
          className="py-3"
        >
          <Text
            style={{ color: colors.textMuted }}
            className="text-center text-sm"
          >
            I&apos;ll do this later
          </Text>
        </TouchableOpacity>

        {/* Footer Note */}
        <View className="mt-8 items-center">
          <Text
            style={{ color: colors.textMuted }}
            className="text-center text-xs"
          >
            By connecting, you agree to our Terms of Service
          </Text>
          <Text
            style={{ color: colors.textMuted }}
            className="text-center text-xs"
          >
            and Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
