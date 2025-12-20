/**
 * UserInfoRow - Displays user avatar, name, and role/department
 * Usage: <UserInfoRow name="John Doe" role="Software Engineer" imageUri="..." />
 */
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AvatarMedium from "../atoms/AvatarMedium";

interface UserInfoRowProps {
  name: string;
  role?: string;
  department?: string;
  imageUri?: string;
  onPress?: () => void;
  rightContent?: React.ReactNode;
  showOnlineStatus?: boolean;
  isOnline?: boolean;
  className?: string;
}

const UserInfoRow: React.FC<UserInfoRowProps> = ({
  name,
  role,
  department,
  imageUri,
  onPress,
  rightContent,
  showOnlineStatus = false,
  isOnline = false,
  className = "",
}) => {
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component
      onPress={onPress}
      className={`flex-row items-center ${className}`}
      activeOpacity={0.7}
    >
      <AvatarMedium
        name={name}
        imageUri={imageUri}
        showBadge={showOnlineStatus}
        badgeColor={isOnline ? "bg-success-500" : "bg-neutral-400"}
      />
      <View className="flex-1 ml-3">
        <Text
          className="text-base font-semibold text-neutral-900 dark:text-neutral-100"
          numberOfLines={1}
        >
          {name}
        </Text>
        {(role || department) && (
          <Text className="text-sm text-neutral-500 dark:text-neutral-400" numberOfLines={1}>
            {role}
            {role && department ? " • " : ""}
            {department}
          </Text>
        )}
      </View>
      {rightContent}
    </Component>
  );
};

export default UserInfoRow;
