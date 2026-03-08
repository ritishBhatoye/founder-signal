import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { colors } from '@/constants/theme'

import type { AlertType } from '@/types/metrics'

interface AlertCardProps {
  type: AlertType
  title: string
  description: string
  timestamp: string
  isRead?: boolean
  onPress?: () => void
}

const alertConfig: Record<
  AlertType,
  { icon: keyof typeof Ionicons.glyphMap; color: string }
> = {
  revenue_drop: { icon: 'trending-down', color: colors.danger[500] },
  churn_spike: { icon: 'people', color: colors.danger[500] },
  failed_payments: { icon: 'card', color: colors.warning[500] },
}

export function AlertCard({
  type,
  title,
  description,
  timestamp,
  isRead,
  onPress,
}: AlertCardProps) {
  const config = alertConfig[type]

  return (
    <TouchableOpacity
      onPress={onPress}
      className="mb-3 rounded-2xl border p-4"
      style={{
        backgroundColor: isRead ? colors.card : `${config.color}15`,
        borderColor: isRead ? colors.border : `${config.color}40`,
      }}
    >
      <View className="flex-row items-start">
        <View
          className="mr-3 h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: `${config.color}20` }}
        >
          <Ionicons name={config.icon} size={20} color={config.color} />
        </View>
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text style={{ color: colors.text }} className="text-base font-semibold">
              {title}
            </Text>
            {!isRead && (
              <View
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: config.color }}
              />
            )}
          </View>
          <Text style={{ color: colors.textMuted }} className="mt-1 text-sm">
            {description}
          </Text>
          <Text style={{ color: colors.textMuted }} className="mt-2 text-xs">
            {timestamp}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
