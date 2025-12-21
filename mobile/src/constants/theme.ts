// FounderOps Design System - Single source of truth
export const colors = {
  // Base
  bg: "#030712",
  card: "#020617",
  border: "#374151",
  borderLight: "#1F2937",

  // Text
  text: "#E5E7EB",
  textMuted: "#9CA3AF",
  textDark: "#6B7280",

  // Status
  success: "#22C55E",
  warning: "#FACC15",
  danger: "#EF4444",

  // Brand
  stripe: "#635BFF",
  primary: "#3B82F6",
} as const;

export type StatusType = "good" | "warning" | "danger";
export type TrendType = "up" | "down" | "neutral";

export const getStatusColor = (status: StatusType): string => {
  const map: Record<StatusType, string> = {
    good: colors.success,
    warning: colors.warning,
    danger: colors.danger,
  };
  return map[status];
};

export const getTrendColor = (trend: TrendType): string => {
  const map: Record<TrendType, string> = {
    up: colors.success,
    down: colors.danger,
    neutral: colors.textMuted,
  };
  return map[trend];
};
