import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { View } from 'react-native'

import { Colors } from '@/constants/colors'

export type LeaveType =
  | 'sick'
  | 'casual'
  | 'annual'
  | 'unpaid'
  | 'maternity'
  | 'paternity'
  | 'other'

interface LeaveTypeIconProps {
  type: LeaveType
  size?: number
  className?: string
}

const LeaveTypeIcon: React.FC<LeaveTypeIconProps> = ({
  type,
  size = 24,
  className = '',
}) => {
  const getIconConfig = () => {
    const configs = {
      sick: {
        icon: 'medical' as const,
        color: Colors.error[500],
        bg: Colors.error[100],
      },
      casual: {
        icon: 'cafe' as const,
        color: Colors.info[500],
        bg: Colors.info[100],
      },
      annual: {
        icon: 'airplane' as const,
        color: Colors.primary[500],
        bg: Colors.primary[100],
      },
      unpaid: {
        icon: 'wallet-outline' as const,
        color: Colors.warning[500],
        bg: Colors.warning[100],
      },
      maternity: {
        icon: 'heart' as const,
        color: Colors.secondary[500],
        bg: Colors.secondary[100],
      },
      paternity: {
        icon: 'people' as const,
        color: Colors.tertiary[500],
        bg: Colors.tertiary[100],
      },
      other: {
        icon: 'ellipsis-horizontal-circle' as const,
        color: Colors.neutral[500],
        bg: Colors.neutral[100],
      },
    }
    return configs[type]
  }

  const config = getIconConfig()

  return (
    <View
      className={`items-center justify-center rounded-full p-2 ${className}`}
      style={{ backgroundColor: config.bg }}
    >
      <Ionicons name={config.icon} size={size} color={config.color} />
    </View>
  )
}

export default LeaveTypeIcon
