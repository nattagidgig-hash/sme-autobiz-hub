import { NextResponse } from 'next/server';
import { Lead } from '@/lib/types';

const mockLeads: Lead[] = [
  {
    id: 'lead-1',
    tenant_id: 'tenant-demo',
    display_name: 'คุณสมชาย (คลินิกทันตกรรม)',
    customer_phone: '081-234-5678',
    tags: ['สนใจระบบ', 'จองคิว'],
    status: 'interested',
    notes: 'ติดต่อขอใบเสนอราคาแพ็กเกจติดตั้ง On-premise',
    last_interaction: '10 นาทีที่แล้ว',
    created_at: new Date().toISOString(),
  },
  {
    id: 'lead-2',
    tenant_id: 'tenant-demo',
    display_name: 'คุณณัฐพร (ร้านเสื้อผ้าออนไลน์)',
    customer_phone: '089-876-5432',
    tags: ['ลูกค้าประจำ', 'สลิปผ่านแล้ว'],
    status: 'won',
    notes: 'ชำระค่าสมาชิกรายเดือน Starter เรียบร้อย',
    last_interaction: '1 ชั่วโมงที่แล้ว',
    created_at: new Date().toISOString(),
  },
  {
    id: 'lead-3',
    tenant_id: 'tenant-demo',
    display_name: 'คุณวีระศักดิ์ (ศูนย์อะไหล่ยนต์)',
    customer_phone: '095-111-2233',
    tags: ['สอบถามบริการ'],
    status: 'new',
    notes: 'สอบถามระบบออกใบเสร็จ PDF ผ่าน LINE',
    last_interaction: '3 ชั่วโมงที่แล้ว',
    created_at: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json({ leads: mockLeads });
}
