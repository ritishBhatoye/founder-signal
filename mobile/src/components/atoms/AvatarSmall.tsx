/**
 * AvatarSmall - Compact avatar for lists and compact UI
 * Usage: <AvatarSmall name="John Doe" imageUri="https://..." />
 */
import { tva } from "@/utils/tva";
import React from "react";
import { Image, Text, View } from "react-native";

interface AvatarSmallProps {
  name?: string;
  imageUri?: string;
  className?: string;
  backgroundColor?: string;
}

const containerStyle = tva({
  base: "w-8 h-8 rounded-full items-center justify-center overflow-hidden",
});

const AvatarSmall: React.FC<AvatarSmallProps> = ({
  name,
  imageUri,
  className = "",
  backgroundColor = "bg-primary-500",
}) => {
  const getInitials = (fullName: string) => {
    const names = fullName.trim().split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  return (
    <View className={`${containerStyle({ className })} ${!imageUri ? backgroundColor : ""}`}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} className="w-8 h-8 rounded-full" resizeMode="cover" />
      ) : (
        <Text className="text-xs font-semibold text-white">{name ? getInitials(name) : "?"}</Text>
      )}
    </View>
  );
};

export default AvatarSmall;
