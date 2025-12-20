import { Colors } from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface QuickActionCardProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconBg?: string;
  onPress: () => void;
  disabled?: boolean;
  className?: string;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  icon,
  iconColor = Colors.primary[500],
  iconBg = Colors.primary[100],
  onPress,
  disabled = false,
  className = "",
}) => {
  const { isDark } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`flex-1 items-center rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800 ${
        disabled ? "opacity-50" : ""
      } ${className}`}
    >
      <View
        className="mb-3 items-center justify-center rounded-full p-4"
        style={{ backgroundColor: iconBg }}
      >
        <Ionicons name={icon} size={28} color={iconColor} />
      </View>
      <Text className="text-center text-sm font-medium text-neutral-900 dark:text-neutral-100">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default QuickActionCard;
