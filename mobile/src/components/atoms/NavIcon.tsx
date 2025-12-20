/**
 * NavIcon - Navigation icon with optional badge
 * Usage: <NavIcon name="home" active={true} badge={3} />
 */
import { Colors } from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { View } from "react-native";

interface NavIconProps {
  name: keyof typeof Ionicons.glyphMap;
  active?: boolean;
  badge?: number;
  size?: number;
  className?: string;
}

const NavIcon: React.FC<NavIconProps> = ({
  name,
  active = false,
  badge,
  size = 24,
  className = "",
}) => {
  const { isDark } = useTheme();
  const color = active ? Colors.primary[600] : isDark ? Colors.neutral[400] : Colors.neutral[500];

  return (
    <View className={`relative ${className}`}>
      <Ionicons name={name} size={size} color={color} />
      {badge !== undefined && badge > 0 && (
        <View className="absolute -top-1 -right-1 bg-error-500 rounded-full min-w-[16px] h-4 items-center justify-center px-1">
          <Ionicons name="ellipse" size={8} color="#fff" />
        </View>
      )}
    </View>
  );
};

export default NavIcon;
