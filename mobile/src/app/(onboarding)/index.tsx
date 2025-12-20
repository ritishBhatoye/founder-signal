import { AuthActionButtons } from "@/components/onboarding/AuthActionButtons";
import { OnboardingItem } from "@/components/onboarding/OnboardingItem";
import { Pagination } from "@/components/onboarding/Pagination";
import { onboardingData } from "@/data/onboardingData";
import { LinearGradient } from "expo-linear-gradient";
import type { ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  StatusBar,
  Text,
  View,
  type ViewToken,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const OnBoardingScreen = (): ReactElement => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);
  const floatAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const width = screenWidth;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // Floating animation for app title
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [floatAnim]);

  // Pulse animation for logo
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulseAnim]);

  const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0]?.index || 0);
    }
  }).current;

  const gradientColors = onboardingData[currentIndex]?.backgroundColor || [
    "rgba(37, 99, 235, 0.95)",
    "rgba(29, 78, 216, 0.98)",
  ];

  const handleSkip = () => {
    if (slidesRef.current) {
      slidesRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={[gradientColors[0], gradientColors[1], "rgba(0,0,0,0.85)"]}
        style={{ flex: 1 }}
      >
        {/* Animated Background Circles */}
        <View className="absolute inset-0">
          <Animated.View
            style={{
              transform: [{ scale: pulseAnim }],
            }}
            className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/5"
          />
          <Animated.View
            style={{
              transform: [{ scale: pulseAnim }],
            }}
            className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/5"
          />
        </View>

        {/* Fixed Header - App Logo & Title */}
        <View className="absolute left-0 right-0 top-0 z-10 items-center pt-16">
          <Animated.View
            style={{
              transform: [{ translateY: floatAnim }, { scale: pulseAnim }],
            }}
            className="items-center"
          >
            {/* Clock Icon Logo */}
            <View className="mb-3 h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-xl backdrop-blur-xl">
              <Text className="text-4xl">⏰</Text>
            </View>
            <Text className="text-3xl font-bold tracking-wider text-white">Clockio</Text>
            <Text className="mt-1 text-sm tracking-wide text-white/80">
              Time Management Made Simple
            </Text>
          </Animated.View>
        </View>

        {/* Skip Button - Top Right */}
        {currentIndex < onboardingData.length - 1 && (
          <View className="absolute right-6 top-16 z-10">
            <Pressable
              onPress={handleSkip}
              className="rounded-full border border-white/30 bg-white/10 px-5 py-2 shadow-lg backdrop-blur-md active:bg-white/20"
            >
              <Text className="text-sm font-semibold text-white">Skip</Text>
            </Pressable>
          </View>
        )}

        {/* Scrollable Content Area */}
        <View className="flex-1 justify-center pt-32">
          <FlatList
            data={onboardingData}
            renderItem={({ item, index }) => (
              <OnboardingItem item={item} width={width} scrollX={scrollX} index={index} />
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            scrollEventThrottle={16}
            ref={slidesRef}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
              useNativeDriver: false,
            })}
            contentContainerStyle={{ flexGrow: 0 }}
          />
        </View>

        {/* Fixed Footer - Pagination & Buttons */}
        <View className="pb-12">
          <View className="mb-8 items-center">
            <Pagination data={onboardingData} scrollX={scrollX} width={width} />
          </View>

          {currentIndex === onboardingData.length - 1 && <AuthActionButtons />}
        </View>
      </LinearGradient>
    </View>
  );
};

export default OnBoardingScreen;
