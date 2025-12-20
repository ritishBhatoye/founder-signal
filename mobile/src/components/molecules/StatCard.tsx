import { Card, Icon, Text } from "@/components/atoms";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
  subtitle?: string;
}

export const StatCard = ({ title, value, icon, color = "#3B82F6", subtitle }: StatCardProps) => {
  return (
    <Card variant="elevated">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-gray-600 text-sm mb-1">{title}</Text>
          <Text className="text-2xl font-bold text-gray-900">{value}</Text>
          {subtitle && <Text className="text-gray-500 text-xs mt-1">{subtitle}</Text>}
        </View>
        <View
          className="w-12 h-12 rounded-full items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon name={icon} size={24} color={color} />
        </View>
      </View>
    </Card>
  );
};
