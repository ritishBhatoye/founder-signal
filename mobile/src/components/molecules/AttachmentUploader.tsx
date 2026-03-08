/**
 * AttachmentUploader - File upload component for documents
 * Usage: <AttachmentUploader files={files} onAdd={addFile} onRemove={removeFile} />
 */
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { Colors } from '@/constants/colors'
import { useTheme } from '@/contexts/ThemeContext'

interface AttachmentFile {
  id: string
  name: string
  size?: string
  type?: string
}

interface AttachmentUploaderProps {
  files: AttachmentFile[]
  onAdd: () => void
  onRemove: (id: string) => void
  maxFiles?: number
  label?: string
  className?: string
}

const AttachmentUploader: React.FC<AttachmentUploaderProps> = ({
  files,
  onAdd,
  onRemove,
  maxFiles = 5,
  label = 'Attachments',
  className = '',
}) => {
  const { isDark } = useTheme()
  const canAdd = files.length < maxFiles

  return (
    <View className={`w-full ${className}`}>
      <Text className="mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {label}
      </Text>
      {canAdd && (
        <TouchableOpacity
          onPress={onAdd}
          className="mb-3 items-center rounded-xl border-2 border-dashed border-neutral-300 p-4 dark:border-neutral-600"
        >
          <Ionicons
            name="cloud-upload-outline"
            size={32}
            color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
          />
          <Text className="mt-2 text-sm text-neutral-500">Tap to upload files</Text>
          <Text className="mt-1 text-xs text-neutral-400">Max {maxFiles} files</Text>
        </TouchableOpacity>
      )}
      {files.map((file) => (
        <View
          key={file.id}
          className="mb-2 flex-row items-center rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800"
        >
          <Ionicons
            name="document-outline"
            size={20}
            color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
          />
          <View className="ml-3 flex-1">
            <Text
              className="text-sm text-neutral-900 dark:text-neutral-100"
              numberOfLines={1}
            >
              {file.name}
            </Text>
            {file.size && <Text className="text-xs text-neutral-500">{file.size}</Text>}
          </View>
          <TouchableOpacity onPress={() => onRemove(file.id)} className="p-1">
            <Ionicons name="close-circle" size={20} color={Colors.error[500]} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )
}

export default AttachmentUploader
