/**
 * AttachmentUploader - File upload component for documents
 * Usage: <AttachmentUploader files={files} onAdd={addFile} onRemove={removeFile} />
 */
import { Colors } from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface AttachmentFile {
  id: string;
  name: string;
  size?: string;
  type?: string;
}

interface AttachmentUploaderProps {
  files: AttachmentFile[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  maxFiles?: number;
  label?: string;
  className?: string;
}

const AttachmentUploader: React.FC<AttachmentUploaderProps> = ({
  files,
  onAdd,
  onRemove,
  maxFiles = 5,
  label = "Attachments",
  className = "",
}) => {
  const { isDark } = useTheme();
  const canAdd = files.length < maxFiles;

  return (
    <View className={`w-full ${className}`}>
      <Text className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
        {label}
      </Text>
      {canAdd && (
        <TouchableOpacity
          onPress={onAdd}
          className="border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-xl p-4 items-center mb-3"
        >
          <Ionicons
            name="cloud-upload-outline"
            size={32}
            color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
          />
          <Text className="text-sm text-neutral-500 mt-2">Tap to upload files</Text>
          <Text className="text-xs text-neutral-400 mt-1">Max {maxFiles} files</Text>
        </TouchableOpacity>
      )}
      {files.map((file) => (
        <View
          key={file.id}
          className="flex-row items-center bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 mb-2"
        >
          <Ionicons
            name="document-outline"
            size={20}
            color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
          />
          <View className="flex-1 ml-3">
            <Text className="text-sm text-neutral-900 dark:text-neutral-100" numberOfLines={1}>
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
  );
};

export default AttachmentUploader;
