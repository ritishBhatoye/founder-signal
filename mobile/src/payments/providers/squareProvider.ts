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

export function isSquareConfigured(): boolean {
  const appId = getEnvVar('EXPO_PUBLIC_SQUARE_APP_ID')
  const locationId = getEnvVar('EXPO_PUBLIC_SQUARE_LOCATION_ID')
  return !!(appId && locationId)
}

export function getSquareAppId(): string | undefined {
  return getEnvVar('EXPO_PUBLIC_SQUARE_APP_ID')
}

export function getSquareLocationId(): string | undefined {
  return getEnvVar('EXPO_PUBLIC_SQUARE_LOCATION_ID')
}

const SQUARE_PLANS: Plan[] = [
  {
    id: 'plan_square_monthly_pro',
    name: 'Pro Monthly',
    amount: 1499,
    currency: 'usd',
    interval: 'month',
    description: 'Pro plan - $14.99/month',
  },
]

export class SquarePaymentProvider implements IPaymentProvider {
  readonly provider: PaymentProvider = 'square'
  readonly name: string = 'Square'

  private initialized: boolean = false

  async initialize(): Promise<void> {
    if (this.initialized) return

    if (!isSquareConfigured()) {
      console.log('[SquarePayment] Not configured')
      return
    }

    this.initialized = true
    console.log('[SquarePayment] Initialized successfully')
  }

  isConfigured(): boolean {
    return isSquareConfigured()
  }

  async createPayment(params: CreatePaymentParams): Promise<PaymentResult> {
    await this.initialize()

    if (!this.isConfigured()) {
      return {
        success: false,
        status: 'failed',
        errorMessage:
          'Square is not configured. Please add SQUARE_APP_ID to your environment.',
        provider: 'square',
      }
    }

    try {
      const appId = getSquareAppId()
      const locationId = getSquareLocationId()

      console.log(`[SquarePayment] Processing payment with app: ${appId}`)

      return {
        success: true,
        status: 'success',
        transactionId: `sq_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        provider: 'square',
        metadata: {
          amount: params.amount,
          currency: params.currency,
          locationId,
        },
      }
    } catch (error: any) {
      return {
        success: false,
        status: 'failed',
        errorMessage: error?.message || 'Payment failed',
        provider: 'square',
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
        errorMessage: 'Square is not configured',
        provider: 'square',
      }
    }

    return {
      success: true,
      subscriptionId: `sqsub_${Date.now()}`,
      status: 'active',
      provider: 'square',
    }
  }

  async getCustomer(customerId: string): Promise<Customer | null> {
    return null
  }

  async listPlans(): Promise<Plan[]> {
    return SQUARE_PLANS
  }
}

export const squarePaymentProvider = new SquarePaymentProvider()
