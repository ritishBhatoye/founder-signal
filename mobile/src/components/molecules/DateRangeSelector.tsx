/**
 * DateRangeSelector - Start and end date picker for leave requests
 * Usage: <DateRangeSelector startDate={start} endDate={end} onStartChange={setStart} onEndChange={setEnd} />
 */
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { Colors } from '@/constants/colors'
import { useTheme } from '@/contexts/ThemeContext'

import InputLabel from '../atoms/InputLabel'

interface DateRangeSelectorProps {
  startDate?: Date
  endDate?: Date
  onStartPress: () => void
  onEndPress: () => void
  label?: string
  required?: boolean
  error?: string
  className?: string
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  startDate,
  endDate,
  onStartPress,
  onEndPress,
  label = 'Leave Period',
  required = false,
  error,
  className = '',
}) => {
  const { isDark } = useTheme()
  const formatDate = (date?: Date) =>
    date?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) || 'Select'

  return (
    <View className={`w-full ${className}`}>
      {label && <InputLabel required={required}>{label}</InputLabel>}
      <View className="mt-1 flex-row items-center">
        <TouchableOpacity
          onPress={onStartPress}
          className="flex-1 flex-row items-center justify-between rounded-xl border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-800"
        >
          <Text
            className={`text-base ${
              startDate ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-400'
            }`}
          >
            {formatDate(startDate)}
          </Text>
          <Ionicons
            name="calendar-outline"
            size={20}
            color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
          />
        </TouchableOpacity>
        <View className="mx-2">
          <Ionicons
            name="arrow-forward"
            size={20}
            color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
          />
        </View>
        <TouchableOpacity
          onPress={onEndPress}
          className="flex-1 flex-row items-center justify-between rounded-xl border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-800"
        >
          <Text
            className={`text-base ${
              endDate ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-400'
            }`}
          >
            {formatDate(endDate)}
          </Text>
          <Ionicons
            name="calendar-outline"
            size={20}
            color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
          />
        </TouchableOpacity>
      </View>
      {error && <Text className="mt-1 text-xs text-error-500">{error}</Text>}
    </View>
  )
}

export default DateRangeSelector
