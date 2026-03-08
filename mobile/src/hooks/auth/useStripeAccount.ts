/**
 * Hook for managing Stripe Connect account data
 */

import {
  useGetStripeAccountQuery,
  useConnectStripeMutation,
  useDisconnectStripeMutation,
} from '@/hooks/useData'

export function useStripeAccount(userId?: string) {
  const {
    data: stripeAccount,
    isLoading,
    error,
    refetch,
  } = useGetStripeAccountQuery(undefined, {
    skip: !userId,
  })

  const [connectStripe, { isLoading: isConnecting }] = useConnectStripeMutation()
  const [disconnectStripe, { isLoading: isDisconnecting }] = useDisconnectStripeMutation()

  const connectStripeAccount = async (): Promise<{
    success: boolean
    url?: string
    error?: string
  }> => {
    if (!stripeAccount) {
      return { success: false, error: 'No Stripe account configured' }
    }

    return {
      success: true,
      url: `https://dashboard.stripe.com/${stripeAccount.livemode ? '' : 'test/'}connect/accounts/${stripeAccount.stripe_account_id}`,
    }
  }

  const disconnectStripeAccount = async (): Promise<{
    success: boolean
    error?: string
  }> => {
    try {
      await disconnectStripe().unwrap()
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to disconnect Stripe' }
    }
  }

  return {
    stripeAccount: stripeAccount || null,
    isLoading,
    isConnecting: isConnecting || isDisconnecting,
    error: error ? (error as Error).message : null,
    isConnected: !!stripeAccount,
    connectStripeAccount,
    disconnectStripeAccount,
    refreshStripeAccount: refetch,
  }
}
