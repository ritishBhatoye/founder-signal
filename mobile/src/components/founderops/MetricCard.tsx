import { colors, getTrendColor, TrendType } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, View } from "react-native";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: TrendType;
  subtitle?: string;
}

const getTrendIcon = (type: TrendType): keyof typeof Ionicons.glyphMap => {
  const map: Record<TrendType, keyof typeof Ionicons.glyphMap> = {
    up: "arrow-up",
    down: "arrow-down",
    neutral: "remove",
  };
  return map[type];
};

export function MetricCard({
  title,
  value,
  change,
  changeType,
  subtitle,
}: MetricCardProps) {
  return (
    <View
      className="rounded-2xl border border-neutral-800 p-4"
      style={{ backgroundColor: colors.card }}
    >
      <Text style={{ color: colors.textMuted }} className="mb-1 text-sm">
        {title}
      </Text>
      <Text style={{ color: colors.text }} className="text-3xl font-bold">
        {value}
      </Text>
      {change && changeType && (
        <View className="mt-2 flex-row items-center">
          <Ionicons
            name={getTrendIcon(changeType)}
            size={14}
            color={getTrendColor(changeType)}
          />
          <Text
            style={{ color: getTrendColor(changeType) }}
            className="ml-1 text-sm"
          >
            {change}
          </Text>
        </View>
      )}
      {subtitle && (
        <Text style={{ color: colors.textMuted }} className="mt-1 text-xs">
          {subtitle}
        </Text>
      )}
    </View>
  );
}
