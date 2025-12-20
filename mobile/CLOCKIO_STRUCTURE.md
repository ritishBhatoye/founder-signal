# Clockio - Leave Management System

## ✅ Completed Setup

### Project Structure

```
src/
├── app/                          # Expo Router app directory
│   ├── index.tsx                 # Welcome/Landing screen
│   ├── _layout.tsx               # Root layout
│   ├── (tabs)/                   # Bottom tabs navigation (MAIN)
│   │   ├── _layout.tsx           # Tabs layout
│   │   ├── index.tsx             # Dashboard (Home)
│   │   ├── leaves.tsx            # Leave requests list
│   │   ├── attendance.tsx        # Attendance tracking
│   │   └── approvals.tsx         # Leave approvals (for managers)
│   │
│   └── (drawer)/                 # Drawer navigation (optional)
│       ├── _layout.tsx           # Drawer layout with menu
│       ├── profile.tsx           # User profile screen
│       └── settings.tsx          # App settings screen
│
├── components/                   # Atomic Design Components
│   ├── atoms/                    # Basic building blocks (PascalCase)
│   │   ├── Button.tsx            # Reusable button component
│   │   ├── Input.tsx             # Text input component
│   │   ├── Card.tsx              # Card container component
│   │   ├── Text.tsx              # Text component
│   │   ├── Icon.tsx              # Icon wrapper component
│   │   └── index.ts              # Barrel export
│   │
│   └── molecules/                # Combinations of atoms (PascalCase)
│       ├── FormField.tsx         # Label + Input + Error
│       ├── StatCard.tsx          # Statistics display card
│       ├── LeaveCard.tsx         # Leave request card
│       └── index.ts              # Barrel export
│
├── constants/                    # App constants
│   └── theme.ts                  # Theme colors and fonts
│
└── hooks/                        # Custom React hooks
    ├── use-color-scheme.ts       # Color scheme hook
    └── use-theme-color.ts        # Theme color hook
```

## Navigation Structure

### Root Stack

- **/** - Welcome/Landing screen
- **(tabs)** - Main app with bottom tabs navigation
- **(drawer)** - Optional drawer for profile/settings

### Bottom Tabs (Main Navigation)

- **Dashboard** - Overview with stats and quick actions
- **Leaves** - Leave requests management
- **Attendance** - Attendance tracking and history
- **Approvals** - Pending leave approvals (for managers)

### Drawer Navigation (Optional)

- **Profile** - User profile and information
- **Settings** - App preferences and settings

## Screens Overview

### 1. Welcome Screen (`/`)

- App branding (Clockio logo)
- Tagline: "Smart Leave & Attendance Management"
- "Get Started" button → navigates to Dashboard

### 2. Dashboard (`/(tabs)/`)

- Welcome message
- 4 stat cards:
  - Leave Balance (days remaining)
  - Attendance percentage
  - Pending requests
  - Hours worked this month
- Quick Actions:
  - Request Leave button
  - Mark Attendance button
- Recent Leaves section

### 3. Leaves Screen (`/(tabs)/leaves`)

- "Request New Leave" button
- Filter tabs: All, Pending, Approved, Rejected
- List of leave requests with:
  - Leave type
  - Date range
  - Status badge
  - Number of days

### 4. Attendance Screen (`/(tabs)/attendance`)

- Check In/Out card with current status
- Stats: Days present, Total hours
- Recent attendance history with:
  - Date
  - Check-in/out times
  - Total hours
  - Status (present/absent)

### 5. Approvals Screen (`/(tabs)/approvals`)

- List of pending leave requests
- Each request shows:
  - Employee name
  - Leave type
  - Duration and days
  - Reason
  - Approve/Reject buttons

### 6. Profile Screen (`/(drawer)/profile`)

- User avatar
- Name, role, email
- Department, joined date, location, phone

### 7. Settings Screen (`/(drawer)/settings`)

- Preferences:
  - Notifications toggle
  - Dark mode toggle
  - Biometric login toggle
- Account:
  - Change password
  - Language selection
- About:
  - Help & Support
  - Terms & Privacy
  - App version

## Component Library (Atomic Design)

### Atoms (PascalCase files)

- **Button**: 4 variants (primary, secondary, outline, ghost), 3 sizes
- **Input**: Text input with error state
- **Card**: 3 variants (elevated, outlined, filled)
- **Text**: Base text component
- **Icon**: Ionicons wrapper

### Molecules (PascalCase files)

- **FormField**: Label + Input + Error message
- **StatCard**: Icon + Title + Value + Subtitle
- **LeaveCard**: Leave info with status badge

## Tech Stack

- **Framework**: Expo + React Native
- **Navigation**: Expo Router (file-based)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **UI Components**: Custom atomic design system
- **Icons**: @expo/vector-icons (Ionicons)

## Color Scheme

- **Primary**: Blue (#2563EB)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Gray Scale**: 50-900

## Key Changes Made

1. ✅ Moved tabs from `(drawer)/(tabs)` to `(tabs)` at root level
2. ✅ Renamed all component files to PascalCase (Button.tsx, Card.tsx, etc.)
3. ✅ Added global.css import to drawer layout
4. ✅ Fixed navigation paths throughout the app
5. ✅ Updated all import statements to use PascalCase

## Next Steps

1. ✅ Basic structure and navigation
2. ✅ Atomic design components (PascalCase)
3. ✅ All main screens with mock data
4. 🔄 Add authentication (login/signup)
5. 🔄 Add onboarding screens
6. 🔄 Add splash screen
7. 🔄 Integrate with backend API
8. 🔄 Add form validation
9. 🔄 Add date pickers for leave requests
10. 🔄 Add push notifications
