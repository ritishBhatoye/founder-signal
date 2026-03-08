import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Text } from '@/components/atoms'
import { ProtectedRoute } from '@/components/auth'
import { colors } from '@/constants/theme'
import { useAuthContext } from '@/contexts'
import { useStripeAccount } from '@/hooks/auth'
import { useGetSettingsQuery, useGetSupportPressureQuery } from '@/hooks/useData'

interface SettingsRowProps {
  icon: keyof typeof Ionicons.glyphMap
  iconColor?: string
  title: string
  subtitle?: string
  rightElement?: React.ReactNode
  onPress?: () => void
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
      className="flex-row items-center border border-b py-4"
    >
      <View
        className="mr-3 h-10 w-10 items-center justify-center rounded-full"
        style={{ backgroundColor: `${iconColor}20` }}
      >
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>
      <View className="flex-1">
        <Text style={{ color: colors.text }} className="text-base">
          {title}
        </Text>
        {subtitle && (
          <Text style={{ color: colors.textMuted }} className="mt-0.5 text-sm">
            {subtitle}
          </Text>
        )}
      </View>
      {rightElement || (
        <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
      )}
    </TouchableOpacity>
  )
}

function SettingsContent() {
  const router = useRouter()
  const { user, signOut } = useAuthContext()
  const {
    isConnected: isStripeConnected,
    isLoading: isStripeLoading,
    stripeAccount,
    disconnectStripeAccount,
  } = useStripeAccount(user?.id)

  const { data: settings, isLoading: isSettingsLoading } = useGetSettingsQuery(
    undefined,
    {
      skip: !user,
    },
  )

  const { data: supportPressureData } = useGetSupportPressureQuery(undefined, {
    skip: !isStripeConnected,
  })

  const handleSignOut = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await signOut()
          router.replace('/auth/sign-in')
        },
      },
    ])
  }

  const handleConnectStripe = () => {
    router.push('/stripe-connect')
  }

  const handleDisconnectStripe = async () => {
    Alert.alert(
      'Disconnect Stripe',
      'This will remove all your Stripe data and metrics. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Disconnect',
          style: 'destructive',
          onPress: async () => {
            const result = await disconnectStripeAccount()
            if (result.success) {
              Alert.alert('Success', 'Stripe account disconnected')
            } else {
              Alert.alert('Error', result.error || 'Failed to disconnect')
            }
          },
        },
      ],
    )
  }

  const getSupportPressureLabel = (value?: number) => {
    switch (value) {
      case 1:
        return 'Low'
      case 2:
        return 'Medium'
      case 3:
        return 'High'
      default:
        return 'Not set'
    }
  }

  const getSupportPressureColor = (value?: number) => {
    switch (value) {
      case 1:
        return colors.success[500]
      case 2:
        return colors.warning[500]
      case 3:
        return colors.danger[500]
      default:
        return colors.textMuted
    }
  }

  const isLoading = isStripeLoading || isSettingsLoading

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.bg }}>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="p-4">
          {/* Header */}
          <View className="mb-6">
            <Text style={{ color: colors.text }} className="text-2xl font-bold">
              Settings
            </Text>
            <Text style={{ color: colors.textMuted }} className="mt-1 text-sm">
              Manage your FounderOps account
            </Text>
          </View>

          {/* Loading State */}
          {isLoading && (
            <View className="mb-4 items-center justify-center py-8">
              <ActivityIndicator size="large" color={colors.primary[500]} />
              <Text style={{ color: colors.textMuted }} className="mt-2">
                Loading settings...
              </Text>
            </View>
          )}

          {/* Stripe Connection */}
          <View
            className="mb-6 rounded-2xl border p-4"
            style={{
              backgroundColor: colors.card,
              borderColor: isStripeConnected
                ? `${colors.success[500]}40`
                : `${colors.stripe}40`,
            }}
          >
            <View className="mb-3 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View
                  className="mr-3 h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${colors.stripe}20` }}
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
                    {isStripeConnected ? 'Connected' : 'Not connected'}
                  </Text>
                </View>
              </View>
              {isStripeConnected ? (
                <View className="flex-row items-center">
                  <View
                    className="mr-2 h-2 w-2 rounded-full"
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
                  className="rounded-full px-4 py-2"
                  style={{ backgroundColor: colors.stripe }}
                >
                  <Text className="text-sm font-medium text-white">Connect</Text>
                </TouchableOpacity>
              )}
            </View>

            {isStripeConnected && stripeAccount && (
              <View className="border border-t pt-3">
                <View className="mb-2 flex-row justify-between">
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
                    {stripeAccount.livemode ? 'Live' : 'Test'}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Notifications */}
          <View
            className="mb-6 overflow-hidden rounded-2xl border"
            style={{ backgroundColor: colors.card }}
          >
            <View className="border border-b p-4">
              <Text style={{ color: colors.text }} className="text-base font-semibold">
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
                    className="h-6 w-10 justify-center rounded-full px-1"
                    style={{
                      backgroundColor:
                        settings?.push_enabled !== false
                          ? colors.success[500]
                          : colors.border,
                    }}
                  >
                    <View
                      className="h-4 w-4 rounded-full bg-white"
                      style={{
                        alignSelf:
                          settings?.push_enabled !== false ? 'flex-end' : 'flex-start',
                      }}
                    />
                  </View>
                }
              />
              <SettingsRow
                icon="time"
                iconColor={colors.warning[500]}
                title="Daily Summary Time"
                subtitle={
                  settings?.daily_summary_time
                    ? new Date(
                        `2000-01-01T${settings.daily_summary_time}`,
                      ).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                      })
                    : '9:00 AM'
                }
              />
            </View>
          </View>

          {/* Support Pressure (Manual Input v1) */}
          <View
            className="mb-6 overflow-hidden rounded-2xl border"
            style={{ backgroundColor: colors.card }}
          >
            <View className="border border-b p-4">
              <Text style={{ color: colors.text }} className="text-base font-semibold">
                Manual Inputs
              </Text>
              <Text style={{ color: colors.textMuted }} className="mt-1 text-sm">
                Data we cannot pull automatically (yet)
              </Text>
            </View>
            <View className="px-4">
              <SettingsRow
                icon="chatbubbles"
                iconColor={getSupportPressureColor(supportPressureData?.support_pressure)}
                title="Support Pressure"
                subtitle={`Currently: ${getSupportPressureLabel(supportPressureData?.support_pressure)}`}
                onPress={() => router.push('/support-pressure')}
              />
            </View>
          </View>

          {/* Account */}
          <View
            className="mb-6 overflow-hidden rounded-2xl border"
            style={{ backgroundColor: colors.card }}
          >
            <View className="border border-b p-4">
              <Text style={{ color: colors.text }} className="text-base font-semibold">
                Account
              </Text>
            </View>
            <View className="px-4">
              <SettingsRow
                icon="person"
                title="Profile"
                subtitle={user?.email || 'Not signed in'}
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
            className="overflow-hidden rounded-2xl border"
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
            <Text style={{ color: colors.textMuted }} className="mt-1 text-xs">
              Built for solo founders
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default function SettingsScreen() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  )
}
