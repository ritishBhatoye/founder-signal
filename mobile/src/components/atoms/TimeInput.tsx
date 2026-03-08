import Ionicons from '@expo/vector-icons/Ionicons'
import DateTimePicker from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import { Platform, Text, TouchableOpacity, View } from 'react-native'

import { useTheme } from '@/contexts/ThemeContext'

import type { DateTimePickerEvent } from '@react-native-community/datetimepicker'

interface TimeInputProps {
  value: Date
  onChange: (time: Date) => void
  label?: string
  error?: string
  touched?: boolean
  disabled?: boolean
  className?: string
}

const TimeInput: React.FC<TimeInputProps> = ({
  value,
  onChange,
  label,
  error,
  touched,
  disabled = false,
  className = '',
}) => {
  const { isDark } = useTheme()
  const [showPicker, setShowPicker] = useState(false)
  const isInvalid = !!error && !!touched

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })

  const handleTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowPicker(Platform.OS === 'ios')
    if (event.type === 'set' && selectedTime) {
      onChange(selectedTime)
    }
  }

  return (
    <View className={`mb-4 w-full ${className}`}>
      {label && (
        <Text className="mb-1 text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {label}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => !disabled && setShowPicker(true)}
        disabled={disabled}
        className={`flex-row items-center justify-between rounded-lg border px-4 py-3 ${
          isInvalid ? 'border-error-500' : 'border-neutral-300 dark:border-neutral-600'
        } ${disabled ? 'opacity-50' : ''} bg-white dark:bg-neutral-800`}
      >
        <Text className="text-base text-neutral-900 dark:text-neutral-100">
          {formatTime(value)}
        </Text>
        <Ionicons name="time-outline" size={20} color={isDark ? '#9CA3AF' : '#6B7280'} />
      </TouchableOpacity>
      {isInvalid && <Text className="mt-1 text-xs text-error-500">{error}</Text>}
      {showPicker && (
        <DateTimePicker
          value={value}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleTimeChange}
        />
      )}
    </View>
  )
}

export default TimeInput
