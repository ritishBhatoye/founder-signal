import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Text, View } from 'react-native'

import { StatusColors } from '@/constants/colors'

export type LeaveStatus = 'approved' | 'pending' | 'rejected' | 'draft'

interface StatusBadgeProps {
  status: LeaveStatus
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  className?: string
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
  className = '',
}) => {
  const getStatusConfig = () => {
    const configs = {
      approved: {
        label: 'Approved',
        icon: 'checkmark-circle' as const,
        bg: StatusColors.approved.bg,
        text: StatusColors.approved.text,
        border: StatusColors.approved.border,
      },
      pending: {
        label: 'Pending',
        icon: 'time' as const,
        bg: StatusColors.pending.bg,
        text: StatusColors.pending.text,
        border: StatusColors.pending.border,
      },
      rejected: {
        label: 'Rejected',
        icon: 'close-circle' as const,
        bg: StatusColors.rejected.bg,
        text: StatusColors.rejected.text,
        border: StatusColors.rejected.border,
      },
      draft: {
        label: 'Draft',
        icon: 'document-text' as const,
        bg: StatusColors.draft.bg,
        text: StatusColors.draft.text,
        border: StatusColors.draft.border,
      },
    }
    return configs[status]
  }

  const getSizeStyles = () => {
    const sizes = {
      sm: { container: 'px-2 py-0.5', text: 'text-xs', icon: 12 },
      md: { container: 'px-3 py-1', text: 'text-sm', icon: 14 },
      lg: { container: 'px-4 py-1.5', text: 'text-base', icon: 16 },
    }
    return sizes[size]
  }

  const config = getStatusConfig()
  const sizeStyles = getSizeStyles()

  return (
    <View
      className={`flex-row items-center justify-center rounded-full border ${sizeStyles.container} ${className}`}
      style={{
        backgroundColor: config.bg,
        borderColor: config.border,
      }}
    >
      {showIcon && (
        <Ionicons
          name={config.icon}
          size={sizeStyles.icon}
          color={config.text}
          style={{ marginRight: 4 }}
        />
      )}
      <Text className={`font-medium ${sizeStyles.text}`} style={{ color: config.text }}>
        {config.label}
      </Text>
    </View>
  )
}

export default StatusBadge
