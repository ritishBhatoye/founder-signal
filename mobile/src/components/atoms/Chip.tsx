import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type ChipVariant = 'filled' | 'outlined' | 'light'
type ChipColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral'

interface ChipProps {
  label: string
  variant?: ChipVariant
  color?: ChipColor
  onPress?: () => void
  onDelete?: () => void
  icon?: React.ReactNode
  disabled?: boolean
  className?: string
}

const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'filled',
  color = 'primary',
  onPress,
  onDelete,
  icon,
  disabled = false,
  className = '',
}) => {
  const getVariantStyles = () => {
    const styles = {
      filled: {
        primary: 'bg-primary-500 border-primary-500',
        secondary: 'bg-secondary-500 border-secondary-500',
        success: 'bg-success-500 border-success-500',
        warning: 'bg-warning-500 border-warning-500',
        error: 'bg-error-500 border-error-500',
        neutral: 'bg-neutral-500 border-neutral-500',
      },
      outlined: {
        primary: 'bg-transparent border-primary-500',
        secondary: 'bg-transparent border-secondary-500',
        success: 'bg-transparent border-success-500',
        warning: 'bg-transparent border-warning-500',
        error: 'bg-transparent border-error-500',
        neutral: 'bg-transparent border-neutral-500',
      },
      light: {
        primary: 'bg-primary-100 border-primary-100',
        secondary: 'bg-secondary-100 border-secondary-100',
        success: 'bg-success-100 border-success-100',
        warning: 'bg-warning-100 border-warning-100',
        error: 'bg-error-100 border-error-100',
        neutral: 'bg-neutral-100 border-neutral-100',
      },
    }
    return styles[variant][color]
  }

  const getTextStyles = () => {
    const styles = {
      filled: 'text-white',
      outlined: {
        primary: 'text-primary-700',
        secondary: 'text-secondary-700',
        success: 'text-success-700',
        warning: 'text-warning-700',
        error: 'text-error-700',
        neutral: 'text-neutral-700',
      },
      light: {
        primary: 'text-primary-700',
        secondary: 'text-secondary-700',
        success: 'text-success-700',
        warning: 'text-warning-700',
        error: 'text-error-700',
        neutral: 'text-neutral-700',
      },
    }
    return variant === 'filled' ? styles.filled : styles[variant][color]
  }

  const Component = onPress ? TouchableOpacity : View

  return (
    <Component
      onPress={onPress}
      disabled={disabled}
      className={`flex-row items-center rounded-full border px-3 py-1.5 ${getVariantStyles()} ${
        disabled ? 'opacity-50' : ''
      } ${className}`}
    >
      {icon && <View className="mr-1.5">{icon}</View>}
      <Text className={`text-sm font-medium ${getTextStyles()}`}>{label}</Text>
      {onDelete && (
        <TouchableOpacity onPress={onDelete} className="ml-1.5" disabled={disabled}>
          <Ionicons
            name="close-circle"
            size={16}
            color={variant === 'filled' ? '#fff' : undefined}
          />
        </TouchableOpacity>
      )}
    </Component>
  )
}

export default Chip
