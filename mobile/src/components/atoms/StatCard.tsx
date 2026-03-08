import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: keyof typeof Ionicons.glyphMap
  iconColor?: string
  iconBg?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  onPress?: () => void
  className?: string
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  iconColor = '#3B82F6',
  iconBg = '#EFF6FF',
  trend,
  trendValue,
  onPress,
  className = '',
}) => {
  const getTrendIcon = () => {
    if (trend === 'up') return 'trending-up'
    if (trend === 'down') return 'trending-down'
    return 'remove'
  }

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success-600'
    if (trend === 'down') return 'text-error-600'
    return 'text-neutral-600'
  }

  const Component = onPress ? TouchableOpacity : View

  return (
    <Component
      onPress={onPress}
      className={`rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800 ${className}`}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="mb-1 text-sm text-neutral-600 dark:text-neutral-400">
            {title}
          </Text>
          <Text className="mb-1 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {value}
          </Text>
          {subtitle && (
            <Text className="text-xs text-neutral-500 dark:text-neutral-500">
              {subtitle}
            </Text>
          )}
          {trend && trendValue && (
            <View className="mt-2 flex-row items-center">
              <Ionicons name={getTrendIcon()} size={16} className={getTrendColor()} />
              <Text className={`ml-1 text-xs font-medium ${getTrendColor()}`}>
                {trendValue}
              </Text>
            </View>
          )}
        </View>
        {icon && (
          <View
            className="items-center justify-center rounded-full p-3"
            style={{ backgroundColor: iconBg }}
          >
            <Ionicons name={icon} size={24} color={iconColor} />
          </View>
        )}
      </View>
    </Component>
  )
}

export default StatCard
