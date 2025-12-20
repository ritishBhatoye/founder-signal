import React from "react";
import { Text, View } from "react-native";

type BadgeVariant =
  | "approved"
  | "pending"
  | "rejected"
  | "draft"
  | "info"
  | "success"
  | "warning"
  | "error";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  icon?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "info",
  size = "md",
  className = "",
  icon,
}) => {
  const getVariantStyles = () => {
    const statusVariants = {
      approved: "bg-success-100 border-success-200",
      pending: "bg-warning-100 border-warning-200",
      rejected: "bg-error-100 border-error-200",
      draft: "bg-neutral-100 border-neutral-200",
      info: "bg-info-100 border-info-200",
      success: "bg-success-100 border-success-200",
      warning: "bg-warning-100 border-warning-200",
      error: "bg-error-100 border-error-200",
    };
    return statusVariants[variant];
  };

  const getTextStyles = () => {
    const textVariants = {
      approved: "text-success-700",
      pending: "text-warning-700",
      rejected: "text-error-700",
      draft: "text-neutral-700",
      info: "text-info-700",
      success: "text-success-700",
      warning: "text-warning-700",
      error: "text-error-700",
    };
    return textVariants[variant];
  };

  const getSizeStyles = () => {
    const sizes = {
      sm: "px-2 py-0.5",
      md: "px-3 py-1",
      lg: "px-4 py-1.5",
    };
    return sizes[size];
  };

  const getTextSize = () => {
    const textSizes = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    };
    return textSizes[size];
  };

  return (
    <View
      className={`flex-row items-center justify-center rounded-full border ${getVariantStyles()} ${getSizeStyles()} ${className}`}
    >
      {icon && <View className="mr-1">{icon}</View>}
      <Text className={`font-medium ${getTextStyles()} ${getTextSize()}`}>{label}</Text>
    </View>
  );
};

export default Badge;
