import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

import { supabase } from '@/lib/supabase'

export type AlertType = 'revenue_drop' | 'churn_spike' | 'failed_payments'
export type AlertSeverity = 'info' | 'warning' | 'critical'

export interface Alert {
  id: string
  user_id: string
  type: AlertType
  title: string
  description: string | null
  severity: AlertSeverity
  is_read: boolean
  is_dismissed: boolean
  related_data: Record<string, any>
  triggered_at: string
  read_at: string | null
  created_at: string
}

export interface AlertsResponse {
  alerts: Alert[]
  unreadCount: number
}

export const alertsApi = createApi({
  reducerPath: 'alertsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Alerts'],
  endpoints: (builder) => ({
    getAlerts: builder.query<AlertsResponse, void>({
      queryFn: async () => {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser()

          if (!user) {
            return { error: { message: 'Not authenticated' } }
          }

          const { data, error } = await supabase
            .from('alerts')
            .select('*')
            .eq('user_id', user.id)
            .eq('is_dismissed', false)
            .order('triggered_at', { ascending: false })
            .limit(50)

          if (error) {
            return { error: { message: error.message } }
          }

          const alerts = data || []
          const unreadCount = alerts.filter((a) => !a.is_read).length

          return {
            data: { alerts, unreadCount },
          }
        } catch (error) {
          return {
            error: {
              message: error instanceof Error ? error.message : 'Failed to fetch alerts',
            },
          }
        }
      },
      providesTags: ['Alerts'],
    }),

    getUnreadCount: builder.query<number, void>({
      queryFn: async () => {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser()

          if (!user) {
            return { error: { message: 'Not authenticated' } }
          }

          const { count, error } = await supabase
            .from('alerts')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('is_read', false)
            .eq('is_dismissed', false)

          if (error) {
            return { error: { message: error.message } }
          }

          return { data: count || 0 }
        } catch (error) {
          return {
            error: {
              message:
                error instanceof Error ? error.message : 'Failed to fetch unread count',
            },
          }
        }
      },
      providesTags: ['Alerts'],
    }),

    markAlertAsRead: builder.mutation<void, string>({
      queryFn: async (alertId) => {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser()

          if (!user) {
            return { error: { message: 'Not authenticated' } }
          }

          const { error } = await supabase
            .from('alerts')
            .update({
              is_read: true,
              read_at: new Date().toISOString(),
            })
            .eq('id', alertId)
            .eq('user_id', user.id)

          if (error) {
            return { error: { message: error.message } }
          }

          return { data: undefined }
        } catch (error) {
          return {
            error: {
              message:
                error instanceof Error ? error.message : 'Failed to mark alert as read',
            },
          }
        }
      },
      invalidatesTags: ['Alerts'],
    }),

    markAllAlertsAsRead: builder.mutation<void, void>({
      queryFn: async () => {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser()

          if (!user) {
            return { error: { message: 'Not authenticated' } }
          }

          const { error } = await supabase
            .from('alerts')
            .update({
              is_read: true,
              read_at: new Date().toISOString(),
            })
            .eq('user_id', user.id)
            .eq('is_read', false)

          if (error) {
            return { error: { message: error.message } }
          }

          return { data: undefined }
        } catch (error) {
          return {
            error: {
              message:
                error instanceof Error
                  ? error.message
                  : 'Failed to mark all alerts as read',
            },
          }
        }
      },
      invalidatesTags: ['Alerts'],
    }),

    dismissAlert: builder.mutation<void, string>({
      queryFn: async (alertId) => {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser()

          if (!user) {
            return { error: { message: 'Not authenticated' } }
          }

          const { error } = await supabase
            .from('alerts')
            .update({ is_dismissed: true })
            .eq('id', alertId)
            .eq('user_id', user.id)

          if (error) {
            return { error: { message: error.message } }
          }

          return { data: undefined }
        } catch (error) {
          return {
            error: {
              message: error instanceof Error ? error.message : 'Failed to dismiss alert',
            },
          }
        }
      },
      invalidatesTags: ['Alerts'],
    }),
  }),
})

export const {
  useGetAlertsQuery,
  useGetUnreadCountQuery,
  useMarkAlertAsReadMutation,
  useMarkAllAlertsAsReadMutation,
  useDismissAlertMutation,
} = alertsApi
