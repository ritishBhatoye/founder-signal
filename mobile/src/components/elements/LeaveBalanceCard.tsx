import React from "react";
import { Text, View } from "react-native";
import { LeaveTypeIcon, ProgressBar } from "../atoms";
import type { LeaveType } from "../atoms/LeaveTypeIcon";

interface LeaveBalanceCardProps {
  leaveType: LeaveType;
  total: number;
  used: number;
  pending?: number;
  className?: string;
}

const LeaveBalanceCard: React.FC<LeaveBalanceCardProps> = ({
  leaveType,
  total,
  used,
  pending = 0,
  className = "",
}) => {
  const available = total - used - pending;
  const usedPercentage = (used / total) * 100;

  return (
    <View
      className={`rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800 ${className}`}
    >
      <View className="mb-3 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <LeaveTypeIcon type={leaveType} size={20} />
          <Text className="ml-2 text-base font-semibold capitalize text-neutral-900 dark:text-neutral-100">
            {leaveType} Leave
          </Text>
        </View>
        <Text className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
          {available}/{total}
        </Text>
      </View>

      <ProgressBar
        value={used}
        max={total}
        variant={usedPercentage > 80 ? "error" : usedPercentage > 50 ? "warning" : "success"}
        size="md"
        className="mb-3"
      />

      <View className="flex-row justify-between">
        <View className="flex-1">
          <Text className="text-xs text-neutral-500 dark:text-neutral-500">Used</Text>
          <Text className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {used}
          </Text>
        </View>
        {pending > 0 && (
          <View className="flex-1">
            <Text className="text-xs text-neutral-500 dark:text-neutral-500">Pending</Text>
            <Text className="text-sm font-semibold text-warning-600">{pending}</Text>
          </View>
        )}
        <View className="flex-1">
          <Text className="text-xs text-neutral-500 dark:text-neutral-500">Available</Text>
          <Text className="text-sm font-semibold text-success-600">{available}</Text>
        </View>
      </View>
    </View>
  );
};

export default LeaveBalanceCard;
