// FounderOps Design System - Complete Color Scale
export const colors = {
  // Primary Scale (Blue)
  primary: {
    50: "#EFF6FF",
    100: "#DBEAFE",
    200: "#BFDBFE",
    300: "#93C5FD",
    400: "#60A5FA",
    500: "#3B82F6",
    600: "#2563EB",
    700: "#1D4ED8",
    800: "#1E40AF",
    900: "#1E3A8A",
  },

  // Secondary Scale (Purple)
  secondary: {
    50: "#FAF5FF",
    100: "#F3E8FF",
    200: "#E9D5FF",
    300: "#D8B4FE",
    400: "#C084FC",
    500: "#A855F7",
    600: "#9333EA",
    700: "#7E22CE",
    800: "#6B21A8",
    900: "#581C87",
  },

  // Success Scale (Green)
  success: {
    50: "#ECFDF5",
    100: "#D1FAE5",
    200: "#A7F3D0",
    300: "#6EE7B7",
    400: "#34D399",
    500: "#10B981",
    600: "#059669",
    700: "#047857",
    800: "#065F46",
    900: "#064E3B",
  },

  // Warning Scale (Amber)
  warning: {
    50: "#FFFBEB",
    100: "#FEF3C7",
    200: "#FDE68A",
    300: "#FCD34D",
    400: "#FBBF24",
    500: "#F59E0B",
    600: "#D97706",
    700: "#B45309",
    800: "#92400E",
    900: "#78350F",
  },

  // Danger Scale (Red)
  danger: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    200: "#FECACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#EF4444",
    600: "#DC2626",
    700: "#B91C1C",
    800: "#991B1B",
    900: "#7F1D1D",
  },

  // Neutral Scale (Slate)
  neutral: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
  },

  // Base Colors - LIGHT THEME (Bright & Visible)
  bg: "#FFFFFF", // Pure white background
  card: "#F8FAFC", // Light gray cards (Neutral 50)
  border: "#E2E8F0", // Light border (Neutral 200)

  // Text Colors - DARK TEXT ON LIGHT BG
  text: "#0F172A", // Dark text (Neutral 900)
  textMuted: "#64748B", // Muted text (Neutral 500)
  textDark: "#334155", // Darker muted (Neutral 700)

  // Brand Colors
  stripe: "#635BFF",
} as const;

export type StatusType = "good" | "warning" | "danger";
export type TrendType = "up" | "down" | "neutral";

export const getStatusColor = (status: StatusType): string => {
  const map: Record<StatusType, string> = {
    good: colors.success[500],
    warning: colors.warning[500],
    danger: colors.danger[500],
  };
  return map[status];
};

export const getTrendColor = (trend: TrendType): string => {
  const map: Record<TrendType, string> = {
    up: colors.success[500],
    down: colors.danger[500],
    neutral: colors.textMuted,
  };
  return map[trend];
};
