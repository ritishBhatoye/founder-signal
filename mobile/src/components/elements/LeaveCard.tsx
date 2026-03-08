import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { Avatar, Divider, LeaveTypeIcon, StatusBadge } from '../atoms'

import type { LeaveType } from '../atoms/LeaveTypeIcon'
import type { LeaveStatus } from '../atoms/StatusBadge'

interface LeaveCardProps {
  leaveType: LeaveType
  status: LeaveStatus
  startDate: string
  endDate: string
  duration: string
  reason?: string
  employeeName?: string
  employeeAvatar?: string
  onPress?: () => void
  className?: string
}

const LeaveCard: React.FC<LeaveCardProps> = ({
  leaveType,
  status,
  startDate,
  endDate,
  duration,
  reason,
  employeeName,
  employeeAvatar,
  onPress,
  className = '',
}) => {
  const Component = onPress ? TouchableOpacity : View

  return (
    <Component
      onPress={onPress}
      className={`mb-3 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800 ${className}`}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-start">
          <LeaveTypeIcon type={leaveType} size={20} />
          <View className="ml-3 flex-1">
            <Text className="mb-1 text-base font-semibold capitalize text-neutral-900 dark:text-neutral-100">
              {leaveType} Leave
            </Text>
            <Text className="text-sm text-neutral-600 dark:text-neutral-400">
              {startDate} - {endDate}
            </Text>
            <Text className="mt-1 text-xs text-neutral-500 dark:text-neutral-500">
              Duration: {duration}
            </Text>
          </View>
        </View>
        <StatusBadge status={status} size="sm" />
      </View>

      {reason && (
        <>
          <Divider className="my-3" />
          <Text className="text-sm text-neutral-700 dark:text-neutral-300">{reason}</Text>
        </>
      )}

      {employeeName && (
        <>
          <Divider className="my-3" />
          <View className="flex-row items-center">
            <Avatar name={employeeName} imageUri={employeeAvatar} size="sm" />
            <Text className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
              {employeeName}
            </Text>
          </View>
        </>
      )}
    </Component>
  )
}

export default LeaveCard
