/**
 * InputLabel - Label for form inputs with optional required indicator
 * Usage: <InputLabel required>Leave Type</InputLabel>
 */
import React from 'react'
import { Text, View } from 'react-native'

import { tva } from '@/utils/tva'

interface InputLabelProps {
  children: React.ReactNode
  required?: boolean
  className?: string
  htmlFor?: string
}

const labelStyle = tva({
  base: 'text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5',
})

const InputLabel: React.FC<InputLabelProps> = ({
  children,
  required = false,
  className = '',
}) => (
  <View className="flex-row items-center">
    <Text className={labelStyle({ className })}>{children}</Text>
    {required && <Text className="ml-0.5 text-error-500">*</Text>}
  </View>
)

export default InputLabel
