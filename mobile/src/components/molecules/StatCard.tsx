import { View } from 'react-native'

import { Card, Icon, Text } from '@/components/atoms'

import type { Ionicons } from '@expo/vector-icons'

interface StatCardProps {
  title: string
  value: string | number
  icon: keyof typeof Ionicons.glyphMap
  color?: string
  subtitle?: string
}

export const StatCard = ({
  title,
  value,
  icon,
  color = '#3B82F6',
  subtitle,
}: StatCardProps) => (
  <Card variant="elevated">
    <View className="flex-row items-center justify-between">
      <View className="flex-1">
        <Text className="mb-1 text-sm text-gray-600">{title}</Text>
        <Text className="text-2xl font-bold text-gray-900">{value}</Text>
        {subtitle && <Text className="mt-1 text-xs text-gray-500">{subtitle}</Text>}
      </View>
      <View
        className="h-12 w-12 items-center justify-center rounded-full"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon name={icon} size={24} color={color} />
      </View>
    </View>
  </Card>
)
