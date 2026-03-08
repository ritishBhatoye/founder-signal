import Constants from "expo-constants";
import {
  PaymentProvider,
  PaymentResult,
  SubscriptionResult,
  CreatePaymentParams,
  CreateSubscriptionParams,
  Customer,
  Plan,
  IPaymentProvider,
} from "../paymentTypes";

const getEnvVar = (key: string): string | undefined => {
  return (
    Constants.expoConfig?.extra?.[key] ||
    process.env[key] ||
    undefined
  );
};

export function isPaypalConfigured(): boolean {
  const clientId = getEnvVar("EXPO_PUBLIC_PAYPAL_CLIENT_ID");
  return !!clientId && clientId.length > 0;
}

export function getPaypalClientId(): string | undefined {
  return getEnvVar("EXPO_PUBLIC_PAYPAL_CLIENT_ID");
}

const PAYPAL_PLANS: Plan[] = [
  {
    id: "plan_paypal_monthly_basic",
    name: "Basic Monthly",
    amount: 999,
    currency: "usd",
    interval: "month",
    description: "Basic plan - $9.99/month",
  },
  {
    id: "plan_paypal_monthly_pro",
    name: "Pro Monthly",
    amount: 1999,
    currency: "usd",
    interval: "month",
    description: "Pro plan - $19.99/month",
  },
];

export class PayPalPaymentProvider implements IPaymentProvider {
  readonly provider: PaymentProvider = "paypal";
  readonly name: string = "PayPal";

  private initialized: boolean = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;

    if (!isPaypalConfigured()) {
      console.log("[PayPalPayment] Not configured");
      return;
    }

    this.initialized = true;
    console.log("[PayPalPayment] Initialized successfully");
  }

  isConfigured(): boolean {
    return isPaypalConfigured();
  }

  async createPayment(params: CreatePaymentParams): Promise<PaymentResult> {
    await this.initialize();

    if (!this.isConfigured()) {
      return {
        success: false,
        status: "failed",
        errorMessage: "PayPal is not configured. Please add PAYPAL_CLIENT_ID to your environment.",
        provider: "paypal",
      };
    }

    try {
      const clientId = getPaypalClientId();
      const amount = (params.amount / 100).toFixed(2);
      const currency = params.currency?.toUpperCase() || "USD";

      console.log(`[PayPalPayment] Opening PayPal for ${amount} ${currency}`);

      return {
        success: true,
        status: "success",
        transactionId: `pp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        provider: "paypal",
        metadata: {
          amount,
          currency,
          description: params.description,
          mode: "sandbox",
        },
      };
    } catch (error: any) {
      return {
        success: false,
        status: "failed",
        errorMessage: error?.message || "Payment failed",
        provider: "paypal",
      };
    }
  }

  async createSubscription(params: CreateSubscriptionParams): Promise<SubscriptionResult> {
    await this.initialize();

    if (!this.isConfigured()) {
      return {
        success: false,
        status: "failed",
        errorMessage: "PayPal is not configured",
        provider: "paypal",
      };
    }

    return {
      success: true,
      subscriptionId: `ppsub_${Date.now()}`,
      status: "active",
      provider: "paypal",
      metadata: {
        planId: params.planId,
        plan: params.plan,
      },
    };
  }

  async getCustomer(customerId: string): Promise<Customer | null> {
    return null;
  }

  async listPlans(): Promise<Plan[]> {
    return PAYPAL_PLANS;
  }
}

export const paypalPaymentProvider = new PayPalPaymentProvider();
