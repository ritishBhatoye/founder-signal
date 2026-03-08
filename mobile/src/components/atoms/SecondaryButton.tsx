/**
 * SecondaryButton - Outlined/ghost button for secondary actions
 * Usage: <SecondaryButton onPress={handleCancel}>Cancel</SecondaryButton>
 */
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'

import { Colors } from '@/constants/colors'
import { tva } from '@/utils/tva'

type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonVariant = 'outlined' | 'ghost'

interface SecondaryButtonProps {
  children: React.ReactNode
  onPress: () => void
  size?: ButtonSize
  variant?: ButtonVariant
  disabled?: boolean
  loading?: boolean
  icon?: keyof typeof Ionicons.glyphMap
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  danger?: boolean
  className?: string
}

const buttonStyle = tva({
  base: 'flex-row items-center justify-center rounded-xl',
  variants: {
    variant: {
      outlined: 'border-2 border-primary-600 bg-transparent',
      ghost: 'bg-transparent',
    },
    size: {
      sm: 'px-4 py-2',
      md: 'px-6 py-3',
      lg: 'px-8 py-4',
    },
    disabled: {
      true: 'opacity-50',
    },
    fullWidth: {
      true: 'w-full',
    },
    danger: {
      true: 'border-error-500',
    },
  },
  defaultVariants: {
    variant: 'outlined',
    size: 'md',
  },
})

const textStyle = tva({
  base: 'font-semibold',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
    danger: {
      true: 'text-error-500',
      false: 'text-primary-600 dark:text-primary-400',
    },
  },
  defaultVariants: {
    size: 'md',
    danger: false,
  },
})

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  onPress,
  size = 'md',
  variant = 'outlined',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  danger = false,
  className = '',
}) => {
  const iconSizes = { sm: 16, md: 20, lg: 24 }
  const iconColor = danger ? Colors.error[500] : Colors.primary[600]

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={buttonStyle({
        variant,
        size,
        disabled: disabled || loading,
        fullWidth,
        danger,
        className,
      })}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={iconColor} size="small" />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Ionicons
              name={icon}
              size={iconSizes[size]}
              color={iconColor}
              style={{ marginRight: 8 }}
            />
          )}
          <Text className={textStyle({ size, danger })}>{children}</Text>
          {icon && iconPosition === 'right' && (
            <Ionicons
              name={icon}
              size={iconSizes[size]}
              color={iconColor}
              style={{ marginLeft: 8 }}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  )
}

export default SecondaryButton
