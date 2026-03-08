import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { useTheme } from '@/contexts/ThemeContext'

interface DateRangePickerProps {
  startDate?: Date
  endDate?: Date
  onStartDateChange: (date: Date) => void
  onEndDateChange: (date: Date) => void
  label?: string
  error?: string
  touched?: boolean
  className?: string
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  label,
  error,
  touched,
  className = '',
}) => {
  const { isDark } = useTheme()
  const isInvalid = !!error && !!touched

  const formatDate = (date?: Date) => {
    if (!date) return 'Select date'
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <View className={`mb-4 w-full ${className}`}>
      {label && (
        <Text className="mb-1 text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {label}
        </Text>
      )}
      <View className="flex-row items-center space-x-2">
        <TouchableOpacity
          className={`flex-1 flex-row items-center justify-between rounded-lg border px-4 py-3 ${
            isInvalid ? 'border-error-500' : 'border-neutral-300 dark:border-neutral-600'
          } bg-white dark:bg-neutral-800`}
        >
          <Text className="text-base text-neutral-900 dark:text-neutral-100">
            {formatDate(startDate)}
          </Text>
          <Ionicons
            name="calendar-outline"
            size={20}
            color={isDark ? '#9CA3AF' : '#6B7280'}
          />
        </TouchableOpacity>
        <Ionicons name="arrow-forward" size={20} color={isDark ? '#9CA3AF' : '#6B7280'} />
        <TouchableOpacity
          className={`flex-1 flex-row items-center justify-between rounded-lg border px-4 py-3 ${
            isInvalid ? 'border-error-500' : 'border-neutral-300 dark:border-neutral-600'
          } bg-white dark:bg-neutral-800`}
        >
          <Text className="text-base text-neutral-900 dark:text-neutral-100">
            {formatDate(endDate)}
          </Text>
          <Ionicons
            name="calendar-outline"
            size={20}
            color={isDark ? '#9CA3AF' : '#6B7280'}
          />
        </TouchableOpacity>
      </View>
      {isInvalid && <Text className="mt-1 text-xs text-error-500">{error}</Text>}
    </View>
  )
}

export default DateRangePicker
