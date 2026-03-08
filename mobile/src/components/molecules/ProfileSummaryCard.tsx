/**
 * ProfileSummaryCard - User profile summary with avatar and stats
 * Usage: <ProfileSummaryCard name="John Doe" role="Engineer" stats={[...]} />
 */
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import AvatarMedium from '../atoms/AvatarMedium'

interface ProfileStat {
  label: string
  value: string | number
}

interface ProfileSummaryCardProps {
  name: string
  role?: string
  department?: string
  imageUri?: string
  stats?: ProfileStat[]
  onEdit?: () => void
  className?: string
}

const ProfileSummaryCard: React.FC<ProfileSummaryCardProps> = ({
  name,
  role,
  department,
  imageUri,
  stats = [],
  onEdit,
  className = '',
}) => (
  <View className={`rounded-2xl bg-white p-5 dark:bg-neutral-800 ${className}`}>
    <View className="flex-row items-center">
      <View className="relative">
        <AvatarMedium name={name} imageUri={imageUri} />
        {onEdit && (
          <TouchableOpacity
            onPress={onEdit}
            className="absolute -bottom-1 -right-1 rounded-full bg-primary-500 p-1"
          >
            <Ionicons name="pencil" size={12} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
      <View className="ml-4 flex-1">
        <Text className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
          {name}
        </Text>
        {role && (
          <Text className="text-sm text-neutral-600 dark:text-neutral-400">{role}</Text>
        )}
        {department && <Text className="text-xs text-neutral-500">{department}</Text>}
      </View>
    </View>
    {stats.length > 0 && (
      <View className="mt-4 flex-row border-t border-neutral-200 pt-4 dark:border-neutral-700">
        {stats.map((stat, index) => (
          <View
            key={stat.label}
            className={`flex-1 items-center ${
              index > 0 ? 'border-l border-neutral-200 dark:border-neutral-700' : ''
            }`}
          >
            <Text className="text-xl font-bold text-primary-600">{stat.value}</Text>
            <Text className="mt-1 text-xs text-neutral-500">{stat.label}</Text>
          </View>
        ))}
      </View>
    )}
  </View>
)

export default ProfileSummaryCard
