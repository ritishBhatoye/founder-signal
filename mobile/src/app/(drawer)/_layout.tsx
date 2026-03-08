import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Drawer } from 'expo-router/drawer'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { Icon, Text } from '@/components/atoms'
import '../../global.css'

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <View className="border-b border-gray-200 px-4 py-6">
        <Text className="text-2xl font-bold text-blue-600">Clockio</Text>
        <Text className="mt-1 text-gray-600">Leave Management</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  )
}

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerActiveTintColor: '#2563EB',
          drawerInactiveTintColor: '#6B7280',
          drawerLabelStyle: {
            marginLeft: -16,
            fontSize: 16,
          },
        }}
      >
        <Drawer.Screen
          name="profile"
          options={{
            title: 'Profile',
            drawerIcon: ({ color, size }) => (
              <Icon name="person-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            title: 'Settings',
            drawerIcon: ({ color, size }) => (
              <Icon name="settings-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}
