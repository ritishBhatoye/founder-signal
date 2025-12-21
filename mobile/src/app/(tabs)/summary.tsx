import { Text } from "@/components/atoms";
import { colors } from "@/constants/theme";
import { mockSummaries } from "@/data/mockMetrics";
import type { DaySummary, SummaryItemType } from "@/types/metrics";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Summary item config
const summaryItemConfig: Record<
  SummaryItemType,
  { icon: keyof typeof Ionicons.glyphMap; color: string }
> = {
  revenue: { icon: "trending-up", color: colors.success[500] },
  churn: { icon: "trending-down", color: colors.danger[500] },
  payment: { icon: "card", color: colors.warning[500] },
  neutral: { icon: "checkmark-circle", color: colors.success[500] },
};

interface SummaryItemProps {
  type: SummaryItemType;
  message: string;
}

function SummaryItem({ type, message }: SummaryItemProps) {
  const config = summaryItemConfig[type];
  const title =
    type === "neutral"
      ? "All Clear"
      : type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <View
      className="flex-row items-start border-b py-4"
      style={{ borderColor: colors.border }}
    >
      <View
        className="mr-3 h-10 w-10 items-center justify-center rounded-full"
        style={{ backgroundColor: config.color + "20" }}
      >
        <Ionicons name={config.icon} size={20} color={config.color} />
      </View>
      <View className="flex-1">
        <Text style={{ color: colors.text }} className="text-base font-medium">
          {title}
        </Text>
        <Text style={{ color: colors.textMuted }} className="mt-1 text-sm">
          {message}
        </Text>
      </View>
    </View>
  );
}

interface DaySummaryCardProps {
  summary: DaySummary;
  isToday?: boolean;
}

function DaySummaryCard({ summary, isToday }: DaySummaryCardProps) {
  return (
    <View
      className="mb-4 rounded-2xl border p-4"
      style={{ backgroundColor: colors.card, borderColor: colors.border }}
    >
      <View className="mb-3 flex-row items-center justify-between">
        <Text style={{ color: colors.text }} className="text-lg font-semibold">
          {summary.date}
        </Text>
        {isToday && (
          <View
            className="rounded-full px-2 py-1"
            style={{ backgroundColor: colors.success[500] + "20" }}
          >
            <Text
              style={{ color: colors.success[500] }}
              className="text-xs font-medium"
            >
              Today
            </Text>
          </View>
        )}
      </View>

      {summary.items.map((item, index) => (
        <SummaryItem key={index} type={item.type} message={item.message} />
      ))}
    </View>
  );
}

export default function SummaryScreen() {
  const summaries = mockSummaries;

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
              Daily Summary
            </Text>
            <Text style={{ color: colors.textMuted }} className="mt-1 text-sm">
              Short, brutal, honest updates
            </Text>
          </View>

          {/* Today Highlight */}
          <View
            className="mb-6 rounded-2xl border p-4"
            style={{
              backgroundColor: colors.success[50],
              borderColor: colors.success[200],
            }}
          >
            <View className="flex-row items-center">
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={colors.success[500]}
              />
              <Text
                style={{ color: colors.success[700] }}
                className="ml-2 text-lg font-semibold"
              >
                Looking Good Today
              </Text>
            </View>
            <Text style={{ color: colors.text }} className="mt-2 text-sm">
              Revenue is up, no churn, and support is quiet. Focus on building.
            </Text>
          </View>

          {/* Daily Summaries */}
          {summaries.map((summary, index) => (
            <DaySummaryCard
              key={summary.date}
              summary={summary}
              isToday={index === 0}
            />
          ))}

          {/* Push Notification Status */}
          <View
            className="mt-2 rounded-2xl border p-4"
            style={{ backgroundColor: colors.card, borderColor: colors.border }}
          >
            <View className="flex-row items-center">
              <Ionicons
                name="notifications"
                size={20}
                color={colors.primary[500]}
              />
              <Text
                style={{ color: colors.text }}
                className="ml-2 text-base font-medium"
              >
                Daily Push Enabled
              </Text>
            </View>
            <Text style={{ color: colors.textMuted }} className="mt-2 text-sm">
              You will get your summary at 9:00 AM every day.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
