import { Card, StatCard, Text } from "@/components/atoms";
import { LeaveCard } from "@/components/molecules/LeaveCard";

import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-neutral-50 dark:bg-neutral-950">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="p-4">
          {/* Welcome Section */}
          <View className="mb-6">
            <Text className="text-2xl font-bold text-red-500">
              Welcome back!
            </Text>
            <Text className="text-gray-600 mt-10">
              Here&apos;s your overview for today
            </Text>
          </View>

          {/* Stats Grid */}
          <View className="gap-4 mb-6">
            <View className="flex-row gap-4">
              <View className="flex-1">
                <StatCard
                  title="Leave Balance"
                  value="12"
                  icon="calendar"
                  // color="#10B981"
                  subtitle="days remaining"
                />
              </View>
              <View className="flex-1">
                <StatCard
                  title="Attendance"
                  value="95%"
                  icon="checkmark-circle"
                  // color="#3B82F6"
                  subtitle="this month"
                />
              </View>
            </View>

            <View className="flex-row gap-4">
              <View className="flex-1">
                <StatCard
                  title="Pending"
                  value="2"
                  icon="time"
                  // color="#F59E0B"
                  subtitle="requests"
                />
              </View>
              <View className="flex-1">
                <StatCard
                  title="Hours"
                  value="160"
                  icon="hourglass"
                  // color="#8B5CF6"
                  subtitle="this month"
                />
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <Card variant="elevated" className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </Text>
            <View className="gap-3">
              {/* <Button variant="primary" onPress={() => router.push("/(tabs)/leaves")}>
                Request Leave
              </Button>
              <Button variant="outline" onPress={() => router.push("/(tabs)/attendance")}>
                Mark Attendance
              </Button> */}
            </View>
          </Card>

          {/* Recent Leaves */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Recent Leaves
            </Text>
            <View className="gap-3">
              <LeaveCard
                type="Annual Leave"
                startDate="Dec 15, 2024"
                endDate="Dec 20, 2024"
                status="approved"
                days={5}
              />
              <LeaveCard
                type="Sick Leave"
                startDate="Nov 28, 2024"
                endDate="Nov 29, 2024"
                status="pending"
                days={2}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
