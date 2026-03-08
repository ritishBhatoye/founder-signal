/**
 * CalendarView - Monthly calendar with leave markers
 * Usage: <CalendarView month={date} events={events} onDayPress={handlePress} />
 */
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { Colors } from '@/constants/colors'

interface CalendarEvent {
  date: string
  type: 'leave' | 'holiday' | 'wfh'
}

interface CalendarViewProps {
  month: Date
  events?: CalendarEvent[]
  onDayPress?: (date: Date) => void
  onPrevMonth?: () => void
  onNextMonth?: () => void
  className?: string
}

const CalendarView: React.FC<CalendarViewProps> = ({
  month,
  events = [],
  onDayPress,
  onPrevMonth,
  onNextMonth,
  className = '',
}) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthName = month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay()
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const today = new Date()

  const getEventType = (day: number) => {
    const dateStr = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(
      2,
      '0',
    )}-${String(day).padStart(2, '0')}`
    return events.find((e) => e.date === dateStr)?.type
  }

  const eventColors = {
    leave: 'bg-warning-500',
    holiday: 'bg-error-500',
    wfh: 'bg-info-500',
  }

  return (
    <View className={`rounded-2xl bg-white p-4 dark:bg-neutral-800 ${className}`}>
      <View className="mb-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={onPrevMonth} className="p-2">
          <Ionicons name="chevron-back" size={20} color={Colors.neutral[600]} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
          {monthName}
        </Text>
        <TouchableOpacity onPress={onNextMonth} className="p-2">
          <Ionicons name="chevron-forward" size={20} color={Colors.neutral[600]} />
        </TouchableOpacity>
      </View>
      <View className="mb-2 flex-row">
        {weekDays.map((day) => (
          <View key={day} className="flex-1 items-center">
            <Text className="text-xs font-medium text-neutral-500">{day}</Text>
          </View>
        ))}
      </View>
      <View className="flex-row flex-wrap">
        {Array.from({ length: firstDay }).map((_, i) => (
          <View key={`empty-${i}`} className="h-10 w-[14.28%]" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const isToday =
            today.getDate() === day &&
            today.getMonth() === month.getMonth() &&
            today.getFullYear() === month.getFullYear()
          const eventType = getEventType(day)
          return (
            <TouchableOpacity
              key={day}
              onPress={() =>
                onDayPress?.(new Date(month.getFullYear(), month.getMonth(), day))
              }
              className="h-10 w-[14.28%] items-center justify-center"
            >
              <View
                className={`h-8 w-8 items-center justify-center rounded-full ${
                  isToday ? 'bg-primary-500' : ''
                }`}
              >
                <Text
                  className={`text-sm ${
                    isToday
                      ? 'font-bold text-white'
                      : 'text-neutral-900 dark:text-neutral-100'
                  }`}
                >
                  {day}
                </Text>
              </View>
              {eventType && (
                <View
                  className={`h-1.5 w-1.5 rounded-full ${eventColors[eventType]} absolute bottom-0`}
                />
              )}
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

export default CalendarView
