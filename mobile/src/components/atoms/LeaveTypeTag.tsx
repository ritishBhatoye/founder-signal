/**
 * LeaveTypeTag - Colored tag for leave types
 * Usage: <LeaveTypeTag type="sick" />
 */
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Text, View } from 'react-native'

import { Colors } from '@/constants/colors'
import { tva } from '@/utils/tva'

export type LeaveType =
  | 'sick'
  | 'casual'
  | 'annual'
  | 'unpaid'
  | 'maternity'
  | 'paternity'
  | 'wfh'
  | 'other'

interface LeaveTypeTagProps {
  type: LeaveType
  showIcon?: boolean
  size?: 'sm' | 'md'
  className?: string
}

const tagStyle = tva({
  base: 'flex-row items-center rounded-full',
  variants: {
    size: {
      sm: 'px-2 py-0.5',
      md: 'px-3 py-1',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

const textStyle = tva({
  base: 'font-medium capitalize',
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

const LeaveTypeTag: React.FC<LeaveTypeTagProps> = ({
  type,
  showIcon = true,
  size = 'sm',
  className = '',
}) => {
  const config = {
    sick: {
      icon: 'medical' as const,
      bg: 'bg-error-100',
      text: 'text-error-700',
      color: Colors.error[700],
    },
    casual: {
      icon: 'cafe' as const,
      bg: 'bg-info-100',
      text: 'text-info-700',
      color: Colors.info[700],
    },
    annual: {
      icon: 'airplane' as const,
      bg: 'bg-primary-100',
      text: 'text-primary-700',
      color: Colors.primary[700],
    },
    unpaid: {
      icon: 'wallet-outline' as const,
      bg: 'bg-warning-100',
      text: 'text-warning-700',
      color: Colors.warning[700],
    },
    maternity: {
      icon: 'heart' as const,
      bg: 'bg-secondary-100',
      text: 'text-secondary-700',
      color: Colors.secondary[700],
    },
    paternity: {
      icon: 'people' as const,
      bg: 'bg-tertiary-100',
      text: 'text-tertiary-700',
      color: Colors.tertiary[700],
    },
    wfh: {
      icon: 'home' as const,
      bg: 'bg-success-100',
      text: 'text-success-700',
      color: Colors.success[700],
    },
    other: {
      icon: 'ellipsis-horizontal' as const,
      bg: 'bg-neutral-100',
      text: 'text-neutral-700',
      color: Colors.neutral[700],
    },
  }

  const { icon, bg, text, color } = config[type]
  const iconSize = size === 'sm' ? 12 : 14

  return (
    <View className={`${tagStyle({ size, className })} ${bg}`}>
      {showIcon && (
        <Ionicons name={icon} size={iconSize} color={color} style={{ marginRight: 4 }} />
      )}
      <Text className={`${textStyle({ size })} ${text}`}>{type}</Text>
    </View>
  )
}

export default LeaveTypeTag
