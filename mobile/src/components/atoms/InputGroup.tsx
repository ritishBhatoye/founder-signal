import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

import { Colors } from '@/constants/colors'
import { useTheme } from '@/contexts/ThemeContext'

import PasswordStrength from './PasswordStrength'

import type { TextInputProps } from 'react-native'

interface InputGroupProps extends Omit<TextInputProps, 'onChangeText'> {
  label?: string
  value: string
  onChangeText: (text: string) => void
  onBlur?: () => void
  onClear?: () => void
  error?: string
  touched?: boolean
  isRequired?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  isPassword?: boolean
  showPasswordStrength?: boolean
  startContent?: React.ReactNode
  endContent?: React.ReactNode
  className?: string
  inputClassName?: string
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  onClear,
  error,
  touched,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  isPassword = false,
  showPasswordStrength = false,
  startContent,
  endContent,
  className = '',
  placeholder,
  inputClassName,
  ...props
}) => {
  const { isDark } = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const isInvalid = !!error && !!touched

  const getBorderColor = () => {
    if (isInvalid) return 'border-error-500'
    if (isFocused) return 'border-primary-500'
    return 'border-neutral-300 dark:border-neutral-600'
  }

  return (
    <View className={`mb-4 w-full gap-2 ${className}`}>
      {label && (
        <View className="mb-1.5 flex-row items-center">
          <Text className="text-sm font-medium text-neutral-400 dark:text-neutral-100">
            {label}
          </Text>
          {isRequired && <Text className="ml-0.5 text-error-500">*</Text>}
        </View>
      )}
      <View
        className={`h-10 flex-row items-center rounded-xl border px-4 ${getBorderColor()} ${
          isDisabled ? 'opacity-50' : ''
        } dark:bg-neutral-800`}
      >
        {startContent && (
          <View className="mr-3 h-full items-center justify-center">{startContent}</View>
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onBlur={() => {
            setIsFocused(false)
            onBlur?.()
          }}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          placeholderTextColor={isDark ? Colors.neutral[500] : Colors.neutral[400]}
          editable={!isDisabled && !isReadOnly}
          secureTextEntry={isPassword && !showPassword}
          className={`h-full flex-1 py-0 text-base text-neutral-900 dark:text-neutral-100 ${inputClassName}`}
          textAlignVertical="center"
          autoCapitalize="none"
          style={[{ includeFontPadding: false }, (props as any).style]}
          {...props}
        />
        {value && value.length > 0 && !isPassword && onClear && (
          <TouchableOpacity
            onPress={onClear}
            className="ml-2 h-full items-center justify-center"
          >
            <Ionicons name="close-circle" size={20} color={Colors.neutral[400]} />
          </TouchableOpacity>
        )}
        {isPassword && value && value.length > 0 && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="ml-2 h-full items-center justify-center"
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={22}
              color={Colors.neutral[500]}
            />
          </TouchableOpacity>
        )}
        {endContent && (
          <View className="ml-3 h-full items-center justify-center">{endContent}</View>
        )}
      </View>
      {isPassword && showPasswordStrength && (
        <PasswordStrength value={value} error={error} />
      )}
      {isInvalid && !showPasswordStrength && (
        <View className="mt-1 flex-row items-center">
          <Ionicons name="alert-circle" size={14} color={Colors.error[500]} />
          <Text className="ml-1 text-xs text-error-500">{error}</Text>
        </View>
      )}
    </View>
  )
}

export default InputGroup
