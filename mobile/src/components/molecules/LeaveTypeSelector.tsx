/**
 * LeaveTypeSelector - Dropdown/selector for leave types
 * Usage: <LeaveTypeSelector value={leaveType} onChange={setLeaveType} />
 */
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { Colors } from '@/constants/colors'
import { useTheme } from '@/contexts/ThemeContext'

import InputLabel from '../atoms/InputLabel'
import LeaveTypeTag from '../atoms/LeaveTypeTag'

import type { LeaveType } from '../atoms/LeaveTypeTag'

interface LeaveOption {
  type: LeaveType
  label: string
  balance?: number
}

interface LeaveTypeSelectorProps {
  value?: LeaveType
  onChange: (type: LeaveType) => void
  options?: LeaveOption[]
  label?: string
  required?: boolean
  error?: string
  className?: string
}

const defaultOptions: LeaveOption[] = [
  { type: 'casual', label: 'Casual Leave', balance: 12 },
  { type: 'sick', label: 'Sick Leave', balance: 10 },
  { type: 'annual', label: 'Annual Leave', balance: 15 },
  { type: 'wfh', label: 'Work From Home', balance: 5 },
  { type: 'unpaid', label: 'Unpaid Leave' },
]

const LeaveTypeSelector: React.FC<LeaveTypeSelectorProps> = ({
  value,
  onChange,
  options = defaultOptions,
  label = 'Leave Type',
  required = false,
  error,
  className = '',
}) => {
  const { isDark } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)
  const selectedOption = options.find((o) => o.type === value)

  return (
    <View className={`w-full ${className}`}>
      {label && <InputLabel required={required}>{label}</InputLabel>}
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        className="mt-1 flex-row items-center justify-between rounded-xl border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-800"
      >
        {selectedOption ? (
          <LeaveTypeTag type={selectedOption.type} size="md" />
        ) : (
          <Text className="text-base text-neutral-400">Select leave type</Text>
        )}
        <Ionicons
          name="chevron-down"
          size={20}
          color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
        />
      </TouchableOpacity>
      {error && <Text className="mt-1 text-xs text-error-500">{error}</Text>}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          className="flex-1 justify-end bg-black/50"
          onPress={() => setIsOpen(false)}
        >
          <View className="max-h-[60%] rounded-t-3xl bg-white p-4 dark:bg-neutral-900">
            <View className="mb-4 h-1 w-12 self-center rounded-full bg-neutral-300 dark:bg-neutral-600" />
            <Text className="mb-4 text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Select Leave Type
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.type}
                  onPress={() => {
                    onChange(option.type)
                    setIsOpen(false)
                  }}
                  className={`mb-2 flex-row items-center justify-between rounded-xl p-4 ${
                    value === option.type
                      ? 'bg-primary-50 dark:bg-primary-900/30'
                      : 'bg-neutral-50 dark:bg-neutral-800'
                  }`}
                >
                  <View className="flex-row items-center">
                    <LeaveTypeTag type={option.type} size="md" />
                    <Text className="ml-3 text-base text-neutral-900 dark:text-neutral-100">
                      {option.label}
                    </Text>
                  </View>
                  {option.balance !== undefined && (
                    <Text className="text-sm text-neutral-500">
                      {option.balance} days
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}

export default LeaveTypeSelector
