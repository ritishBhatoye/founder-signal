import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Text, View } from 'react-native'

type InfoCardVariant = 'info' | 'success' | 'warning' | 'error'

interface InfoCardProps {
  title?: string
  message: string
  variant?: InfoCardVariant
  icon?: keyof typeof Ionicons.glyphMap
  className?: string
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  message,
  variant = 'info',
  icon,
  className = '',
}) => {
  const getVariantStyles = () => {
    const styles = {
      info: {
        bg: 'bg-info-50 dark:bg-info-900/20',
        border: 'border-info-200 dark:border-info-800',
        text: 'text-info-700 dark:text-info-300',
        icon: 'information-circle' as const,
      },
      success: {
        bg: 'bg-success-50 dark:bg-success-900/20',
        border: 'border-success-200 dark:border-success-800',
        text: 'text-success-700 dark:text-success-300',
        icon: 'checkmark-circle' as const,
      },
      warning: {
        bg: 'bg-warning-50 dark:bg-warning-900/20',
        border: 'border-warning-200 dark:border-warning-800',
        text: 'text-warning-700 dark:text-warning-300',
        icon: 'warning' as const,
      },
      error: {
        bg: 'bg-error-50 dark:bg-error-900/20',
        border: 'border-error-200 dark:border-error-800',
        text: 'text-error-700 dark:text-error-300',
        icon: 'alert-circle' as const,
      },
    }
    return styles[variant]
  }

  const variantStyles = getVariantStyles()
  const iconName = icon || variantStyles.icon

  return (
    <View
      className={`flex-row rounded-lg border p-4 ${variantStyles.bg} ${variantStyles.border} ${className}`}
    >
      <View className="mr-3">
        <Ionicons name={iconName} size={24} className={variantStyles.text} />
      </View>
      <View className="flex-1">
        {title && (
          <Text className={`mb-1 font-semibold ${variantStyles.text}`}>{title}</Text>
        )}
        <Text className={`text-sm ${variantStyles.text}`}>{message}</Text>
      </View>
    </View>
  )
}

export default InfoCard
