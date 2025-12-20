/**
 * StatCardSmall - Compact stat display card
 * Usage: <StatCardSmall title="Pending" value={5} icon="time" color="warning" />
 */
import { Colors } from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type StatColor = "primary" | "success" | "warning" | "error" | "info";

interface StatCardSmallProps {
  title: string;
  value: number | string;
  icon?: keyof typeof Ionicons.glyphMap;
  color?: StatColor;
  onPress?: () => void;
  className?: string;
}

const StatCardSmall: React.FC<StatCardSmallProps> = ({
  title,
  value,
  icon,
  color = "primary",
  onPress,
  className = "",
}) => {
  const colorMap = {
    primary: {
      bg: "bg-primary-50 dark:bg-primary-900/30",
      icon: Colors.primary[500],
      text: "text-primary-700",
    },
    success: {
      bg: "bg-success-50 dark:bg-success-900/30",
      icon: Colors.success[500],
      text: "text-success-700",
    },
    warning: {
      bg: "bg-warning-50 dark:bg-warning-900/30",
      icon: Colors.warning[500],
      text: "text-warning-700",
    },
    error: {
      bg: "bg-error-50 dark:bg-error-900/30",
      icon: Colors.error[500],
      text: "text-error-700",
    },
    info: { bg: "bg-info-50 dark:bg-info-900/30", icon: Colors.info[500], text: "text-info-700" },
  };

  const { bg, icon: iconColor, text } = colorMap[color];
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component
      onPress={onPress}
      className={`${bg} rounded-xl p-4 flex-1 ${className}`}
      activeOpacity={0.7}
    >
      {icon && (
        <View className="mb-2">
          <Ionicons name={icon} size={24} color={iconColor} />
        </View>
      )}
      <Text className={`text-2xl font-bold ${text}`}>{value}</Text>
      <Text className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{title}</Text>
    </Component>
  );
};

export default StatCardSmall;
