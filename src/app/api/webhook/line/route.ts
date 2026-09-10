import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const events = body.events || [];

    for (const event of events) {
      if (event.type === 'message') {
        const userId = event.source?.userId;
        const msgType = event.message?.type;

        // Auto-detect image (slip) or text lead
        console.log(`[LINE Webhook] Event received from ${userId}, message type: ${msgType}`);
      }
    }

    return NextResponse.json({ status: 'success', processed: events.length });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('[LINE Webhook Error]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
