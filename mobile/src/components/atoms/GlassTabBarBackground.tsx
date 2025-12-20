import { useTheme } from "@/contexts/ThemeContext";
import { BlurView } from "expo-blur";
import { StyleSheet, View } from "react-native";

const GlassTabBarBackground = () => {
  const { isDark } = useTheme();

  return (
    <View style={StyleSheet.absoluteFill}>
      <BlurView
        intensity={isDark ? 80 : 20}
        tint={isDark ? "dark" : "light"}
        style={[
          StyleSheet.absoluteFill,
          {
            borderRadius: 30,
            overflow: "hidden",
          },
        ]}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: isDark ? "rgba(31, 41, 55, 0.4)" : "rgba(255, 255, 255, 0.4)",
            borderRadius: 30,
            borderWidth: 1,
            borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.6)",
          },
        ]}
      />
    </View>
  );
};

export default GlassTabBarBackground;
