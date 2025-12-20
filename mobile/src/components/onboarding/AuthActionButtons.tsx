import Button from "@/components/atoms/Button";

import { useRouter } from "expo-router";
import { View } from "react-native";

export const AuthActionButtons = () => {
  const router = useRouter();

  return (
    <View className="px-8">
      <View className="gap-4">
        {/* Get Started Button */}
        <Button
          variant="primary"
          size="lg"
          onPress={() => router.push("/(tabs)")}
          className="bg-white active:bg-white/90 shadow-xl"
          label="Get Started"
          labelClassName="text-primary-600 font-bold text-lg"
        />

        <Button
          variant="white"
          size="lg"
          onPress={() => router.push("/(tabs)")}
          className="border-2 border-white/50 bg-white/10 active:bg-white/20"
          label="Sign In"
          labelClassName="text-white font-semibold text-lg"
        />
      </View>
    </View>
  );
};
