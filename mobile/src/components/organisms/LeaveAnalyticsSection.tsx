/**
 * LeaveAnalyticsSection - Leave balance and usage analytics
 * Usage: <LeaveAnalyticsSection balances={balances} />
 */
import React from "react";
import { Text, View } from "react-native";
import LeaveTypeTag, { LeaveType } from "../atoms/LeaveTypeTag";
import ProgressBar from "../atoms/ProgressBar";

interface LeaveBalance {
  type: LeaveType;
  total: number;
  used: number;
  pending: number;
}

interface LeaveAnalyticsSectionProps {
  balances: LeaveBalance[];
  className?: string;
}

const LeaveAnalyticsSection: React.FC<LeaveAnalyticsSectionProps> = ({
  balances,
  className = "",
}) => {
  return (
    <View className={`bg-white dark:bg-neutral-800 rounded-2xl p-5 ${className}`}>
      <Text className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-4">
        Leave Balance
      </Text>
      {balances.map((balance, index) => {
        const available = balance.total - balance.used - balance.pending;
        const usedPercent = (balance.used / balance.total) * 100;
        const variant = usedPercent > 80 ? "error" : usedPercent > 50 ? "warning" : "success";

        return (
          <View
            key={balance.type}
            className={`${
              index > 0 ? "mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-700" : ""
            }`}
          >
            <View className="flex-row items-center justify-between mb-2">
              <LeaveTypeTag type={balance.type} size="md" />
              <Text className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {available}/{balance.total}
              </Text>
            </View>
            <ProgressBar
              value={balance.used}
              max={balance.total}
              variant={variant}
              size="md"
              className="mb-2"
            />
            <View className="flex-row justify-between">
              <Text className="text-xs text-neutral-500">Used: {balance.used}</Text>
              {balance.pending > 0 && (
                <Text className="text-xs text-warning-600">Pending: {balance.pending}</Text>
              )}
              <Text className="text-xs text-success-600">Available: {available}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default LeaveAnalyticsSection;
