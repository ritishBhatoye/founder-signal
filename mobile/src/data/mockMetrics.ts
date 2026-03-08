// Mock data for development - Replace with Stripe API calls
import type {
  Alert,
  DaySummary,
  HealthCheckItem,
  Metrics,
  StripeConnection,
} from '@/types/metrics'

export const mockMetrics: Metrics = {
  mrr: '$4,280',
  mrrChange: '+$320',
  mrrChangeType: 'up',
  netMrrToday: '+$85',
  netMrrWeek: '+$320',
  activeSubscriptions: '47',
  churnRate: '2.1%',
  supportPressure: 'Low',
}

export const mockHealthCheck: HealthCheckItem[] = [
  { label: 'Revenue Trend', value: 'Growing', status: 'good' },
  { label: 'Churn Status', value: 'Normal', status: 'good' },
  { label: 'Failed Payments', value: '2 pending', status: 'warning' },
  { label: 'Support Pressure', value: 'Low', status: 'good' },
]

export const mockAlerts: Alert[] = [
  {
    id: 1,
    type: 'failed_payments',
    title: 'Failed Payment',
    description: 'Payment failed for customer@example.com ($49/mo). Retry scheduled.',
    timestamp: '2 hours ago',
    isRead: false,
  },
  {
    id: 2,
    type: 'revenue_drop',
    title: 'Revenue Drop Alert',
    description: 'MRR dropped 5% compared to last week. 2 cancellations detected.',
    timestamp: 'Yesterday',
    isRead: false,
  },
  {
    id: 3,
    type: 'churn_spike',
    title: 'Churn Warning',
    description: '3 customers cancelled in the last 48 hours. Above normal rate.',
    timestamp: '2 days ago',
    isRead: true,
  },
  {
    id: 4,
    type: 'failed_payments',
    title: 'Payment Recovered',
    description: 'Previously failed payment for user@company.com was recovered.',
    timestamp: '3 days ago',
    isRead: true,
  },
]

export const mockSummaries: DaySummary[] = [
  {
    date: 'December 20, 2024',
    items: [
      {
        type: 'revenue',
        message: 'Revenue up $85 today. 2 new subscriptions.',
      },
      {
        type: 'payment',
        message: '1 failed payment recovered. 1 still pending retry.',
      },
      { type: 'neutral', message: 'No churn detected. Keep it up!' },
    ],
  },
  {
    date: 'December 19, 2024',
    items: [
      { type: 'revenue', message: 'Revenue up $120. Best day this week.' },
      { type: 'neutral', message: 'No action needed.' },
    ],
  },
  {
    date: 'December 18, 2024',
    items: [
      {
        type: 'churn',
        message: '1 customer churned ($49/mo). Reason: Budget cuts.',
      },
      { type: 'revenue', message: '2 upgrades offset the loss. Net positive.' },
    ],
  },
]

export const mockStripeConnection: StripeConnection = {
  isConnected: true,
  accountId: 'acct_1234...xyz',
  lastSync: '2 minutes ago',
}
