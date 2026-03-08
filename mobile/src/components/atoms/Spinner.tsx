import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

import { Colors } from '@/constants/colors'
import { useTheme } from '@/contexts/ThemeContext'

type SpinnerSize = 'small' | 'large'
type SpinnerVariant = 'primary' | 'secondary' | 'white' | 'neutral'

interface SpinnerProps {
  size?: SpinnerSize
  variant?: SpinnerVariant
  label?: string
  className?: string
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'small',
  variant = 'primary',
  label,
  className = '',
}) => {
  const { isDark } = useTheme()

  const getColor = () => {
    const colors = {
      primary: Colors.primary[500],
      secondary: Colors.secondary[500],
      white: Colors.text.inverse,
      neutral: isDark ? Colors.neutral[300] : Colors.neutral[600],
    }
    return colors[variant]
  }

  return (
    <View className={`items-center justify-center ${className}`}>
      <ActivityIndicator size={size} color={getColor()} />
      {label && (
        <Text className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
          {label}
        </Text>
      )}
    </View>
  )
}

export default Spinner
