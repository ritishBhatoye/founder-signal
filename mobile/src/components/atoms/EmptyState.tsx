import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Text, View } from 'react-native'

import { Colors } from '@/constants/colors'
import { useTheme } from '@/contexts/ThemeContext'

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'folder-open-outline',
  title,
  description,
  action,
  className = '',
}) => {
  const { isDark } = useTheme()

  return (
    <View className={`items-center justify-center py-12 ${className}`}>
      <View className="mb-4 items-center justify-center rounded-full bg-neutral-100 p-6 dark:bg-neutral-800">
        <Ionicons
          name={icon}
          size={48}
          color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
        />
      </View>
      <Text className="mb-2 text-center text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        {title}
      </Text>
      {description && (
        <Text className="mb-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
          {description}
        </Text>
      )}
      {action && <View>{action}</View>}
    </View>
  )
}

export default EmptyState
