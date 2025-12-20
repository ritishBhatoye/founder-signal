import { Colors } from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { Switch as RNSwitch, Text, View } from "react-native";

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  labelPosition?: "left" | "right";
}

const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  label,
  disabled = false,
  className = "",
  labelPosition = "right",
}) => {
  const { isDark } = useTheme();

  const switchComponent = (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{
        false: isDark ? Colors.neutral[700] : Colors.neutral[300],
        true: Colors.primary[500],
      }}
      thumbColor={value ? Colors.primary[100] : Colors.neutral[50]}
      ios_backgroundColor={isDark ? Colors.neutral[700] : Colors.neutral[300]}
    />
  );

  if (!label) {
    return switchComponent;
  }

  return (
    <View className={`flex-row items-center ${className}`}>
      {labelPosition === "left" && (
        <Text className="mr-3 text-base text-neutral-900 dark:text-neutral-100">{label}</Text>
      )}
      {switchComponent}
      {labelPosition === "right" && (
        <Text className="ml-3 text-base text-neutral-900 dark:text-neutral-100">{label}</Text>
      )}
    </View>
  );
};

export default Switch;
