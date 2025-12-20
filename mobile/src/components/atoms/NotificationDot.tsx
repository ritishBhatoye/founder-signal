/**
 * NotificationDot - Small indicator dot for notifications
 * Usage: <NotificationDot count={5} />
 */
import { tva } from "@/utils/tva";
import React from "react";
import { Text, View } from "react-native";

interface NotificationDotProps {
  count?: number;
  showCount?: boolean;
  size?: "sm" | "md";
  className?: string;
}

const dotStyle = tva({
  base: "bg-error-500 rounded-full items-center justify-center",
  variants: {
    size: {
      sm: "w-2 h-2",
      md: "min-w-[18px] h-[18px] px-1",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

const NotificationDot: React.FC<NotificationDotProps> = ({
  count,
  showCount = true,
  size = "sm",
  className = "",
}) => {
  if (count !== undefined && count <= 0) return null;

  return (
    <View className={dotStyle({ size, className })}>
      {showCount && count !== undefined && size === "md" && (
        <Text className="text-white text-xs font-bold">{count > 99 ? "99+" : count}</Text>
      )}
    </View>
  );
};

export default NotificationDot;
