import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, View, Text } from "react-native";

interface SocialCTAProps {
  onSocialPress: (provider: SocialProvider) => void;
}

const SOCIAL_PROVIDERS = [
  {
    id: "google",
    label: "Google",
    icon: "logo-google",
  },
  {
    id: "apple",
    label: "Apple",
    icon: "logo-apple",
  },
] as const;

const SocialCTA: React.FC<SocialCTAProps> = ({ onSocialPress }) => {
  return (
    <View className="mb-8">
      <View className="flex-row items-center mb-6">
        <View className="flex-1 h-px bg-neutral-800" />
        <Text className="text-neutral-500 text-sm mx-4 font-medium">
          social sign up
        </Text>
        <View className="flex-1 h-px bg-neutral-800" />
      </View>

      <View className="flex-row gap-4">
        {SOCIAL_PROVIDERS.map(({ id, label, icon }) => (
          <Pressable
            key={id}
            onPress={() => onSocialPress(id)}
            className="flex-1 h-14 rounded-2xl items-center justify-center flex-row gap-3 border border-white/10 bg-white/5"
          >
            <Ionicons name={icon} size={20} color="white" />
            <Text className="text-white text-sm font-medium">{label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default SocialCTA;
