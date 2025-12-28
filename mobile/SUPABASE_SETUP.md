# FounderOps - Supabase Database Setup Guide

## 🚀 Quick Start

### Step 1: Create Supabase Project (10 minutes)

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. **Region:** Choose closest to your Stripe region
4. **Database Password:** Save it securely
5. Wait for project to initialize (~2 minutes)

### Step 2: Enable Authentication

Go to **Authentication > Providers**:

- ✅ **Email (Magic Link)** - Enable
- ❌ Passwords - Disable
- ❌ Social logins - Disable (for now)

**Why Magic Link?**

- Founders move fast
- Less support tickets
- No password reset flows
- One click sign in

---

## 📊 Database Tables

Run these SQL commands in **SQL Editor** in order:

### Table 1: Users (Public Profile)

```sql
-- Users table (maps to auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read/update own data
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Trigger: Auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Index for faster lookups
CREATE INDEX idx_users_email ON public.users(email);
```

### Table 2: Stripe Accounts

```sql
-- Stripe OAuth connections
CREATE TABLE public.stripe_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  stripe_account_id TEXT UNIQUE NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  livemode BOOLEAN DEFAULT FALSE,
  scope TEXT,
  token_type TEXT DEFAULT 'bearer',
  stripe_user_id TEXT,
  stripe_publishable_key TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id) -- One Stripe account per user
);

-- Enable RLS
ALTER TABLE public.stripe_accounts ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access own Stripe account
CREATE POLICY "Users can view own Stripe account"
  ON public.stripe_accounts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own Stripe account"
  ON public.stripe_accounts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own Stripe account"
  ON public.stripe_accounts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own Stripe account"
  ON public.stripe_accounts FOR DELETE
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_stripe_accounts_user_id ON public.stripe_accounts(user_id);
CREATE INDEX idx_stripe_accounts_stripe_id ON public.stripe_accounts(stripe_account_id);
```

### Table 3: Subscriptions

```sql
-- Stripe subscriptions (synced from webhooks)
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT NOT NULL,
  stripe_price_id TEXT,
  stripe_product_id TEXT,

  -- Subscription details
  status TEXT NOT NULL, -- active, canceled, past_due, trialing, etc.
  currency TEXT DEFAULT 'usd',
  amount INTEGER NOT NULL, -- in cents
  interval TEXT, -- month, year
  interval_count INTEGER DEFAULT 1,

  -- Dates
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at TIMESTAMPTZ,
  canceled_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  trial_start TIMESTAMPTZ,
  trial_end TIMESTAMPTZ,

  -- Metadata
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view own subscriptions
CREATE POLICY "Users can view own subscriptions"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_id ON public.subscriptions(stripe_subscription_id);
CREATE INDEX idx_subscriptions_customer_id ON public.subscriptions(stripe_customer_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);
```

### Table 4: Invoices

```sql
-- Stripe invoices (synced from webhooks)
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  stripe_invoice_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT NOT NULL,

  -- Invoice details
  status TEXT NOT NULL, -- draft, open, paid, void, uncollectible
  currency TEXT DEFAULT 'usd',
  amount_due INTEGER NOT NULL,
  amount_paid INTEGER DEFAULT 0,
  amount_remaining INTEGER DEFAULT 0,
  subtotal INTEGER,
  total INTEGER,
  tax INTEGER DEFAULT 0,

  -- Dates
  due_date TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  period_start TIMESTAMPTZ,
  period_end TIMESTAMPTZ,

  -- URLs
  hosted_invoice_url TEXT,
  invoice_pdf TEXT,

  -- Metadata
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view own invoices
CREATE POLICY "Users can view own invoices"
  ON public.invoices FOR SELECT
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_invoices_user_id ON public.invoices(user_id);
CREATE INDEX idx_invoices_stripe_id ON public.invoices(stripe_invoice_id);
CREATE INDEX idx_invoices_status ON public.invoices(status);
CREATE INDEX idx_invoices_subscription_id ON public.invoices(subscription_id);
```

### Table 5: Daily Metrics

```sql
-- Daily metrics snapshot (calculated from subscriptions)
CREATE TABLE public.daily_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,

  -- Revenue metrics (in cents)
  mrr INTEGER DEFAULT 0,
  mrr_change INTEGER DEFAULT 0,
  arr INTEGER DEFAULT 0,

  -- Subscription metrics
  active_subscriptions INTEGER DEFAULT 0,
  new_subscriptions INTEGER DEFAULT 0,
  churned_subscriptions INTEGER DEFAULT 0,

  -- Churn metrics
  churn_rate NUMERIC(5,2) DEFAULT 0,
  churn_mrr INTEGER DEFAULT 0,

  -- Payment metrics
  failed_payments INTEGER DEFAULT 0,
  recovered_payments INTEGER DEFAULT 0,

  -- Manual inputs
  support_pressure INTEGER DEFAULT 1, -- 1=Low, 2=Medium, 3=High

  -- Metadata
  calculated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, date)
);

-- Enable RLS
ALTER TABLE public.daily_metrics ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view own metrics
CREATE POLICY "Users can view own metrics"
  ON public.daily_metrics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own metrics"
  ON public.daily_metrics FOR UPDATE
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_daily_metrics_user_id ON public.daily_metrics(user_id);
CREATE INDEX idx_daily_metrics_date ON public.daily_metrics(date DESC);
CREATE INDEX idx_daily_metrics_user_date ON public.daily_metrics(user_id, date DESC);
```

### Table 6: Alerts

```sql
-- Alert notifications
CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  -- Alert type: revenue_drop, churn_spike, failed_payments
  type TEXT NOT NULL CHECK (type IN ('revenue_drop', 'churn_spike', 'failed_payments')),

  -- Alert details
  title TEXT NOT NULL,
  description TEXT,
  severity TEXT DEFAULT 'warning' CHECK (severity IN ('info', 'warning', 'critical')),

  -- Status
  is_read BOOLEAN DEFAULT FALSE,
  is_dismissed BOOLEAN DEFAULT FALSE,

  -- Related data
  related_data JSONB DEFAULT '{}',

  -- Dates
  triggered_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access own alerts
CREATE POLICY "Users can view own alerts"
  ON public.alerts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own alerts"
  ON public.alerts FOR UPDATE
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_alerts_user_id ON public.alerts(user_id);
CREATE INDEX idx_alerts_type ON public.alerts(type);
CREATE INDEX idx_alerts_is_read ON public.alerts(is_read);
CREATE INDEX idx_alerts_triggered_at ON public.alerts(triggered_at DESC);
```

### Table 7: Daily Summaries

```sql
-- Daily summary messages (auto-generated)
CREATE TABLE public.daily_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,

  -- Summary content
  headline TEXT NOT NULL, -- "Looking Good" or "Needs Attention"
  summary_text TEXT NOT NULL,
  items JSONB DEFAULT '[]', -- Array of {type, message}

  -- Overall status
  status TEXT DEFAULT 'good' CHECK (status IN ('good', 'warning', 'danger')),

  -- Push notification
  push_sent BOOLEAN DEFAULT FALSE,
  push_sent_at TIMESTAMPTZ,

  -- Metadata
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, date)
);

-- Enable RLS
ALTER TABLE public.daily_summaries ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view own summaries
CREATE POLICY "Users can view own summaries"
  ON public.daily_summaries FOR SELECT
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_daily_summaries_user_id ON public.daily_summaries(user_id);
CREATE INDEX idx_daily_summaries_date ON public.daily_summaries(date DESC);
CREATE INDEX idx_daily_summaries_user_date ON public.daily_summaries(user_id, date DESC);
```

### Table 8: Webhook Events (Audit Log)

```sql
-- Stripe webhook events log (for debugging & replay)
CREATE TABLE public.webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,

  -- Event details
  type TEXT NOT NULL, -- subscription.created, invoice.paid, etc.
  api_version TEXT,
  livemode BOOLEAN DEFAULT FALSE,

  -- Payload
  payload JSONB NOT NULL,

  -- Processing status
  processed BOOLEAN DEFAULT FALSE,
  processed_at TIMESTAMPTZ,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,

  -- Dates
  received_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (service role only for webhooks)
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

-- No user policies - only service role can access
-- This is intentional for security

-- Indexes
CREATE INDEX idx_webhook_events_stripe_id ON public.webhook_events(stripe_event_id);
CREATE INDEX idx_webhook_events_type ON public.webhook_events(type);
CREATE INDEX idx_webhook_events_processed ON public.webhook_events(processed);
CREATE INDEX idx_webhook_events_received_at ON public.webhook_events(received_at DESC);
```

### Table 9: User Settings

```sql
-- User preferences and settings
CREATE TABLE public.user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  -- Notification settings
  push_enabled BOOLEAN DEFAULT TRUE,
  daily_summary_time TIME DEFAULT '09:00:00',
  alert_revenue_drop BOOLEAN DEFAULT TRUE,
  alert_churn_spike BOOLEAN DEFAULT TRUE,
  alert_failed_payments BOOLEAN DEFAULT TRUE,

  -- Display settings
  currency TEXT DEFAULT 'usd',
  timezone TEXT DEFAULT 'UTC',

  -- Push notification token
  expo_push_token TEXT,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access own settings
CREATE POLICY "Users can view own settings"
  ON public.user_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings"
  ON public.user_settings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings"
  ON public.user_settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Trigger: Auto-create settings on user creation
CREATE OR REPLACE FUNCTION public.handle_new_user_settings()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_user_created_settings
  AFTER INSERT ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_settings();

-- Index
CREATE INDEX idx_user_settings_user_id ON public.user_settings(user_id);
```

---

## 🔐 Row Level Security Summary

| Table           | SELECT | INSERT  | UPDATE  | DELETE  |
| --------------- | ------ | ------- | ------- | ------- |
| users           | Own    | Auto    | Own     | -       |
| stripe_accounts | Own    | Own     | Own     | Own     |
| subscriptions   | Own    | Service | Service | Service |
| invoices        | Own    | Service | Service | Service |
| daily_metrics   | Own    | Service | Own     | Service |
| alerts          | Own    | Service | Own     | Service |
| daily_summaries | Own    | Service | Service | Service |
| webhook_events  | -      | Service | Service | -       |
| user_settings   | Own    | Own     | Own     | -       |

**Note:** "Service" means only the Supabase service role (backend) can perform these operations.

---

## 🔧 Database Functions

### Calculate MRR

```sql
-- Function to calculate current MRR for a user
CREATE OR REPLACE FUNCTION public.calculate_user_mrr(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  total_mrr INTEGER;
BEGIN
  SELECT COALESCE(SUM(
    CASE
      WHEN interval = 'year' THEN amount / 12
      ELSE amount
    END
  ), 0)
  INTO total_mrr
  FROM public.subscriptions
  WHERE user_id = p_user_id
    AND status = 'active';

  RETURN total_mrr;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Get Active Subscription Count

```sql
-- Function to get active subscription count
CREATE OR REPLACE FUNCTION public.get_active_subscription_count(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  sub_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO sub_count
  FROM public.subscriptions
  WHERE user_id = p_user_id
    AND status = 'active';

  RETURN sub_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 📅 Cron Jobs (Supabase Edge Functions)

### Daily Metrics Calculation (Run at midnight UTC)

```sql
-- This would be an Edge Function, but here's the logic:
-- 1. For each user with Stripe connected
-- 2. Calculate MRR from active subscriptions
-- 3. Calculate churn from canceled subscriptions
-- 4. Count failed payments from invoices
-- 5. Insert into daily_metrics
```

### Daily Summary Generation (Run at user's preferred time)

```sql
-- This would be an Edge Function:
-- 1. Get yesterday's metrics
-- 2. Compare with previous day
-- 3. Generate summary text
-- 4. Insert into daily_summaries
-- 5. Send push notification
```

---

## ✅ Setup Checklist

### Day 1 Tasks

- [ ] Create Supabase project
- [ ] Enable Email (Magic Link) auth
- [ ] Run all SQL scripts in order
- [ ] Verify RLS is enabled on all tables
- [ ] Test user signup flow
- [ ] Verify triggers work (user profile auto-created)

### Day 2 Tasks

- [ ] Set up Stripe OAuth (separate guide)
- [ ] Create webhook endpoint
- [ ] Test subscription sync
- [ ] Verify metrics calculation

### Day 3 Tasks

- [ ] Set up Edge Functions for cron jobs
- [ ] Test daily summary generation
- [ ] Configure push notifications
- [ ] End-to-end testing

---

## 🔗 Environment Variables

Add these to your `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Stripe Connect OAuth
STRIPE_CLIENT_ID=ca_...
STRIPE_CONNECT_REDIRECT_URI=https://your-app.com/api/stripe/callback
```

---

## 🎯 Next Steps

After database setup:

1. **Stripe Connect OAuth** - Connect user's Stripe account
2. **Webhook Handler** - Sync subscription data
3. **API Routes** - Expose data to mobile app
4. **Push Notifications** - Daily summaries

---

**Built for solo founders. Ship fast. Stay honest.**
