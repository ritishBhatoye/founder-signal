import Ionicons from '@expo/vector-icons/Ionicons'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Text } from '@/components/atoms'
import { ProtectedRoute } from '@/components/auth'
import { AlertCard } from '@/components/founderops'
import { colors } from '@/constants/theme'
import { useAuthContext } from '@/contexts'
import { useStripeAccount } from '@/hooks/auth'
import {
  useGetAlertsQuery,
  useMarkAlertAsReadMutation,
  useDismissAlertMutation,
} from '@/hooks/useData'

import type { AlertType as AlertTypeEnum } from '@/types/metrics'

interface AlertTypeToggleProps {
  label: string
  enabled: boolean
}

function AlertTypeToggle({ label, enabled }: AlertTypeToggleProps) {
  return (
    <View
      className="flex-row items-center justify-between border-b py-3"
      style={{ borderColor: colors.border }}
    >
      <Text style={{ color: colors.text }} className="text-sm">
        {label}
      </Text>
      <View
        className="h-6 w-10 justify-center rounded-full px-1"
        style={{
          backgroundColor: enabled ? colors.success[500] : colors.border,
        }}
      >
        <View
          className="h-4 w-4 rounded-full bg-white"
          style={{ alignSelf: enabled ? 'flex-end' : 'flex-start' }}
        />
      </View>
    </View>
  )
}

// Alert type configuration
const alertTypes: { type: AlertTypeEnum; label: string }[] = [
  { type: 'revenue_drop', label: 'Revenue Drop (>5%)' },
  { type: 'churn_spike', label: 'Churn Spike (>2x normal)' },
  { type: 'failed_payments', label: 'Failed Payments Surge' },
]

function AlertsContent() {
  const { user } = useAuthContext()
  const { isConnected: isStripeConnected } = useStripeAccount(user?.id)

  const { data, isLoading, error } = useGetAlertsQuery(undefined, {
    skip: !isStripeConnected,
  })

  const [markAsRead] = useMarkAlertAsReadMutation()

  const alerts = data?.alerts || []
  const unreadCount = data?.unreadCount || 0

  const handleAlertPress = async (alertId: string) => {
    try {
      await markAsRead(alertId).unwrap()
    } catch (err) {
      console.error('Failed to mark alert as read:', err)
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.bg }}>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="p-4">
          {/* Header */}
          <View className="mb-6">
            <View className="flex-row items-center justify-between">
              <Text style={{ color: colors.text }} className="text-2xl font-bold">
                Alerts
              </Text>
              {unreadCount > 0 && (
                <View
                  className="rounded-full px-3 py-1"
                  style={{ backgroundColor: colors.danger[500] }}
                >
                  <Text className="text-sm font-medium text-white">
                    {unreadCount} new
                  </Text>
                </View>
              )}
            </View>
            <Text style={{ color: colors.textMuted }} className="mt-1 text-sm">
              Revenue drops, churn spikes, failed payments
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
                  Connect Stripe to see alerts
                </Text>
              </View>
            </View>
          )}

          {isStripeConnected && isLoading && (
            <View className="items-center justify-center py-8">
              <ActivityIndicator size="large" color={colors.primary[500]} />
              <Text style={{ color: colors.textMuted }} className="mt-2">
                Loading alerts...
              </Text>
            </View>
          )}

          {/* Error State */}
          {isStripeConnected && error && (
            <View
              className="mb-4 rounded-2xl border p-4"
              style={{
                backgroundColor: `${colors.danger[500]}10`,
                borderColor: `${colors.danger[500]}30`,
              }}
            >
              <View className="flex-row items-center">
                <Ionicons name="alert-circle" size={20} color={colors.danger[500]} />
                <Text style={{ color: colors.danger[500] }} className="ml-2 text-sm">
                  Failed to load alerts
                </Text>
              </View>
            </View>
          )}

          {/* Alert Types Config */}
          <View
            className="mb-6 rounded-2xl border p-4"
            style={{ backgroundColor: colors.card, borderColor: colors.border }}
          >
            <Text style={{ color: colors.text }} className="mb-3 text-base font-semibold">
              Active Alerts (3 types)
            </Text>
            {alertTypes.map((item) => (
              <AlertTypeToggle key={item.type} label={item.label} enabled />
            ))}
          </View>

          {/* Alerts List */}
          {isStripeConnected && !isLoading && alerts.length > 0 && (
            <>
              <Text style={{ color: colors.text }} className="mb-3 text-lg font-semibold">
                Recent Alerts
              </Text>

              {alerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  type={alert.type as AlertTypeEnum}
                  title={alert.title}
                  description={alert.description || ''}
                  timestamp={formatTimestamp(alert.triggered_at)}
                  isRead={alert.is_read}
                  onPress={() => handleAlertPress(alert.id)}
                />
              ))}
            </>
          )}

          {/* Empty State */}
          {isStripeConnected && !isLoading && alerts.length === 0 && (
            <View
              className="items-center rounded-2xl border p-8"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              <Ionicons name="checkmark-circle" size={48} color={colors.success[500]} />
              <Text style={{ color: colors.text }} className="mt-4 text-lg font-semibold">
                All Clear
              </Text>
              <Text
                style={{ color: colors.textMuted }}
                className="mt-2 text-center text-sm"
              >
                No alerts right now. Your SaaS is running smoothly.
              </Text>
            </View>
          )}

          {/* User Info */}
          {user && (
            <View className="mt-8 items-center">
              <Text style={{ color: colors.textMuted }} className="text-xs">
                Monitoring alerts for {user.email}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default function AlertsScreen() {
  return (
    <ProtectedRoute>
      <AlertsContent />
    </ProtectedRoute>
  )
}
