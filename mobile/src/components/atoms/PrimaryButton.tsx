/**
 * PrimaryButton - Main action button with loading state
 * Usage: <PrimaryButton onPress={handleSubmit}>Apply Leave</PrimaryButton>
 */
import Ionicons from "@expo/vector-icons/Ionicons";
import { tva } from "@/utils/tva";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

type ButtonSize = "sm" | "md" | "lg";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  className?: string;
}

const buttonStyle = tva({
  base: "flex-row items-center justify-center rounded-xl bg-primary-600 active:bg-primary-700",
  variants: {
    size: {
      sm: "px-4 py-2",
      md: "px-6 py-3",
      lg: "px-8 py-4",
    },
    disabled: {
      true: "opacity-50",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const textStyle = tva({
  base: "font-semibold text-white",
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onPress,
  size = "md",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  className = "",
}) => {
  const iconSizes = { sm: 16, md: 20, lg: 24 };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={buttonStyle({ size, disabled: disabled || loading, fullWidth, className })}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <Ionicons name={icon} size={iconSizes[size]} color="#fff" style={{ marginRight: 8 }} />
          )}
          <Text className={textStyle({ size })}>{children}</Text>
          {icon && iconPosition === "right" && (
            <Ionicons name={icon} size={iconSizes[size]} color="#fff" style={{ marginLeft: 8 }} />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
