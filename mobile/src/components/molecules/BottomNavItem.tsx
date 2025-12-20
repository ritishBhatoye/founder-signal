/**
 * BottomNavItem - Tab bar item for bottom navigation
 * Usage: <BottomNavItem icon="home" label="Home" active={true} onPress={handlePress} />
 */
import { Colors } from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface BottomNavItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconOutline?: keyof typeof Ionicons.glyphMap;
  label: string;
  active?: boolean;
  onPress: () => void;
  badge?: number;
  className?: string;
}

const BottomNavItem: React.FC<BottomNavItemProps> = ({
  icon,
  iconOutline,
  label,
  active = false,
  onPress,
  badge,
  className = "",
}) => {
  const { isDark } = useTheme();
  const iconName = active ? icon : iconOutline || icon;
  const iconColor = active
    ? Colors.primary[600]
    : isDark
    ? Colors.neutral[400]
    : Colors.neutral[500];
  const textColor = active ? "text-primary-600" : "text-neutral-500 dark:text-neutral-400";

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-1 items-center py-2 ${className}`}
      activeOpacity={0.7}
    >
      <View className="relative">
        <Ionicons name={iconName} size={24} color={iconColor} />
        {badge !== undefined && badge > 0 && (
          <View className="absolute -top-1 -right-2 bg-error-500 rounded-full min-w-[16px] h-4 items-center justify-center px-1">
            <Text className="text-white text-[10px] font-bold">{badge > 9 ? "9+" : badge}</Text>
          </View>
        )}
      </View>
      <Text className={`text-xs mt-1 font-medium ${textColor}`}>{label}</Text>
    </TouchableOpacity>
  );
};

export default BottomNavItem;
