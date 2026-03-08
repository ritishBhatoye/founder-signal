/**
 * SettingsScreenSection - Settings section with grouped options
 * Usage: <SettingsScreenSection title="Notifications" items={items} />
 */
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { Colors } from '@/constants/colors'
import { useTheme } from '@/contexts/ThemeContext'

import SettingRowToggle from '../molecules/SettingRowToggle'

interface SettingItem {
  id: string
  type: 'toggle' | 'link' | 'action'
  icon?: keyof typeof Ionicons.glyphMap
  label: string
  description?: string
  value?: boolean
  onToggle?: (value: boolean) => void
  onPress?: () => void
  danger?: boolean
}

interface SettingsScreenSectionProps {
  title?: string
  items: SettingItem[]
  className?: string
}

const SettingsScreenSection: React.FC<SettingsScreenSectionProps> = ({
  title,
  items,
  className = '',
}) => {
  const { isDark } = useTheme()

  return (
    <View className={`rounded-2xl bg-white dark:bg-neutral-800 ${className}`}>
      {title && (
        <Text className="px-4 pb-2 pt-4 text-sm font-semibold uppercase text-neutral-500">
          {title}
        </Text>
      )}
      {items.map((item, index) => {
        if (item.type === 'toggle') {
          return (
            <View
              key={item.id}
              className={`px-4 ${
                index < items.length - 1
                  ? 'border-b border-neutral-100 dark:border-neutral-700'
                  : ''
              }`}
            >
              <SettingRowToggle
                icon={item.icon}
                label={item.label}
                description={item.description}
                value={item.value || false}
                onToggle={item.onToggle!}
              />
            </View>
          )
        }
        return (
          <TouchableOpacity
            key={item.id}
            onPress={item.onPress}
            className={`flex-row items-center px-4 py-4 ${
              index < items.length - 1
                ? 'border-b border-neutral-100 dark:border-neutral-700'
                : ''
            }`}
          >
            {item.icon && (
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-700">
                <Ionicons
                  name={item.icon}
                  size={20}
                  color={
                    item.danger
                      ? Colors.error[500]
                      : isDark
                        ? Colors.neutral[300]
                        : Colors.neutral[600]
                  }
                />
              </View>
            )}
            <View className="flex-1">
              <Text
                className={`text-base font-medium ${
                  item.danger
                    ? 'text-error-500'
                    : 'text-neutral-900 dark:text-neutral-100'
                }`}
              >
                {item.label}
              </Text>
              {item.description && (
                <Text className="mt-0.5 text-sm text-neutral-500">
                  {item.description}
                </Text>
              )}
            </View>
            {item.type === 'link' && (
              <Ionicons name="chevron-forward" size={20} color={Colors.neutral[400]} />
            )}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default SettingsScreenSection
