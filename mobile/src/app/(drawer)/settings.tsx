import { Card, Icon, Text } from "@/components/atoms";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { ScrollView, Switch, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const { setTheme, isDark } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(false);

  const handleThemeChange = (value: boolean) => {
    setTheme(value ? "dark" : "light");
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-50 dark:bg-neutral-950">
      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            Preferences
          </Text>

          <View className="gap-3 mb-6">
            <Card variant="outlined">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <Icon
                    name="notifications-outline"
                    size={24}
                    color={isDark ? "#9CA3AF" : "#6B7280"}
                  />
                  <View className="ml-4">
                    <Text className="text-neutral-900 dark:text-neutral-100 font-medium">
                      Notifications
                    </Text>
                    <Text className="text-neutral-600 dark:text-neutral-400 text-sm">
                      Receive push notifications
                    </Text>
                  </View>
                </View>
                <Switch value={notifications} onValueChange={setNotifications} />
              </View>
            </Card>

            <Card variant="outlined">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <Icon name="moon-outline" size={24} color={isDark ? "#9CA3AF" : "#6B7280"} />
                  <View className="ml-4">
                    <Text className="text-neutral-900 dark:text-neutral-100 font-medium">
                      Dark Mode
                    </Text>
                    <Text className="text-neutral-600 dark:text-neutral-400 text-sm">
                      Enable dark theme
                    </Text>
                  </View>
                </View>
                <Switch value={isDark} onValueChange={handleThemeChange} />
              </View>
            </Card>

            <Card variant="outlined">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <Icon
                    name="finger-print-outline"
                    size={24}
                    color={isDark ? "#9CA3AF" : "#6B7280"}
                  />
                  <View className="ml-4">
                    <Text className="text-neutral-900 dark:text-neutral-100 font-medium">
                      Biometric Login
                    </Text>
                    <Text className="text-neutral-600 dark:text-neutral-400 text-sm">
                      Use fingerprint or face ID
                    </Text>
                  </View>
                </View>
                <Switch value={biometric} onValueChange={setBiometric} />
              </View>
            </Card>
          </View>

          <Text className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            Account
          </Text>

          <View className="gap-3 mb-6">
            <Card variant="outlined">
              <View className="flex-row items-center">
                <Icon name="lock-closed-outline" size={24} color={isDark ? "#9CA3AF" : "#6B7280"} />
                <Text className="text-neutral-900 dark:text-neutral-100 font-medium ml-4">
                  Change Password
                </Text>
                <Icon
                  name="chevron-forward"
                  size={20}
                  color="#9CA3AF"
                  style={{ marginLeft: "auto" }}
                />
              </View>
            </Card>

            <Card variant="outlined">
              <View className="flex-row items-center">
                <Icon name="language-outline" size={24} color={isDark ? "#9CA3AF" : "#6B7280"} />
                <Text className="text-neutral-900 dark:text-neutral-100 font-medium ml-4">
                  Language
                </Text>
                <Text className="text-neutral-600 dark:text-neutral-400 ml-auto mr-2">English</Text>
                <Icon name="chevron-forward" size={20} color="#9CA3AF" />
              </View>
            </Card>
          </View>

          <Text className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            About
          </Text>

          <View className="gap-3">
            <Card variant="outlined">
              <View className="flex-row items-center">
                <Icon
                  name="information-circle-outline"
                  size={24}
                  color={isDark ? "#9CA3AF" : "#6B7280"}
                />
                <Text className="text-neutral-900 dark:text-neutral-100 font-medium ml-4">
                  Help & Support
                </Text>
                <Icon
                  name="chevron-forward"
                  size={20}
                  color="#9CA3AF"
                  style={{ marginLeft: "auto" }}
                />
              </View>
            </Card>

            <Card variant="outlined">
              <View className="flex-row items-center">
                <Icon
                  name="document-text-outline"
                  size={24}
                  color={isDark ? "#9CA3AF" : "#6B7280"}
                />
                <Text className="text-neutral-900 dark:text-neutral-100 font-medium ml-4">
                  Terms & Privacy
                </Text>
                <Icon
                  name="chevron-forward"
                  size={20}
                  color="#9CA3AF"
                  style={{ marginLeft: "auto" }}
                />
              </View>
            </Card>

            <Card variant="outlined">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Icon name="code-outline" size={24} color={isDark ? "#9CA3AF" : "#6B7280"} />
                  <Text className="text-neutral-900 dark:text-neutral-100 font-medium ml-4">
                    Version
                  </Text>
                </View>
                <Text className="text-neutral-600 dark:text-neutral-400">1.0.0</Text>
              </View>
            </Card>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
