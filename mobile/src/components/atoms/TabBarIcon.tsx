import React from 'react'
import { Animated, View } from 'react-native'

import { useTheme } from '@/contexts/ThemeContext'

import { Icon } from './Icon'

interface TabBarIconProps {
  focused: boolean
  iconName: string
  title: string
}

export const TabBarIcon = ({ focused, iconName, title }: TabBarIconProps) => {
  const { isDark } = useTheme()
  const scaleAnim = React.useRef(new Animated.Value(focused ? 1 : 0.9)).current
  const opacityAnim = React.useRef(new Animated.Value(focused ? 1 : 0.6)).current
  const bgScaleAnim = React.useRef(new Animated.Value(focused ? 1 : 0)).current

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: focused ? 1 : 0.9,
        useNativeDriver: true,
        friction: 10,
        tension: 80,
      }),
      Animated.timing(opacityAnim, {
        toValue: focused ? 1 : 0.6,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(bgScaleAnim, {
        toValue: focused ? 1 : 0,
        useNativeDriver: true,
        friction: 8,
        tension: 60,
      }),
    ]).start()
  }, [focused, scaleAnim, opacityAnim, bgScaleAnim])

  return (
    <View className="items-center justify-center py-2">
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        }}
        className="items-center"
      >
        <View className="relative h-10 w-10 items-center justify-center">
          {/* Active Background Circle */}
          <Animated.View
            style={{
              transform: [{ scale: bgScaleAnim }],
              opacity: bgScaleAnim,
            }}
            className="absolute h-10 w-10 items-center justify-center rounded-full bg-primary-500 shadow-lg dark:bg-primary-600"
          />

          {/* Icon */}
          <Icon
            name={iconName as any}
            size={22}
            color={focused ? '#ffffff' : isDark ? '#9CA3AF' : '#6B7280'}
          />
        </View>

        {/* Label */}
        <Animated.Text
          style={{
            opacity: opacityAnim,
          }}
          className={`mt-1 w-full text-center text-[10px] font-medium ${
            focused
              ? 'text-primary-600 dark:text-primary-400'
              : 'text-neutral-500 dark:text-neutral-400'
          }`}
        >
          {title}
        </Animated.Text>
      </Animated.View>
    </View>
  )
}
