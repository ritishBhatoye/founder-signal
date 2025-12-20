import { Card, Icon, Text } from "@/components/atoms";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Profile Header */}
          <Card variant="elevated" className="mb-6">
            <View className="items-center py-6">
              <View className="w-24 h-24 rounded-full bg-blue-100 items-center justify-center mb-4">
                <Icon name="person" size={48} color="#2563EB" />
              </View>
              <Text className="text-2xl font-bold text-gray-900">John Doe</Text>
              <Text className="text-gray-600 mt-1">Software Engineer</Text>
              <Text className="text-gray-500 text-sm mt-1">john.doe@company.com</Text>
            </View>
          </Card>

          {/* Info Cards */}
          <View className="gap-4">
            <Card variant="outlined">
              <View className="flex-row items-center">
                <Icon name="briefcase-outline" size={24} color="#6B7280" />
                <View className="ml-4 flex-1">
                  <Text className="text-gray-600 text-sm">Department</Text>
                  <Text className="text-gray-900 font-semibold mt-1">Engineering</Text>
                </View>
              </View>
            </Card>

            <Card variant="outlined">
              <View className="flex-row items-center">
                <Icon name="calendar-outline" size={24} color="#6B7280" />
                <View className="ml-4 flex-1">
                  <Text className="text-gray-600 text-sm">Joined Date</Text>
                  <Text className="text-gray-900 font-semibold mt-1">Jan 15, 2023</Text>
                </View>
              </View>
            </Card>

            <Card variant="outlined">
              <View className="flex-row items-center">
                <Icon name="location-outline" size={24} color="#6B7280" />
                <View className="ml-4 flex-1">
                  <Text className="text-gray-600 text-sm">Location</Text>
                  <Text className="text-gray-900 font-semibold mt-1">New York, USA</Text>
                </View>
              </View>
            </Card>

            <Card variant="outlined">
              <View className="flex-row items-center">
                <Icon name="call-outline" size={24} color="#6B7280" />
                <View className="ml-4 flex-1">
                  <Text className="text-gray-600 text-sm">Phone</Text>
                  <Text className="text-gray-900 font-semibold mt-1">+1 234 567 8900</Text>
                </View>
              </View>
            </Card>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
