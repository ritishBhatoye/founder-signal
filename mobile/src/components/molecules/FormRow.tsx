/**
 * FormRow - Label + Input combination for forms
 * Usage: <FormRow label="Reason" required><InputField placeholder="Enter reason" /></FormRow>
 */
import React from "react";
import { View } from "react-native";
import InputLabel from "../atoms/InputLabel";

interface FormRowProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

const FormRow: React.FC<FormRowProps> = ({ label, required = false, children, className = "" }) => {
  return (
    <View className={`mb-4 ${className}`}>
      <InputLabel required={required}>{label}</InputLabel>
      <View className="mt-1">{children}</View>
    </View>
  );
};

export default FormRow;
