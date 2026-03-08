/**
 * DateChip - Compact date display chip
 * Usage: <DateChip date={new Date()} format="short" />
 */
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Text, View } from 'react-native'

import { Colors } from '@/constants/colors'
import { tva } from '@/utils/tva'

type DateFormat = 'short' | 'medium' | 'long'

interface DateChipProps {
  date: Date | string
  format?: DateFormat
  showIcon?: boolean
  variant?: 'default' | 'outlined' | 'filled'
  className?: string
}

const chipStyle = tva({
  base: 'flex-row items-center rounded-lg',
  variants: {
    variant: {
      default: 'bg-neutral-100 dark:bg-neutral-800',
      outlined: 'border border-neutral-300 dark:border-neutral-600 bg-transparent',
      filled: 'bg-primary-100 dark:bg-primary-900',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const DateChip: React.FC<DateChipProps> = ({
  date,
  format = 'short',
  showIcon = true,
  variant = 'default',
  className = '',
}) => {
  const formatDate = (d: Date | string) => {
    const dateObj = typeof d === 'string' ? new Date(d) : d

    const options: Intl.DateTimeFormatOptions = {
      short: { day: '2-digit', month: 'short' },
      medium: { day: '2-digit', month: 'short', year: 'numeric' },
      long: { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' },
    }[format]

    return dateObj.toLocaleDateString('en-US', options)
  }

  return (
    <View className={`${chipStyle({ variant, className })} px-3 py-1.5`}>
      {showIcon && (
        <Ionicons
          name="calendar-outline"
          size={14}
          color={Colors.neutral[600]}
          style={{ marginRight: 6 }}
        />
      )}
      <Text className="text-sm text-neutral-700 dark:text-neutral-300">
        {formatDate(date)}
      </Text>
    </View>
  )
}

export default DateChip
