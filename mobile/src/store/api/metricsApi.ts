import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

import { supabase } from '@/lib/supabase'

export interface DailyMetrics {
  id: string
  user_id: string
  date: string
  mrr: number
  mrr_change: number
  arr: number
  active_subscriptions: number
  new_subscriptions: number
  churned_subscriptions: number
  churn_rate: number
  churn_mrr: number
  failed_payments: number
  recovered_payments: number
  support_pressure: number
  calculated_at: string
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  stripe_subscription_id: string
  stripe_customer_id: string
  stripe_price_id: string | null
  stripe_product_id: string | null
  status: string
  currency: string
  amount: number
  interval: string | null
  interval_count: number
  current_period_start: string | null
  current_period_end: string | null
  cancel_at: string | null
  canceled_at: string | null
  ended_at: string | null
  trial_start: string | null
  trial_end: string | null
  metadata: Record<string, any>
  created_at: string
  updated_at: string
}

export interface MetricsResponse {
  today: DailyMetrics | null
  week: DailyMetrics | null
  month: DailyMetrics | null
  subscriptions: Subscription[]
}

export const metricsApi = createApi({
  reducerPath: 'metricsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Metrics', 'Subscriptions'],
  endpoints: (builder) => ({
    getMetrics: builder.query<MetricsResponse, void>({
      queryFn: async () => {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser()

          if (!user) {
            return { error: { message: 'Not authenticated' } }
          }

          const today = new Date().toISOString().split('T')[0]
          const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0]
          const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0]

          const [todayMetrics, weekMetrics, monthMetrics, subscriptions] =
            await Promise.all([
              supabase
                .from('daily_metrics')
                .select('*')
                .eq('user_id', user.id)
                .eq('date', today)
                .single(),
              supabase
                .from('daily_metrics')
                .select('*')
                .eq('user_id', user.id)
                .gte('date', weekAgo)
                .order('date', { ascending: false }),
              supabase
                .from('daily_metrics')
                .select('*')
                .eq('user_id', user.id)
                .gte('date', monthAgo)
                .order('date', { ascending: false }),
              supabase
                .from('subscriptions')
                .select('*')
                .eq('user_id', user.id)
                .eq('status', 'active')
                .order('created_at', { ascending: false }),
            ])

          const weekData = weekMetrics.data || []
          const monthData = monthMetrics.data || []

          const calculateTotals = (data: DailyMetrics[]) => ({
            mrr: data.reduce((sum, d) => sum + d.mrr, 0),
            active_subscriptions: data.reduce(
              (sum, d) => sum + d.active_subscriptions,
              0,
            ),
            new_subscriptions: data.reduce((sum, d) => sum + d.new_subscriptions, 0),
            churned_subscriptions: data.reduce(
              (sum, d) => sum + d.churned_subscriptions,
              0,
            ),
            churn_rate:
              data.length > 0
                ? data.reduce((sum, d) => sum + d.churn_rate, 0) / data.length
                : 0,
            failed_payments: data.reduce((sum, d) => sum + d.failed_payments, 0),
          })

          const weekTotals = calculateTotals(weekData)
          const monthTotals = calculateTotals(monthData)

          return {
            data: {
              today: todayMetrics.data || null,
              week: {
                ...weekTotals,
                date: weekData[0]?.date || today,
              } as DailyMetrics,
              month: {
                ...monthTotals,
                date: monthData[0]?.date || today,
              } as DailyMetrics,
              subscriptions: subscriptions.data || [],
            },
          }
        } catch (error) {
          return {
            error: {
              message: error instanceof Error ? error.message : 'Failed to fetch metrics',
            },
          }
        }
      },
      providesTags: ['Metrics', 'Subscriptions'],
    }),

    getDailyMetrics: builder.query<
      DailyMetrics[],
      { startDate: string; endDate: string }
    >({
      queryFn: async ({ startDate, endDate }) => {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser()

          if (!user) {
            return { error: { message: 'Not authenticated' } }
          }

          const { data, error } = await supabase
            .from('daily_metrics')
            .select('*')
            .eq('user_id', user.id)
            .gte('date', startDate)
            .lte('date', endDate)
            .order('date', { ascending: false })

          if (error) {
            return { error: { message: error.message } }
          }

          return { data: data || [] }
        } catch (error) {
          return {
            error: {
              message:
                error instanceof Error ? error.message : 'Failed to fetch daily metrics',
            },
          }
        }
      },
      providesTags: ['Metrics'],
    }),

    getSupportPressure: builder.query<{ support_pressure: number }, void>({
      queryFn: async () => {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser()

          if (!user) {
            return { error: { message: 'Not authenticated' } }
          }

          const today = new Date().toISOString().split('T')[0]

          const { data, error } = await supabase
            .from('daily_metrics')
            .select('support_pressure')
            .eq('user_id', user.id)
            .eq('date', today)
            .single()

          if (error) {
            if (error.code === 'PGRST116') {
              return { data: { support_pressure: 1 } }
            }
            return { error: { message: error.message } }
          }

          return { data: { support_pressure: data?.support_pressure || 1 } }
        } catch (error) {
          return {
            error: {
              message:
                error instanceof Error
                  ? error.message
                  : 'Failed to fetch support pressure',
            },
          }
        }
      },
    }),

    updateSupportPressure: builder.mutation<void, { support_pressure: number }>({
      queryFn: async ({ support_pressure }) => {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser()

          if (!user) {
            return { error: { message: 'Not authenticated' } }
          }

          const today = new Date().toISOString().split('T')[0]

          const { error: existingError } = await supabase
            .from('daily_metrics')
            .select('id')
            .eq('user_id', user.id)
            .eq('date', today)
            .single()

          if (existingError?.code === 'PGRST116') {
            const { error: insertError } = await supabase.from('daily_metrics').insert({
              user_id: user.id,
              date: today,
              support_pressure,
              mrr: 0,
              mrr_change: 0,
              arr: 0,
              active_subscriptions: 0,
              new_subscriptions: 0,
              churned_subscriptions: 0,
              churn_rate: 0,
              churn_mrr: 0,
              failed_payments: 0,
              recovered_payments: 0,
            })

            if (insertError) {
              return { error: { message: insertError.message } }
            }
          } else {
            const { error: updateError } = await supabase
              .from('daily_metrics')
              .update({ support_pressure })
              .eq('user_id', user.id)
              .eq('date', today)

            if (updateError) {
              return { error: { message: updateError.message } }
            }
          }

          return { data: undefined }
        } catch (error) {
          return {
            error: {
              message:
                error instanceof Error
                  ? error.message
                  : 'Failed to update support pressure',
            },
          }
        }
      },
      invalidatesTags: ['Metrics'],
    }),
  }),
})

export const {
  useGetMetricsQuery,
  useGetDailyMetricsQuery,
  useGetSupportPressureQuery,
  useUpdateSupportPressureMutation,
} = metricsApi
