/**
 * Hook for handling sign out
 */

import { useState, useCallback } from "react";

// TODO: Import from Supabase client when installed
// import { supabase } from '@/lib/supabase';

export function useSignOut() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signOut = useCallback(async (): Promise<{
    success: boolean;
    error?: string;
  }> => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual Supabase sign out
      // const { error } = await supabase.auth.signOut();

      // Mock implementation
      const error = null;

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Sign out failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    signOut,
    isLoading,
    error,
    clearError,
  };
}
