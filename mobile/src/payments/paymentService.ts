import Constants from "expo-constants";
import {
  PaymentProvider,
  PaymentMode,
  PaymentResult,
  SubscriptionResult,
  CreatePaymentParams,
  CreateSubscriptionParams,
  ProviderAvailability,
  ProviderConfig,
  Plan,
  IPaymentProvider,
} from "./paymentTypes";
import {
  mockPaymentProvider,
  stripePaymentProvider,
  razorpayPaymentProvider,
  paypalPaymentProvider,
  squarePaymentProvider,
  paddlePaymentProvider,
  isStripeConfigured,
  isRazorpayConfigured,
  isPaypalConfigured,
  isSquareConfigured,
  isPaddleConfigured,
} from "./providers";

const getEnvVar = (key: string): string | undefined => {
  return (
    Constants.expoConfig?.extra?.[key] ||
    process.env[key] ||
    undefined
  );
};

function getPaymentMode(): PaymentMode {
  const mode = getEnvVar("EXPO_PUBLIC_PAYMENT_MODE");
  
  if (mode === "mock" || mode === "stripe" || mode === "razorpay" || 
      mode === "paypal" || mode === "square" || mode === "paddle") {
    return mode;
  }
  
  return "mock";
}

class PaymentService {
  private providers: Map<PaymentProvider, IPaymentProvider> = new Map();
  private currentProvider: IPaymentProvider | null = null;
  private initialized: boolean = false;

  constructor() {
    this.registerProviders();
  }

  private registerProviders(): void {
    this.providers.set("mock", mockPaymentProvider);
    this.providers.set("stripe", stripePaymentProvider);
    this.providers.set("razorpay", razorpayPaymentProvider);
    this.providers.set("paypal", paypalPaymentProvider);
    this.providers.set("square", squarePaymentProvider);
    this.providers.set("paddle", paddlePaymentProvider);
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    const mode = getPaymentMode();
    console.log(`[PaymentService] Initializing with mode: ${mode}`);

    if (mode === "mock") {
      this.currentProvider = mockPaymentProvider;
      console.log("[PaymentService] Using Mock Payment Provider");
    } else {
      const provider = this.providers.get(mode);
      
      if (provider && provider.isConfigured()) {
        this.currentProvider = provider;
        console.log(`[PaymentService] Using ${provider.name}`);
      } else {
        console.warn(`[PaymentService] Provider ${mode} not configured, falling back to mock`);
        
        if (mode === "stripe" && !isStripeConfigured()) {
          console.log("Stripe not configured — using alternative payment providers.");
        }
        
        this.currentProvider = mockPaymentProvider;
      }
    }

    this.initialized = true;
  }

  getProvider(): IPaymentProvider {
    if (!this.currentProvider) {
      throw new Error("PaymentService not initialized. Call initialize() first.");
    }
    return this.currentProvider;
  }

  getCurrentProviderName(): string {
    return this.currentProvider?.name || "Not initialized";
  }

  getCurrentProviderType(): PaymentProvider {
    return this.currentProvider?.provider || "mock";
  }

  getPaymentMode(): PaymentMode {
    return getPaymentMode();
  }

  checkProviderAvailability(): ProviderAvailability[] {
    const modes: PaymentProvider[] = ["mock", "stripe", "razorpay", "paypal", "square", "paddle"];
    
    return modes.map((provider) => {
      const providerInstance = this.providers.get(provider);
      const configured = providerInstance?.isConfigured() || false;
      
      const names: Record<PaymentProvider, string> = {
        mock: "Mock Payment",
        stripe: "Stripe",
        razorpay: "Razorpay",
        paypal: "PayPal",
        square: "Square",
        paddle: "Paddle",
      };

      let available = configured;
      
      if (provider === "mock") {
        available = true;
      } else if (getPaymentMode() === "mock") {
        available = configured;
      } else {
        available = provider === getPaymentMode() && configured;
      }

      return {
        provider,
        available,
        configured,
        name: names[provider],
      };
    });
  }

  async createPayment(params: CreatePaymentParams): Promise<PaymentResult> {
    await this.initialize();
    return this.getProvider().createPayment(params);
  }

  async createSubscription(params: CreateSubscriptionParams): Promise<SubscriptionResult> {
    await this.initialize();
    return this.getProvider().createSubscription(params);
  }

  async listPlans(): Promise<Plan[]> {
    await this.initialize();
    return this.getProvider().listPlans();
  }

  isConfigured(provider?: PaymentProvider): boolean {
    if (!provider) {
      return this.currentProvider?.isConfigured() || false;
    }
    const providerInstance = this.providers.get(provider);
    return providerInstance?.isConfigured() || false;
  }
}

export const paymentService = new PaymentService();

export const usePayment = () => {
  return paymentService;
};

export default paymentService;
