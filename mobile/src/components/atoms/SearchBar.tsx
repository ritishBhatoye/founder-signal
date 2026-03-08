import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'

import { Colors } from '@/constants/colors'
import { useTheme } from '@/contexts/ThemeContext'

interface SearchBarProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  onClear?: () => void
  onFocus?: () => void
  onBlur?: () => void
  className?: string
  autoFocus?: boolean
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  onClear,
  onFocus,
  onBlur,
  className = '',
  autoFocus = false,
}) => {
  const { isDark } = useTheme()

  return (
    <View
      className={`flex-row items-center rounded-lg border border-neutral-300 bg-white px-4 py-2 dark:border-neutral-600 dark:bg-neutral-800 ${className}`}
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
        placeholderTextColor={isDark ? Colors.neutral[400] : Colors.neutral[500]}
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus={autoFocus}
        className="ml-2 flex-1 text-base text-neutral-900 dark:text-neutral-100"
      />
      {value.length > 0 && onClear && (
        <TouchableOpacity onPress={onClear}>
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

export default SearchBar
