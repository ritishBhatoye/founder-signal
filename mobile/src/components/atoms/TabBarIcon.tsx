import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { Animated, View } from "react-native";
import { Icon } from "./Icon";

interface TabBarIconProps {
  focused: boolean;
  iconName: string;
  title: string;
}

export const TabBarIcon = ({ focused, iconName, title }: TabBarIconProps) => {
  const { isDark } = useTheme();
  const scaleAnim = React.useRef(new Animated.Value(focused ? 1 : 0.9)).current;
  const opacityAnim = React.useRef(new Animated.Value(focused ? 1 : 0.6)).current;
  const bgScaleAnim = React.useRef(new Animated.Value(focused ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: focused ? 1 : 0.9,
        useNativeDriver: true,
        friction: 10,
        tension: 80,
      }),
      Animated.timing(opacityAnim, {
        toValue: focused ? 1 : 0.6,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(bgScaleAnim, {
        toValue: focused ? 1 : 0,
        useNativeDriver: true,
        friction: 8,
        tension: 60,
      }),
    ]).start();
  }, [focused, scaleAnim, opacityAnim, bgScaleAnim]);

  return (
    <View className="items-center justify-center py-2">
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        }}
        className="items-center"
      >
        <View className="items-center justify-center w-10 h-10 relative">
          {/* Active Background Circle */}
          <Animated.View
            style={{
              transform: [{ scale: bgScaleAnim }],
              opacity: bgScaleAnim,
            }}
            className="absolute items-center justify-center bg-primary-500 dark:bg-primary-600 rounded-full w-10 h-10 shadow-lg"
          />

          {/* Icon */}
          <Icon
            name={iconName as any}
            size={22}
            color={focused ? "#ffffff" : isDark ? "#9CA3AF" : "#6B7280"}
          />
        </View>

        {/* Label */}
        <Animated.Text
          style={{
            opacity: opacityAnim,
          }}
          className={`text-[10px] w-full mt-1 font-medium text-center ${
            focused
              ? "text-primary-600 dark:text-primary-400"
              : "text-neutral-500 dark:text-neutral-400"
          }`}
        >
          {title}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};
