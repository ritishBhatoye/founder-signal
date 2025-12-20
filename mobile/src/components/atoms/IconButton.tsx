import { Colors } from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { TouchableOpacity } from "react-native";

type IconButtonVariant = "filled" | "outlined" | "ghost";
type IconButtonSize = "sm" | "md" | "lg";
type IconButtonColor = "primary" | "secondary" | "success" | "warning" | "error" | "neutral";

interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  color?: IconButtonColor;
  disabled?: boolean;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  variant = "ghost",
  size = "md",
  color = "primary",
  disabled = false,
  className = "",
}) => {
  const { isDark } = useTheme();

  const getSizeStyles = () => {
    const sizes = {
      sm: { container: "w-8 h-8", icon: 18 },
      md: { container: "w-10 h-10", icon: 22 },
      lg: { container: "w-12 h-12", icon: 26 },
    };
    return sizes[size];
  };

  const getVariantStyles = () => {
    const colorMap = {
      primary: Colors.primary[500],
      secondary: Colors.secondary[500],
      success: Colors.success[500],
      warning: Colors.warning[500],
      error: Colors.error[500],
      neutral: isDark ? Colors.neutral[300] : Colors.neutral[600],
    };

    const styles = {
      filled: {
        container: `bg-${color}-500`,
        iconColor: Colors.text.inverse,
      },
      outlined: {
        container: `border-2 border-${color}-500 bg-transparent`,
        iconColor: colorMap[color],
      },
      ghost: {
        container: "bg-transparent",
        iconColor: colorMap[color],
      },
    };

    return styles[variant];
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`items-center justify-center rounded-full ${sizeStyles.container} ${
        variantStyles.container
      } ${disabled ? "opacity-50" : ""} ${className}`}
    >
      <Ionicons name={icon} size={sizeStyles.icon} color={variantStyles.iconColor} />
    </TouchableOpacity>
  );
};

export default IconButton;
