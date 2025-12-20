import { Card, Icon, Text } from "@/components/atoms";
import { Pressable, View } from "react-native";

interface LeaveCardProps {
  type: string;
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "rejected";
  days: number;
  onPress?: () => void;
}

export const LeaveCard = ({ type, startDate, endDate, status, days, onPress }: LeaveCardProps) => {
  const statusColors = {
    pending: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-300" },
    approved: { bg: "bg-green-100", text: "text-green-700", border: "border-green-300" },
    rejected: { bg: "bg-red-100", text: "text-red-700", border: "border-red-300" },
  };

  const colors = statusColors[status];

  return (
    <Pressable onPress={onPress}>
      <Card variant="outlined">
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900">{type}</Text>
            <Text className="text-sm text-gray-600 mt-1">
              {startDate} - {endDate}
            </Text>
          </View>
          <View className={`px-3 py-1 rounded-full ${colors.bg} border ${colors.border}`}>
            <Text className={`text-xs font-medium ${colors.text} capitalize`}>{status}</Text>
          </View>
        </View>
        <View className="flex-row items-center">
          <Icon name="calendar-outline" size={16} color="#6B7280" />
          <Text className="text-sm text-gray-600 ml-2">
            {days} day{days > 1 ? "s" : ""}
          </Text>
        </View>
      </Card>
    </Pressable>
  );
};
