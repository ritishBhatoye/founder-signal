/**
 * InputField - Styled text input with error state
 * Usage: <InputField placeholder="Enter reason" value={value} onChangeText={setValue} />
 */
import { Colors } from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import { tva } from "@/utils/tva";
import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputFieldProps extends TextInputProps {
  error?: string;
  touched?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

const inputStyle = tva({
  base: "flex-1 text-base text-neutral-900 dark:text-neutral-100 py-3",
});

const containerStyle = tva({
  base: "flex-row items-center rounded-xl border bg-white dark:bg-neutral-800 px-4",
  variants: {
    isError: {
      true: "border-error-500",
      false: "border-neutral-300 dark:border-neutral-600",
    },
    isFocused: {
      true: "border-primary-500",
    },
  },
  defaultVariants: {
    isError: false,
  },
});

const InputField: React.FC<InputFieldProps> = ({
  error,
  touched,
  leftIcon,
  rightIcon,
  containerClassName = "",
  ...props
}) => {
  const { isDark } = useTheme();
  const [isFocused, setIsFocused] = React.useState(false);
  const isError = !!error && !!touched;

  return (
    <View className="w-full">
      <View
        className={containerStyle({
          isError,
          isFocused: isFocused && !isError,
          className: containerClassName,
        })}
      >
        {leftIcon && <View className="mr-3">{leftIcon}</View>}
        <TextInput
          className={inputStyle()}
          placeholderTextColor={isDark ? Colors.neutral[500] : Colors.neutral[400]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {rightIcon && <View className="ml-3">{rightIcon}</View>}
      </View>
      {isError && <Text className="text-xs text-error-500 mt-1">{error}</Text>}
    </View>
  );
};

export default InputField;
