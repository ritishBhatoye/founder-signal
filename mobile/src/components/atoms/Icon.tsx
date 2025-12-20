import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";

type IconProps = ComponentProps<typeof Ionicons>;

export const Icon = (props: IconProps) => {
  return <Ionicons {...props} />;
};
