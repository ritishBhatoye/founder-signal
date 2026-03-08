/**
 * EmployeeCard - Employee info card with status and actions
 * Usage: <EmployeeCard employee={employee} onPress={handlePress} />
 */
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { Colors } from '@/constants/colors'

import AvatarMedium from '../atoms/AvatarMedium'
import Badge from '../atoms/Badge'

interface Employee {
  id: string
  name: string
  role: string
  department: string
  imageUri?: string
  status?: 'active' | 'on-leave' | 'wfh'
  email?: string
}

interface EmployeeCardProps {
  employee: Employee
  onPress?: () => void
  onCall?: () => void
  onEmail?: () => void
  showActions?: boolean
  className?: string
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  onPress,
  onCall,
  onEmail,
  showActions = true,
  className = '',
}) => {
  const statusConfig = {
    active: { label: 'Active', variant: 'success' as const },
    'on-leave': { label: 'On Leave', variant: 'warning' as const },
    wfh: { label: 'WFH', variant: 'info' as const },
  }

  const status = employee.status ? statusConfig[employee.status] : null

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      className={`rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800 ${className}`}
      activeOpacity={0.7}
    >
      <View className="flex-row items-start">
        <AvatarMedium name={employee.name} imageUri={employee.imageUri} />
        <View className="ml-3 flex-1">
          <View className="flex-row items-center justify-between">
            <Text
              className="text-base font-semibold text-neutral-900 dark:text-neutral-100"
              numberOfLines={1}
            >
              {employee.name}
            </Text>
            {status && <Badge label={status.label} variant={status.variant} size="sm" />}
          </View>
          <Text className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-400">
            {employee.role}
          </Text>
          <Text className="mt-0.5 text-xs text-neutral-500">{employee.department}</Text>
        </View>
      </View>
      {showActions && (onCall || onEmail) && (
        <View className="mt-3 flex-row border-t border-neutral-200 pt-3 dark:border-neutral-700">
          {onCall && (
            <TouchableOpacity
              onPress={onCall}
              className="flex-1 flex-row items-center justify-center py-2"
            >
              <Ionicons name="call-outline" size={18} color={Colors.primary[600]} />
              <Text className="ml-2 text-sm font-medium text-primary-600">Call</Text>
            </TouchableOpacity>
          )}
          {onEmail && (
            <TouchableOpacity
              onPress={onEmail}
              className="flex-1 flex-row items-center justify-center py-2"
            >
              <Ionicons name="mail-outline" size={18} color={Colors.primary[600]} />
              <Text className="ml-2 text-sm font-medium text-primary-600">Email</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  )
}

export default EmployeeCard
