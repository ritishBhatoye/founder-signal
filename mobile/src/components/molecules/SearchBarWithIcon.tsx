/**
 * SearchBarWithIcon - Search input with icon and clear button
 * Usage: <SearchBarWithIcon value={query} onChangeText={setQuery} placeholder="Search employees..." />
 */
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'

import { Colors } from '@/constants/colors'
import { useTheme } from '@/contexts/ThemeContext'

interface SearchBarWithIconProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  onClear?: () => void
  onSubmit?: () => void
  autoFocus?: boolean
  className?: string
}

const SearchBarWithIcon: React.FC<SearchBarWithIconProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  onClear,
  onSubmit,
  autoFocus = false,
  className = '',
}) => {
  const { isDark } = useTheme()

  return (
    <View
      className={`flex-row items-center rounded-xl bg-neutral-100 px-4 py-3 dark:bg-neutral-800 ${className}`}
    >
      <Ionicons
        name="search"
        size={20}
        color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDark ? Colors.neutral[500] : Colors.neutral[400]}
        className="ml-3 flex-1 text-base text-neutral-900 dark:text-neutral-100"
        autoFocus={autoFocus}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={onClear || (() => onChangeText(''))}
          activeOpacity={0.7}
        >
          <Ionicons
            name="close-circle"
            size={20}
            color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default SearchBarWithIcon
