export type PlanTier = 'free' | 'starter' | 'pro' | 'on_premise';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan_tier: PlanTier;
  slip_quota_monthly: number;
  slips_used_this_month: number;
}

export interface Lead {
  id: string;
  tenant_id: string;
  line_user_id?: string;
  display_name: string;
  customer_phone?: string;
  tags: string[];
  status: 'new' | 'interested' | 'quoted' | 'won' | 'lost';
  notes?: string;
  last_interaction: string;
  created_at: string;
}

export interface SlipTransaction {
  id: string;
  tenant_id: string;
  trans_ref: string;
  sending_bank: string;
  receiving_bank: string;
  receiver_account: string;
  amount: number;
  trans_date: string;
  slip_hash: string;
  verification_status: 'valid' | 'duplicate' | 'amount_mismatch' | 'invalid';
  created_at: string;
}
