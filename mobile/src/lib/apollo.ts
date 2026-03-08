import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import Constants from 'expo-constants'

const supabaseUrlRaw =
  Constants.expoConfig?.extra?.supabaseUrl || process.env.EXPO_PUBLIC_SUPABASE_URL || ''

const graphqlUrl = supabaseUrlRaw.includes('/graphql/v1')
  ? supabaseUrlRaw
  : `${supabaseUrlRaw.replace(/\/$/, '')}/graphql/v1`

const supabaseAnonKey =
  Constants.expoConfig?.extra?.supabaseAnonKey ||
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  ''

console.log(`[Apollo] GraphQL URL: ${graphqlUrl}`)

const client = new ApolloClient({
  link: new HttpLink({
    uri: graphqlUrl,
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
  }),
  cache: new InMemoryCache(),
})

export default client
