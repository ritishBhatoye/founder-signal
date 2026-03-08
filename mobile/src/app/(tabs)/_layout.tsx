import { Tabs } from 'expo-router'
import { Platform } from 'react-native'

import GlassTabBarBackground from '@/components/atoms/GlassTabBarBackground'
import { TabBarIcon } from '@/components/atoms/TabBarIcon'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarBackground: () => <GlassTabBarBackground />,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          height: 70,
          borderRadius: 30,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          paddingTop: 10,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
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
          title: 'Dashboard',
          headerTitle: 'FounderOps',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Truth" iconName="pulse-outline" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="summary"
        options={{
          title: 'Summary',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              title="Summary"
              iconName="document-text-outline"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              title="Alerts"
              iconName="notifications-outline"
              focused={focused}
            />
          ),
          tabBarBadge: 2,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Settings" iconName="settings-outline" focused={focused} />
          ),
        }}
      />
    </Tabs>
  )
}
