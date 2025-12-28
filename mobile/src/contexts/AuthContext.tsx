/**
 * Authentication Context Provider using Redux
 */

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}

// For backward compatibility, export useAuth hook
export { useAuth as useAuthContext } from "@/hooks/auth/useAuth";
