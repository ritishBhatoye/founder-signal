import { Button, Card, Icon, Text } from "@/components/atoms";
import { StatCard } from "@/components/molecules/StatCard";

import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AttendanceScreen() {
  const attendanceData = [
    {
      date: "Nov 30, 2024",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      hours: "9h",
      status: "present",
    },
    {
      date: "Nov 29, 2024",
      checkIn: "09:15 AM",
      checkOut: "06:30 PM",
      hours: "9h 15m",
      status: "present",
    },
    {
      date: "Nov 28, 2024",
      checkIn: "-",
      checkOut: "-",
      hours: "-",
      status: "absent",
    },
    {
      date: "Nov 27, 2024",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      hours: "9h",
      status: "present",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-neutral-50 dark:bg-neutral-950">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="p-4">
          {/* Check In/Out Card */}
          <Card variant="elevated" className="mb-6">
            <View className="items-center py-4">
              <Text className="text-gray-600 mb-2">Current Status</Text>
              <Text className="text-3xl font-bold text-green-600 mb-4">
                Checked In
              </Text>
              <Text className="text-gray-600 mb-6">Since 09:00 AM</Text>
              <Button label="Check Out" variant="primary" size="lg" />
            </View>
          </Card>

          {/* Stats */}
          <View className="flex-row gap-4 mb-6">
            <View className="flex-1">
              <StatCard
                title="This Month"
                value="22"
                icon="calendar"
                color="#10B981"
                subtitle="days present"
              />
            </View>
            <View className="flex-1">
              <StatCard
                title="Total Hours"
                value="176"
                icon="time"
                color="#3B82F6"
                subtitle="this month"
              />
            </View>
          </View>

          {/* Attendance History */}
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Recent Attendance
          </Text>
          <View className="gap-3">
            {attendanceData.map((record, index) => (
              <Card key={index} variant="outlined">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-base font-semibold text-gray-900">
                    {record.date}
                  </Text>
                  <View
                    className={`px-3 py-1 rounded-full ${
                      record.status === "present"
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        record.status === "present"
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {record.status}
                    </Text>
                  </View>
                </View>
                <View className="flex-row justify-between">
                  <View className="flex-row items-center">
                    <Icon name="log-in-outline" size={16} color="#6B7280" />
                    <Text className="text-sm text-gray-600 ml-2">
                      {record.checkIn}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Icon name="log-out-outline" size={16} color="#6B7280" />
                    <Text className="text-sm text-gray-600 ml-2">
                      {record.checkOut}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Icon name="time-outline" size={16} color="#6B7280" />
                    <Text className="text-sm text-gray-600 ml-2">
                      {record.hours}
                    </Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
