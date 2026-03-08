import React from 'react'
import { Text, TextInput, View } from 'react-native'

import { useTheme } from '@/contexts/ThemeContext'

interface TextAreaProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  label?: string
  error?: string
  touched?: boolean
  disabled?: boolean
  maxLength?: number
  rows?: number
  showCharCount?: boolean
  className?: string
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  touched,
  disabled = false,
  maxLength,
  rows = 4,
  showCharCount = false,
  className = '',
}) => {
  const { isDark } = useTheme()
  const isInvalid = !!error && !!touched

  return (
    <View className={`mb-4 w-full ${className}`}>
      {label && (
        <Text className="mb-1 text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {label}
        </Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
        editable={!disabled}
        maxLength={maxLength}
        multiline
        numberOfLines={rows}
        textAlignVertical="top"
        className={`rounded-lg border px-4 py-3 text-base ${
          isInvalid ? 'border-error-500' : 'border-neutral-300 dark:border-neutral-600'
        } ${
          disabled ? 'opacity-50' : ''
        } bg-white text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100`}
        style={{ minHeight: rows * 24 }}
      />
      {(showCharCount || isInvalid) && (
        <View className="mt-1 flex-row items-center justify-between">
          {isInvalid && <Text className="text-xs text-error-500">{error}</Text>}
          {showCharCount && maxLength && (
            <Text className="ml-auto text-xs text-neutral-500">
              {value.length}/{maxLength}
            </Text>
          )}
        </View>
      )}
    </View>
  )
}

export default TextArea
