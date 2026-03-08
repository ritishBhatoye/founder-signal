/**
 * TextAreaField - Multi-line text input for descriptions
 * Usage: <TextAreaField placeholder="Describe your reason..." rows={4} />
 */
import React from 'react'
import { Text, TextInput, View } from 'react-native'

import { Colors } from '@/constants/colors'
import { useTheme } from '@/contexts/ThemeContext'
import { tva } from '@/utils/tva'

import type { TextInputProps } from 'react-native'

interface TextAreaFieldProps extends TextInputProps {
  error?: string
  touched?: boolean
  rows?: number
  maxLength?: number
  showCharCount?: boolean
  containerClassName?: string
}

const textAreaStyle = tva({
  base: 'text-base text-neutral-900 dark:text-neutral-100 p-4 rounded-xl border bg-white dark:bg-neutral-800',
  variants: {
    isError: {
      true: 'border-error-500',
      false: 'border-neutral-300 dark:border-neutral-600',
    },
    isFocused: {
      true: 'border-primary-500',
    },
  },
  defaultVariants: {
    isError: false,
  },
})

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  error,
  touched,
  rows = 4,
  maxLength,
  showCharCount = false,
  containerClassName = '',
  value,
  ...props
}) => {
  const { isDark } = useTheme()
  const [isFocused, setIsFocused] = React.useState(false)
  const isError = !!error && !!touched

  return (
    <View className={`w-full ${containerClassName}`}>
      <TextInput
        className={textAreaStyle({ isError, isFocused: isFocused && !isError })}
        placeholderTextColor={isDark ? Colors.neutral[500] : Colors.neutral[400]}
        multiline
        numberOfLines={rows}
        textAlignVertical="top"
        maxLength={maxLength}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ minHeight: rows * 24 }}
        {...props}
      />
      <View className="mt-1 flex-row justify-between">
        {isError && <Text className="text-xs text-error-500">{error}</Text>}
        {showCharCount && maxLength && (
          <Text className="ml-auto text-xs text-neutral-500">
            {(value?.toString() || '').length}/{maxLength}
          </Text>
        )}
      </View>
    </View>
  )
}

export default TextAreaField
