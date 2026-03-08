import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { useTheme } from '@/contexts/ThemeContext'

interface RadioProps {
  selected: boolean
  onSelect: () => void
  label?: string
  disabled?: boolean
  error?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const Radio: React.FC<RadioProps> = ({
  selected,
  onSelect,
  label,
  disabled = false,
  error = false,
  className = '',
  size = 'md',
}) => {
  const { isDark } = useTheme()

  const getSizeStyles = () => {
    const sizes = {
      sm: { outer: 'w-4 h-4', inner: 'w-2 h-2', text: 'text-sm' },
      md: { outer: 'w-5 h-5', inner: 'w-2.5 h-2.5', text: 'text-base' },
      lg: { outer: 'w-6 h-6', inner: 'w-3 h-3', text: 'text-lg' },
    }
    return sizes[size]
  }

  const sizeStyles = getSizeStyles()

  const getBorderColor = () => {
    if (error) return 'border-error-500'
    if (selected) return 'border-primary-500'
    return isDark ? 'border-neutral-600' : 'border-neutral-400'
  }

  return (
    <TouchableOpacity
      onPress={() => !disabled && onSelect()}
      disabled={disabled}
      className={`flex-row items-center ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      <View
        className={`items-center justify-center rounded-full border-2 ${
          sizeStyles.outer
        } ${getBorderColor()} ${isDark ? 'bg-neutral-800' : 'bg-white'}`}
      >
        {selected && (
          <View className={`rounded-full bg-primary-500 ${sizeStyles.inner}`} />
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

export default Radio
