import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, View, Text } from 'react-native'

interface SocialCTAProps {
  onSocialPress: (provider: SocialProvider) => void
}

const SOCIAL_PROVIDERS = [
  {
    id: 'google',
    label: 'Google',
    icon: 'logo-google',
  },
  {
    id: 'apple',
    label: 'Apple',
    icon: 'logo-apple',
  },
] as const

const SocialCTA: React.FC<SocialCTAProps> = ({ onSocialPress }) => (
  <View className="mb-8">
    <View className="mb-6 flex-row items-center">
      <View className="h-px flex-1 bg-neutral-800" />
      <Text className="mx-4 text-sm font-medium text-neutral-500">social sign up</Text>
      <View className="h-px flex-1 bg-neutral-800" />
    </View>

    <View className="flex-row gap-4">
      {SOCIAL_PROVIDERS.map(({ id, label, icon }) => (
        <Pressable
          key={id}
          onPress={() => onSocialPress(id)}
          className="h-14 flex-1 flex-row items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5"
        >
          <Ionicons name={icon} size={20} color="white" />
          <Text className="text-sm font-medium text-white">{label}</Text>
        </Pressable>
      ))}
    </View>
  </View>
)

export default SocialCTA
