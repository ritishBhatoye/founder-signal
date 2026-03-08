import React from 'react'
import { Text, View } from 'react-native'

type ProgressVariant = 'primary' | 'success' | 'warning' | 'error'
type ProgressSize = 'sm' | 'md' | 'lg'

interface ProgressBarProps {
  value: number
  max?: number
  variant?: ProgressVariant
  size?: ProgressSize
  showLabel?: boolean
  className?: string
  animated?: boolean
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  className = '',
  animated = true,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const getVariantColor = () => {
    const colors = {
      primary: 'bg-primary-500',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
      error: 'bg-error-500',
    }
    return colors[variant]
  }

  const getSizeStyles = () => {
    const sizes = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    }
    return sizes[size]
  }

  return (
    <View className={`w-full ${className}`}>
      {showLabel && (
        <Text className="mb-1 text-sm text-neutral-700 dark:text-neutral-300">
          {Math.round(percentage)}%
        </Text>
      )}
      <View
        className={`w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700 ${getSizeStyles()}`}
      >
        <View
          className={`${getSizeStyles()} ${getVariantColor()} ${
            animated ? 'transition-all duration-300' : ''
          }`}
          style={{ width: `${percentage}%` }}
        />
      </View>
    </View>
  )
}

export default ProgressBar
