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

export function isStripeConfigured(): boolean {
  const publicKey = getEnvVar('EXPO_PUBLIC_STRIPE_PUBLIC_KEY')
  return !!publicKey && publicKey.length > 0
}

export function getStripePublicKey(): string | undefined {
  return getEnvVar('EXPO_PUBLIC_STRIPE_PUBLIC_KEY')
}

export class StripePaymentProvider implements IPaymentProvider {
  readonly provider: PaymentProvider = 'stripe'
  readonly name: string = 'Stripe'

  private stripe: any = null
  private initialized: boolean = false

  async initialize(): Promise<void> {
    if (this.initialized) return

    if (!isStripeConfigured()) {
      console.log('[StripePayment] Not configured - Stripe keys not found')
      return
    }

    try {
      const stripe = await import('@stripe/stripe-react-native')
      const publicKey = getStripePublicKey()

      await stripe.init({
        publishableKey: publicKey,
        merchantIdentifier: 'merchant.com.founderops.app',
        setAndroidReturnUrl: 'founderops://stripe-redirect',
        setIOSReturnURL: 'founderops://stripe-redirect',
      })

      this.stripe = stripe
      this.initialized = true
      console.log('[StripePayment] Initialized successfully')
    } catch (error) {
      console.error('[StripePayment] Failed to initialize:', error)
      this.initialized = false
    }
  }

  isConfigured(): boolean {
    return isStripeConfigured()
  }

  async createPayment(params: CreatePaymentParams): Promise<PaymentResult> {
    await this.initialize()

    if (!this.initialized || !this.stripe) {
      return {
        success: false,
        status: 'failed',
        errorMessage:
          'Stripe is not configured. Please add EXPO_PUBLIC_STRIPE_PUBLIC_KEY to your environment.',
        provider: 'stripe',
      }
    }

    try {
      const { StripePayment } = this.stripe

      const { error, paymentIntent } = await StripePayment.createPaymentIntent({
        amount: params.amount,
        currency: params.currency || 'usd',
        description: params.description,
        metadata: params.metadata,
      })

      if (error) {
        return {
          success: false,
          status: 'failed',
          errorMessage: error.message,
          provider: 'stripe',
        }
      }

      return {
        success: true,
        status: 'success',
        transactionId: paymentIntent?.id,
        provider: 'stripe',
        metadata: {
          clientSecret: paymentIntent?.client_secret,
        },
      }
    } catch (error: any) {
      return {
        success: false,
        status: 'failed',
        errorMessage: error?.message || 'Payment failed',
        provider: 'stripe',
      }
    }
  }

  async createSubscription(
    params: CreateSubscriptionParams,
  ): Promise<SubscriptionResult> {
    await this.initialize()

    if (!this.initialized || !this.stripe) {
      return {
        success: false,
        status: 'failed',
        errorMessage:
          'Stripe is not configured. Please add EXPO_PUBLIC_STRIPE_PUBLIC_KEY to your environment.',
        provider: 'stripe',
      }
    }

    try {
      const { StripePayment } = this.stripe

      const { error, subscription } = await StripePayment.createSubscription({
        priceId: params.planId,
        customerId: params.customerId,
        paymentMethodId: params.paymentMethodId,
      })

      if (error) {
        return {
          success: false,
          status: 'failed',
          errorMessage: error.message,
          provider: 'stripe',
        }
      }

      return {
        success: true,
        subscriptionId: subscription?.id,
        status: subscription?.status || 'active',
        provider: 'stripe',
      }
    } catch (error: any) {
      return {
        success: false,
        status: 'failed',
        errorMessage: error?.message || 'Subscription creation failed',
        provider: 'stripe',
      }
    }
  }

  async getCustomer(customerId: string): Promise<Customer | null> {
    return null
  }

  async listPlans(): Promise<Plan[]> {
    return []
  }
}

export const stripePaymentProvider = new StripePaymentProvider()
