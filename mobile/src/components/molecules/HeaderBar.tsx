/**
 * HeaderBar - Screen header with back button, title, and optional actions
 * Usage: <HeaderBar title="Apply Leave" onBack={goBack} showNotification />
 */
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { Colors } from '@/constants/colors'
import { useTheme } from '@/contexts/ThemeContext'

import NotificationDot from '../atoms/NotificationDot'

interface HeaderBarProps {
  title: string
  onBack?: () => void
  showNotification?: boolean
  notificationCount?: number
  onNotificationPress?: () => void
  rightAction?: React.ReactNode
  className?: string
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  onBack,
  showNotification = false,
  notificationCount = 0,
  onNotificationPress,
  rightAction,
  className = '',
}) => {
  const { isDark } = useTheme()
  const iconColor = isDark ? Colors.neutral[100] : Colors.neutral[900]

  return (
    <View className={`flex-row items-center justify-between px-4 py-4 ${className}`}>
      <View className="flex-1 flex-row items-center">
        {onBack && (
          <TouchableOpacity onPress={onBack} className="mr-3 p-1" activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color={iconColor} />
          </TouchableOpacity>
        )}
        <Text
          className="flex-1 text-xl font-bold text-neutral-900 dark:text-neutral-100"
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>
      <View className="flex-row items-center">
        {showNotification && (
          <TouchableOpacity
            onPress={onNotificationPress}
            className="relative p-2"
            activeOpacity={0.7}
          >
            <Ionicons name="notifications-outline" size={24} color={iconColor} />
            {notificationCount > 0 && (
              <View className="absolute right-1 top-1">
                <NotificationDot count={notificationCount} size="md" showCount />
              </View>
            )}
          </TouchableOpacity>
        )}
        {rightAction}
      </View>
    </View>
  )
}

export default HeaderBar
