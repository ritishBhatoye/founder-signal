import { ApolloProvider } from '@apollo/client/react'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { Provider } from 'react-redux'

import { AuthProvider, ThemeProvider } from '@/contexts'
import client from '@/lib/apollo'
import { store } from '@/store'

import '../global.css'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    // SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <ApolloProvider client={client}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="splash" options={{ headerShown: false }} />

              <Stack.Screen
                name="(auth)"
                options={{
                  headerShown: false,
                  // presentation: "modal",
                }}
              />
              <Stack.Screen
                name="(onboarding)"
                options={{
                  headerShown: false,
                  // presentation: "modal",
                }}
              />

              <Stack.Screen
                name="stripe-connect"
                options={{
                  headerShown: false,
                  presentation: 'modal',
                }}
              />
              <Stack.Screen
                name="support-pressure"
                options={{
                  title: 'Support Pressure',
                  presentation: 'modal',
                }}
              />
              <Stack.Screen
                name="payment-demo"
                options={{
                  title: 'Payment Demo',
                  presentation: 'modal',
                }}
              />
            </Stack>
          </ApolloProvider>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  )
}
