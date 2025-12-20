/**
 * Clockio Color System
 *
 * A comprehensive color palette for the Clockio app
 * All colors are accessible and follow WCAG guidelines
 */

export const Colors = {
  // Primary - Blue (Trust, Professional, Stable)
  primary: {
    50: "#EFF6FF",
    100: "#DBEAFE",
    200: "#BFDBFE",
    300: "#93C5FD",
    400: "#60A5FA",
    500: "#3B82F6", // Main - Use for primary buttons, links
    600: "#2563EB", // Dark - Use for hover states
    700: "#1D4ED8",
    800: "#1E40AF",
    900: "#1E3A8A",
  },

  // Secondary - Emerald (Success, Approval, Growth)
  secondary: {
    50: "#ECFDF5",
    100: "#D1FAE5",
    200: "#A7F3D0",
    300: "#6EE7B7",
    400: "#34D399",
    500: "#10B981", // Main - Use for success states
    600: "#059669",
    700: "#047857",
    800: "#065F46",
    900: "#064E3B",
  },

  // Tertiary - Violet (Accent, Highlights, Stats)
  tertiary: {
    50: "#FAF5FF",
    100: "#F3E8FF",
    200: "#E9D5FF",
    300: "#D8B4FE",
    400: "#C084FC",
    500: "#A855F7", // Main - Use for accents, stats
    600: "#9333EA",
    700: "#7E22CE",
    800: "#6B21A8",
    900: "#581C87",
  },

  // Neutral - Gray (Text, Backgrounds, Borders)
  neutral: {
    50: "#F9FAFB", // Lightest background
    100: "#F3F4F6", // Light background
    200: "#E5E7EB", // Border light
    300: "#D1D5DB", // Border
    400: "#9CA3AF", // Placeholder text
    500: "#6B7280", // Secondary text
    600: "#4B5563", // Body text
    700: "#374151",
    800: "#1F2937",
    900: "#111827", // Darkest text
  },

  // Success - Green (Approved, Completed, Positive)
  success: {
    50: "#F0FDF4",
    100: "#DCFCE7",
    200: "#BBF7D0",
    300: "#86EFAC",
    400: "#4ADE80",
    500: "#22C55E", // Main - Use for approved states
    600: "#16A34A",
    700: "#15803D",
    800: "#166534",
    900: "#14532D",
  },

  // Warning - Amber (Pending, Attention, Caution)
  warning: {
    50: "#FFFBEB",
    100: "#FEF3C7",
    200: "#FDE68A",
    300: "#FCD34D",
    400: "#FBBF24",
    500: "#F59E0B", // Main - Use for pending states
    600: "#D97706",
    700: "#B45309",
    800: "#92400E",
    900: "#78350F",
  },

  // Error - Red (Rejected, Error, Danger)
  error: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    200: "#FECACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#EF4444", // Main - Use for error states
    600: "#DC2626",
    700: "#B91C1C",
    800: "#991B1B",
    900: "#7F1D1D",
  },

  // Info - Cyan (Information, Links, Notifications)
  info: {
    50: "#ECFEFF",
    100: "#CFFAFE",
    200: "#A5F3FC",
    300: "#67E8F9",
    400: "#22D3EE",
    500: "#06B6D4", // Main - Use for info states
    600: "#0891B2",
    700: "#0E7490",
    800: "#155E75",
    900: "#164E63",
  },

  // Semantic Colors (Quick Access)
  background: {
    primary: "#FFFFFF",
    secondary: "#F9FAFB",
    tertiary: "#F3F4F6",
  },

  text: {
    primary: "#111827",
    secondary: "#6B7280",
    tertiary: "#9CA3AF",
    inverse: "#FFFFFF",
  },

  border: {
    light: "#E5E7EB",
    default: "#D1D5DB",
    dark: "#9CA3AF",
  },
} as const;

// Status Colors for Leave Management
export const StatusColors = {
  approved: {
    bg: "#DCFCE7", // success-100
    text: "#15803D", // success-700
    border: "#BBF7D0", // success-200
  },
  pending: {
    bg: "#FEF3C7", // warning-100
    text: "#B45309", // warning-700
    border: "#FDE68A", // warning-200
  },
  rejected: {
    bg: "#FEE2E2", // error-100
    text: "#B91C1C", // error-700
    border: "#FECACA", // error-200
  },
  draft: {
    bg: "#F3F4F6", // neutral-100
    text: "#374151", // neutral-700
    border: "#E5E7EB", // neutral-200
  },
} as const;

// Usage Examples:
// <View style={{ backgroundColor: Colors.primary[500] }} />
// <Text style={{ color: Colors.text.primary }} />
// className="bg-primary-500 text-neutral-900"
