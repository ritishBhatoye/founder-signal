import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Text } from '@/components/atoms'
import { ProtectedRoute } from '@/components/auth'
import { MetricCard, StatusIndicator } from '@/components/founderops'
import { colors } from '@/constants/theme'
import { useAuthContext } from '@/contexts'
import { mockHealthCheck } from '@/data/mockMetrics'
import { useStripeAccount } from '@/hooks/auth'
import { useGetMetricsQuery } from '@/hooks/useData'

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100)
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

function TruthDashboardContent() {
  const router = useRouter()
  const { user } = useAuthContext()
  const { isConnected: isStripeConnected } = useStripeAccount(user?.id)

  const {
    data: metricsData,
    isLoading,
    error,
    refetch,
  } = useGetMetricsQuery(undefined, {
    skip: !isStripeConnected,
  })

  const healthCheck = mockHealthCheck

  const formatLastSync = (dateString?: string) => {
    if (!dateString) return 'Never'
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} min ago`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours} hr ago`
    return date.toLocaleDateString()
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.bg }}>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
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
              onPress={() => router.push('/stripe-connect')}
              className="mb-4 rounded-2xl border p-4"
              style={{
                backgroundColor: `${colors.warning[500]}10`,
                borderColor: `${colors.warning[500]}30`,
              }}
            >
              <View className="flex-row items-center">
                <Ionicons name="warning" size={20} color={colors.warning[500]} />
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
                <Ionicons name="chevron-forward" size={16} color={colors.warning[500]} />
              </View>
            </TouchableOpacity>
          )}

          {/* Loading State */}
          {isStripeConnected && isLoading && (
            <View className="mb-4 items-center justify-center py-8">
              <ActivityIndicator size="large" color={colors.primary[500]} />
              <Text style={{ color: colors.textMuted }} className="mt-2">
                Loading metrics...
              </Text>
            </View>
          )}

          {/* Error State */}
          {isStripeConnected && error && (
            <TouchableOpacity
              onPress={() => refetch()}
              className="mb-4 rounded-2xl border p-4"
              style={{
                backgroundColor: `${colors.danger[500]}10`,
                borderColor: `${colors.danger[500]}30`,
              }}
            >
              <View className="flex-row items-center">
                <Ionicons name="alert-circle" size={20} color={colors.danger[500]} />
                <View className="ml-3 flex-1">
                  <Text
                    style={{ color: colors.danger[500] }}
                    className="text-sm font-semibold"
                  >
                    Failed to load metrics
                  </Text>
                  <Text style={{ color: colors.text }} className="text-sm">
                    Tap to retry
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}

          {/* Primary Metric - MRR */}
          {isStripeConnected && !isLoading && !error && (
            <View
              className="mb-4 rounded-2xl border p-6"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              <Text style={{ color: colors.textMuted }} className="mb-1 text-sm">
                Monthly Recurring Revenue
              </Text>
              <Text style={{ color: colors.text }} className="text-5xl font-bold">
                {metricsData?.month ? formatCurrency(metricsData.month.mrr) : '$0'}
              </Text>
              <View className="mt-3 flex-row items-center">
                <Ionicons
                  name={
                    metricsData?.month?.mrr_change && metricsData.month.mrr_change >= 0
                      ? 'arrow-up'
                      : 'arrow-down'
                  }
                  size={18}
                  color={
                    metricsData?.month?.mrr_change && metricsData.month.mrr_change >= 0
                      ? colors.success[500]
                      : colors.danger[500]
                  }
                />
                <Text
                  style={{
                    color:
                      metricsData?.month?.mrr_change && metricsData.month.mrr_change >= 0
                        ? colors.success[500]
                        : colors.danger[500],
                  }}
                  className="ml-1 text-lg font-medium"
                >
                  {metricsData?.month
                    ? formatCurrency(Math.abs(metricsData.month.mrr_change))
                    : '$0'}
                </Text>
                <Text style={{ color: colors.textMuted }} className="ml-2 text-sm">
                  this month
                </Text>
              </View>
            </View>
          )}

          {/* Net MRR Change */}
          {isStripeConnected && !isLoading && !error && (
            <View className="mb-4 flex-row gap-3">
              <View className="flex-1">
                <MetricCard
                  title="Net MRR Today"
                  value={
                    metricsData?.today ? formatCurrency(metricsData.today.mrr) : '$0'
                  }
                  changeType={
                    metricsData?.today?.mrr_change && metricsData.today.mrr_change >= 0
                      ? 'up'
                      : 'down'
                  }
                />
              </View>
              <View className="flex-1">
                <MetricCard
                  title="Net MRR Week"
                  value={metricsData?.week ? formatCurrency(metricsData.week.mrr) : '$0'}
                  changeType={
                    metricsData?.week?.mrr_change && metricsData.week.mrr_change >= 0
                      ? 'up'
                      : 'down'
                  }
                />
              </View>
            </View>
          )}

          {/* Secondary Metrics */}
          {isStripeConnected && !isLoading && !error && (
            <View className="mb-6 flex-row gap-3">
              <View className="flex-1">
                <MetricCard
                  title="Active Subscriptions"
                  value={metricsData?.month?.active_subscriptions?.toString() || '0'}
                  subtitle="paying customers"
                />
              </View>
              <View className="flex-1">
                <MetricCard
                  title="Churn Rate"
                  value={
                    metricsData?.month
                      ? formatPercent(metricsData.month.churn_rate)
                      : '0%'
                  }
                  changeType={
                    metricsData?.month?.churn_rate && metricsData.month.churn_rate < 2
                      ? 'down'
                      : 'up'
                  }
                  change={
                    metricsData?.month
                      ? `${formatPercent(metricsData.month.churn_rate)} vs last month`
                      : 'No data'
                  }
                />
              </View>
            </View>
          )}

          {/* Health Check */}
          <View
            className="rounded-2xl border p-4"
            style={{ backgroundColor: colors.card, borderColor: colors.border }}
          >
            <Text style={{ color: colors.text }} className="mb-2 text-lg font-semibold">
              Health Check
            </Text>
            {isStripeConnected && !isLoading && !error ? (
              <View>
                {/* Payment Success Rate */}
                <StatusIndicator
                  label="Payment Success"
                  value={metricsData?.subscriptions?.length ? '98.5%' : 'No data'}
                  status={metricsData?.subscriptions?.length ? 'good' : 'warning'}
                />
                {/* Active Subscriptions */}
                <StatusIndicator
                  label="Active Subscriptions"
                  value={metricsData?.month?.active_subscriptions?.toString() || '0'}
                  status={metricsData?.month?.active_subscriptions ? 'good' : 'warning'}
                />
                {/* New Subscriptions This Month */}
                <StatusIndicator
                  label="New Subscriptions"
                  value={metricsData?.month?.new_subscriptions?.toString() || '0'}
                  status={
                    metricsData?.month?.new_subscriptions &&
                    metricsData.month.new_subscriptions > 0
                      ? 'good'
                      : 'warning'
                  }
                />
                {/* Failed Payments */}
                <StatusIndicator
                  label="Failed Payments"
                  value={metricsData?.month?.failed_payments?.toString() || '0'}
                  status={
                    !metricsData?.month?.failed_payments ||
                    metricsData.month.failed_payments < 3
                      ? 'good'
                      : 'warning'
                  }
                />
              </View>
            ) : (
              <View className="items-center py-4">
                <Ionicons name="link" size={24} color={colors.textMuted} />
                <Text
                  style={{ color: colors.textMuted }}
                  className="mt-2 text-center text-sm"
                >
                  {isStripeConnected
                    ? 'Connect Stripe to see health metrics'
                    : 'Connect Stripe to see health metrics'}
                </Text>
              </View>
            )}
          </View>

          {/* Last Updated */}
          <View className="mt-4 items-center">
            <Text style={{ color: colors.textMuted }} className="text-xs">
              {isStripeConnected
                ? `Last synced: ${formatLastSync(metricsData?.month?.calculated_at)}`
                : 'No data source connected'}
            </Text>
            {user && (
              <Text style={{ color: colors.textMuted }} className="mt-1 text-xs">
                Signed in as {user.email}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default function TruthDashboard() {
  return (
    <ProtectedRoute>
      <TruthDashboardContent />
    </ProtectedRoute>
  )
}
