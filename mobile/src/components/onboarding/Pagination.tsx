import type { OnboardingItem } from "@/data/onboardingData";
import { Animated, View } from "react-native";

interface PaginationProps {
  data: OnboardingItem[];
  scrollX: Animated.Value;
  width: number;
}

export const Pagination = ({ data, scrollX, width }: PaginationProps) => {
  return (
    <View className="flex-row gap-2">
      {data.map((_, index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 30, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={index}
            style={{
              width: dotWidth,
              opacity,
            }}
            className="h-2.5 rounded-full bg-white"
          />
        );
      })}
    </View>
  );
};
