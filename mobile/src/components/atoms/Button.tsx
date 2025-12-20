import { tva } from "@/utils/tva";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

type Variant =
  | "primary"
  | "secondary"
  | "white"
  | "tertiary"
  | "danger"
  | "dangerSecondary"
  | "link";

type Size = "sm" | "md" | "lg";
type Width = "default" | "full" | "half";

interface CustomButtonProps {
  label: string;
  variant?: Variant;
  size?: Size;
  width?: Width;
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  onPress?: () => void;
  iconPosition?: "left" | "right";
  iconSize?: number;
  color?: string;
}

const button = tva({
  base: "h-fit flex flex-row items-center justify-center border rounded-xl px-4",
  variants: {
    variant: {
      primary: "bg-primary-700 border-primary-700",
      secondary: "bg-white border-yellow-500",
      white: "bg-white border-primary-700",
      tertiary: "bg-neutral-200 border-black",
      danger: "bg-red-600 border-red-600",
      dangerSecondary: "bg-white border-red-600",
      link: "bg-transparent border-transparent",
    },
    size: {
      sm: "py-1",
      md: "py-2",
      lg: "py-3",
    },
    width: {
      full: "w-full",
      half: "w-1/2",
      default: "w-40",
    },
    disabled: {
      true: "opacity-50",
      false: "opacity-100",
    },
  },
  defaultVariants: {
    size: "md",
    width: "default",
    variant: "primary",
  },
});

const buttonText = tva({
  base: "font-semibold",
  variants: {
    variant: {
      primary: "text-white",
      secondary: "text-yellow-500",
      white: "text-primary-700",
      tertiary: "text-black",
      danger: "text-white",
      dangerSecondary: "text-red-600",
      link: "underline text-secondary-500",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  variant = "primary",
  size = "md",
  width = "default",
  loading = false,
  icon,
  disabled = false,
  className = "",
  labelClassName = "",
  iconPosition = "left",
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled || loading}
    className={button({ variant, size, width, disabled, className })}
    activeOpacity={0.7}
  >
    {loading ? (
      <ActivityIndicator color="#fff" size="small" />
    ) : (
      <View className="flex-row items-center">
        {icon && iconPosition === "left" && <View className="mr-2">{icon}</View>}
        <Text className={`${buttonText({ variant, size })} ${labelClassName}`}>{label}</Text>
        {icon && iconPosition === "right" && <View className="ml-2">{icon}</View>}
      </View>
    )}
  </TouchableOpacity>
);

export default CustomButton;
