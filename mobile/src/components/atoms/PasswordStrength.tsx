import React from 'react'
import { Text, View } from 'react-native'

interface PasswordStrengthProps {
  value: string
  error?: string
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ value, error }) => {
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' }

    let strength = 0
    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++

    const strengthMap = {
      0: { label: 'Very Weak', color: 'bg-error-500' },
      1: { label: 'Weak', color: 'bg-error-400' },
      2: { label: 'Fair', color: 'bg-warning-500' },
      3: { label: 'Good', color: 'bg-success-400' },
      4: { label: 'Strong', color: 'bg-success-500' },
      5: { label: 'Very Strong', color: 'bg-success-600' },
    }

    return { strength, ...strengthMap[strength as keyof typeof strengthMap] }
  }

  const { strength, label, color } = getPasswordStrength(value)

  if (!value || error) return null

  return (
    <View className="mt-2">
      <View className="mb-1 flex-row space-x-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <View
            key={level}
            className={`h-1 flex-1 rounded-full ${
              level <= strength ? color : 'bg-neutral-200 dark:bg-neutral-700'
            }`}
          />
        ))}
      </View>
      <Text className="text-xs text-neutral-600 dark:text-neutral-400">
        Password strength: {label}
      </Text>
    </View>
  )
}

export default PasswordStrength
