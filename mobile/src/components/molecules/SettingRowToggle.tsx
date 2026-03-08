/**
 * SettingRowToggle - Settings row with toggle switch
 * Usage: <SettingRowToggle label="Push Notifications" value={enabled} onToggle={setEnabled} />
 */
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Switch, Text, View } from 'react-native'

import { Colors } from '@/constants/colors'
import { useTheme } from '@/contexts/ThemeContext'

interface SettingRowToggleProps {
  label: string
  description?: string
  icon?: keyof typeof Ionicons.glyphMap
  value: boolean
  onToggle: (value: boolean) => void
  disabled?: boolean
  className?: string
}

const SettingRowToggle: React.FC<SettingRowToggleProps> = ({
  label,
  description,
  icon,
  value,
  onToggle,
  disabled = false,
  className = '',
}) => {
  const { isDark } = useTheme()

  return (
    <View className={`flex-row items-center py-4 ${className}`}>
      {icon && (
        <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
          <Ionicons
            name={icon}
            size={20}
            color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
          />
        </View>
      )}
      <View className="flex-1">
        <Text className="text-base font-medium text-neutral-900 dark:text-neutral-100">
          {label}
        </Text>
        {description && (
          <Text className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
            {description}
          </Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        disabled={disabled}
        trackColor={{
          false: isDark ? Colors.neutral[700] : Colors.neutral[300],
          true: Colors.primary[500],
        }}
        thumbColor={value ? Colors.primary[100] : Colors.neutral[50]}
      />
    </View>
  )
}

export default SettingRowToggle
