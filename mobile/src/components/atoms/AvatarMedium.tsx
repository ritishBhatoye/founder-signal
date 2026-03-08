/**
 * AvatarMedium - Standard avatar for profile displays
 * Usage: <AvatarMedium name="John Doe" imageUri="https://..." showBadge />
 */
import React from 'react'
import { Image, Text, View } from 'react-native'

import { tva } from '@/utils/tva'

interface AvatarMediumProps {
  name?: string
  imageUri?: string
  className?: string
  backgroundColor?: string
  showBadge?: boolean
  badgeColor?: string
}

const containerStyle = tva({
  base: 'w-12 h-12 rounded-full items-center justify-center overflow-hidden',
})

const AvatarMedium: React.FC<AvatarMediumProps> = ({
  name,
  imageUri,
  className = '',
  backgroundColor = 'bg-primary-500',
  showBadge = false,
  badgeColor = 'bg-success-500',
}) => {
  const getInitials = (fullName: string) => {
    const names = fullName.trim().split(' ')
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    }
    return fullName.substring(0, 2).toUpperCase()
  }

  return (
    <View className="relative">
      <View
        className={`${containerStyle({ className })} ${!imageUri ? backgroundColor : ''}`}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            className="h-12 w-12 rounded-full"
            resizeMode="cover"
          />
        ) : (
          <Text className="text-base font-semibold text-white">
            {name ? getInitials(name) : '?'}
          </Text>
        )}
      </View>
      {showBadge && (
        <View
          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${badgeColor} border-2 border-white dark:border-neutral-900`}
        />
      )}
    </View>
  )
}

export default AvatarMedium
