/**
 * Hook for managing Stripe Connect account data
 */

import { useState, useEffect, useCallback } from "react";
import { StripeAccount } from "./types";

// TODO: Import from Supabase client when installed
// import { supabase } from '@/lib/supabase';

export function useStripeAccount(userId?: string) {
  const [stripeAccount, setStripeAccount] = useState<StripeAccount | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchStripeAccount(userId);
    } else {
      setIsLoading(false);
    }
  }, [userId]);

  const fetchStripeAccount = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual Supabase query
      // const { data, error } = await supabase
      //   .from('stripe_accounts')
      //   .select('*')
      //   .eq('user_id', id)
      //   .single();

      // Mock implementation
      const data = null;
      const error = null;

      if (error && error.code !== "PGRST116") {
        // Not found is OK
        setError(error.message);
      } else {
        setStripeAccount(data);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch Stripe account"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const connectStripeAccount = useCallback(async (): Promise<{
    success: boolean;
    url?: string;
    error?: string;
  }> => {
    if (!userId) {
      return { success: false, error: "No user ID provided" };
    }

    try {
      setIsConnecting(true);
      setError(null);

      // TODO: Replace with actual Stripe Connect OAuth URL generation
      // This would typically call your backend API to generate the OAuth URL
      // const response = await fetch('/api/stripe/connect/oauth-url', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ userId }),
      // });

      // const { url, error } = await response.json();

      // Mock implementation
      const url = "https://connect.stripe.com/oauth/authorize?...";
      const error = null;

      if (error) {
        setError(error);
        return { success: false, error };
      }

      return { success: true, url };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to connect Stripe account";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsConnecting(false);
    }
  }, [userId]);

  const disconnectStripeAccount = useCallback(async (): Promise<{
    success: boolean;
    error?: string;
  }> => {
    if (!userId || !stripeAccount) {
      return { success: false, error: "No Stripe account to disconnect" };
    }

    try {
      setIsConnecting(true);
      setError(null);

      // TODO: Replace with actual Supabase delete
      // const { error } = await supabase
      //   .from('stripe_accounts')
      //   .delete()
      //   .eq('user_id', userId);

      const error = null;

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      setStripeAccount(null);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to disconnect Stripe account";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsConnecting(false);
    }
  }, [userId, stripeAccount]);

  const refreshStripeAccount = useCallback(() => {
    if (userId) {
      fetchStripeAccount(userId);
    }
  }, [userId]);

  return {
    stripeAccount,
    isLoading,
    isConnecting,
    error,
    isConnected: !!stripeAccount,
    connectStripeAccount,
    disconnectStripeAccount,
    refreshStripeAccount,
  };
}
