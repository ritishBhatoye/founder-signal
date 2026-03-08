/**
 * Dropdown - Select dropdown component
 * Usage: <Dropdown options={options} value={value} onValueChange={setValue} />
 */
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useState } from 'react'
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { Colors } from '@/constants/colors'
import { useTheme } from '@/contexts/ThemeContext'

interface OptionType {
  label: string
  subLabel?: string
  value: string
  isDisabled?: boolean
}

interface DropdownProps {
  label?: string
  options: OptionType[]
  value?: string
  onValueChange?: (val: string) => void
  placeholder?: string
  error?: string
  touched?: boolean
  isRequired?: boolean
  isDisabled?: boolean
  className?: string
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onValueChange,
  placeholder = 'Select option',
  error,
  touched,
  isRequired = false,
  isDisabled = false,
  className = '',
}) => {
  const { isDark } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const isInvalid = !!error && !!touched
  const selectedOption = options.find((o) => o.value === value)

  const handleSelect = (optionValue: string) => {
    onValueChange?.(optionValue)
    setIsOpen(false)
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
        onPress={() => !isDisabled && setIsOpen(true)}
        disabled={isDisabled}
        className={`flex-row items-center justify-between rounded-xl border px-4 py-3 ${
          isInvalid ? 'border-error-500' : 'border-neutral-300 dark:border-neutral-600'
        } ${isDisabled ? 'opacity-50' : ''} bg-white dark:bg-neutral-800`}
        activeOpacity={0.7}
      >
        <Text
          className={`flex-1 text-base ${
            selectedOption ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-400'
          }`}
        >
          {selectedOption?.label || placeholder}
        </Text>
        <Ionicons
          name="chevron-down"
          size={20}
          color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
        />
      </TouchableOpacity>
      {isInvalid && <Text className="mt-1 text-xs text-error-500">{error}</Text>}

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
          <View className="max-h-[60%] rounded-t-3xl bg-white dark:bg-neutral-900">
            <View className="my-3 h-1 w-12 self-center rounded-full bg-neutral-300 dark:bg-neutral-600" />
            <Text className="mb-2 px-4 text-lg font-bold text-neutral-900 dark:text-neutral-100">
              {label || 'Select Option'}
            </Text>
            <ScrollView className="px-4 pb-6" showsVerticalScrollIndicator={false}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => !option.isDisabled && handleSelect(option.value)}
                  disabled={option.isDisabled}
                  className={`mb-2 rounded-xl p-4 ${
                    value === option.value
                      ? 'bg-primary-50 dark:bg-primary-900/30'
                      : 'bg-neutral-50 dark:bg-neutral-800'
                  } ${option.isDisabled ? 'opacity-50' : ''}`}
                >
                  <Text
                    className={`text-base ${
                      value === option.value
                        ? 'font-medium text-primary-700 dark:text-primary-300'
                        : 'text-neutral-900 dark:text-neutral-100'
                    }`}
                  >
                    {option.label}
                  </Text>
                  {option.subLabel && (
                    <Text className="mt-0.5 text-sm text-neutral-500">
                      {option.subLabel}
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

export default Dropdown
