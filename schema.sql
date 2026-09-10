-- ==============================================================================
-- AutoSlip & LeadFlow - Multi-tenant Database Schema (PostgreSQL / Supabase)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tenants Table (Organizations / Businesses using the platform)
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    owner_email VARCHAR(255) NOT NULL,
    plan_tier VARCHAR(50) DEFAULT 'starter', -- 'free', 'starter', 'pro', 'on_premise'
    subscription_status VARCHAR(50) DEFAULT 'active', -- 'active', 'past_due', 'canceled'
    slip_quota_monthly INT DEFAULT 300,
    slips_used_this_month INT DEFAULT 0,
    line_channel_token TEXT,
    line_channel_secret TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Bank Accounts for Verification Matching
CREATE TABLE IF NOT EXISTS bank_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    bank_code VARCHAR(20) NOT NULL, -- e.g. 'KBANK', 'SCB', 'KTB', 'BBL', 'TTB'
    account_number VARCHAR(50) NOT NULL,
    account_name VARCHAR(255) NOT NULL,
    promptpay_id VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Leads (CRM from LINE OA / Social)
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    line_user_id VARCHAR(100),
    display_name VARCHAR(255),
    customer_phone VARCHAR(50),
    customer_email VARCHAR(255),
    tags TEXT[] DEFAULT '{}',
    status VARCHAR(50) DEFAULT 'new', -- 'new', 'interested', 'quoted', 'won', 'lost'
    notes TEXT,
    last_interaction TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Orders
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    order_code VARCHAR(50) NOT NULL,
    total_amount NUMERIC(12, 2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'paid', 'failed', 'refunded'
    items JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Slip Verification Transactions (Anti-fraud & Audit Trail)
CREATE TABLE IF NOT EXISTS slip_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    trans_ref VARCHAR(100) NOT NULL, -- Bank Transaction Reference ID from Slip
    sending_bank VARCHAR(50),
    receiving_bank VARCHAR(50),
    receiver_account VARCHAR(50),
    amount NUMERIC(12, 2) NOT NULL,
    trans_date TIMESTAMP WITH TIME ZONE,
    slip_image_url TEXT,
    slip_hash VARCHAR(64) NOT NULL, -- SHA256 Hash of raw data/image to prevent replay
    verification_status VARCHAR(50) NOT NULL, -- 'valid', 'duplicate', 'amount_mismatch', 'invalid'
    raw_payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_tenant_trans_ref UNIQUE (tenant_id, trans_ref)
);

-- Indices for high performance lookup
CREATE INDEX IF NOT EXISTS idx_slip_trans_ref ON slip_transactions(tenant_id, trans_ref);
CREATE INDEX IF NOT EXISTS idx_slip_hash ON slip_transactions(tenant_id, slip_hash);
CREATE INDEX IF NOT EXISTS idx_leads_line_user ON leads(tenant_id, line_user_id);
CREATE INDEX IF NOT EXISTS idx_orders_tenant ON orders(tenant_id, payment_status);
