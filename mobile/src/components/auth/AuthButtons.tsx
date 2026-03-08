import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Platform, ActivityIndicator } from "react-native";
import { Pressable, View, Text, StyleSheet, Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "@/lib/supabase";
import { colors } from "@/constants/theme";

export type SocialProvider = "google" | "apple";

interface AuthButtonProps {
  provider: SocialProvider;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const AUTH_BUTTON_CONFIG = {
  google: {
    icon: "logo-google" as const,
    label: "Continue with Google",
    bgColor: "#FFFFFF",
    textColor: "#1F2937",
    borderColor: "#E5E7EB",
  },
  apple: {
    icon: "logo-apple" as const,
    label: "Continue with Apple",
    bgColor: "#000000",
    textColor: "#FFFFFF",
    borderColor: "#374151",
  },
};

function AuthButton({ provider, onPress, disabled, loading }: AuthButtonProps) {
  const config = AUTH_BUTTON_CONFIG[provider];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: config.bgColor, borderColor: config.borderColor },
        pressed && styles.buttonPressed,
        disabled && styles.buttonDisabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={config.textColor} />
      ) : (
        <>
          <Ionicons name={config.icon} size={20} color={config.textColor} />
          <Text style={[styles.buttonText, { color: config.textColor }]}>
            {config.label}
          </Text>
        </>
      )}
    </Pressable>
  );
}

interface AuthButtonsProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  disabled?: boolean;
}

export function AuthButtons({
  onSuccess,
  onError,
  disabled,
}: AuthButtonsProps) {
  const [loading, setLoading] = useState<SocialProvider | null>(null);

  const isIOS = Platform.OS === "ios";
  const isWeb = Platform.OS === "web";

  const getRedirectURL = (): string => {
    if (isWeb) {
      return typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:8081";
    }
    return "founderops://";
  };

  const handleOAuthSignIn = async (provider: SocialProvider) => {
    try {
      setLoading(provider);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: getRedirectURL(),
          skipBrowserRedirect: isWeb,
        },
      });

      if (error) {
        throw error;
      }

      if (!isWeb && data?.url) {
        await WebBrowser.openAuthSessionAsync(data.url, getRedirectURL());
      }

      onSuccess?.();
    } catch (error: any) {
      const message = error?.message || "Authentication failed";
      console.error(`OAuth error (${provider}):`, error);
      Alert.alert("Sign In Error", message);
      onError?.(message);
    } finally {
      setLoading(null);
    }
  };

  const showGoogle = true;
  const showApple = isIOS;

  if (!showGoogle && !showApple) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or continue with</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.buttonsContainer}>
        {showGoogle && (
          <AuthButton
            provider="google"
            onPress={() => handleOAuthSignIn("google")}
            disabled={disabled}
            loading={loading === "google"}
          />
        )}

        {showApple && (
          <AuthButton
            provider="apple"
            onPress={() => handleOAuthSignIn("apple")}
            disabled={disabled}
            loading={loading === "apple"}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    color: colors.textMuted,
    fontSize: 14,
    marginHorizontal: 16,
    fontWeight: "500",
  },
  buttonsContainer: {
    gap: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AuthButtons;
