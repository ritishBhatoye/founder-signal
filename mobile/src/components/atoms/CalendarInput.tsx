/**
 * CalendarInput - Date picker input component
 * Usage: <CalendarInput value={date} onChange={setDate} label="Start Date" />
 */
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useCallback, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { Colors } from '@/constants/colors'
import { useTheme } from '@/contexts/ThemeContext'

interface CalendarInputProps {
  label?: string
  value?: Date | string
  onChange: (date: Date) => void
  onBlur?: () => void
  error?: string
  touched?: boolean
  isRequired?: boolean
  isDisabled?: boolean
  placeholder?: string
  maximumDate?: Date
  minimumDate?: Date
  className?: string
}

const CalendarInput: React.FC<CalendarInputProps> = ({
  label = 'Date',
  value,
  onChange,
  onBlur,
  error,
  touched,
  isRequired = false,
  isDisabled = false,
  placeholder = 'Select Date',
  maximumDate,
  minimumDate,
  className = '',
}) => {
  const { isDark } = useTheme()
  const [, setShowPicker] = useState(false)
  const isInvalid = !!error && !!touched

  const formatDate = useCallback(
    (date?: Date | string) => {
      if (!date) return placeholder
      const d = typeof date === 'string' ? new Date(date) : date
      return d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    },
    [placeholder],
  )

  const handlePress = () => {
    if (!isDisabled) {
      setShowPicker(true)
    }
  }

  return (
    <View className={`mb-4 w-full ${className}`}>
      {label && (
        <View className="mb-1.5 flex-row items-center">
          <Text className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {label}
          </Text>
          {isRequired && <Text className="ml-0.5 text-error-500">*</Text>}
        </View>
      )}
      <TouchableOpacity
        onPress={handlePress}
        disabled={isDisabled}
        className={`flex-row items-center justify-between rounded-xl border px-4 py-3 ${
          isInvalid ? 'border-error-500' : 'border-neutral-300 dark:border-neutral-600'
        } ${isDisabled ? 'opacity-50' : ''} bg-white dark:bg-neutral-800`}
        activeOpacity={0.7}
      >
        <Text
          className={`text-base ${
            value ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-400'
          }`}
        >
          {formatDate(value)}
        </Text>
        <Ionicons
          name="calendar-outline"
          size={20}
          color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
        />
      </TouchableOpacity>
      {isInvalid && <Text className="mt-1 text-xs text-error-500">{error}</Text>}
    </View>
  )
}

export default CalendarInput
