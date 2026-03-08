import React from "react";
import { TextInput, TextInputProps } from "react-native";

interface AuthInputProps extends TextInputProps {
  error?: boolean;
}

export const AuthInput = ({ error, style, ...props }: AuthInputProps) => {
  return (
    <TextInput
      style={[
        {
          height: 56,
          borderRadius: 16,
          paddingHorizontal: 16,
          fontSize: 16,
          color: "#FFFFFF",
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderWidth: 1,
          borderColor: error ? "#EF4444" : "rgba(255, 255, 255, 0.15)",
        },
        style,
      ]}
      placeholderTextColor="#6B7280"
      {...props}
    />
  );
};
