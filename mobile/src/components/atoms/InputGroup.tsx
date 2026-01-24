import { Colors } from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import PasswordStrength from "./PasswordStrength";

interface InputGroupProps extends Omit<TextInputProps, "onChangeText"> {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  onClear?: () => void;
  error?: string;
  touched?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isPassword?: boolean;
  showPasswordStrength?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  className?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  onClear,
  error,
  touched,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  isPassword = false,
  showPasswordStrength = false,
  startContent,
  endContent,
  className = "",
  placeholder,
  ...props
}) => {
  const { isDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isInvalid = !!error && !!touched;

  const getBorderColor = () => {
    if (isInvalid) return "border-error-500";
    if (isFocused) return "border-primary-500";
    return "border-neutral-300 dark:border-neutral-600";
  };

  return (
    <View className={`mb-4 gap-2.5 w-full ${className}`}>
      {label && (
        <View className="flex-row items-center mb-1.5">
          <Text className="text-sm font-medium text-neutral-400 dark:text-neutral-100">
            {label}
          </Text>
          {isRequired && <Text className="text-error-500 ml-0.5">*</Text>}
        </View>
      )}
      <View
        className={`flex-row items-center rounded-xl border px-4 ${getBorderColor()} ${
          isDisabled ? "opacity-50" : ""
        }  dark:bg-neutral-800`}
      >
        {startContent && <View className="mr-3">{startContent}</View>}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          placeholderTextColor={
            isDark ? Colors.neutral[500] : Colors.neutral[400]
          }
          editable={!isDisabled && !isReadOnly}
          secureTextEntry={isPassword && !showPassword}
          className="flex-1 text-base text-neutral-900 dark:text-neutral-100 py-3"
          {...props}
        />
        {value && value.length > 0 && !isPassword && onClear && (
          <TouchableOpacity onPress={onClear} className="ml-2">
            <Ionicons
              name="close-circle"
              size={20}
              color={Colors.neutral[400]}
            />
          </TouchableOpacity>
        )}
        {isPassword && value && value.length > 0 && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="ml-2"
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={22}
              color={Colors.neutral[500]}
            />
          </TouchableOpacity>
        )}
        {endContent && <View className="ml-3">{endContent}</View>}
      </View>
      {isPassword && showPasswordStrength && (
        <PasswordStrength value={value} error={error} />
      )}
      {isInvalid && !showPasswordStrength && (
        <View className="flex-row items-center mt-1">
          <Ionicons name="alert-circle" size={14} color={Colors.error[500]} />
          <Text className="text-xs text-error-500 ml-1">{error}</Text>
        </View>
      )}
    </View>
  );
};

export default InputGroup;
