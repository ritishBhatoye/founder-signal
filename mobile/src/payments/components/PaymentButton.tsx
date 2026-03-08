import { useState, useCallback } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { paymentService, Plan, PaymentResult, SubscriptionResult } from "../index";

interface PaymentButtonProps {
  amount?: number;
  currency?: string;
  description?: string;
  plan?: Plan;
  onSuccess?: (result: PaymentResult | SubscriptionResult) => void;
  onError?: (error: string) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export function PaymentButton({
  amount = 0,
  currency = "usd",
  description,
  plan,
  onSuccess,
  onError,
  style,
  textStyle,
  disabled = false,
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const formatAmount = useCallback((cents: number, curr: string) => {
    const value = (cents / 100).toFixed(2);
    const symbols: Record<string, string> = {
      usd: "$",
      inr: "₹",
      eur: "€",
      gbp: "£",
    };
    return `${symbols[curr] || curr} ${value}`;
  }, []);

  const handlePayment = useCallback(async () => {
    if (disabled || loading) return;

    setLoading(true);

    try {
      let result: PaymentResult | SubscriptionResult;

      if (plan) {
        result = await paymentService.createSubscription({
          planId: plan.id,
          plan,
        });
      } else {
        result = await paymentService.createPayment({
          amount,
          currency,
          description: description || "Payment",
        });
      }

      if (result.success) {
        Alert.alert(
          "Payment Successful",
          `Transaction ID: ${(result as PaymentResult).transactionId || (result as SubscriptionResult).subscriptionId}`,
          [
            {
              text: "OK",
              onPress: () => onSuccess?.(result),
            },
          ]
        );
      } else {
        Alert.alert(
          "Payment Failed",
          result.errorMessage || "An error occurred",
          [
            {
              text: "OK",
              onPress: () => onError?.(result.errorMessage || "Payment failed"),
            },
          ]
        );
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      Alert.alert("Error", errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [amount, currency, description, plan, onSuccess, onError, disabled, loading]);

  const providerName = paymentService.getCurrentProviderName();
  const buttonText = plan 
    ? `Subscribe for ${formatAmount(plan.amount, plan.currency)}` 
    : `Pay ${formatAmount(amount, currency)}`;

  return (
    <Pressable
      onPress={handlePayment}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        disabled && styles.buttonDisabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" size="small" />
      ) : (
        <>
          <Text style={[styles.buttonText, textStyle]}>{buttonText}</Text>
          <Text style={styles.providerText}>via {providerName}</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3B82F6",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  providerText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
    marginTop: 2,
  },
});

export default PaymentButton;
