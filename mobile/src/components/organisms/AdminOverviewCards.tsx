/**
 * AdminOverviewCards - Dashboard stats for admin users
 * Usage: <AdminOverviewCards stats={stats} onCardPress={handlePress} />
 */
import React from "react";
import { View } from "react-native";
import StatCardSmall from "../molecules/StatCardSmall";

interface AdminStats {
  totalEmployees: number;
  presentToday: number;
  onLeave: number;
  pendingApprovals: number;
}

interface AdminOverviewCardsProps {
  stats: AdminStats;
  onEmployeesPress?: () => void;
  onPresentPress?: () => void;
  onLeavePress?: () => void;
  onApprovalsPress?: () => void;
  className?: string;
}

const AdminOverviewCards: React.FC<AdminOverviewCardsProps> = ({
  stats,
  onEmployeesPress,
  onPresentPress,
  onLeavePress,
  onApprovalsPress,
  className = "",
}) => {
  return (
    <View className={className}>
      <View className="flex-row mb-3">
        <StatCardSmall
          title="Total Employees"
          value={stats.totalEmployees}
          icon="people"
          color="primary"
          onPress={onEmployeesPress}
          className="mr-2"
        />
        <StatCardSmall
          title="Present Today"
          value={stats.presentToday}
          icon="checkmark-circle"
          color="success"
          onPress={onPresentPress}
          className="ml-2"
        />
      </View>
      <View className="flex-row">
        <StatCardSmall
          title="On Leave"
          value={stats.onLeave}
          icon="calendar"
          color="warning"
          onPress={onLeavePress}
          className="mr-2"
        />
        <StatCardSmall
          title="Pending Approvals"
          value={stats.pendingApprovals}
          icon="time"
          color="error"
          onPress={onApprovalsPress}
          className="ml-2"
        />
      </View>
    </View>
  );
};

export default AdminOverviewCards;
