import { Text } from "@/components/atoms";
import { ProtectedRoute } from "@/components/auth";
import { MetricCard, StatusIndicator } from "@/components/founderops";
import { colors } from "@/constants/theme";
import { useAuthContext } from "@/contexts";
import { mockHealthCheck, mockMetrics } from "@/data/mockMetrics";
import { useStripeAccount } from "@/hooks/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function TruthDashboardContent() {
  const router = useRouter();
  const { user } = useAuthContext();
  const { isConnected: isStripeConnected } = useStripeAccount(user?.id);

  const metrics = mockMetrics;
  const healthCheck = mockHealthCheck;

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
              The Truth
            </Text>
            <Text style={{ color: colors.textMuted }} className="mt-1 text-sm">
              Your SaaS reality in 60 seconds
            </Text>
          </View>

          {/* Stripe Connection Banner */}
          {!isStripeConnected && (
            <TouchableOpacity
              onPress={() => router.push("/stripe-connect")}
              className="mb-4 rounded-2xl border p-4"
              style={{
                backgroundColor: colors.warning[500] + "10",
                borderColor: colors.warning[500] + "30",
              }}
            >
              <View className="flex-row items-center">
                <Ionicons
                  name="warning"
                  size={20}
                  color={colors.warning[500]}
                />
                <View className="ml-3 flex-1">
                  <Text
                    style={{ color: colors.warning[500] }}
                    className="text-sm font-semibold"
                  >
                    Connect Stripe to see real data
                  </Text>
                  <Text style={{ color: colors.text }} className="text-sm">
                    Tap to connect your Stripe account
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={colors.warning[500]}
                />
              </View>
            </TouchableOpacity>
          )}

          {/* Primary Metric - MRR */}
          <View
            className="mb-4 rounded-2xl border p-6"
            style={{ backgroundColor: colors.card, borderColor: colors.border }}
          >
            <Text style={{ color: colors.textMuted }} className="mb-1 text-sm">
              Monthly Recurring Revenue
            </Text>
            <Text style={{ color: colors.text }} className="text-5xl font-bold">
              {isStripeConnected ? metrics.mrr : "$0"}
            </Text>
            <View className="mt-3 flex-row items-center">
              <Ionicons name="arrow-up" size={18} color={colors.success[500]} />
              <Text
                style={{ color: colors.success[500] }}
                className="ml-1 text-lg font-medium"
              >
                {isStripeConnected ? metrics.mrrChange : "+$0"}
              </Text>
              <Text
                style={{ color: colors.textMuted }}
                className="ml-2 text-sm"
              >
                this month
              </Text>
            </View>
            {!isStripeConnected && (
              <Text
                style={{ color: colors.textMuted }}
                className="mt-2 text-xs"
              >
                Connect Stripe to see real MRR data
              </Text>
            )}
          </View>

          {/* Net MRR Change */}
          <View className="mb-4 flex-row gap-3">
            <View className="flex-1">
              <MetricCard
                title="Net MRR Today"
                value={isStripeConnected ? metrics.netMrrToday : "$0"}
                changeType="up"
              />
            </View>
            <View className="flex-1">
              <MetricCard
                title="Net MRR Week"
                value={isStripeConnected ? metrics.netMrrWeek : "$0"}
                changeType="up"
              />
            </View>
          </View>

          {/* Secondary Metrics */}
          <View className="mb-6 flex-row gap-3">
            <View className="flex-1">
              <MetricCard
                title="Active Subscriptions"
                value={isStripeConnected ? metrics.activeSubscriptions : "0"}
                subtitle="paying customers"
              />
            </View>
            <View className="flex-1">
              <MetricCard
                title="Churn Rate"
                value={isStripeConnected ? metrics.churnRate : "0%"}
                changeType="down"
                change={isStripeConnected ? "0.3% vs last month" : "No data"}
              />
            </View>
          </View>

          {/* Health Check */}
          <View
            className="rounded-2xl border p-4"
            style={{ backgroundColor: colors.card, borderColor: colors.border }}
          >
            <Text
              style={{ color: colors.text }}
              className="mb-2 text-lg font-semibold"
            >
              Health Check
            </Text>
            {isStripeConnected ? (
              healthCheck.map((item, index) => (
                <StatusIndicator
                  key={index}
                  label={item.label}
                  value={item.value}
                  status={item.status}
                />
              ))
            ) : (
              <View className="py-4 items-center">
                <Ionicons name="link" size={24} color={colors.textMuted} />
                <Text
                  style={{ color: colors.textMuted }}
                  className="mt-2 text-sm text-center"
                >
                  Connect Stripe to see health metrics
                </Text>
              </View>
            )}
          </View>

          {/* Last Updated */}
          <View className="mt-4 items-center">
            <Text style={{ color: colors.textMuted }} className="text-xs">
              {isStripeConnected
                ? "Last synced: 2 minutes ago"
                : "No data source connected"}
            </Text>
            {user && (
              <Text
                style={{ color: colors.textMuted }}
                className="text-xs mt-1"
              >
                Signed in as {user.email}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function TruthDashboard() {
  return (
    <ProtectedRoute>
      <TruthDashboardContent />
    </ProtectedRoute>
  );
}
