import { useTheme } from "@/contexts/ThemeContext";
import { TextInput, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  error?: boolean;
}

export const Input = ({ error, ...props }: InputProps) => {
  const { isDark } = useTheme();
  const baseClasses = "border rounded-lg px-4 py-3 text-base";
  const errorClasses = error ? "border-error-500" : "border-neutral-300 dark:border-neutral-600";
  const textClasses = "text-neutral-900 dark:text-neutral-100";
  const bgClasses = "bg-white dark:bg-neutral-800";

  return (
    <TextInput
      className={`${baseClasses} ${errorClasses} ${textClasses} ${bgClasses}`}
      placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
      {...props}
    />
  );
};
