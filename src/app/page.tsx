'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Users,
  CheckCircle,
  ArrowRight,
  Server,
  Lock,
  Building2,
  Menu,
  X,
  FileText,
  Clock,
  Sparkles,
  ChevronDown,
  HelpCircle,
} from 'lucide-react';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const supportedBanks = [
    { name: 'KBANK', thai: 'กสิกรไทย', color: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30' },
    { name: 'SCB', thai: 'ไทยพาณิชย์', color: 'bg-purple-600/20 text-purple-400 border-purple-500/30' },
    { name: 'KTB', thai: 'กรุงไทย', color: 'bg-sky-600/20 text-sky-400 border-sky-500/30' },
    { name: 'BBL', thai: 'กรุงเทพ', color: 'bg-blue-600/20 text-blue-400 border-blue-500/30' },
    { name: 'TTB', thai: 'ทีทีบี', color: 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30' },
    { name: 'BAY', thai: 'กรุงศรี', color: 'bg-amber-600/20 text-amber-400 border-amber-500/30' },
    { name: 'GSB', thai: 'ออมสิน', color: 'bg-pink-600/20 text-pink-400 border-pink-500/30' },
    { name: 'PromptPay', thai: 'พร้อมเพย์ QR', color: 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30' },
  ];

  const faqs = [
    {
      q: 'ระบบตรวจจับสลิปปลอมและสลิปซ้ำได้อย่างไร?',
      a: 'ระบบถอดรหัส QR จากภาพสลิปเพื่อดึงรหัส TransRef และทำการตรวจสอบกับบัญชีธนาคาร พร้อมบันทึก Checksum/Image Hash ป้องกันการนำรูปสลิปเดิมมาส่งซ้ำได้ 100%',
    },
    {
      q: 'จำเป็นต้องมีความรู้ด้านเทคนิคหรือไม่?',
      a: 'ไม่จำเป็นเลยครับ ระบบออกแบบมาให้เชื่อมต่อ LINE OA ได้ใน 3 คลิก พร้อม Dashboard สำเร็จรูปที่ดูรายงานและค้นหาประวัติได้ทันที',
    },
    {
      q: 'บริการติดตั้งระบบส่วนตัว (On-Premise) แตกต่างจากรายเดือนอย่างไร?',
      a: 'แพ็กเกจ On-Premise จะติดตั้งชุดโค้ดและฐานข้อมูลลงบน Cloud หรือ Server ส่วนตัวของบริษัทคุณ ข้อมูลเป็นกรรมสิทธิ์ของคุณ 100% ไม่ต้องแชร์กับใคร พร้อมทีมงานซัพพอร์ตดูแลรายปี',
    },
    {
      q: 'รองรับการแจ้งเตือนหลายกลุ่มหรือไม่?',
      a: 'รองรับครับ สามารถตั้งค่าให้แจ้งเตือนเข้ากลุ่มแอดมินหลายกลุ่ม หรือแยกตามสาขา/ประเภทสินค้าได้อิสระ',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white font-sans antialiased">
      {/* Navbar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 font-extrabold text-lg shadow-md shadow-emerald-500/20">
              AB
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-white leading-none">AutoBiz Hub</span>
              <span className="text-[10px] text-emerald-400 font-medium tracking-wider">SME OPERATIONS & ANTI-FRAUD</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#features" className="text-slate-400 hover:text-slate-200 transition-colors">
              ฟีเจอร์หลัก
            </a>
            <a href="#banks" className="text-slate-400 hover:text-slate-200 transition-colors">
              ธนาคารที่รองรับ
            </a>
            <a href="#pricing" className="text-slate-400 hover:text-slate-200 transition-colors">
              ราคา & แพ็กเกจ
            </a>
            <a href="#on-premise" className="text-slate-400 hover:text-slate-200 transition-colors">
              รับติดตั้งระบบส่วนตัว
            </a>
            <a href="#faq" className="text-slate-400 hover:text-slate-200 transition-colors">
              คำถามที่พบบ่อย
            </a>
            <Link
              href="/dashboard"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-4 py-2.5 rounded-lg transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
            >
              ทดลองใช้งานฟรี <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800"
            aria-label="สลับเมนู"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-800 bg-slate-900/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 hover:text-emerald-400 font-medium text-sm"
            >
              ฟีเจอร์หลัก
            </a>
            <a
              href="#banks"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 hover:text-emerald-400 font-medium text-sm"
            >
              ธนาคารที่รองรับ
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 hover:text-emerald-400 font-medium text-sm"
            >
              ราคา & แพ็กเกจ
            </a>
            <a
              href="#on-premise"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 hover:text-emerald-400 font-medium text-sm"
            >
              รับติดตั้งระบบส่วนตัว
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 hover:text-emerald-400 font-medium text-sm"
            >
              คำถามที่พบบ่อย
            </a>
            <div className="pt-2">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center block bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold py-3 rounded-lg text-sm shadow-md"
              >
                เข้าสู่ระบบ Dashboard
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide shadow-sm">
          <ShieldCheck className="w-4 h-4" /> ระบบตรวจสลิปอัตโนมัติ & ดูด Lead ลูกค้าจาก LINE OA
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-snug">
          เปลี่ยนงานเช็คสลิปและตอบแชท <br />
          ให้เป็น <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">ระบบอัตโนมัติ 100% ไม่มีวันพลาด</span>
        </h1>

        <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
          หมดปัญหาสลิปปลอม สลิปวน ยอดเงินไม่ตรง พร้อมดูดลีดลูกค้าจาก LINE บันทึกเข้าฐานข้อมูลกลางและออกใบเสร็จ PDF ให้อัตโนมัติทันที
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4 max-w-md mx-auto sm:max-w-none">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl transition-all text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 min-h-[48px]"
          >
            เปิดระบบทดลองใช้งานฟรี <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#on-premise"
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold px-6 py-3.5 rounded-xl border border-slate-700 transition-all text-sm flex items-center justify-center gap-2 min-h-[48px]"
          >
            <Server className="w-4 h-4 text-emerald-400" /> สนใจแพ็กเกจติดตั้งส่วนตัว
          </a>
        </div>

        {/* Security & Reliability Badges */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400 border-t border-slate-900 mt-10">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>256-Bit SSL Data Encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>ตรวจจับไวใน 0.8 วินาที</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>สกัดสลิปซ้ำแม่นยำ 100%</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>99.9% Uptime Guarantee</span>
          </div>
        </div>
      </section>

      {/* Supported Banks Section */}
      <section id="banks" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 border-t border-slate-900 text-center space-y-6">
        <div className="space-y-2">
          <h3 className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
            รองรับการสแกนและตรวจสอบทุกธนาคารชั้นนำในไทย
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {supportedBanks.map((bank, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl border ${bank.color} flex flex-col items-center justify-center gap-1 transition-transform hover:scale-105`}
            >
              <Building2 className="w-5 h-5 opacity-90" />
              <span className="font-bold text-xs">{bank.name}</span>
              <span className="text-[10px] text-slate-400">{bank.thai}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-slate-900 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">ฟังก์ชันครบ จบในที่เดียวเพื่อธุรกิจคุณ</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            ออกแบบมาเพื่อช่วยเจ้าของธุรกิจและแอดมินประหยัดเวลาอย่างน้อย 2-3 ชั่วโมงต่อวัน
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5 hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">ตรวจสลิปและสกัดสลิปซ้ำ 100%</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              ถอดรหัส QR จากภาพสลิป ตรวจสอบรหัสธุรกรรม (TransRef) ยอดเงิน และชื่อบัญชีผู้รับ พร้อมบันทึก Hash ป้องกันการนำรูปเดิมมาส่งซ้ำ
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5 hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">ดูด Lead และจัดหมวดหมู่ลูกค้า</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              เก็บบัญชีผู้ติดต่อจาก LINE OA ลงฐานข้อมูลกลางอัตโนมัติ ติดแท็กสถานะ (สนใจ, รอโอน, ปิดการขาย) ให้ทีมเซลล์ติดตามงานได้แม่นยำ
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3.5 hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">แจ้งเตือนแอดมิน & ออกใบเสร็จ PDF</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              ยิงแจ้งเตือนยอดเข้า LINE กลุ่มทันที พร้อมสร้างใบเสร็จรับเงิน PDF อัตโนมัติส่งกลับให้ลูกค้าในแชท สร้างความประทับใจระดับมืออาชีพ
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section (SaaS Subscriptions) */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-slate-900">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> แพ็กเกจรายเดือนที่ยืดหยุ่น
          </div>
          <h2 className="text-3xl font-bold text-white">เลือกแพ็กเกจที่เหมาะกับขนาดธุรกิจของคุณ</h2>
          <p className="text-slate-400 text-sm">เริ่มต้นทดลองฟรี ยกเลิกได้ตลอดเวลา ไม่มีสัญญาผูกมัด</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Free Tier */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white">Free Trial</h3>
                <p className="text-xs text-slate-400 mt-1">สำหรับทดสอบระบบร้านค้าเริ่มต้น</p>
              </div>
              <div className="text-3xl font-extrabold text-white">฿0 <span className="text-xs font-normal text-slate-400">/ 14 วัน</span></div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> ตรวจสลิป 50 รายการ</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> แจ้งเตือนสลิปเข้า LINE</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> Dashboard พื้นฐาน</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> สกัดสลิปซ้ำ</li>
              </ul>
            </div>
            <Link href="/dashboard" className="w-full text-center block bg-slate-800 hover:bg-slate-700 text-slate-200 py-3 rounded-xl text-xs font-semibold transition-colors min-h-[44px] flex items-center justify-center">
              เริ่มทดลองฟรี 14 วัน
            </Link>
          </div>

          {/* Starter Tier */}
          <div className="p-6 rounded-2xl bg-slate-900 border-2 border-emerald-500 flex flex-col justify-between space-y-6 relative shadow-2xl shadow-emerald-500/10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 font-extrabold px-3.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider shadow-md">
              ยอดนิยมสำหรับร้านค้าทั่วไป
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white">Starter Business</h3>
                <p className="text-xs text-slate-400 mt-1">สำหรับร้านค้าออนไลน์และ SME ที่มียอดขายทุกวัน</p>
              </div>
              <div className="text-3xl font-extrabold text-emerald-400">฿290 <span className="text-xs font-normal text-slate-400">/ เดือน</span></div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> ตรวจสลิป 500 รายการ/เดือน</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> สกัดสลิปซ้ำ & สลิปปลอม 100%</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> ดูดและบันทึก Lead จาก LINE OA</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> เชื่อมต่อ Google Sheets สรุปยอด</li>
              </ul>
            </div>
            <Link href="/dashboard" className="w-full text-center block bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl text-xs shadow-md transition-colors min-h-[44px] flex items-center justify-center">
              เลือกแพ็กเกจ Starter
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white">Pro Growth</h3>
                <p className="text-xs text-slate-400 mt-1">สำหรับธุรกิจที่มียอดขายสูงและต้องการระบบอัตโนมัติเต็มสูบ</p>
              </div>
              <div className="text-3xl font-extrabold text-white">฿690 <span className="text-xs font-normal text-slate-400">/ เดือน</span></div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> ตรวจสลิป 3,000 รายการ/เดือน</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> สร้างและส่งใบเสร็จ PDF อัตโนมัติ</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> จัดการสิทธิ์ Multi-Admin และทีมขาย</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> การช่วยเหลือระดับพิเศษ (Priority)</li>
              </ul>
            </div>
            <Link href="/dashboard" className="w-full text-center block bg-slate-800 hover:bg-slate-700 text-slate-200 py-3 rounded-xl text-xs font-semibold transition-colors min-h-[44px] flex items-center justify-center">
              เลือกแพ็กเกจ Pro Growth
            </Link>
          </div>
        </div>
      </section>

      {/* On-Premise / Buyout Installation Section */}
      <section id="on-premise" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-slate-900">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 space-y-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <Server className="w-3.5 h-3.5" /> แพ็กเกจรับติดตั้งระบบส่วนตัว (Private Cloud / On-Premise)
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              ติดตั้งระบบขายขาดบน Server ของคุณเอง พร้อมทีมวิศวกรดูแลรายปี
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              เหมาะสำหรับองค์กร คลินิก หรือธุรกิจที่ต้องการเก็บ Data ในฐานข้อมูลส่วนตัว 100% ไม่ต้องแชร์กับใคร ปรับแต่ง Custom Flow และเชื่อมโยงเข้ากับระบบ ERP/POS เดิมของบริษัทได้
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">1. ค่าติดตั้งระบบครั้งเดียว (One-Time Setup)</span>
                <p className="text-2xl font-extrabold text-white">฿25,000 - 35,000</p>
                <p className="text-slate-400 text-xs">ติดตั้งบน Supabase / Cloud ลูกค้า + เชื่อม LINE & ธนาคาร + ตกแต่งแบรนด์ของคุณ</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">2. สัญญาดูแลระบบ (Maintenance & SLA)</span>
                <p className="text-2xl font-extrabold text-white">฿1,900 <span className="text-xs font-normal text-slate-400">/ เดือน</span></p>
                <p className="text-slate-400 text-xs">ดูแล Server Uptime 99.9%, อัปเดต API เมื่อธนาคารปรับปรุง, และทีมแก้ปัญหาด่วน 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 py-16 border-t border-slate-900 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" /> ข้อสงสัยที่พบบ่อย
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">คำถามที่พบบ่อย (FAQ)</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-800 bg-slate-900/60 rounded-xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-slate-200 hover:text-white"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    openFaq === idx ? 'rotate-180 text-emerald-400' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-10 text-center text-xs text-slate-500 space-y-2">
        <p>© 2026 AutoBiz Hub. All rights reserved. ระบบบริหารจัดการยอดขายและลูกค้าอัตโนมัติสำหรับ SME</p>
        <p className="text-[11px] text-slate-600">รองรับธนาคาร กสิกรไทย, ไทยพาณิชย์, กรุงไทย, กรุงเทพ, ทีทีบี, กรุงศรี, ออมสิน และระบบพร้อมเพย์</p>
      </footer>
    </div>
  );
}
