/**
 * NavIcon - Navigation icon with optional badge
 * Usage: <NavIcon name="home" active={true} badge={3} />
 */
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { View } from 'react-native'

import { Colors } from '@/constants/colors'
import { useTheme } from '@/contexts/ThemeContext'

interface NavIconProps {
  name: keyof typeof Ionicons.glyphMap
  active?: boolean
  badge?: number
  size?: number
  className?: string
}

const NavIcon: React.FC<NavIconProps> = ({
  name,
  active = false,
  badge,
  size = 24,
  className = '',
}) => {
  const { isDark } = useTheme()
  const color = active
    ? Colors.primary[600]
    : isDark
      ? Colors.neutral[400]
      : Colors.neutral[500]

  return (
    <View className={`relative ${className}`}>
      <Ionicons name={name} size={size} color={color} />
      {badge !== undefined && badge > 0 && (
        <View className="absolute -right-1 -top-1 h-4 min-w-[16px] items-center justify-center rounded-full bg-error-500 px-1">
          <Ionicons name="ellipse" size={8} color="#fff" />
        </View>
      )}
    </View>
  )
}

export default NavIcon
