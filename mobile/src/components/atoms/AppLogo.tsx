/**
 * AppLogo - Displays the app logo with optional size variants
 * Usage: <AppLogo size="md" />
 */
import { Colors } from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { tva } from "@/utils/tva";
import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";

type LogoSize = "sm" | "md" | "lg" | "xl";

interface AppLogoProps {
  size?: LogoSize;
  showText?: boolean;
  imageSource?: ImageSourcePropType;
  className?: string;
}

const logoContainerStyle = tva({
  base: "items-center justify-center",
  variants: {
    size: {
      sm: "w-8 h-8",
      md: "w-12 h-12",
      lg: "w-16 h-16",
      xl: "w-24 h-24",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const logoTextStyle = tva({
  base: "font-bold text-primary-600 dark:text-primary-400",
  variants: {
    size: {
      sm: "text-lg",
      md: "text-xl",
      lg: "text-2xl",
      xl: "text-3xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const AppLogo: React.FC<AppLogoProps> = ({
  size = "md",
  showText = true,
  imageSource,
  className = "",
}) => {
  const iconSizes = { sm: 24, md: 32, lg: 48, xl: 64 };

  return (
    <View className={`flex-row items-center ${className}`}>
      <View
        className={`${logoContainerStyle({
          size,
        })} rounded-xl bg-primary-100 dark:bg-primary-900 items-center justify-center`}
      >
        {imageSource ? (
          <Image
            source={imageSource}
            className={logoContainerStyle({ size })}
            resizeMode="contain"
          />
        ) : (
          <Ionicons name="time" size={iconSizes[size]} color={Colors.primary[500]} />
        )}
      </View>
      {showText && <Text className={`${logoTextStyle({ size })} ml-2`}>Clockio</Text>}
    </View>
  );
};

export default AppLogo;
