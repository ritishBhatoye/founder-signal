/**
 * DashboardHeader - Main dashboard header with greeting and quick actions
 * Usage: <DashboardHeader userName="John" onNotificationPress={...} />
 */
import { Colors } from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AvatarMedium from "../atoms/AvatarMedium";
import NotificationDot from "../atoms/NotificationDot";

interface DashboardHeaderProps {
  userName: string;
  userRole?: string;
  userImage?: string;
  notificationCount?: number;
  onProfilePress?: () => void;
  onNotificationPress?: () => void;
  onMenuPress?: () => void;
  className?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  userRole,
  userImage,
  notificationCount = 0,
  onProfilePress,
  onNotificationPress,
  onMenuPress,
  className = "",
}) => {
  const { isDark } = useTheme();
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <View className={`flex-row items-center justify-between py-4 px-4 ${className}`}>
      <View className="flex-row items-center flex-1">
        {onMenuPress && (
          <TouchableOpacity onPress={onMenuPress} className="mr-3 p-1">
            <Ionicons
              name="menu"
              size={24}
              color={isDark ? Colors.neutral[100] : Colors.neutral[900]}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onProfilePress} className="flex-row items-center flex-1">
          <AvatarMedium
            name={userName}
            imageUri={userImage}
            showBadge
            badgeColor="bg-success-500"
          />
          <View className="ml-3 flex-1">
            <Text className="text-sm text-neutral-500 dark:text-neutral-400">{getGreeting()}</Text>
            <Text
              className="text-lg font-bold text-neutral-900 dark:text-neutral-100"
              numberOfLines={1}
            >
              {userName}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onNotificationPress} className="relative p-2">
        <Ionicons
          name="notifications-outline"
          size={24}
          color={isDark ? Colors.neutral[100] : Colors.neutral[900]}
        />
        {notificationCount > 0 && (
          <View className="absolute top-1 right-1">
            <NotificationDot count={notificationCount} size="md" showCount />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default DashboardHeader;
