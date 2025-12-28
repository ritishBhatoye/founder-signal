// FounderOps Design System - Complete Color Scales
// Based on Tailwind CSS color palette

// Primary Scale (Blue - Brand Color)
export const primary = {
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
  950: "#172554",
} as const;

// Secondary Scale (Violet)
export const secondary = {
  50: "#F5F3FF",
  100: "#EDE9FE",
  200: "#DDD6FE",
  300: "#C4B5FD",
  400: "#A78BFA",
  500: "#8B5CF6",
  600: "#7C3AED",
  700: "#6D28D9",
  800: "#5B21B6",
  900: "#4C1D95",
  950: "#2E1065",
} as const;

// Success Scale (Emerald)
export const success = {
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
  950: "#022C22",
} as const;

// Warning Scale (Amber)
export const warning = {
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
  950: "#451A03",
} as const;

// Danger Scale (Red)
export const danger = {
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
  950: "#450A0A",
} as const;

// Neutral Scale (Slate)
export const neutral = {
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
  950: "#020617",
} as const;

// Brand Colors
export const brand = {
  stripe: "#635BFF",
  stripeLight: "#7A73FF",
  stripeDark: "#4B44CC",
} as const;

// Light Theme Colors (DEFAULT)
export const lightTheme = {
  bg: "#FFFFFF",
  bgSecondary: neutral[50],
  card: "#FFFFFF",
  cardHover: neutral[50],
  border: neutral[200],
  borderLight: neutral[100],
  text: neutral[900],
  textSecondary: neutral[700],
  textMuted: neutral[500],
  textLight: neutral[400],
} as const;

// Dark Theme Colors
export const darkTheme = {
  bg: neutral[900],
  bgSecondary: neutral[800],
  card: neutral[800],
  cardHover: neutral[700],
  border: neutral[700],
  borderLight: neutral[600],
  text: neutral[50],
  textSecondary: neutral[200],
  textMuted: neutral[400],
  textLight: neutral[500],
} as const;

// Current Active Theme (Light by default)
export const colors = {
  // Color Scales
  primary,
  secondary,
  success,
  warning,
  danger,
  neutral,
  brand,

  // Base Colors (Light Theme - Bright & Visible)
  bg: lightTheme.bg,
  bgSecondary: lightTheme.bgSecondary,
  card: lightTheme.card,
  cardHover: lightTheme.cardHover,
  border: lightTheme.border,
  borderLight: lightTheme.borderLight,

  // Text Colors
  text: lightTheme.text,
  textSecondary: lightTheme.textSecondary,
  textMuted: lightTheme.textMuted,
  textLight: lightTheme.textLight,

  // Brand
  stripe: brand.stripe,
} as const;

// Type definitions
export type StatusType = "good" | "warning" | "danger";
export type TrendType = "up" | "down" | "neutral";

// Helper functions
export const getStatusColor = (status: StatusType): string => {
  const map: Record<StatusType, string> = {
    good: success[500],
    warning: warning[500],
    danger: danger[500],
  };
  return map[status];
};

export const getTrendColor = (trend: TrendType): string => {
  const map: Record<TrendType, string> = {
    up: success[500],
    down: danger[500],
    neutral: colors.textMuted,
  };
  return map[trend];
};

// Get theme colors based on mode
export const getThemeColors = (isDark: boolean) => {
  const theme = isDark ? darkTheme : lightTheme;
  return {
    ...colors,
    bg: theme.bg,
    bgSecondary: theme.bgSecondary,
    card: theme.card,
    cardHover: theme.cardHover,
    border: theme.border,
    borderLight: theme.borderLight,
    text: theme.text,
    textSecondary: theme.textSecondary,
    textMuted: theme.textMuted,
    textLight: theme.textLight,
  };
};
