/**
 * CommentBox - Text input for adding comments/notes
 * Usage: <CommentBox value={comment} onChangeText={setComment} onSubmit={handleSubmit} />
 */
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'

import { Colors } from '@/constants/colors'
import { useTheme } from '@/contexts/ThemeContext'

interface CommentBoxProps {
  value: string
  onChangeText: (text: string) => void
  onSubmit?: () => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

const CommentBox: React.FC<CommentBoxProps> = ({
  value,
  onChangeText,
  onSubmit,
  placeholder = 'Add a comment...',
  disabled = false,
  className = '',
}) => {
  const { isDark } = useTheme()

  return (
    <View
      className={`flex-row items-end rounded-xl bg-neutral-100 p-2 dark:bg-neutral-800 ${className}`}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDark ? Colors.neutral[500] : Colors.neutral[400]}
        multiline
        className="max-h-24 flex-1 px-2 py-1 text-base text-neutral-900 dark:text-neutral-100"
        editable={!disabled}
      />
      {onSubmit && (
        <TouchableOpacity
          onPress={onSubmit}
          disabled={!value.trim() || disabled}
          className={`rounded-full p-2 ${
            value.trim() ? 'bg-primary-500' : 'bg-neutral-300 dark:bg-neutral-600'
          }`}
        >
          <Ionicons
            name="send"
            size={18}
            color={
              value.trim() ? '#fff' : isDark ? Colors.neutral[400] : Colors.neutral[500]
            }
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default CommentBox
