import { useState, useEffect } from 'react'
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { colors } from '@/constants/theme'
import { paymentService } from '@/payments'
import { PaymentButton } from '@/payments/components'

import type { Plan, ProviderAvailability } from '@/payments'

export default function PaymentDemoScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [plans, setPlans] = useState<Plan[]>([])
  const [availability, setAvailability] = useState<ProviderAvailability[]>([])
  const [currentProvider, setCurrentProvider] = useState<string>('')

  useEffect(() => {
    initializePayment()
  }, [])

  const initializePayment = async () => {
    try {
      await paymentService.initialize()
      const available = paymentService.checkProviderAvailability()
      const availablePlans = await paymentService.listPlans()

      setAvailability(available)
      setPlans(availablePlans)
      setCurrentProvider(paymentService.getCurrentProviderName())
    } catch (error) {
      console.error('Failed to initialize payment:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePaymentSuccess = (result: any) => {
    console.log('Payment success:', result)
  }

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error)
  }

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary[500]} />
          <Text style={[styles.loadingText, { color: colors.textMuted }]}>
            Initializing payment service...
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Payment Demo</Text>

        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Current Provider: {currentProvider}
        </Text>

        {/* Provider Status */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Available Providers
          </Text>
          {availability.map((item) => (
            <View key={item.provider} style={styles.providerRow}>
              <View style={styles.providerInfo}>
                <View
                  style={[
                    styles.statusDot,
                    {
                      backgroundColor: item.available
                        ? colors.success[500]
                        : colors.danger[500],
                    },
                  ]}
                />
                <Text style={[styles.providerName, { color: colors.text }]}>
                  {item.name}
                </Text>
              </View>
              <Text style={[styles.providerStatus, { color: colors.textMuted }]}>
                {item.configured ? 'Configured' : 'Not configured'}
              </Text>
            </View>
          ))}
        </View>

        {/* One-time Payment */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            One-time Payment
          </Text>
          <Text style={[styles.description, { color: colors.textMuted }]}>
            Test a single payment of $9.99
          </Text>
          <View style={styles.buttonContainer}>
            <PaymentButton
              amount={999}
              currency="usd"
              description="Test Payment"
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </View>
        </View>

        {/* Subscription Plans */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Subscription Plans
          </Text>
          {plans.map((plan) => (
            <View key={plan.id} style={[styles.planCard, { borderColor: colors.border }]}>
              <View style={styles.planInfo}>
                <Text style={[styles.planName, { color: colors.text }]}>{plan.name}</Text>
                <Text style={[styles.planDescription, { color: colors.textMuted }]}>
                  {plan.description}
                </Text>
              </View>
              <View style={styles.planButton}>
                <PaymentButton
                  plan={plan}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Info */}
        <View style={styles.infoContainer}>
          <Text style={[styles.infoText, { color: colors.textMuted }]}>
            Mode: {paymentService.getPaymentMode()}
          </Text>
          <Text style={[styles.infoText, { color: colors.textMuted }]}>
            Mock mode simulates successful payments
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
  },
  section: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
  },
  providerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  providerName: {
    fontSize: 16,
  },
  providerStatus: {
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 8,
  },
  planCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  planInfo: {
    flex: 1,
    marginRight: 12,
  },
  planName: {
    fontSize: 16,
    fontWeight: '600',
  },
  planDescription: {
    fontSize: 14,
    marginTop: 4,
  },
  planButton: {
    width: 140,
  },
  infoContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    marginBottom: 4,
  },
})
