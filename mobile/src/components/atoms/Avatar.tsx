import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  name?: string;
  imageUri?: string | ImageSourcePropType;
  size?: AvatarSize;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  name,
  imageUri,
  size = "md",
  className = "",
  backgroundColor = "bg-primary-500",
  textColor = "text-white",
}) => {
  const getSizeStyles = () => {
    const sizes = {
      xs: "w-6 h-6",
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12",
      xl: "w-16 h-16",
    };
    return sizes[size];
  };

  const getTextSize = () => {
    const textSizes = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-2xl",
    };
    return textSizes[size];
  };

  const getInitials = (fullName: string) => {
    const names = fullName.trim().split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  return (
    <View
      className={`items-center justify-center rounded-full ${getSizeStyles()} ${
        !imageUri ? backgroundColor : ""
      } ${className}`}
    >
      {imageUri ? (
        <Image
          source={typeof imageUri === "string" ? { uri: imageUri } : imageUri}
          className={`rounded-full ${getSizeStyles()}`}
          resizeMode="cover"
        />
      ) : (
        <Text className={`font-semibold ${textColor} ${getTextSize()}`}>
          {name ? getInitials(name) : "?"}
        </Text>
      )}
    </View>
  );
};

export default Avatar;
