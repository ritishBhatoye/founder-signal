/**
 * InputLabel - Label for form inputs with optional required indicator
 * Usage: <InputLabel required>Leave Type</InputLabel>
 */
import { tva } from "@/utils/tva";
import React from "react";
import { Text, View } from "react-native";

interface InputLabelProps {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
  htmlFor?: string;
}

const labelStyle = tva({
  base: "text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5",
});

const InputLabel: React.FC<InputLabelProps> = ({ children, required = false, className = "" }) => {
  return (
    <View className="flex-row items-center">
      <Text className={labelStyle({ className })}>{children}</Text>
      {required && <Text className="text-error-500 ml-0.5">*</Text>}
    </View>
  );
};

export default InputLabel;
