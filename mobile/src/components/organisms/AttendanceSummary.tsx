/**
 * AttendanceSummary - Today's attendance status with check-in/out
 * Usage: <AttendanceSummary status="checked-in" checkInTime="09:00 AM" />
 */
import { Colors } from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, View } from "react-native";
import PrimaryButton from "../atoms/PrimaryButton";
import SecondaryButton from "../atoms/SecondaryButton";

type AttendanceStatus = "not-checked-in" | "checked-in" | "checked-out";

interface AttendanceSummaryProps {
  status: AttendanceStatus;
  checkInTime?: string;
  checkOutTime?: string;
  totalHours?: string;
  onCheckIn?: () => void;
  onCheckOut?: () => void;
  loading?: boolean;
  className?: string;
}

const AttendanceSummary: React.FC<AttendanceSummaryProps> = ({
  status,
  checkInTime,
  checkOutTime,
  totalHours,
  onCheckIn,
  onCheckOut,
  loading = false,
  className = "",
}) => {
  const statusConfig = {
    "not-checked-in": {
      label: "Not Checked In",
      color: "text-neutral-500",
      bg: "bg-neutral-100 dark:bg-neutral-800",
    },
    "checked-in": {
      label: "Checked In",
      color: "text-success-600",
      bg: "bg-success-50 dark:bg-success-900/30",
    },
    "checked-out": {
      label: "Checked Out",
      color: "text-primary-600",
      bg: "bg-primary-50 dark:bg-primary-900/30",
    },
  };

  const config = statusConfig[status];

  return (
    <View
      className={`bg-white dark:bg-neutral-800 rounded-2xl p-5 border border-neutral-200 dark:border-neutral-700 ${className}`}
    >
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
          Today's Attendance
        </Text>
        <View className={`px-3 py-1 rounded-full ${config.bg}`}>
          <Text className={`text-sm font-medium ${config.color}`}>{config.label}</Text>
        </View>
      </View>
      <View className="flex-row mb-4">
        <View className="flex-1 items-center py-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl mr-2">
          <Ionicons name="log-in" size={24} color={Colors.success[500]} />
          <Text className="text-xs text-neutral-500 mt-1">Check In</Text>
          <Text className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            {checkInTime || "--:--"}
          </Text>
        </View>
        <View className="flex-1 items-center py-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl ml-2">
          <Ionicons name="log-out" size={24} color={Colors.error[500]} />
          <Text className="text-xs text-neutral-500 mt-1">Check Out</Text>
          <Text className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            {checkOutTime || "--:--"}
          </Text>
        </View>
      </View>
      {totalHours && (
        <View className="bg-primary-50 dark:bg-primary-900/30 rounded-xl p-3 mb-4">
          <Text className="text-center text-sm text-primary-700 dark:text-primary-300">
            Total Hours: <Text className="font-bold">{totalHours}</Text>
          </Text>
        </View>
      )}
      {status === "not-checked-in" && onCheckIn && (
        <PrimaryButton onPress={onCheckIn} loading={loading} fullWidth icon="log-in">
          Check In
        </PrimaryButton>
      )}
      {status === "checked-in" && onCheckOut && (
        <SecondaryButton onPress={onCheckOut} loading={loading} fullWidth icon="log-out">
          Check Out
        </SecondaryButton>
      )}
    </View>
  );
};

export default AttendanceSummary;
