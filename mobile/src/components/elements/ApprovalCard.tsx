import React from "react";
import { Text, View } from "react-native";
import { Avatar, CustomButton, Divider, LeaveTypeIcon } from "../atoms";
import type { LeaveType } from "../atoms/LeaveTypeIcon";

interface ApprovalCardProps {
  employeeName: string;
  employeeAvatar?: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  duration: string;
  reason: string;
  onApprove: () => void;
  onReject: () => void;
  loading?: boolean;
  className?: string;
}

const ApprovalCard: React.FC<ApprovalCardProps> = ({
  employeeName,
  employeeAvatar,
  leaveType,
  startDate,
  endDate,
  duration,
  reason,
  onApprove,
  onReject,
  loading = false,
  className = "",
}) => {
  return (
    <View
      className={`mb-3 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800 ${className}`}
    >
      <View className="mb-3 flex-row items-center">
        <Avatar name={employeeName} imageUri={employeeAvatar} size="md" />
        <View className="ml-3 flex-1">
          <Text className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            {employeeName}
          </Text>
          <View className="mt-1 flex-row items-center">
            <LeaveTypeIcon type={leaveType} size={16} />
            <Text className="ml-2 text-sm capitalize text-neutral-600 dark:text-neutral-400">
              {leaveType} Leave
            </Text>
          </View>
        </View>
      </View>

      <Divider className="mb-3" />

      <View className="mb-3">
        <View className="mb-2 flex-row justify-between">
          <Text className="text-sm text-neutral-600 dark:text-neutral-400">Period</Text>
          <Text className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {startDate} - {endDate}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-sm text-neutral-600 dark:text-neutral-400">Duration</Text>
          <Text className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {duration}
          </Text>
        </View>
      </View>

      <View className="mb-4 rounded-lg bg-neutral-50 p-3 dark:bg-neutral-900">
        <Text className="mb-1 text-xs font-medium text-neutral-600 dark:text-neutral-400">
          Reason
        </Text>
        <Text className="text-sm text-neutral-900 dark:text-neutral-100">{reason}</Text>
      </View>

      <View className="flex-row space-x-2">
        <CustomButton
          label="Reject"
          variant="dangerSecondary"
          size="md"
          width="half"
          onPress={onReject}
          disabled={loading}
          className="flex-1"
        />
        <CustomButton
          label="Approve"
          variant="primary"
          size="md"
          width="half"
          onPress={onApprove}
          loading={loading}
          className="flex-1"
        />
      </View>
    </View>
  );
};

export default ApprovalCard;
