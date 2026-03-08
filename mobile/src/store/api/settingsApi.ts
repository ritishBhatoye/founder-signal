import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

import { supabase } from '@/lib/supabase'

export interface UserSettings {
  id: string
  user_id: string
  push_enabled: boolean
  daily_summary_time: string
  alert_revenue_drop: boolean
  alert_churn_spike: boolean
  alert_failed_payments: boolean
  currency: string
  timezone: string
  expo_push_token: string | null
  created_at: string
  updated_at: string
}

export interface StripeAccount {
  id: string
  user_id: string
  stripe_account_id: string
  access_token: string
  refresh_token: string | null
  livemode: boolean
  scope: string | null
  token_type: string
  stripe_user_id: string | null
  stripe_publishable_key: string | null
  created_at: string
  updated_at: string
}

export const settingsApi = createApi({
  reducerPath: 'settingsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Settings', 'StripeAccount'],
  endpoints: (builder) => ({
    getSettings: builder.query<UserSettings | null, void>({
      queryFn: async () => {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser()

          if (!user) {
            return { error: { message: 'Not authenticated' } }
          }

          const { data, error } = await supabase
            .from('user_settings')
            .select('*')
            .eq('user_id', user.id)
            .single()

          if (error) {
            if (error.code === 'PGRST116') {
              return { data: null }
            }
            return { error: { message: error.message } }
          }

          return { data }
        } catch (error) {
          return {
            error: {
              message:
                error instanceof Error ? error.message : 'Failed to fetch settings',
            },
          }
        }
      },
      providesTags: ['Settings'],
    }),

    updateSettings: builder.mutation<UserSettings, Partial<UserSettings>>({
      queryFn: async (updates) => {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser()

          if (!user) {
            return { error: { message: 'Not authenticated' } }
          }

          const { data, error } = await supabase
            .from('user_settings')
            .update({
              ...updates,
              updated_at: new Date().toISOString(),
            })
            .eq('user_id', user.id)
            .select()
            .single()

          if (error) {
            return { error: { message: error.message } }
          }

          return { data }
        } catch (error) {
          return {
            error: {
              message:
                error instanceof Error ? error.message : 'Failed to update settings',
            },
          }
        }
      },
      invalidatesTags: ['Settings'],
    }),

    updatePushToken: builder.mutation<void, string>({
      queryFn: async (pushToken) => {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser()

          if (!user) {
            return { error: { message: 'Not authenticated' } }
          }

          const { error } = await supabase
            .from('user_settings')
            .update({
              expo_push_token: pushToken,
              updated_at: new Date().toISOString(),
            })
            .eq('user_id', user.id)

          if (error) {
            return { error: { message: error.message } }
          }

          return { data: undefined }
        } catch (error) {
          return {
            error: {
              message:
                error instanceof Error ? error.message : 'Failed to update push token',
            },
          }
        }
      },
      invalidatesTags: ['Settings'],
    }),

    getStripeAccount: builder.query<StripeAccount | null, void>({
      queryFn: async () => {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser()

          if (!user) {
            return { error: { message: 'Not authenticated' } }
          }

          const { data, error } = await supabase
            .from('stripe_accounts')
            .select('*')
            .eq('user_id', user.id)
            .single()

          if (error) {
            if (error.code === 'PGRST116') {
              return { data: null }
            }
            return { error: { message: error.message } }
          }

          return { data }
        } catch (error) {
          return {
            error: {
              message:
                error instanceof Error ? error.message : 'Failed to fetch Stripe account',
            },
          }
        }
      },
      providesTags: ['StripeAccount'],
    }),

    connectStripe: builder.mutation<
      StripeAccount,
      Omit<StripeAccount, 'id' | 'created_at' | 'updated_at'>
    >({
      queryFn: async (stripeData) => {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser()

          if (!user) {
            return { error: { message: 'Not authenticated' } }
          }

          const { data: existing } = await supabase
            .from('stripe_accounts')
            .select('id')
            .eq('user_id', user.id)
            .single()

          let result
          if (existing) {
            result = await supabase
              .from('stripe_accounts')
              .update({
                stripe_account_id: stripeData.stripe_account_id,
                access_token: stripeData.access_token,
                refresh_token: stripeData.refresh_token,
                livemode: stripeData.livemode,
                scope: stripeData.scope,
                token_type: stripeData.token_type,
                stripe_user_id: stripeData.stripe_user_id,
                stripe_publishable_key: stripeData.stripe_publishable_key,
                updated_at: new Date().toISOString(),
              })
              .eq('user_id', user.id)
              .select()
              .single()
          } else {
            result = await supabase
              .from('stripe_accounts')
              .insert({
                user_id: user.id,
                stripe_account_id: stripeData.stripe_account_id,
                access_token: stripeData.access_token,
                refresh_token: stripeData.refresh_token,
                livemode: stripeData.livemode,
                scope: stripeData.scope,
                token_type: stripeData.token_type,
                stripe_user_id: stripeData.stripe_user_id,
                stripe_publishable_key: stripeData.stripe_publishable_key,
              })
              .select()
              .single()
          }

          if (result.error) {
            return { error: { message: result.error.message } }
          }

          return { data: result.data }
        } catch (error) {
          return {
            error: {
              message:
                error instanceof Error ? error.message : 'Failed to connect Stripe',
            },
          }
        }
      },
      invalidatesTags: ['StripeAccount'],
    }),

    disconnectStripe: builder.mutation<void, void>({
      queryFn: async () => {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser()

          if (!user) {
            return { error: { message: 'Not authenticated' } }
          }

          const { error } = await supabase
            .from('stripe_accounts')
            .delete()
            .eq('user_id', user.id)

          if (error) {
            return { error: { message: error.message } }
          }

          return { data: undefined }
        } catch (error) {
          return {
            error: {
              message:
                error instanceof Error ? error.message : 'Failed to disconnect Stripe',
            },
          }
        }
      },
      invalidatesTags: ['StripeAccount'],
    }),
  }),
})

export const {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
  useUpdatePushTokenMutation,
  useGetStripeAccountQuery,
  useConnectStripeMutation,
  useDisconnectStripeMutation,
} = settingsApi
