import { Button } from "@/components/atoms";
import { LeaveCard } from "@/components/molecules";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LeavesScreen() {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const leaves = [
    {
      id: 1,
      type: "Annual Leave",
      startDate: "Dec 15, 2024",
      endDate: "Dec 20, 2024",
      status: "approved" as const,
      days: 5,
    },
    {
      id: 2,
      type: "Sick Leave",
      startDate: "Nov 28, 2024",
      endDate: "Nov 29, 2024",
      status: "pending" as const,
      days: 2,
    },
    {
      id: 3,
      type: "Casual Leave",
      startDate: "Nov 10, 2024",
      endDate: "Nov 10, 2024",
      status: "approved" as const,
      days: 1,
    },
    {
      id: 4,
      type: "Medical Leave",
      startDate: "Oct 25, 2024",
      endDate: "Oct 27, 2024",
      status: "rejected" as const,
      days: 3,
    },
  ];

  const filteredLeaves =
    filter === "all" ? leaves : leaves.filter((leave) => leave.status === filter);

  return (
    <SafeAreaView className="flex-1 bg-neutral-50 dark:bg-neutral-950">
      <View className="flex-1" style={{ paddingBottom: 100 }}>
        {/* Header with Action Button */}
        <View className="px-4 pt-4 pb-2 bg-white border-b border-gray-200">
          <Button variant="primary" size="md">
            + Request New Leave
          </Button>
        </View>

        {/* Filter Tabs */}
        <View className="flex-row px-4 py-3 bg-white border-b border-gray-200">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-2">
              {["all", "pending", "approved", "rejected"].map((status) => (
                <Button
                  key={status}
                  variant={filter === status ? "primary" : "ghost"}
                  size="sm"
                  onPress={() => setFilter(status as any)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Leave List */}
        <ScrollView className="flex-1 px-4 pt-4">
          <View className="gap-3 pb-4">
            {filteredLeaves.map((leave) => (
              <LeaveCard key={leave.id} {...leave} />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
