/**
 * LeaveTypeSelector - Dropdown/selector for leave types
 * Usage: <LeaveTypeSelector value={leaveType} onChange={setLeaveType} />
 */
import { Colors } from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import InputLabel from "../atoms/InputLabel";
import LeaveTypeTag, { LeaveType } from "../atoms/LeaveTypeTag";

interface LeaveOption {
  type: LeaveType;
  label: string;
  balance?: number;
}

interface LeaveTypeSelectorProps {
  value?: LeaveType;
  onChange: (type: LeaveType) => void;
  options?: LeaveOption[];
  label?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

const defaultOptions: LeaveOption[] = [
  { type: "casual", label: "Casual Leave", balance: 12 },
  { type: "sick", label: "Sick Leave", balance: 10 },
  { type: "annual", label: "Annual Leave", balance: 15 },
  { type: "wfh", label: "Work From Home", balance: 5 },
  { type: "unpaid", label: "Unpaid Leave" },
];

const LeaveTypeSelector: React.FC<LeaveTypeSelectorProps> = ({
  value,
  onChange,
  options = defaultOptions,
  label = "Leave Type",
  required = false,
  error,
  className = "",
}) => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedOption = options.find((o) => o.type === value);

  return (
    <View className={`w-full ${className}`}>
      {label && <InputLabel required={required}>{label}</InputLabel>}
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        className="flex-row items-center justify-between bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-xl px-4 py-3 mt-1"
      >
        {selectedOption ? (
          <LeaveTypeTag type={selectedOption.type} size="md" />
        ) : (
          <Text className="text-neutral-400 text-base">Select leave type</Text>
        )}
        <Ionicons
          name="chevron-down"
          size={20}
          color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
        />
      </TouchableOpacity>
      {error && <Text className="text-xs text-error-500 mt-1">{error}</Text>}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable className="flex-1 bg-black/50 justify-end" onPress={() => setIsOpen(false)}>
          <View className="bg-white dark:bg-neutral-900 rounded-t-3xl p-4 max-h-[60%]">
            <View className="w-12 h-1 bg-neutral-300 dark:bg-neutral-600 rounded-full self-center mb-4" />
            <Text className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Select Leave Type
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.type}
                  onPress={() => {
                    onChange(option.type);
                    setIsOpen(false);
                  }}
                  className={`flex-row items-center justify-between p-4 rounded-xl mb-2 ${
                    value === option.type
                      ? "bg-primary-50 dark:bg-primary-900/30"
                      : "bg-neutral-50 dark:bg-neutral-800"
                  }`}
                >
                  <View className="flex-row items-center">
                    <LeaveTypeTag type={option.type} size="md" />
                    <Text className="ml-3 text-base text-neutral-900 dark:text-neutral-100">
                      {option.label}
                    </Text>
                  </View>
                  {option.balance !== undefined && (
                    <Text className="text-sm text-neutral-500">{option.balance} days</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default LeaveTypeSelector;
