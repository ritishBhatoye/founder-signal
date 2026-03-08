export type PaymentProvider = "stripe" | "razorpay" | "paypal" | "square" | "paddle" | "mock";

export type PaymentMode = "mock" | "stripe" | "razorpay" | "paypal" | "square" | "paddle";

export type PaymentStatus = "pending" | "success" | "failed" | "cancelled";

export type SubscriptionInterval = "day" | "week" | "month" | "year";

export interface PaymentResult {
  success: boolean;
  status: PaymentStatus;
  transactionId?: string;
  errorMessage?: string;
  provider: PaymentProvider;
  metadata?: Record<string, any>;
}

export interface SubscriptionResult {
  success: boolean;
  subscriptionId?: string;
  status: string;
  errorMessage?: string;
  provider: PaymentProvider;
  metadata?: Record<string, any>;
}

export interface PaymentRequest {
  amount: number;
  currency: string;
  description?: string;
  customerId?: string;
  metadata?: Record<string, any>;
}

export interface SubscriptionRequest {
  planId: string;
  customerId?: string;
  interval: SubscriptionInterval;
  amount: number;
  currency: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface ProviderConfig {
  enabled: boolean;
  configured: boolean;
  name: string;
  publicKey?: string;
}

export interface ProviderAvailability {
  provider: PaymentProvider;
  available: boolean;
  configured: boolean;
  name: string;
}

export interface PaymentServiceConfig {
  mode: PaymentMode;
  providers: Record<PaymentProvider, ProviderConfig>;
}

export interface PaymentMethod {
  id: string;
  type: string;
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

export interface Customer {
  id: string;
  email: string;
  name?: string;
  paymentMethods?: PaymentMethod[];
}

export interface Plan {
  id: string;
  name: string;
  amount: number;
  currency: string;
  interval: SubscriptionInterval;
  description?: string;
  metadata?: Record<string, any>;
}

export interface CreatePaymentParams {
  amount: number;
  currency?: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface CreateSubscriptionParams {
  planId: string;
  plan: Plan;
  customerId?: string;
  paymentMethodId?: string;
  metadata?: Record<string, any>;
}

export interface IPaymentProvider {
  readonly provider: PaymentProvider;
  readonly name: string;
  isConfigured(): boolean;
  createPayment(params: CreatePaymentParams): Promise<PaymentResult>;
  createSubscription(params: CreateSubscriptionParams): Promise<SubscriptionResult>;
  getCustomer(customerId: string): Promise<Customer | null>;
  listPlans(): Promise<Plan[]>;
}
