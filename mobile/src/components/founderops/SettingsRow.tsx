import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { colors } from '@/constants/theme'

interface SettingsRowProps {
  icon: keyof typeof Ionicons.glyphMap
  iconColor?: string
  title: string
  subtitle?: string
  rightElement?: React.ReactNode
  onPress?: () => void
}

export function SettingsRow({
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
      className="flex-row items-center border-b border-neutral-800 py-4"
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
