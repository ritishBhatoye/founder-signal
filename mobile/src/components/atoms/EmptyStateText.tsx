/**
 * EmptyStateText - Text for empty states
 * Usage: <EmptyStateText>No leave requests found</EmptyStateText>
 */
import { tva } from "@/utils/tva";
import React from "react";
import { Text } from "react-native";

interface EmptyStateTextProps {
  children: React.ReactNode;
  className?: string;
}

const textStyle = tva({
  base: "text-center text-neutral-500 dark:text-neutral-400 text-base",
});

const EmptyStateText: React.FC<EmptyStateTextProps> = ({ children, className = "" }) => {
  return <Text className={textStyle({ className })}>{children}</Text>;
};

export default EmptyStateText;
