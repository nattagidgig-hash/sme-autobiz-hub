import { NextResponse } from 'next/server';
import { verifySlip } from '@/lib/verifier';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tenantId = 'demo-tenant', transRef, amount, expectedAmount } = body;

    if (!transRef || amount === undefined) {
      return NextResponse.json(
        { error: 'Missing required parameters (transRef, amount)' },
        { status: 400 }
      );
    }

    const result = verifySlip({
      tenantId,
      transRef,
      amount: Number(amount),
      expectedAmount: expectedAmount !== undefined ? Number(expectedAmount) : undefined,
    });

    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
