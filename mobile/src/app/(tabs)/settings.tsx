import { Text } from "@/components/atoms";
import { colors } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";
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
  const isStripeConnected = true; // Mock state

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
                ? colors.success + "40"
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
                    style={{ backgroundColor: colors.success }}
                  />
                  <Text
                    style={{ color: colors.success }}
                    className="text-sm font-medium"
                  >
                    Active
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  className="px-4 py-2 rounded-full"
                  style={{ backgroundColor: colors.stripe }}
                >
                  <Text className="text-white text-sm font-medium">
                    Connect
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {isStripeConnected && (
              <View className="pt-3 border-t border">
                <View className="flex-row justify-between mb-2">
                  <Text style={{ color: colors.textMuted }} className="text-sm">
                    Account
                  </Text>
                  <Text style={{ color: colors.text }} className="text-sm">
                    acct_1234...xyz
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text style={{ color: colors.textMuted }} className="text-sm">
                    Last sync
                  </Text>
                  <Text style={{ color: colors.text }} className="text-sm">
                    2 minutes ago
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
                iconColor={colors.success}
                title="Push Notifications"
                subtitle="Daily summary & alerts"
                rightElement={
                  <View
                    className="w-10 h-6 rounded-full justify-center px-1"
                    style={{ backgroundColor: colors.success }}
                  >
                    <View className="w-4 h-4 rounded-full bg-white self-end" />
                  </View>
                }
              />
              <SettingsRow
                icon="time"
                iconColor={colors.warning}
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
                iconColor={colors.success}
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
                subtitle="founder@example.com"
              />
              <SettingsRow
                icon="diamond"
                iconColor={colors.warning}
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
                iconColor={colors.danger}
                title="Sign Out"
              />
              <SettingsRow
                icon="trash"
                iconColor={colors.danger}
                title="Disconnect Stripe"
                subtitle="Remove all data"
              />
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
