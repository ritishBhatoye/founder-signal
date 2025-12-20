import { Icon } from "@/components/atoms/Icon";
import type { OnboardingItem as OnboardingItemType } from "@/data/onboardingData";
import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

interface OnboardingItemProps {
  item: OnboardingItemType;
  width: number;
  scrollX: Animated.Value;
  index: number;
}

export const OnboardingItem = ({ item, width, scrollX, index }: OnboardingItemProps) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Parallax effect
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const iconScale = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
    extrapolate: "clamp",
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.3, 1, 0.3],
    extrapolate: "clamp",
  });

  return (
    <View style={{ width }} className="items-center justify-center px-8">
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }, { scale: iconScale }],
          opacity: Animated.multiply(fadeAnim, opacity),
        }}
        className="mb-12 items-center"
      >
        {/* Icon Container with Glow Effect */}
        <View className="mb-8 h-40 w-40 items-center justify-center rounded-full bg-white/20 shadow-2xl backdrop-blur-xl">
          <View className="h-32 w-32 items-center justify-center rounded-full bg-white/30">
            <Icon name={item.icon as any} size={80} color="#FFFFFF" />
          </View>
        </View>

        {/* Title */}
        <Text className="mb-6 text-center text-4xl font-bold text-white">{item.title}</Text>

        {/* Description */}
        <Text className="text-center text-lg leading-7 text-white/90">{item.description}</Text>
      </Animated.View>
    </View>
  );
};
