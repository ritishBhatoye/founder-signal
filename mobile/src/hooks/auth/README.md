# Authentication Hooks

This directory contains all authentication-related hooks for FounderOps, designed to work with Supabase Auth and magic link authentication.

## Overview

The auth hooks provide a complete authentication system with:

- Magic link authentication (no passwords)
- User profile management
- Stripe Connect integration
- Session management
- Real-time auth state tracking

## Installation Requirements

Before using these hooks, install the required dependencies:

```bash
npm install @supabase/supabase-js
```

## Setup

1. Create a Supabase client configuration file:

```typescript
// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

2. Add environment variables to your `.env.local`:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. Uncomment the Supabase imports and implementations in each hook file.

## Hooks

### `useAuth()`

Main authentication hook providing complete auth state and methods.

```typescript
import { useAuth } from "@/hooks/auth";

function MyComponent() {
  const {
    user,
    session,
    profile,
    stripeAccount,
    isLoading,
    isAuthenticated,
    error,
    signIn,
    signOut,
    refreshSession,
  } = useAuth();

  const handleSignIn = async () => {
    const result = await signIn("user@example.com");
    if (result.success) {
      console.log("Magic link sent!");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return <SignInScreen />;

  return <AuthenticatedApp />;
}
```

### `useUser()`

Hook for accessing current user data.

```typescript
import { useUser } from "@/hooks/auth";

function UserProfile() {
  const { user, isLoading, error, refetch } = useUser();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <View>
      <Text>Email: {user?.email}</Text>
      <Button onPress={refetch}>Refresh</Button>
    </View>
  );
}
```

### `useSession()`

Hook for managing user session.

```typescript
import { useSession } from "@/hooks/auth";

function SessionManager() {
  const { session, isLoading, error, refreshSession } = useSession();

  const handleRefresh = async () => {
    await refreshSession();
  };

  return (
    <View>
      <Text>Session expires: {session?.expires_at}</Text>
      <Button onPress={handleRefresh}>Refresh Session</Button>
    </View>
  );
}
```

### `useAuthState()`

Hook for tracking authentication state changes.

```typescript
import { useAuthState } from "@/hooks/auth";

function AuthStateTracker() {
  const { user, session, isAuthenticated, isLoading, lastEvent } =
    useAuthState();

  useEffect(() => {
    if (lastEvent === "SIGNED_IN") {
      console.log("User signed in:", user?.email);
    }
  }, [lastEvent, user]);

  return <AuthenticatedContent />;
}
```

### `useSignIn()`

Hook for handling sign in with magic link.

```typescript
import { useSignIn } from "@/hooks/auth";

function SignInForm() {
  const { signInWithMagicLink, isLoading, error, clearError } = useSignIn();
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const result = await signInWithMagicLink(email);
    if (result.success) {
      Alert.alert("Success", result.message);
    }
  };

  return (
    <View>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <Button
        onPress={handleSubmit}
        disabled={isLoading}
        title={isLoading ? "Sending..." : "Send Magic Link"}
      />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
}
```

### `useSignOut()`

Hook for handling sign out.

```typescript
import { useSignOut } from "@/hooks/auth";

function SignOutButton() {
  const { signOut, isLoading, error } = useSignOut();

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      console.log("Signed out successfully");
    }
  };

  return (
    <Button
      onPress={handleSignOut}
      disabled={isLoading}
      title={isLoading ? "Signing out..." : "Sign Out"}
    />
  );
}
```

### `useProfile()`

Hook for managing user profile data.

```typescript
import { useProfile } from "@/hooks/auth";

function ProfileEditor() {
  const { profile, isLoading, isUpdating, error, updateProfile } =
    useProfile(userId);
  const [fullName, setFullName] = useState(profile?.full_name || "");

  const handleSave = async () => {
    const result = await updateProfile({ full_name: fullName });
    if (result.success) {
      Alert.alert("Success", "Profile updated!");
    }
  };

  return (
    <View>
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Full Name"
      />
      <Button
        onPress={handleSave}
        disabled={isUpdating}
        title={isUpdating ? "Saving..." : "Save Profile"}
      />
    </View>
  );
}
```

### `useStripeAccount()`

Hook for managing Stripe Connect account data.

```typescript
import { useStripeAccount } from "@/hooks/auth";

function StripeConnectButton() {
  const {
    stripeAccount,
    isLoading,
    isConnecting,
    isConnected,
    connectStripeAccount,
    disconnectStripeAccount,
  } = useStripeAccount(userId);

  const handleConnect = async () => {
    const result = await connectStripeAccount();
    if (result.success && result.url) {
      // Open Stripe Connect OAuth URL
      Linking.openURL(result.url);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <View>
      {isConnected ? (
        <View>
          <Text>✅ Stripe Connected</Text>
          <Text>Account: {stripeAccount?.stripe_account_id}</Text>
          <Button onPress={disconnectStripeAccount} title="Disconnect" />
        </View>
      ) : (
        <Button
          onPress={handleConnect}
          disabled={isConnecting}
          title={isConnecting ? "Connecting..." : "Connect Stripe"}
        />
      )}
    </View>
  );
}
```

## Usage Patterns

### Protected Routes

```typescript
import { useAuth } from "@/hooks/auth";

function ProtectedScreen() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <SignInScreen />;
  }

  return <AuthenticatedContent />;
}
```

### Auth Context Provider

```typescript
import { createContext, useContext } from "react";
import { useAuth } from "@/hooks/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
```

### Conditional Rendering

```typescript
import { useAuthState } from "@/hooks/auth";

function App() {
  const { isAuthenticated, isLoading } = useAuthState();

  if (isLoading) {
    return <SplashScreen />;
  }

  return isAuthenticated ? <MainApp /> : <OnboardingFlow />;
}
```

## Error Handling

All hooks provide consistent error handling:

```typescript
const { data, error, isLoading } = useHook();

if (error) {
  console.error("Hook error:", error);
  // Show user-friendly error message
}
```

## TypeScript Support

All hooks are fully typed with TypeScript interfaces:

- `AuthUser` - User data from Supabase Auth
- `AuthSession` - Session data with tokens
- `UserProfile` - User profile from database
- `StripeAccount` - Stripe Connect account data
- `AuthState` - Complete authentication state

## Next Steps

1. Install Supabase dependencies
2. Set up environment variables
3. Create Supabase client configuration
4. Uncomment Supabase implementations in hook files
5. Set up database tables (see `SUPABASE_SETUP.md`)
6. Test authentication flow

## Security Notes

- Never expose service role keys in client code
- Use Row Level Security (RLS) on all database tables
- Validate user permissions on the server side
- Use HTTPS for all authentication redirects
- Store sensitive tokens securely
