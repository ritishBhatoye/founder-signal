/**
 * DrawerMenu - Side navigation drawer with user info and menu items
 * Usage: <DrawerMenu user={user} items={menuItems} onItemPress={handlePress} />
 */
import { Colors } from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AvatarMedium from "../atoms/AvatarMedium";
import DrawerItemRow from "../molecules/DrawerItemRow";

interface MenuItem {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  badge?: number;
  danger?: boolean;
}

interface DrawerMenuProps {
  userName: string;
  userRole?: string;
  userImage?: string;
  items: MenuItem[];
  activeItemId?: string;
  onItemPress: (id: string) => void;
  onProfilePress?: () => void;
  onLogout?: () => void;
  className?: string;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({
  userName,
  userRole,
  userImage,
  items,
  activeItemId,
  onItemPress,
  onProfilePress,
  onLogout,
  className = "",
}) => {
  return (
    <SafeAreaView className={`flex-1 bg-white dark:bg-neutral-900 ${className}`}>
      <TouchableOpacity
        onPress={onProfilePress}
        className="px-4 py-6 border-b border-neutral-200 dark:border-neutral-700"
      >
        <View className="flex-row items-center">
          <AvatarMedium name={userName} imageUri={userImage} />
          <View className="ml-3 flex-1">
            <Text className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              {userName}
            </Text>
            {userRole && <Text className="text-sm text-neutral-500">{userRole}</Text>}
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.neutral[400]} />
        </View>
      </TouchableOpacity>
      <ScrollView className="flex-1 px-2 py-4" showsVerticalScrollIndicator={false}>
        {items.map((item) => (
          <DrawerItemRow
            key={item.id}
            icon={item.icon}
            label={item.label}
            badge={item.badge}
            danger={item.danger}
            active={activeItemId === item.id}
            onPress={() => onItemPress(item.id)}
            className="mb-1"
          />
        ))}
      </ScrollView>
      {onLogout && (
        <View className="px-2 py-4 border-t border-neutral-200 dark:border-neutral-700">
          <DrawerItemRow icon="log-out-outline" label="Logout" onPress={onLogout} danger />
        </View>
      )}
    </SafeAreaView>
  );
};

export default DrawerMenu;
