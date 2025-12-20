/**
 * DrawerItemRow - Navigation item for drawer menu
 * Usage: <DrawerItemRow icon="settings" label="Settings" onPress={handlePress} />
 */
import { Colors } from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface DrawerItemRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  active?: boolean;
  badge?: number;
  danger?: boolean;
  className?: string;
}

const DrawerItemRow: React.FC<DrawerItemRowProps> = ({
  icon,
  label,
  onPress,
  active = false,
  badge,
  danger = false,
  className = "",
}) => {
  const { isDark } = useTheme();
  const iconColor = danger
    ? Colors.error[500]
    : active
    ? Colors.primary[600]
    : isDark
    ? Colors.neutral[300]
    : Colors.neutral[600];
  const textColor = danger
    ? "text-error-500"
    : active
    ? "text-primary-600 dark:text-primary-400"
    : "text-neutral-700 dark:text-neutral-300";
  const bgColor = active ? "bg-primary-50 dark:bg-primary-900/30" : "bg-transparent";

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center px-4 py-3 rounded-xl ${bgColor} ${className}`}
      activeOpacity={0.7}
    >
      <Ionicons name={icon} size={22} color={iconColor} />
      <Text className={`flex-1 ml-3 text-base font-medium ${textColor}`}>{label}</Text>
      {badge !== undefined && badge > 0 && (
        <View className="bg-error-500 rounded-full px-2 py-0.5 min-w-[20px] items-center">
          <Text className="text-white text-xs font-bold">{badge > 99 ? "99+" : badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default DrawerItemRow;
