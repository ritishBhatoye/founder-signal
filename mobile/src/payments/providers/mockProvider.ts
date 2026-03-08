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

const MOCK_DELAY_MS = 1500

function generateMockTransactionId(): string {
  return `mock_txn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

function generateMockSubscriptionId(): string {
  return `mock_sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

function generateMockCustomerId(): string {
  return `mock_cus_${Math.random().toString(36).substring(2, 15)}`
}

const MOCK_PLANS: Plan[] = [
  {
    id: 'plan_mock_monthly_999',
    name: 'Pro Monthly',
    amount: 999,
    currency: 'usd',
    interval: 'month',
    description: 'Pro plan - $9.99/month',
  },
  {
    id: 'plan_mock_yearly_9999',
    name: 'Pro Yearly',
    amount: 9999,
    currency: 'usd',
    interval: 'year',
    description: 'Pro plan - $99.99/year',
  },
  {
    id: 'plan_mock_monthly_1999',
    name: 'Business Monthly',
    amount: 1999,
    currency: 'usd',
    interval: 'month',
    description: 'Business plan - $19.99/month',
  },
]

export class MockPaymentProvider implements IPaymentProvider {
  readonly provider: PaymentProvider = 'mock'
  readonly name: string = 'Mock Payment Provider'

  private mockCustomers: Map<string, Customer> = new Map()

  isConfigured(): boolean {
    return true
  }

  async createPayment(params: CreatePaymentParams): Promise<PaymentResult> {
    await this.delay(MOCK_DELAY_MS)

    const transactionId = generateMockTransactionId()

    console.log(`[MockPayment] Processing payment:`, {
      amount: params.amount,
      currency: params.currency || 'usd',
      description: params.description,
    })

    return {
      success: true,
      status: 'success',
      transactionId,
      provider: 'mock',
      metadata: {
        mock: true,
        processedAt: new Date().toISOString(),
        amount: params.amount,
        currency: params.currency || 'usd',
        description: params.description,
        ...params.metadata,
      },
    }
  }

  async createSubscription(
    params: CreateSubscriptionParams,
  ): Promise<SubscriptionResult> {
    await this.delay(MOCK_DELAY_MS)

    const subscriptionId = generateMockSubscriptionId()

    console.log(`[MockPayment] Creating subscription:`, {
      planId: params.planId,
      plan: params.plan,
    })

    return {
      success: true,
      subscriptionId,
      status: 'active',
      provider: 'mock',
      metadata: {
        mock: true,
        createdAt: new Date().toISOString(),
        plan: params.plan,
        ...params.metadata,
      },
    }
  }

  async getCustomer(customerId: string): Promise<Customer | null> {
    await this.delay(500)

    const customer = this.mockCustomers.get(customerId)
    if (customer) {
      return customer
    }

    const newCustomer: Customer = {
      id: customerId,
      email: `user_${customerId.substring(0, 8)}@example.com`,
      name: 'Mock User',
      paymentMethods: [
        {
          id: `pm_mock_${Math.random().toString(36).substring(2, 15)}`,
          type: 'card',
          last4: '4242',
          brand: 'visa',
          expiryMonth: 12,
          expiryYear: 2028,
        },
      ],
    }

    this.mockCustomers.set(customerId, newCustomer)
    return newCustomer
  }

  async listPlans(): Promise<Plan[]> {
    await this.delay(300)
    return MOCK_PLANS
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

export const mockPaymentProvider = new MockPaymentProvider()
