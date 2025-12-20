import GlassTabBarBackground from "@/components/atoms/GlassTabBarBackground";
import { TabBarIcon } from "@/components/atoms/TabBarIcon";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarBackground: () => <GlassTabBarBackground />,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          height: 70,
          borderRadius: 30,
          backgroundColor: "transparent",
          borderTopWidth: 0,
          paddingTop: 10,
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 20,
              shadowOffset: { width: 0, height: 10 },
            },
            android: {
              elevation: 15,
            },
          }),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          headerTitle: "Clockio",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Dashboard" iconName="grid-outline" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="leaves"
        options={{
          title: "Leaves",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Leaves" iconName="calendar-outline" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          title: "Attendance",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Attendance" iconName="time-outline" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="approvals"
        options={{
          title: "Approvals",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Approvals" iconName="checkmark-circle-outline" focused={focused} />
          ),
          tabBarBadge: 3,
        }}
      />
    </Tabs>
  );
}
