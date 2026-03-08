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

export function isRazorpayConfigured(): boolean {
  const keyId = getEnvVar("EXPO_PUBLIC_RAZORPAY_KEY_ID");
  const keySecret = getEnvVar("EXPO_PUBLIC_RAZORPAY_KEY_SECRET");
  return !!(keyId && keySecret);
}

export function getRazorpayKeyId(): string | undefined {
  return getEnvVar("EXPO_PUBLIC_RAZORPAY_KEY_ID");
}

const RAZORPAY_PLANS: Plan[] = [
  {
    id: "plan_razor_monthly_basic",
    name: "Basic Monthly",
    amount: 499,
    currency: "inr",
    interval: "month",
    description: "Basic plan - ₹499/month",
  },
  {
    id: "plan_razor_monthly_pro",
    name: "Pro Monthly",
    amount: 999,
    currency: "inr",
    interval: "month",
    description: "Pro plan - ₹999/month",
  },
  {
    id: "plan_razor_yearly_pro",
    name: "Pro Yearly",
    amount: 9999,
    currency: "inr",
    interval: "year",
    description: "Pro yearly - ₹9,999/year",
  },
];

export class RazorpayPaymentProvider implements IPaymentProvider {
  readonly provider: PaymentProvider = "razorpay";
  readonly name: string = "Razorpay";

  private razorpay: any = null;
  private initialized: boolean = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;

    if (!isRazorpayConfigured()) {
      console.log("[RazorpayPayment] Not configured");
      return;
    }

    try {
      const RazorpayCheckout = await import("react-native-razorpay");
      this.razorpay = RazorpayCheckout.default;
      this.initialized = true;
      console.log("[RazorpayPayment] Initialized successfully");
    } catch (error) {
      console.error("[RazorpayPayment] Failed to initialize:", error);
      this.initialized = false;
    }
  }

  isConfigured(): boolean {
    return isRazorpayConfigured();
  }

  async createPayment(params: CreatePaymentParams): Promise<PaymentResult> {
    await this.initialize();

    if (!this.initialized || !this.razorpay) {
      return {
        success: false,
        status: "failed",
        errorMessage: "Razorpay is not configured. Please add RAZORPAY_KEY_ID to your environment.",
        provider: "razorpay",
      };
    }

    try {
      const keyId = getRazorpayKeyId();
      const options = {
        description: params.description || "Payment",
        currency: params.currency?.toUpperCase() || "INR",
        amount: params.amount,
        key: keyId,
        theme: {
          color: "#3B82F6",
        },
        metadata: params.metadata,
      };

      const paymentResult = await this.razorpay.open(options);

      return {
        success: true,
        status: "success",
        transactionId: paymentResult.razorpay_payment_id,
        provider: "razorpay",
        metadata: {
          razorpayOrderId: paymentResult.razorpay_order_id,
          razorpaySignature: paymentResult.razorpay_signature,
        },
      };
    } catch (error: any) {
      const errorMessage = error?.error?.description || error?.message || "Payment failed";
      
      if (error?.error?.code === "USER_CANCELLED") {
        return {
          success: false,
          status: "cancelled",
          errorMessage: "Payment cancelled by user",
          provider: "razorpay",
        };
      }

      return {
        success: false,
        status: "failed",
        errorMessage,
        provider: "razorpay",
      };
    }
  }

  async createSubscription(params: CreateSubscriptionParams): Promise<SubscriptionResult> {
    await this.initialize();

    if (!this.initialized || !this.razorpay) {
      return {
        success: false,
        status: "failed",
        errorMessage: "Razorpay is not configured",
        provider: "razorpay",
      };
    }

    const paymentResult = await this.createPayment({
      amount: params.plan.amount,
      currency: params.plan.currency,
      description: `Subscription: ${params.plan.name}`,
      metadata: {
        planId: params.planId,
        subscription: "true",
        ...params.metadata,
      },
    });

    if (paymentResult.success) {
      return {
        success: true,
        subscriptionId: paymentResult.transactionId,
        status: "active",
        provider: "razorpay",
        metadata: paymentResult.metadata,
      };
    }

    return {
      success: false,
      status: paymentResult.status,
      errorMessage: paymentResult.errorMessage,
      provider: "razorpay",
    };
  }

  async getCustomer(customerId: string): Promise<Customer | null> {
    return null;
  }

  async listPlans(): Promise<Plan[]> {
    if (!isRazorpayConfigured()) {
      return RAZORPAY_PLANS;
    }
    return RAZORPAY_PLANS;
  }
}

export const razorpayPaymentProvider = new RazorpayPaymentProvider();
