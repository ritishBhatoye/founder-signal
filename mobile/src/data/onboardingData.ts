export interface OnboardingItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  backgroundColor: string[];
  image?: string;
}

export const onboardingData: OnboardingItem[] = [
  {
    id: 1,
    title: "Smart Leave Management",
    description:
      "Request, track, and manage your leaves effortlessly. Get instant approvals and stay updated on your leave balance.",
    icon: "calendar-outline",
    backgroundColor: ["rgba(37, 99, 235, 0.95)", "rgba(29, 78, 216, 0.98)"], // primary blue
  },
  {
    id: 2,
    title: "Real-Time Attendance",
    description:
      "Check in and out with a single tap. Track your working hours and attendance history with precision.",
    icon: "time-outline",
    backgroundColor: ["rgba(16, 185, 129, 0.95)", "rgba(5, 150, 105, 0.98)"], // secondary green
  },
  {
    id: 3,
    title: "Instant Approvals",
    description:
      "Managers can review and approve requests on the go. Get notifications for pending approvals and updates.",
    icon: "checkmark-circle-outline",
    backgroundColor: ["rgba(168, 85, 247, 0.95)", "rgba(147, 51, 234, 0.98)"], // tertiary violet
  },
  {
    id: 4,
    title: "Ready to Get Started?",
    description: "Join thousands of employees managing their time efficiently with Clockio.",
    icon: "rocket-outline",
    backgroundColor: ["rgba(6, 182, 212, 0.95)", "rgba(8, 145, 178, 0.98)"], // info cyan
  },
];
