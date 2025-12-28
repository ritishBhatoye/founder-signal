/**
 * Sign In Hook using Redux Toolkit
 */

import { useState, useCallback } from "react";
import {
  useSignInWithEmailMutation,
  useSignInWithMagicLinkMutation,
} from "@/store/api/authApi";
import { useDispatch } from "react-redux";
import { setAuth, setError } from "@/store/slices/authSlice";

export interface SignInOptions {
  email: string;
  password?: string;
  redirectTo?: string;
}

export interface SignInResult {
  success: boolean;
  error?: string;
  message?: string;
}

export function useSignIn() {
  const dispatch = useDispatch();
  const [signInWithEmailMutation] = useSignInWithEmailMutation();
  const [signInWithMagicLinkMutation] = useSignInWithMagicLinkMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrorState] = useState<string | null>(null);

  const signIn = useCallback(
    async (options: SignInOptions): Promise<SignInResult> => {
      try {
        setIsLoading(true);
        setErrorState(null);

        const { email, password, redirectTo } = options;

        // Validate email
        if (!email || !email.includes("@")) {
          const errorMsg = "Please enter a valid email address";
          setErrorState(errorMsg);
          dispatch(setError(errorMsg));
          return { success: false, error: errorMsg };
        }

        let result;
        if (password) {
          // Sign in with email/password
          result = await signInWithEmailMutation({ email, password }).unwrap();
        } else {
          // Sign in with magic link
          result = await signInWithMagicLinkMutation({
            email,
            redirectTo,
          }).unwrap();
        }

        if (result.error) {
          setErrorState(result.error.message);
          dispatch(setError(result.error.message));
          return { success: false, error: result.error.message };
        }

        // Update Redux state
        dispatch(setAuth({ user: result.user, session: result.session }));

        return {
          success: true,
          message: password
            ? "Successfully signed in!"
            : "Check your email for the magic link!",
        };
      } catch (err: any) {
        const errorMessage =
          err?.data?.message || err?.message || "Sign in failed";
        setErrorState(errorMessage);
        dispatch(setError(errorMessage));
        return { success: false, error: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    [signInWithEmailMutation, signInWithMagicLinkMutation, dispatch]
  );

  const signInWithMagicLink = useCallback(
    async (email: string, redirectTo?: string): Promise<SignInResult> => {
      return signIn({ email, redirectTo });
    },
    [signIn]
  );

  const signInWithPassword = useCallback(
    async (email: string, password: string): Promise<SignInResult> => {
      return signIn({ email, password });
    },
    [signIn]
  );

  const clearError = useCallback(() => {
    setErrorState(null);
    dispatch(setError(null));
  }, [dispatch]);

  return {
    signIn,
    signInWithMagicLink,
    signInWithPassword,
    isLoading,
    error,
    clearError,
  };
}
