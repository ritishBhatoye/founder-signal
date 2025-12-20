/**
 * SubTitle - Secondary text for descriptions and subtitles
 * Usage: <SubTitle>Manage your leave requests</SubTitle>
 */
import { tva } from "@/utils/tva";
import React from "react";
import { Text } from "react-native";

type SubTitleSize = "xs" | "sm" | "md" | "lg";

interface SubTitleProps {
  children: React.ReactNode;
  size?: SubTitleSize;
  className?: string;
  muted?: boolean;
}

const subTitleStyle = tva({
  base: "font-normal",
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    muted: {
      true: "text-neutral-500 dark:text-neutral-400",
      false: "text-neutral-700 dark:text-neutral-300",
    },
  },
  defaultVariants: {
    size: "sm",
    muted: true,
  },
});

const SubTitle: React.FC<SubTitleProps> = ({
  children,
  size = "sm",
  className = "",
  muted = true,
}) => {
  return <Text className={subTitleStyle({ size, muted, className })}>{children}</Text>;
};

export default SubTitle;
