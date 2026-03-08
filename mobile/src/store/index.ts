/**
 * Redux Store Configuration
 */

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/authApi";
import { metricsApi } from "./api/metricsApi";
import { alertsApi } from "./api/alertsApi";
import { summariesApi } from "./api/summariesApi";
import { settingsApi } from "./api/settingsApi";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [metricsApi.reducerPath]: metricsApi.reducer,
    [alertsApi.reducerPath]: alertsApi.reducer,
    [summariesApi.reducerPath]: summariesApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [authApi.util.resetApiState.type],
      },
    })
      .concat(authApi.middleware)
      .concat(metricsApi.middleware)
      .concat(alertsApi.middleware)
      .concat(summariesApi.middleware)
      .concat(settingsApi.middleware),
});

// Enable listener behavior for the store
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
