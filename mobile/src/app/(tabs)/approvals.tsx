import { Button, Card, Text } from "@/components/atoms";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ApprovalsScreen() {
  const pendingApprovals = [
    {
      id: 1,
      employeeName: "John Doe",
      type: "Annual Leave",
      startDate: "Dec 10, 2024",
      endDate: "Dec 15, 2024",
      days: 5,
      reason: "Family vacation",
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      type: "Sick Leave",
      startDate: "Dec 5, 2024",
      endDate: "Dec 6, 2024",
      days: 2,
      reason: "Medical appointment",
    },
    {
      id: 3,
      employeeName: "Mike Johnson",
      type: "Casual Leave",
      startDate: "Dec 8, 2024",
      endDate: "Dec 8, 2024",
      days: 1,
      reason: "Personal work",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="p-4">
          <View className="mb-6">
            <Text className="text-2xl font-bold text-gray-900">
              Pending Approvals
            </Text>
            <Text className="text-gray-600 mt-1">
              {pendingApprovals.length} requests waiting
            </Text>
          </View>

          <View className="gap-4">
            {pendingApprovals.map((approval) => (
              <Card key={approval.id} variant="elevated">
                <View className="mb-4">
                  <Text className="text-lg font-semibold text-gray-900">
                    {approval.employeeName}
                  </Text>
                  <Text className="text-sm text-gray-600 mt-1">
                    {approval.type}
                  </Text>
                </View>

                <View className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-sm text-gray-600">Duration</Text>
                    <Text className="text-sm font-medium text-gray-900">
                      {approval.startDate} - {approval.endDate}
                    </Text>
                  </View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-sm text-gray-600">Days</Text>
                    <Text className="text-sm font-medium text-gray-900">
                      {approval.days} day(s)
                    </Text>
                  </View>
                  <View className="mt-2">
                    <Text className="text-sm text-gray-600 mb-1">Reason</Text>
                    <Text className="text-sm text-gray-900">
                      {approval.reason}
                    </Text>
                  </View>
                </View>

                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <Button label="Reject" variant="primary" size="md"></Button>
                  </View>
                  <View className="flex-1">
                    <Button label="Approve" variant="primary" size="md" />
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
