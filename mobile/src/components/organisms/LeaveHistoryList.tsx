/**
 * LeaveHistoryList - List of past leave requests with filters
 * Usage: <LeaveHistoryList leaves={leaves} onLeavePress={handlePress} />
 */
import { Colors } from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { FlatList, View } from "react-native";
import EmptyStateText from "../atoms/EmptyStateText";
import type { LeaveType } from "../atoms/LeaveTypeTag";
import type { LeaveStatus } from "../atoms/StatusBadge";
import FilterChipGroup from "../molecules/FilterChipGroup";
import LeaveStatusRow from "../molecules/LeaveStatusRow";

interface LeaveRecord {
  id: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  status: LeaveStatus;
  duration: string;
}

interface LeaveHistoryListProps {
  leaves: LeaveRecord[];
  onLeavePress?: (id: string) => void;
  filter?: string;
  onFilterChange?: (filter: string) => void;
  className?: string;
}

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
];

const LeaveHistoryList: React.FC<LeaveHistoryListProps> = ({
  leaves,
  onLeavePress,
  filter = "all",
  onFilterChange,
  className = "",
}) => {
  const filteredLeaves = filter === "all" ? leaves : leaves.filter((l) => l.status === filter);

  return (
    <View className={`flex-1 ${className}`}>
      {onFilterChange && (
        <FilterChipGroup
          options={filterOptions}
          selected={filter}
          onSelect={onFilterChange}
          className="mb-4"
        />
      )}
      <FlatList
        data={filteredLeaves}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LeaveStatusRow {...item} onPress={() => onLeavePress?.(item.id)} className="mb-3" />
        )}
        ListEmptyComponent={
          <View className="items-center py-12">
            <Ionicons name="calendar-outline" size={64} color={Colors.neutral[300]} />
            <EmptyStateText>No leave history found</EmptyStateText>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default LeaveHistoryList;
