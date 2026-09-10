import crypto from 'crypto';

export interface VerifySlipInput {
  tenantId: string;
  transRef: string;
  amount: number;
  receiverAccount?: string;
  transDate?: string;
  imageBuffer?: Buffer;
  expectedAmount?: number;
}

export interface VerifyResult {
  valid: boolean;
  transRef: string;
  amount: number;
  slipHash: string;
  status: 'valid' | 'duplicate' | 'amount_mismatch' | 'invalid';
  message: string;
  timestamp: string;
}

// In-memory slip storage cache for immediate deduplication (persisted to Supabase/PostgreSQL in production)
const knownTransRefs = new Set<string>();
const knownHashes = new Set<string>();

export function verifySlip(input: VerifySlipInput): VerifyResult {
  const { tenantId, transRef, amount, expectedAmount, imageBuffer } = input;

  if (!transRef || transRef.trim().length === 0) {
    return {
      valid: false,
      transRef: '',
      amount: amount || 0,
      slipHash: '',
      status: 'invalid',
      message: 'ไม่พบรหัสอ้างอิงธุรกรรมธนาคาร (TransRef)',
      timestamp: new Date().toISOString(),
    };
  }

  // Generate SHA-256 Hash
  const hash = imageBuffer
    ? crypto.createHash('sha256').update(imageBuffer).digest('hex')
    : crypto.createHash('sha256').update(`${tenantId}:${transRef}`).digest('hex');

  const refKey = `${tenantId}:${transRef}`;

  // 1. Anti-Replay: Duplicate TransRef Check
  if (knownTransRefs.has(refKey)) {
    return {
      valid: false,
      transRef,
      amount,
      slipHash: hash,
      status: 'duplicate',
      message: 'ตรวจพบสลิปซ้ำ! รหัสอ้างอิงนี้ถูกใช้งานในระบบไปแล้ว',
      timestamp: new Date().toISOString(),
    };
  }

  // 2. Anti-Replay: Duplicate Image Hash Check
  if (knownHashes.has(hash)) {
    return {
      valid: false,
      transRef,
      amount,
      slipHash: hash,
      status: 'duplicate',
      message: 'ตรวจพบรูปสลิปซ้ำ! ไฟล์ภาพนี้เคยถูกอัปโหลดเข้าระบบแล้ว',
      timestamp: new Date().toISOString(),
    };
  }

  // 3. Amount Matching Check
  if (expectedAmount !== undefined && Math.abs(amount - expectedAmount) > 0.01) {
    return {
      valid: false,
      transRef,
      amount,
      slipHash: hash,
      status: 'amount_mismatch',
      message: `ยอดเงินไม่ถูกต้อง: ยอดในสลิป ฿${amount.toLocaleString()} (ยอดที่ต้องชำระ ฿${expectedAmount.toLocaleString()})`,
      timestamp: new Date().toISOString(),
    };
  }

  // Record into cache
  knownTransRefs.add(refKey);
  knownHashes.add(hash);

  return {
    valid: true,
    transRef,
    amount,
    slipHash: hash,
    status: 'valid',
    message: 'สลิปถูกต้อง ยอดเงินเข้าบัญชีเรียบร้อย',
    timestamp: new Date().toISOString(),
  };
}
