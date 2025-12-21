import { Text } from "@/components/atoms";
import { colors } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StripeConnectScreen() {
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // TODO: Implement Stripe OAuth flow
    // For now, simulate connection
    setTimeout(() => {
      setIsConnecting(false);
      router.replace("/(tabs)");
    }, 2000);
  };

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

        {/* What We'll Access */}
        <View
          className="mb-6 rounded-2xl border border-neutral-800 p-5"
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
          disabled={isConnecting}
          className="mb-4 rounded-2xl py-4"
          style={{ backgroundColor: colors.stripe }}
        >
          {isConnecting ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-center text-lg font-semibold text-white">
              Connect with Stripe
            </Text>
          )}
        </TouchableOpacity>

        {/* Skip for now */}
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)")}
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
