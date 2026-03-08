// FounderOps Data Types
import type { StatusType, TrendType } from '@/constants/theme'

export interface Metrics {
  mrr: string
  mrrChange: string
  mrrChangeType: TrendType
  netMrrToday: string
  netMrrWeek: string
  activeSubscriptions: string
  churnRate: string
  supportPressure: 'Low' | 'Medium' | 'High'
}

export interface HealthCheckItem {
  label: string
  value: string
  status: StatusType
}

export type AlertType = 'revenue_drop' | 'churn_spike' | 'failed_payments'

export interface Alert {
  id: number
  type: AlertType
  title: string
  description: string
  timestamp: string
  isRead: boolean
}

export type SummaryItemType = 'revenue' | 'churn' | 'payment' | 'neutral'

export interface SummaryItem {
  type: SummaryItemType
  message: string
}

export interface DaySummary {
  date: string
  items: SummaryItem[]
}

export interface StripeConnection {
  isConnected: boolean
  accountId?: string
  lastSync?: string
}
