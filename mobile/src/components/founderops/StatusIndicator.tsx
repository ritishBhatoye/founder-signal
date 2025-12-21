import { colors, getStatusColor, StatusType } from "@/constants/theme";
import React from "react";
import { Text, View } from "react-native";

interface StatusIndicatorProps {
  label: string;
  value: string;
  status: StatusType;
}

export function StatusIndicator({
  label,
  value,
  status,
}: StatusIndicatorProps) {
  return (
    <View
      className="flex-row items-center justify-between border-b py-3"
      style={{ borderColor: colors.border }}
    >
      <Text style={{ color: colors.textMuted }} className="text-sm">
        {label}
      </Text>
      <View className="flex-row items-center">
        <View
          className="mr-2 h-2 w-2 rounded-full"
          style={{ backgroundColor: getStatusColor(status) }}
        />
        <Text style={{ color: colors.text }} className="text-sm font-medium">
          {value}
        </Text>
      </View>
    </View>
  );
}
