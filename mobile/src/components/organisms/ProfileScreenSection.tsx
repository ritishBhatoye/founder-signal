/**
 * ProfileScreenSection - Profile section with info and actions
 * Usage: <ProfileScreenSection user={user} onEdit={...} />
 */
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Text, View } from 'react-native'

import { Colors } from '@/constants/colors'
import { useTheme } from '@/contexts/ThemeContext'

import ProfileSummaryCard from '../molecules/ProfileSummaryCard'

interface ProfileInfo {
  icon: keyof typeof Ionicons.glyphMap
  label: string
  value: string
}

interface ProfileScreenSectionProps {
  name: string
  role?: string
  department?: string
  imageUri?: string
  email?: string
  phone?: string
  employeeId?: string
  joinDate?: string
  onEdit?: () => void
  className?: string
}

const ProfileScreenSection: React.FC<ProfileScreenSectionProps> = ({
  name,
  role,
  department,
  imageUri,
  email,
  phone,
  employeeId,
  joinDate,
  onEdit,
  className = '',
}) => {
  const { isDark } = useTheme()

  const infoItems: ProfileInfo[] = [
    { icon: 'mail-outline', label: 'Email', value: email || '-' },
    { icon: 'call-outline', label: 'Phone', value: phone || '-' },
    { icon: 'id-card-outline', label: 'Employee ID', value: employeeId || '-' },
    { icon: 'calendar-outline', label: 'Join Date', value: joinDate || '-' },
  ]

  return (
    <View className={className}>
      <ProfileSummaryCard
        name={name}
        role={role}
        department={department}
        imageUri={imageUri}
        onEdit={onEdit}
        stats={[
          { label: 'Leave Balance', value: 15 },
          { label: 'This Month', value: 2 },
          { label: 'Pending', value: 1 },
        ]}
        className="mb-4"
      />
      <View className="rounded-2xl bg-white p-4 dark:bg-neutral-800">
        <Text className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
          Personal Information
        </Text>
        {infoItems.map((item, index) => (
          <View
            key={item.label}
            className={`flex-row items-center py-3 ${
              index < infoItems.length - 1
                ? 'border-b border-neutral-100 dark:border-neutral-700'
                : ''
            }`}
          >
            <View className="h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-700">
              <Ionicons
                name={item.icon}
                size={20}
                color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
              />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-xs text-neutral-500">{item.label}</Text>
              <Text className="text-base text-neutral-900 dark:text-neutral-100">
                {item.value}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default ProfileScreenSection
