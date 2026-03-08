/**
 * NotificationCenter - Notification list with grouping
 * Usage: <NotificationCenter notifications={notifications} onPress={handlePress} />
 */
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'

import { Colors } from '@/constants/colors'

import EmptyStateText from '../atoms/EmptyStateText'

interface Notification {
  id: string
  title: string
  message: string
  type: 'approval' | 'leave' | 'attendance' | 'system'
  read: boolean
  timestamp: string
}

interface NotificationCenterProps {
  notifications: Notification[]
  onPress: (id: string) => void
  onMarkAllRead?: () => void
  className?: string
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onPress,
  onMarkAllRead,
  className = '',
}) => {
  const iconMap = {
    approval: { name: 'checkmark-circle' as const, color: Colors.success[500] },
    leave: { name: 'calendar' as const, color: Colors.primary[500] },
    attendance: { name: 'time' as const, color: Colors.warning[500] },
    system: { name: 'information-circle' as const, color: Colors.info[500] },
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <View className={`flex-1 ${className}`}>
      {unreadCount > 0 && onMarkAllRead && (
        <View className="mb-2 flex-row items-center justify-between px-4 py-2">
          <Text className="text-sm text-neutral-500">{unreadCount} unread</Text>
          <TouchableOpacity onPress={onMarkAllRead}>
            <Text className="text-sm font-medium text-primary-600">Mark all read</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const icon = iconMap[item.type]
          return (
            <TouchableOpacity
              onPress={() => onPress(item.id)}
              className={`flex-row border-b border-neutral-100 p-4 dark:border-neutral-800 ${
                !item.read ? 'bg-primary-50/50 dark:bg-primary-900/20' : ''
              }`}
            >
              <View className="h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                <Ionicons name={icon.name} size={20} color={icon.color} />
              </View>
              <View className="ml-3 flex-1">
                <Text
                  className={`text-base ${
                    !item.read ? 'font-semibold' : 'font-medium'
                  } text-neutral-900 dark:text-neutral-100`}
                >
                  {item.title}
                </Text>
                <Text
                  className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-400"
                  numberOfLines={2}
                >
                  {item.message}
                </Text>
                <Text className="mt-1 text-xs text-neutral-400">{item.timestamp}</Text>
              </View>
              {!item.read && (
                <View className="mt-2 h-2 w-2 rounded-full bg-primary-500" />
              )}
            </TouchableOpacity>
          )
        }}
        ListEmptyComponent={
          <View className="items-center py-12">
            <Ionicons
              name="notifications-off-outline"
              size={64}
              color={Colors.neutral[300]}
            />
            <EmptyStateText>No notifications</EmptyStateText>
          </View>
        }
      />
    </View>
  )
}

export default NotificationCenter
