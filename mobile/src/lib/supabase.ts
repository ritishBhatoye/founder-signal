import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const supabaseUrl =
  Constants.expoConfig?.extra?.supabaseUrl ||
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
  "";
const supabaseAnonKey =
  Constants.expoConfig?.extra?.supabaseAnonKey ||
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  "";

console.log(`[Supabase] URL starting with: ${supabaseUrl}`);
console.log(`[Supabase] Anon Key present: ${!!supabaseAnonKey}`);

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase configuration missing! URL:",
    !!supabaseUrl,
    "Key:",
    !!supabaseAnonKey,
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Types for database tables
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      stripe_accounts: {
        Row: {
          id: string;
          user_id: string;
          stripe_account_id: string;
          access_token: string;
          refresh_token: string | null;
          livemode: boolean;
          scope: string | null;
          token_type: string;
          stripe_user_id: string | null;
          stripe_publishable_key: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_account_id: string;
          access_token: string;
          refresh_token?: string | null;
          livemode?: boolean;
          scope?: string | null;
          token_type?: string;
          stripe_user_id?: string | null;
          stripe_publishable_key?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          stripe_account_id?: string;
          access_token?: string;
          refresh_token?: string | null;
          livemode?: boolean;
          scope?: string | null;
          token_type?: string;
          stripe_user_id?: string | null;
          stripe_publishable_key?: string | null;
          updated_at?: string;
        };
      };
    };
  };
}
