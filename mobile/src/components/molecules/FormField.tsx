import { View } from 'react-native'

import { Input, Text } from '@/components/atoms'

import type { TextInputProps } from 'react-native'

interface FormFieldProps extends TextInputProps {
  label: string
  error?: string
}

export const FormField = ({ label, error, ...inputProps }: FormFieldProps) => (
  <View className="mb-4">
    <Text className="mb-2 font-medium text-gray-700">{label}</Text>
    <Input error={!!error} {...inputProps} />
    {error && <Text className="mt-1 text-sm text-red-500">{error}</Text>}
  </View>
)
