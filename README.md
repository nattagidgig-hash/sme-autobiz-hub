# AutoBiz Hub (SME Operations & Anti-Fraud Suite)

ระบบบริหารจัดการยอดขาย ตรวจสลิปป้องกันสลิปซ้ำ และจัดการ Lead ลูกค้าจาก LINE OA สำหรับธุรกิจและ SME

## 📁 โครงสร้างโปรเจกต์
- `/app`: Next.js 14 Web Application (Landing Page + SaaS Dashboard + APIs)
- `schema.sql`: โครงสร้างฐานข้อมูล PostgreSQL / Supabase รองรับระบบ Multi-tenant
- `slip_verifier.py`: Python Engine สำหรับทดสอบการตรวจสลิป
- `PRODUCT_BLUEPRINT.md`: แผนธุรกิจ โมเดลการตั้งราคา และกลยุทธ์การขาย

## 🚀 การรันระบบในเครื่อง (Local Development)
```bash
cd /home/great/projects/sme-autobiz/app
npm run dev
```
เปิดบราวเซอร์ที่: `http://localhost:3000`

## 💰 รูปแบบโมเดลธุรกิจ
1. **SaaS Subscription (รายเดือน):**
   - Starter: ฿290/เดือน (500 สลิป + LINE Webhook)
   - Pro: ฿690/เดือน (ไม่จำกัดสลิป + ใบเสร็จ PDF + Multi-Admin)
2. **On-Premise / Private Cloud (ติดตั้งขายขาด + เซอร์วิสดูแล):**
   - Setup Fee: ฿25,000 - ฿35,000 (ติดตั้งลง Cloud ส่วนตัวของลูกค้า)
   - Maintenance SLA: ฿1,900/เดือน
