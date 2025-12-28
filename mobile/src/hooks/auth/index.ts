/**
 * Authentication hooks for FounderOps
 * Integrates with Supabase Auth for magic link authentication
 */

export { useAuth } from "./useAuth";
export { useUser } from "./useUser";
export { useSession } from "./useSession";
export { useAuthState } from "./useAuthState";
export { useSignIn } from "./useSignIn";
export { useSignOut } from "./useSignOut";
export { useProfile } from "./useProfile";
export { useStripeAccount } from "./useStripeAccount";

// Types
export type {
  AuthUser,
  AuthSession,
  UserProfile,
  StripeAccount,
} from "./types";
