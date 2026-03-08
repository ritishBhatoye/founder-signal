import Ionicons from '@expo/vector-icons/Ionicons'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Text } from '@/components/atoms'
import { ProtectedRoute } from '@/components/auth'
import { colors } from '@/constants/theme'
import { useAuthContext } from '@/contexts'
import { useStripeAccount } from '@/hooks/auth'
import { useGetTodaysSummaryQuery, useGetRecentSummariesQuery } from '@/hooks/useData'

import type { SummaryItemType } from '@/types/metrics'

// Summary item config
const summaryItemConfig: Record<
  SummaryItemType,
  { icon: keyof typeof Ionicons.glyphMap; color: string }
> = {
  revenue: { icon: 'trending-up', color: colors.success[500] },
  churn: { icon: 'trending-down', color: colors.danger[500] },
  payment: { icon: 'card', color: colors.warning[500] },
  neutral: { icon: 'checkmark-circle', color: colors.success[500] },
}

interface SummaryItemProps {
  type: SummaryItemType
  message: string
}

function SummaryItem({ type, message }: SummaryItemProps) {
  const config = summaryItemConfig[type]
  const title =
    type === 'neutral' ? 'All Clear' : type.charAt(0).toUpperCase() + type.slice(1)

  return (
    <View
      className="flex-row items-start border-b py-4"
      style={{ borderColor: colors.border }}
    >
      <View
        className="mr-3 h-10 w-10 items-center justify-center rounded-full"
        style={{ backgroundColor: `${config.color}20` }}
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
  )
}

interface DaySummaryCardProps {
  date: string
  headline: string
  items: { type: SummaryItemType; message: string }[]
  status: string
  isToday?: boolean
}

function DaySummaryCard({ date, headline, items, status, isToday }: DaySummaryCardProps) {
  const statusColors = {
    good: colors.success,
    warning: colors.warning,
    danger: colors.danger,
  }

  const statusColor = statusColors[status as keyof typeof statusColors] || colors.success

  return (
    <View
      className="mb-4 rounded-2xl border p-4"
      style={{ backgroundColor: colors.card, borderColor: colors.border }}
    >
      <View className="mb-3 flex-row items-center justify-between">
        <Text style={{ color: colors.text }} className="text-lg font-semibold">
          {date}
        </Text>
        {isToday && (
          <View
            className="rounded-full px-2 py-1"
            style={{ backgroundColor: `${colors.success[500]}20` }}
          >
            <Text style={{ color: colors.success[500] }} className="text-xs font-medium">
              Today
            </Text>
          </View>
        )}
      </View>

      {items.map((item, index) => (
        <SummaryItem key={index} type={item.type} message={item.message} />
      ))}
    </View>
  )
}

function SummaryContent() {
  const { user } = useAuthContext()
  const { isConnected: isStripeConnected } = useStripeAccount(user?.id)

  const { data: todaysSummary, isLoading: isLoadingToday } = useGetTodaysSummaryQuery(
    undefined,
    {
      skip: !isStripeConnected,
    },
  )

  const { data: recentSummaries, isLoading: isLoadingHistory } =
    useGetRecentSummariesQuery(7, {
      skip: !isStripeConnected,
    })

  const isLoading = isLoadingToday || isLoadingHistory

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
  }

  const getHeadlineForStatus = (status: string) => {
    switch (status) {
      case 'good':
        return 'Looking Good Today'
      case 'warning':
        return 'Needs Attention'
      case 'danger':
        return 'Action Required'
      default:
        return 'Daily Update'
    }
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.bg }}>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
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

          {!isStripeConnected && (
            <View
              className="mb-6 rounded-2xl border p-4"
              style={{
                backgroundColor: `${colors.warning[500]}10`,
                borderColor: `${colors.warning[500]}30`,
              }}
            >
              <View className="flex-row items-center">
                <Ionicons name="warning" size={20} color={colors.warning[500]} />
                <Text
                  style={{ color: colors.warning[500] }}
                  className="ml-2 text-sm font-semibold"
                >
                  Connect Stripe to see your daily summary
                </Text>
              </View>
            </View>
          )}

          {/* Loading State */}
          {isStripeConnected && isLoading && (
            <View className="items-center justify-center py-8">
              <ActivityIndicator size="large" color={colors.primary[500]} />
              <Text style={{ color: colors.textMuted }} className="mt-2">
                Loading summaries...
              </Text>
            </View>
          )}

          {/* Today Highlight */}
          {isStripeConnected && !isLoading && todaysSummary && (
            <View
              className="mb-6 rounded-2xl border p-4"
              style={{
                backgroundColor:
                  todaysSummary.status === 'good'
                    ? `${colors.success[500]}10`
                    : todaysSummary.status === 'warning'
                      ? `${colors.warning[500]}10`
                      : `${colors.danger[500]}10`,
                borderColor:
                  todaysSummary.status === 'good'
                    ? `${colors.success[500]}30`
                    : todaysSummary.status === 'warning'
                      ? `${colors.warning[500]}30`
                      : `${colors.danger[500]}30`,
              }}
            >
              <View className="flex-row items-center">
                <Ionicons
                  name={
                    todaysSummary.status === 'good'
                      ? 'checkmark-circle'
                      : todaysSummary.status === 'warning'
                        ? 'warning'
                        : 'alert-circle'
                  }
                  size={24}
                  color={
                    todaysSummary.status === 'good'
                      ? colors.success[500]
                      : todaysSummary.status === 'warning'
                        ? colors.warning[500]
                        : colors.danger[500]
                  }
                />
                <Text
                  style={{
                    color:
                      todaysSummary.status === 'good'
                        ? colors.success[500]
                        : todaysSummary.status === 'warning'
                          ? colors.warning[500]
                          : colors.danger[500],
                  }}
                  className="ml-2 text-lg font-semibold"
                >
                  {getHeadlineForStatus(todaysSummary.status)}
                </Text>
              </View>
              <Text style={{ color: colors.text }} className="mt-2 text-sm">
                {todaysSummary.summary_text}
              </Text>
            </View>
          )}

          {/* No Summary Available */}
          {isStripeConnected && !isLoading && !todaysSummary && (
            <View
              className="mb-6 rounded-2xl border p-4"
              style={{ backgroundColor: colors.card, borderColor: colors.border }}
            >
              <View className="flex-row items-center">
                <Ionicons
                  name="document-text-outline"
                  size={24}
                  color={colors.textMuted}
                />
                <Text style={{ color: colors.textMuted }} className="ml-2 text-base">
                  No summary available yet
                </Text>
              </View>
              <Text style={{ color: colors.textMuted }} className="mt-2 text-sm">
                Your daily summary will appear here once your data is processed.
              </Text>
            </View>
          )}

          {/* Daily Summaries History */}
          {isStripeConnected &&
            !isLoading &&
            recentSummaries &&
            recentSummaries.length > 0 && (
              <>
                <Text
                  style={{ color: colors.text }}
                  className="mb-3 text-lg font-semibold"
                >
                  Recent Summaries
                </Text>
                {recentSummaries.map((summary) => (
                  <DaySummaryCard
                    key={summary.date}
                    date={formatDate(summary.date)}
                    headline={summary.headline}
                    items={summary.items}
                    status={summary.status}
                  />
                ))}
              </>
            )}

          {/* Push Notification Status */}
          <View
            className="mt-2 rounded-2xl border p-4"
            style={{ backgroundColor: colors.card, borderColor: colors.border }}
          >
            <View className="flex-row items-center">
              <Ionicons name="notifications" size={20} color={colors.primary[500]} />
              <Text style={{ color: colors.text }} className="ml-2 text-base font-medium">
                Daily Push Enabled
              </Text>
            </View>
            <Text style={{ color: colors.textMuted }} className="mt-2 text-sm">
              You will get your summary at 9:00 AM every day.
            </Text>
          </View>

          {/* User Info */}
          {user && (
            <View className="mt-4 items-center">
              <Text style={{ color: colors.textMuted }} className="text-xs">
                Daily summaries for {user.email}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default function SummaryScreen() {
  return (
    <ProtectedRoute>
      <SummaryContent />
    </ProtectedRoute>
  )
}
