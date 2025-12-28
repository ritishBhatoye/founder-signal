/**
 * Hook for handling sign in with magic link
 */

import { useState, useCallback } from "react";
import { SignInOptions, SignInResult } from "./types";

// TODO: Import from Supabase client when installed
// import { supabase } from '@/lib/supabase';

export function useSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(
    async (options: SignInOptions): Promise<SignInResult> => {
      try {
        setIsLoading(true);
        setError(null);

        const { email, redirectTo } = options;

        // Validate email
        if (!email || !email.includes("@")) {
          const errorMsg = "Please enter a valid email address";
          setError(errorMsg);
          return { success: false, error: errorMsg };
        }

        // TODO: Replace with actual Supabase magic link
        // const { error } = await supabase.auth.signInWithOtp({
        //   email,
        //   options: {
        //     emailRedirectTo: redirectTo || `${window.location.origin}/auth/callback`,
        //   },
        // });

        // Mock implementation
        const error = null;

        if (error) {
          setError(error.message);
          return { success: false, error: error.message };
        }

        return {
          success: true,
          message: "Check your email for the magic link!",
        };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Sign in failed";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const signInWithMagicLink = useCallback(
    async (email: string): Promise<SignInResult> => {
      return signIn({ email });
    },
    [signIn]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    signIn,
    signInWithMagicLink,
    isLoading,
    error,
    clearError,
  };
}
