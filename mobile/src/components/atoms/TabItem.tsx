/**
 * TabItem - Individual tab button for tab navigation
 * Usage: <TabItem label="Pending" active={true} onPress={handlePress} />
 */
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { tva } from '@/utils/tva'

interface TabItemProps {
  label: string
  active?: boolean
  onPress: () => void
  badge?: number
  className?: string
}

const tabStyle = tva({
  base: 'px-4 py-2 rounded-lg',
  variants: {
    active: {
      true: 'bg-primary-100 dark:bg-primary-900',
      false: 'bg-transparent',
    },
  },
  defaultVariants: {
    active: false,
  },
})

const textStyle = tva({
  base: 'font-medium text-sm',
  variants: {
    active: {
      true: 'text-primary-700 dark:text-primary-300',
      false: 'text-neutral-600 dark:text-neutral-400',
    },
  },
  defaultVariants: {
    active: false,
  },
})

const TabItem: React.FC<TabItemProps> = ({
  label,
  active = false,
  onPress,
  badge,
  className = '',
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={tabStyle({ active, className })}
    activeOpacity={0.7}
  >
    <View className="flex-row items-center">
      <Text className={textStyle({ active })}>{label}</Text>
      {badge !== undefined && badge > 0 && (
        <View className="ml-2 min-w-[18px] items-center rounded-full bg-error-500 px-1.5 py-0.5">
          <Text className="text-xs font-bold text-white">
            {badge > 99 ? '99+' : badge}
          </Text>
        </View>
      )}
    </View>
  </TouchableOpacity>
)

export default TabItem
