import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { Colors } from '@/constants/colors'
import { useTheme } from '@/contexts/ThemeContext'

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
  error?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  error = false,
  className = '',
  size = 'md',
}) => {
  const { isDark } = useTheme()

  const getSizeStyles = () => {
    const sizes = {
      sm: { box: 'w-4 h-4', icon: 14, text: 'text-sm' },
      md: { box: 'w-5 h-5', icon: 16, text: 'text-base' },
      lg: { box: 'w-6 h-6', icon: 20, text: 'text-lg' },
    }
    return sizes[size]
  }

  const sizeStyles = getSizeStyles()

  const getBorderColor = () => {
    if (error) return 'border-error-500'
    if (checked) return 'border-primary-500'
    return isDark ? 'border-neutral-600' : 'border-neutral-400'
  }

  const getBackgroundColor = () => {
    if (checked) return 'bg-primary-500'
    return isDark ? 'bg-neutral-800' : 'bg-white'
  }

  return (
    <TouchableOpacity
      onPress={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`flex-row items-center ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      <View
        className={`items-center justify-center rounded border-2 ${
          sizeStyles.box
        } ${getBorderColor()} ${getBackgroundColor()}`}
      >
        {checked && (
          <Ionicons name="checkmark" size={sizeStyles.icon} color={Colors.text.inverse} />
        )}
      </View>
      {label && (
        <Text
          className={`ml-2 ${sizeStyles.text} ${
            error ? 'text-error-500' : 'text-neutral-900 dark:text-neutral-100'
          }`}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default Checkbox
