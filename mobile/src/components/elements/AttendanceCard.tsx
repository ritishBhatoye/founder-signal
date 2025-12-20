import { Colors } from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, View } from "react-native";
import { Badge, Divider } from "../atoms";

interface AttendanceCardProps {
  date: string;
  checkIn?: string;
  checkOut?: string;
  totalHours?: string;
  status: "present" | "absent" | "late" | "half-day" | "leave";
  location?: string;
  className?: string;
}

const AttendanceCard: React.FC<AttendanceCardProps> = ({
  date,
  checkIn,
  checkOut,
  totalHours,
  status,
  location,
  className = "",
}) => {
  const getStatusBadge = () => {
    const statusMap = {
      present: { variant: "success" as const, label: "Present" },
      absent: { variant: "error" as const, label: "Absent" },
      late: { variant: "warning" as const, label: "Late" },
      "half-day": { variant: "info" as const, label: "Half Day" },
      leave: { variant: "info" as const, label: "On Leave" },
    };
    return statusMap[status];
  };

  const badgeConfig = getStatusBadge();

  return (
    <View
      className={`mb-3 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800 ${className}`}
    >
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
          {date}
        </Text>
        <Badge variant={badgeConfig.variant} label={badgeConfig.label} size="sm" />
      </View>

      {(checkIn || checkOut) && (
        <>
          <Divider className="mb-3" />
          <View className="flex-row justify-between">
            {checkIn && (
              <View className="flex-1">
                <View className="mb-1 flex-row items-center">
                  <Ionicons name="log-in" size={16} color={Colors.success[500]} />
                  <Text className="ml-1 text-xs text-neutral-600 dark:text-neutral-400">
                    Check In
                  </Text>
                </View>
                <Text className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {checkIn}
                </Text>
              </View>
            )}
            {checkOut && (
              <View className="flex-1">
                <View className="mb-1 flex-row items-center">
                  <Ionicons name="log-out" size={16} color={Colors.error[500]} />
                  <Text className="ml-1 text-xs text-neutral-600 dark:text-neutral-400">
                    Check Out
                  </Text>
                </View>
                <Text className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {checkOut}
                </Text>
              </View>
            )}
          </View>
        </>
      )}

      {totalHours && (
        <View className="mt-3 rounded-lg bg-primary-50 p-2 dark:bg-primary-900/20">
          <Text className="text-center text-sm font-semibold text-primary-700 dark:text-primary-300">
            Total: {totalHours}
          </Text>
        </View>
      )}

      {location && (
        <View className="mt-2 flex-row items-center">
          <Ionicons name="location" size={14} color={Colors.neutral[500]} />
          <Text className="ml-1 text-xs text-neutral-500 dark:text-neutral-500">{location}</Text>
        </View>
      )}
    </View>
  );
};

export default AttendanceCard;
