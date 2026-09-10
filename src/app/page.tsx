import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Users,
  CheckCircle,
  ArrowRight,
  Server,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white font-sans">
      {/* Navbar */}
      <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold text-base">
              AB
            </div>
            <span className="font-bold text-lg text-white">AutoBiz Hub</span>
          </div>

          <nav className="flex items-center gap-4 text-sm">
            <a href="#pricing" className="text-slate-400 hover:text-slate-200 transition-colors">
              ราคา & แพ็กเกจ
            </a>
            <a href="#on-premise" className="text-slate-400 hover:text-slate-200 transition-colors">
              รับติดตั้งระบบ
            </a>
            <Link
              href="/dashboard"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
            >
              ทดลองใช้งาน Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
          <ShieldCheck className="w-4 h-4" /> ระบบตรวจสลิปอัตโนมัติ & บันทึก Lead ลูกค้าจาก LINE OA
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          เปลี่ยนงานแอดมินที่น่าเบื่อ <br />
          ให้เป็น <span className="text-emerald-400">ระบบอัตโนมัติที่ไม่มีวันพลาด</span>
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
          ป้องกันสลิปปลอม สลิปวน สรุปยอดขายเข้า Database ทันที พร้อมดูด Lead ลูกค้าจาก LINE จัดการทีมขายได้ในที่เดียว
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-6 py-3 rounded-lg transition-colors text-sm shadow-lg shadow-emerald-500/20"
          >
            เปิดระบบทดลองใช้งานฟรี 14 วัน
          </Link>
          <a
            href="#on-premise"
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-200 font-medium px-6 py-3 rounded-lg border border-slate-700 transition-colors text-sm flex items-center justify-center gap-2"
          >
            <Server className="w-4 h-4 text-emerald-400" /> สนใจบริการติดตั้งระบบส่วนตัว
          </a>
        </div>
      </section>

      {/* Core Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-slate-900 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-white">ตรวจสลิปและสกัดสลิปซ้ำ</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            ถอดรหัส QR จากภาพสลิป ตรวจสอบ TransRef ธนาคาร และคำนวณ Image Hash เพื่อป้องกันลูกค้านำสลิปเดิมมาส่งซ้ำ 100%
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-white">ดูด Lead และแท็กสถานะลูกค้า</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            เก็บบัญชีผู้ติดต่อจาก LINE OA ลงฐานข้อมูลกลางอัตโนมัติ แอดมินไม่ต้องคอยจดมือ ติดตามสถานะปิดการขายได้แม่นยำ
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-white">แจ้งเตือน & ออกใบเสร็จทันที</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            ส่งการแจ้งเตือนยอดเข้ากลุ่มแอดมินทันที และสร้างใบเสร็จรับเงิน PDF ส่งกลับให้ลูกค้าผ่านแชทอัตโนมัติ
          </p>
        </div>
      </section>

      {/* Pricing Section (SaaS Subscriptions) */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-slate-900">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-bold text-white">แพ็กเกจค่าบริการรายเดือน (SaaS)</h2>
          <p className="text-slate-400 text-sm">เริ่มต้นง่าย ยกเลิกได้ตลอดเวลา ไม่มีข้อผูกมัด</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Tier */}
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Free Trial</h3>
              <p className="text-xs text-slate-400">สำหรับทดสอบระบบร้านค้าขนาดเล็ก</p>
              <div className="text-3xl font-bold text-white">฿0 <span className="text-xs font-normal text-slate-400">/ 14 วัน</span></div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> ตรวจสลิป 50 รายการ</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> แจ้งเตือนสลิปเข้า LINE</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Dashboard พื้นฐาน</li>
              </ul>
            </div>
            <Link href="/dashboard" className="mt-6 block text-center bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded-lg text-xs font-medium">
              เริ่มทดลองฟรี
            </Link>
          </div>

          {/* Starter Tier */}
          <div className="p-6 rounded-xl bg-slate-900 border-2 border-emerald-500 flex flex-col justify-between relative shadow-xl shadow-emerald-500/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 font-bold px-3 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
              แนะนำสำหรับร้านค้าทั่วไป
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Starter</h3>
              <p className="text-xs text-slate-400">สำหรับร้านค้าออนไลน์และ SME</p>
              <div className="text-3xl font-bold text-emerald-400">฿290 <span className="text-xs font-normal text-slate-400">/ เดือน</span></div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> ตรวจสลิป 500 รายการ/เดือน</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> สกัดสลิปซ้ำ 100%</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> บันทึก Lead จาก LINE OA</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> เชื่อมต่อ Google Sheets</li>
              </ul>
            </div>
            <Link href="/dashboard" className="mt-6 block text-center bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold py-2 rounded-lg text-xs">
              เลือกแพ็กเกจนี้
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Pro Growth</h3>
              <p className="text-xs text-slate-400">สำหรับธุรกิจที่มียอดขายต่อเนื่อง</p>
              <div className="text-3xl font-bold text-white">฿690 <span className="text-xs font-normal text-slate-400">/ เดือน</span></div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> ตรวจสลิปไม่จำกัด (3,000 รายการ)</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> ระบบออกใบเสร็จรับเงิน PDF อัตโนมัติ</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Multi-Admin จัดการทีมขาย</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Priority Support</li>
              </ul>
            </div>
            <Link href="/dashboard" className="mt-6 block text-center bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded-lg text-xs font-medium">
              เลือกแพ็กเกจนี้
            </Link>
          </div>
        </div>
      </section>

      {/* On-Premise / Buyout Installation Section */}
      <section id="on-premise" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-slate-900">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
              <Server className="w-3.5 h-3.5" /> แพ็กเกจรับติดตั้งระบบส่วนตัว (Private Cloud / On-Premise)
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              ติดตั้งระบบขายขาดบน Server ของคุณเอง พร้อมทีมงานดูแลรายปี
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              เหมาะสำหรับองค์กร คลินิก หรือธุรกิจที่ต้องการเก็บ Data ในฐานข้อมูลของตัวเอง 100% ไม่ต้องแชร์กับใคร ปรับแต่งโค้ดและ Flow งานได้ตามต้องการ
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs">
              <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-semibold">1. ค่าติดตั้งระบบครั้งเดียว (Setup Fee)</span>
                <p className="text-xl font-bold text-white">฿25,000 - 35,000</p>
                <p className="text-slate-400 text-[11px]">ติดตั้งบน Cloud ของลูกค้า + เชื่อม LINE & ธนาคาร + ปรับแต่งตามแบรนด์</p>
              </div>

              <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-semibold">2. สัญญาดูแลระบบ (Maintenance & SLA)</span>
                <p className="text-xl font-bold text-white">฿1,900 <span className="text-xs font-normal text-slate-400">/ เดือน</span></p>
                <p className="text-slate-400 text-[11px]">ดูแล Server Uptime, อัปเดตเมื่อ API ธนาคาร/LINE เปลี่ยนแปลง, แก้ไขบั๊กฉุกเฉิน</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <p>© 2026 AutoBiz Hub. All rights reserved. ระบบบริหารจัดการยอดขายและลูกค้าอัตโนมัติสำหรับ SME</p>
      </footer>
    </div>
  );
}
