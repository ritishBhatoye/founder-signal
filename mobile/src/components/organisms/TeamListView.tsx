/**
 * TeamListView - List of team members with search
 * Usage: <TeamListView members={members} onMemberPress={handlePress} />
 */
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useState } from 'react'
import { FlatList, View } from 'react-native'

import { Colors } from '@/constants/colors'

import Badge from '../atoms/Badge'
import EmptyStateText from '../atoms/EmptyStateText'
import SearchBarWithIcon from '../molecules/SearchBarWithIcon'
import UserInfoRow from '../molecules/UserInfoRow'

interface TeamMember {
  id: string
  name: string
  role: string
  department?: string
  imageUri?: string
  status?: 'active' | 'on-leave' | 'wfh'
}

interface TeamListViewProps {
  members: TeamMember[]
  onMemberPress?: (id: string) => void
  showSearch?: boolean
  className?: string
}

const TeamListView: React.FC<TeamListViewProps> = ({
  members,
  onMemberPress,
  showSearch = true,
  className = '',
}) => {
  const [search, setSearch] = useState('')
  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase()),
  )

  const statusBadge = (status?: string) => {
    if (!status) return null
    const config = { active: 'success', 'on-leave': 'warning', wfh: 'info' } as const
    return (
      <Badge
        label={status === 'on-leave' ? 'On Leave' : status.toUpperCase()}
        variant={config[status as keyof typeof config]}
        size="sm"
      />
    )
  }

  return (
    <View className={`flex-1 ${className}`}>
      {showSearch && (
        <SearchBarWithIcon
          value={search}
          onChangeText={setSearch}
          placeholder="Search team members..."
          className="mb-4"
        />
      )}
      <FlatList
        data={filteredMembers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserInfoRow
            name={item.name}
            role={item.role}
            department={item.department}
            imageUri={item.imageUri}
            onPress={() => onMemberPress?.(item.id)}
            rightContent={statusBadge(item.status)}
            className="border-b border-neutral-100 py-3 dark:border-neutral-800"
          />
        )}
        ListEmptyComponent={
          <View className="items-center py-12">
            <Ionicons name="people-outline" size={64} color={Colors.neutral[300]} />
            <EmptyStateText>No team members found</EmptyStateText>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default TeamListView
