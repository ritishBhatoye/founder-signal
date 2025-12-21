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
    title: "The Truth Dashboard",
    description:
      "See your real SaaS numbers in under 60 seconds. MRR, churn, subscriptions — no BS, just facts.",
    icon: "pulse-outline",
    backgroundColor: ["rgba(37, 99, 235, 0.95)", "rgba(29, 78, 216, 0.98)"], // primary blue
  },
  {
    id: 2,
    title: "Daily Founder Summary",
    description:
      "Get a short, brutal, honest update every morning. Revenue up? Churn spike? Or best message: 'No action needed'.",
    icon: "document-text-outline",
    backgroundColor: ["rgba(16, 185, 129, 0.95)", "rgba(5, 150, 105, 0.98)"], // secondary green
  },
  {
    id: 3,
    title: "Smart Alerts Only",
    description:
      "3 alerts that matter: Revenue drops, churn spikes, failed payments. No noise. No customization needed.",
    icon: "notifications-outline",
    backgroundColor: ["rgba(239, 68, 68, 0.95)", "rgba(220, 38, 38, 0.98)"], // danger red
  },
  {
    id: 4,
    title: "Ready to Stop Lying?",
    description:
      "Connect Stripe and see the real state of your SaaS. Built by a solo founder, for solo founders.",
    icon: "rocket-outline",
    backgroundColor: ["rgba(6, 182, 212, 0.95)", "rgba(8, 145, 178, 0.98)"], // info cyan
  },
];
