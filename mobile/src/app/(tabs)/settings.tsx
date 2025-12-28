import { Text } from "@/components/atoms";
import { colors } from "@/constants/theme";
import { useAuthContext } from "@/contexts";
import { useProfile, useStripeAccount } from "@/hooks/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SettingsRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  onPress?: () => void;
}

function SettingsRow({
  icon,
  iconColor = colors.text,
  title,
  subtitle,
  rightElement,
  onPress,
}: SettingsRowProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center py-4 border-b border"
    >
      <View
        className="w-10 h-10 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: iconColor + "20" }}
      >
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>
      <View className="flex-1">
        <Text style={{ color: colors.text }} className="text-base">
          {title}
        </Text>
        {subtitle && (
          <Text style={{ color: colors.textMuted }} className="text-sm mt-0.5">
            {subtitle}
          </Text>
        )}
      </View>
      {rightElement || (
        <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
      )}
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const { user, signOut, isLoading: authLoading } = useAuthContext();
  const { profile } = useProfile(user?.id);
  const {
    stripeAccount,
    isConnected: isStripeConnected,
    connectStripeAccount,
    disconnectStripeAccount,
    isConnecting,
  } = useStripeAccount(user?.id);

  const handleSignOut = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await signOut();
          router.replace("/auth/sign-in");
        },
      },
    ]);
  };

  const handleConnectStripe = async () => {
    const result = await connectStripeAccount();
    if (result.success && result.url) {
      // TODO: Open Stripe OAuth URL
      // For now, navigate to stripe-connect screen
      router.push("/stripe-connect");
    } else {
      Alert.alert(
        "Connection Failed",
        result.error || "Failed to connect Stripe"
      );
    }
  };

  const handleDisconnectStripe = async () => {
    Alert.alert(
      "Disconnect Stripe",
      "This will remove all your Stripe data and metrics. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Disconnect",
          style: "destructive",
          onPress: async () => {
            const result = await disconnectStripeAccount();
            if (result.success) {
              Alert.alert("Success", "Stripe account disconnected");
            } else {
              Alert.alert("Error", result.error || "Failed to disconnect");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.bg }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="p-4">
          {/* Header */}
          <View className="mb-6">
            <Text style={{ color: colors.text }} className="text-2xl font-bold">
              Settings
            </Text>
            <Text style={{ color: colors.textMuted }} className="text-sm mt-1">
              Manage your FounderOps account
            </Text>
          </View>

          {/* Stripe Connection */}
          <View
            className="p-4 rounded-2xl mb-6 border"
            style={{
              backgroundColor: colors.card,
              borderColor: isStripeConnected
                ? colors.success[500] + "40"
                : colors.stripe + "40",
            }}
          >
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center">
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: colors.stripe + "20" }}
                >
                  <Ionicons name="card" size={20} color={colors.stripe} />
                </View>
                <View>
                  <Text
                    style={{ color: colors.text }}
                    className="text-base font-semibold"
                  >
                    Stripe
                  </Text>
                  <Text style={{ color: colors.textMuted }} className="text-sm">
                    {isStripeConnected ? "Connected" : "Not connected"}
                  </Text>
                </View>
              </View>
              {isStripeConnected ? (
                <View className="flex-row items-center">
                  <View
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: colors.success[500] }}
                  />
                  <Text
                    style={{ color: colors.success[500] }}
                    className="text-sm font-medium"
                  >
                    Active
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleConnectStripe}
                  disabled={isConnecting}
                  className="px-4 py-2 rounded-full"
                  style={{ backgroundColor: colors.stripe }}
                >
                  <Text className="text-white text-sm font-medium">
                    {isConnecting ? "Connecting..." : "Connect"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {isStripeConnected && stripeAccount && (
              <View className="pt-3 border-t border">
                <View className="flex-row justify-between mb-2">
                  <Text style={{ color: colors.textMuted }} className="text-sm">
                    Account
                  </Text>
                  <Text style={{ color: colors.text }} className="text-sm">
                    {stripeAccount.stripe_account_id.substring(0, 12)}...
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text style={{ color: colors.textMuted }} className="text-sm">
                    Mode
                  </Text>
                  <Text style={{ color: colors.text }} className="text-sm">
                    {stripeAccount.livemode ? "Live" : "Test"}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Notifications */}
          <View
            className="rounded-2xl mb-6 border border overflow-hidden"
            style={{ backgroundColor: colors.card }}
          >
            <View className="p-4 border-b border">
              <Text
                style={{ color: colors.text }}
                className="text-base font-semibold"
              >
                Notifications
              </Text>
            </View>
            <View className="px-4">
              <SettingsRow
                icon="notifications"
                iconColor={colors.success[500]}
                title="Push Notifications"
                subtitle="Daily summary & alerts"
                rightElement={
                  <View
                    className="w-10 h-6 rounded-full justify-center px-1"
                    style={{ backgroundColor: colors.success[500] }}
                  >
                    <View className="w-4 h-4 rounded-full bg-white self-end" />
                  </View>
                }
              />
              <SettingsRow
                icon="time"
                iconColor={colors.warning[500]}
                title="Daily Summary Time"
                subtitle="9:00 AM"
              />
            </View>
          </View>

          {/* Support Pressure (Manual Input v1) */}
          <View
            className="rounded-2xl mb-6 border border overflow-hidden"
            style={{ backgroundColor: colors.card }}
          >
            <View className="p-4 border-b border">
              <Text
                style={{ color: colors.text }}
                className="text-base font-semibold"
              >
                Manual Inputs
              </Text>
              <Text
                style={{ color: colors.textMuted }}
                className="text-sm mt-1"
              >
                Data we cannot pull automatically (yet)
              </Text>
            </View>
            <View className="px-4">
              <SettingsRow
                icon="chatbubbles"
                iconColor={colors.success[500]}
                title="Support Pressure"
                subtitle="Currently: Low"
                onPress={() => router.push("/support-pressure")}
              />
            </View>
          </View>

          {/* Account */}
          <View
            className="rounded-2xl mb-6 border border overflow-hidden"
            style={{ backgroundColor: colors.card }}
          >
            <View className="p-4 border-b border">
              <Text
                style={{ color: colors.text }}
                className="text-base font-semibold"
              >
                Account
              </Text>
            </View>
            <View className="px-4">
              <SettingsRow
                icon="person"
                title="Profile"
                subtitle={user?.email || profile?.email || "Not signed in"}
              />
              <SettingsRow
                icon="diamond"
                iconColor={colors.warning[500]}
                title="Plan"
                subtitle="Pro - $19/mo"
              />
              <SettingsRow icon="help-circle" title="Help & Support" />
            </View>
          </View>

          {/* Danger Zone */}
          <View
            className="rounded-2xl border border overflow-hidden"
            style={{ backgroundColor: colors.card }}
          >
            <View className="px-4">
              <SettingsRow
                icon="log-out"
                iconColor={colors.danger[500]}
                title="Sign Out"
                onPress={handleSignOut}
              />
              {isStripeConnected && (
                <SettingsRow
                  icon="trash"
                  iconColor={colors.danger[500]}
                  title="Disconnect Stripe"
                  subtitle="Remove all data"
                  onPress={handleDisconnectStripe}
                />
              )}
            </View>
          </View>

          {/* Version */}
          <View className="mt-6 items-center">
            <Text style={{ color: colors.textMuted }} className="text-xs">
              FounderOps v1.0.0
            </Text>
            <Text style={{ color: colors.textMuted }} className="text-xs mt-1">
              Built for solo founders
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
