import { View, ViewProps } from "react-native";

interface CardProps extends ViewProps {
  variant?: "elevated" | "outlined" | "filled";
  className?: string;
}

export const Card = ({ variant = "elevated", children, className = "", ...props }: CardProps) => {
  const baseClasses = "rounded-xl p-4";

  const variantClasses = {
    elevated: "bg-white shadow-md dark:bg-neutral-800",
    outlined: "bg-white border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700",
    filled: "bg-neutral-50 dark:bg-neutral-900",
  };

  return (
    <View className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </View>
  );
};
