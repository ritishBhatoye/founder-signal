/**
 * LeaveStatusRow - Compact leave request row with status
 * Usage: <LeaveStatusRow type="sick" startDate="..." endDate="..." status="pending" />
 */
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import LeaveTypeTag, { LeaveType } from "../atoms/LeaveTypeTag";
import type { LeaveStatus } from "../atoms/StatusBadge";
import StatusBadge from "../atoms/StatusBadge";

interface LeaveStatusRowProps {
  type: LeaveType;
  startDate: string;
  endDate: string;
  status: LeaveStatus;
  duration?: string;
  onPress?: () => void;
  className?: string;
}

const LeaveStatusRow: React.FC<LeaveStatusRowProps> = ({
  type,
  startDate,
  endDate,
  status,
  duration,
  onPress,
  className = "",
}) => {
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component
      onPress={onPress}
      className={`flex-row items-center justify-between p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 ${className}`}
      activeOpacity={0.7}
    >
      <View className="flex-1">
        <View className="flex-row items-center mb-2">
          <LeaveTypeTag type={type} size="sm" />
          {duration && <Text className="ml-2 text-xs text-neutral-500">{duration}</Text>}
        </View>
        <Text className="text-sm text-neutral-700 dark:text-neutral-300">
          {startDate} - {endDate}
        </Text>
      </View>
      <StatusBadge status={status} size="sm" />
    </Component>
  );
};

export default LeaveStatusRow;
