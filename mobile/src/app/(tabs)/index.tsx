import { Text } from "@/components/atoms";
import { MetricCard, StatusIndicator } from "@/components/founderops";
import { colors } from "@/constants/theme";
import { mockHealthCheck, mockMetrics } from "@/data/mockMetrics";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TruthDashboard() {
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

          {/* Primary Metric - MRR */}
          <View
            className="mb-4 rounded-2xl border border-neutral-800 p-6"
            style={{ backgroundColor: colors.card }}
          >
            <Text style={{ color: colors.textMuted }} className="mb-1 text-sm">
              Monthly Recurring Revenue
            </Text>
            <Text style={{ color: colors.text }} className="text-5xl font-bold">
              {metrics.mrr}
            </Text>
            <View className="mt-3 flex-row items-center">
              <Ionicons name="arrow-up" size={18} color={colors.success} />
              <Text
                style={{ color: colors.success }}
                className="ml-1 text-lg font-medium"
              >
                {metrics.mrrChange}
              </Text>
              <Text
                style={{ color: colors.textMuted }}
                className="ml-2 text-sm"
              >
                this month
              </Text>
            </View>
          </View>

          {/* Net MRR Change */}
          <View className="mb-4 flex-row gap-3">
            <View className="flex-1">
              <MetricCard
                title="Net MRR Today"
                value={metrics.netMrrToday}
                changeType="up"
              />
            </View>
            <View className="flex-1">
              <MetricCard
                title="Net MRR Week"
                value={metrics.netMrrWeek}
                changeType="up"
              />
            </View>
          </View>

          {/* Secondary Metrics */}
          <View className="mb-6 flex-row gap-3">
            <View className="flex-1">
              <MetricCard
                title="Active Subscriptions"
                value={metrics.activeSubscriptions}
                subtitle="paying customers"
              />
            </View>
            <View className="flex-1">
              <MetricCard
                title="Churn Rate"
                value={metrics.churnRate}
                changeType="down"
                change="0.3% vs last month"
              />
            </View>
          </View>

          {/* Health Check */}
          <View
            className="rounded-2xl border border-neutral-800 p-4"
            style={{ backgroundColor: colors.card }}
          >
            <Text
              style={{ color: colors.text }}
              className="mb-2 text-lg font-semibold"
            >
              Health Check
            </Text>
            {healthCheck.map((item, index) => (
              <StatusIndicator
                key={index}
                label={item.label}
                value={item.value}
                status={item.status}
              />
            ))}
          </View>

          {/* Last Updated */}
          <View className="mt-4 items-center">
            <Text style={{ color: colors.textMuted }} className="text-xs">
              Last synced: 2 minutes ago
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
