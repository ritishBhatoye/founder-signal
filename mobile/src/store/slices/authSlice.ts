/**
 * Auth Slice for Redux Toolkit
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser, AuthSession } from "@/hooks/auth/types";

interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{
        user: AuthUser | null;
        session: AuthSession | null;
      }>
    ) => {
      state.user = action.payload.user;
      state.session = action.payload.session;
      state.isAuthenticated = !!action.payload.user;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearAuth: (state) => {
      state.user = null;
      state.session = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setAuth, setLoading, setError, clearAuth } = authSlice.actions;
export default authSlice.reducer;
