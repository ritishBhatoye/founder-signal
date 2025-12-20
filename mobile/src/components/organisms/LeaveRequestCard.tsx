/**
 * LeaveRequestCard - Detailed leave request card with actions
 * Usage: <LeaveRequestCard request={request} onApprove={...} onReject={...} />
 */
import { Colors } from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AvatarSmall from "../atoms/AvatarSmall";
import LeaveTypeTag, { LeaveType } from "../atoms/LeaveTypeTag";
import PrimaryButton from "../atoms/PrimaryButton";
import SecondaryButton from "../atoms/SecondaryButton";
import type { LeaveStatus } from "../atoms/StatusBadge";
import StatusBadge from "../atoms/StatusBadge";

interface LeaveRequest {
  id: string;
  employeeName: string;
  employeeImage?: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  duration: string;
  reason: string;
  status: LeaveStatus;
  appliedOn?: string;
}

interface LeaveRequestCardProps {
  request: LeaveRequest;
  onPress?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  showActions?: boolean;
  loading?: boolean;
  className?: string;
}

const LeaveRequestCard: React.FC<LeaveRequestCardProps> = ({
  request,
  onPress,
  onApprove,
  onReject,
  showActions = false,
  loading = false,
  className = "",
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      className={`bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700 ${className}`}
      activeOpacity={0.7}
    >
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-row items-center flex-1">
          <AvatarSmall name={request.employeeName} imageUri={request.employeeImage} />
          <View className="ml-2 flex-1">
            <Text
              className="text-base font-semibold text-neutral-900 dark:text-neutral-100"
              numberOfLines={1}
            >
              {request.employeeName}
            </Text>
            {request.appliedOn && (
              <Text className="text-xs text-neutral-500">Applied {request.appliedOn}</Text>
            )}
          </View>
        </View>
        <StatusBadge status={request.status} size="sm" />
      </View>
      <View className="flex-row items-center mb-2">
        <LeaveTypeTag type={request.leaveType} size="sm" />
        <Text className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">
          {request.duration}
        </Text>
      </View>
      <View className="flex-row items-center mb-2">
        <Ionicons name="calendar-outline" size={14} color={Colors.neutral[500]} />
        <Text className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
          {request.startDate} - {request.endDate}
        </Text>
      </View>
      <Text className="text-sm text-neutral-600 dark:text-neutral-400" numberOfLines={2}>
        {request.reason}
      </Text>
      {showActions && request.status === "pending" && (
        <View className="flex-row mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-700 space-x-2">
          <View className="flex-1">
            <SecondaryButton onPress={onReject!} danger disabled={loading}>
              Reject
            </SecondaryButton>
          </View>
          <View className="flex-1">
            <PrimaryButton onPress={onApprove!} loading={loading}>
              Approve
            </PrimaryButton>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default LeaveRequestCard;
