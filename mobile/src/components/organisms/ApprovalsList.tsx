/**
 * ApprovalsList - List of pending approvals with filters
 * Usage: <ApprovalsList requests={requests} onApprove={...} onReject={...} />
 */
import { Colors } from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { FlatList, View } from "react-native";
import EmptyStateText from "../atoms/EmptyStateText";
import type { LeaveType } from "../atoms/LeaveTypeTag";
import type { LeaveStatus } from "../atoms/StatusBadge";
import FilterChipGroup from "../molecules/FilterChipGroup";
import LeaveRequestCard from "./LeaveRequestCard";

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

interface ApprovalsListProps {
  requests: LeaveRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onRequestPress?: (id: string) => void;
  filter?: string;
  onFilterChange?: (filter: string) => void;
  loading?: boolean;
  className?: string;
}

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

const ApprovalsList: React.FC<ApprovalsListProps> = ({
  requests,
  onApprove,
  onReject,
  onRequestPress,
  filter = "all",
  onFilterChange,
  loading = false,
  className = "",
}) => {
  const filteredRequests =
    filter === "all" ? requests : requests.filter((r) => r.status === filter);

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
        data={filteredRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LeaveRequestCard
            request={item}
            onPress={() => onRequestPress?.(item.id)}
            onApprove={() => onApprove(item.id)}
            onReject={() => onReject(item.id)}
            showActions={item.status === "pending"}
            loading={loading}
            className="mb-3"
          />
        )}
        ListEmptyComponent={
          <View className="items-center py-12">
            <Ionicons name="checkmark-done-circle-outline" size={64} color={Colors.neutral[300]} />
            <EmptyStateText>No pending approvals</EmptyStateText>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ApprovalsList;
