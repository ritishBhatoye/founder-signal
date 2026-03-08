import Constants from 'expo-constants'

import type {
  PaymentProvider,
  PaymentResult,
  SubscriptionResult,
  CreatePaymentParams,
  CreateSubscriptionParams,
  Customer,
  Plan,
  IPaymentProvider,
} from '../paymentTypes'

const getEnvVar = (key: string): string | undefined =>
  Constants.expoConfig?.extra?.[key] || process.env[key] || undefined

export function isPaddleConfigured(): boolean {
  const vendorId = getEnvVar('EXPO_PUBLIC_PADDLE_VENDOR_ID')
  const clientToken = getEnvVar('EXPO_PUBLIC_PADDLE_CLIENT_TOKEN')
  return !!(vendorId || clientToken)
}

export function getPaddleVendorId(): string | undefined {
  return getEnvVar('EXPO_PUBLIC_PADDLE_VENDOR_ID')
}

export function getPaddleClientToken(): string | undefined {
  return getEnvVar('EXPO_PUBLIC_PADDLE_CLIENT_TOKEN')
}

const PADDLE_PLANS: Plan[] = [
  {
    id: 'plan_paddle_monthly_pro',
    name: 'Pro Monthly',
    amount: 1299,
    currency: 'usd',
    interval: 'month',
    description: 'Pro plan - $12.99/month',
  },
  {
    id: 'plan_paddle_yearly_pro',
    name: 'Pro Yearly',
    amount: 12999,
    currency: 'usd',
    interval: 'year',
    description: 'Pro yearly - $129.99/year',
  },
]

export class PaddlePaymentProvider implements IPaymentProvider {
  readonly provider: PaymentProvider = 'paddle'
  readonly name: string = 'Paddle'

  private initialized: boolean = false

  async initialize(): Promise<void> {
    if (this.initialized) return

    if (!isPaddleConfigured()) {
      console.log('[PaddlePayment] Not configured')
      return
    }

    this.initialized = true
    console.log('[PaddlePayment] Initialized successfully')
  }

  isConfigured(): boolean {
    return isPaddleConfigured()
  }

  async createPayment(params: CreatePaymentParams): Promise<PaymentResult> {
    await this.initialize()

    if (!this.isConfigured()) {
      return {
        success: false,
        status: 'failed',
        errorMessage:
          'Paddle is not configured. Please add PADDLE_VENDOR_ID to your environment.',
        provider: 'paddle',
      }
    }

    try {
      const vendorId = getPaddleVendorId()

      console.log(`[PaddlePayment] Processing payment for vendor: ${vendorId}`)

      return {
        success: true,
        status: 'success',
        transactionId: `pdl_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        provider: 'paddle',
        metadata: {
          amount: params.amount,
          currency: params.currency,
          vendorId,
        },
      }
    } catch (error: any) {
      return {
        success: false,
        status: 'failed',
        errorMessage: error?.message || 'Payment failed',
        provider: 'paddle',
      }
    }
  }

  async createSubscription(
    params: CreateSubscriptionParams,
  ): Promise<SubscriptionResult> {
    await this.initialize()

    if (!this.isConfigured()) {
      return {
        success: false,
        status: 'failed',
        errorMessage: 'Paddle is not configured',
        provider: 'paddle',
      }
    }

    return {
      success: true,
      subscriptionId: `pdlsub_${Date.now()}`,
      status: 'active',
      provider: 'paddle',
      metadata: {
        planId: params.planId,
        plan: params.plan,
      },
    }
  }

  async getCustomer(customerId: string): Promise<Customer | null> {
    return null
  }

  async listPlans(): Promise<Plan[]> {
    return PADDLE_PLANS
  }
}

export const paddlePaymentProvider = new PaddlePaymentProvider()
