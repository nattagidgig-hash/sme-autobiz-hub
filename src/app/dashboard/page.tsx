'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Users,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  RefreshCw,
  UploadCloud,
  FileImage,
  Search,
  Check,
  Send,
  ArrowLeft,
} from 'lucide-react';
import { VerifyResult } from '@/lib/verifier';

interface LeadItem {
  id: string;
  name: string;
  phone: string;
  tag: string;
  status: 'new' | 'waiting_quote' | 'closed' | 'followup';
  statusText: string;
  note: string;
  time: string;
}

const initialLeads: LeadItem[] = [
  {
    id: '1',
    name: 'คุณสมชาย (คลินิกทันตกรรมอรุณ)',
    phone: '081-234-5678',
    tag: 'สนใจ On-Premise',
    status: 'waiting_quote',
    statusText: 'รอใบเสนอราคา',
    note: 'ขอใบเสนอราคาแพ็กเกจติดตั้งระบบดูแล 1 ปี พร้อมเชื่อม POS',
    time: '10 นาทีที่แล้ว',
  },
  {
    id: '2',
    name: 'คุณณัฐพร (ร้านเสื้อผ้าแฟชั่นสไตล์)',
    phone: '089-876-5432',
    tag: 'ลูกค้าสมาชิก',
    status: 'closed',
    statusText: 'ปิดการขายแล้ว',
    note: 'ชำระค่าสมาชิกรายเดือน Starter ฿290 (ส่งสลิปผ่าน LINE เรียบร้อย)',
    time: '1 ชม. ที่แล้ว',
  },
  {
    id: '3',
    name: 'คุณวีระศักดิ์ (ศูนย์อะไหล่ยนต์ พรีเมียม)',
    phone: '095-111-2233',
    tag: 'สอบถามฟีเจอร์',
    status: 'new',
    statusText: 'ลูกค้าใหม่',
    note: 'สอบถามเรื่องระบบสร้างใบเสร็จ PDF ส่งกลับเข้าแชทลูกค้า',
    time: '3 ชม. ที่แล้ว',
  },
  {
    id: '4',
    name: 'คุณปรียา (คาเฟ่บ้านขนม)',
    phone: '086-999-8877',
    tag: 'สนใจ Starter',
    status: 'followup',
    statusText: 'รอโอนเงิน',
    note: 'ขอลองเปิดระบบทดลอง 14 วันก่อนตัดสินใจสมัครรายปี',
    time: '5 ชม. ที่แล้ว',
  },
];

export default function DashboardPage() {
  const [transRefInput, setTransRefInput] = useState('');
  const [amountInput, setAmountInput] = useState('490');
  const [expectedAmountInput, setExpectedAmountInput] = useState('490');
  const [verifyResult, setVerifyResult] = useState<VerifyResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'verifier' | 'leads'>('verifier');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [leadsList] = useState<LeadItem[]>(initialLeads);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setVerifyResult(null);

    try {
      const res = await fetch('/api/verify-slip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transRef: transRefInput || `TRX${Date.now().toString().slice(-8)}`,
          amount: parseFloat(amountInput) || 0,
          expectedAmount: expectedAmountInput ? parseFloat(expectedAmountInput) : undefined,
        }),
      });
      const data = await res.json();
      setVerifyResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateUpload = (sampleType: 'valid' | 'duplicate' | 'amount_mismatch') => {
    if (sampleType === 'valid') {
      setUploadedFileName('slip_kbank_490thb_valid.jpg');
      setTransRefInput(`KBANK${Date.now().toString().slice(-6)}`);
      setAmountInput('490');
      setExpectedAmountInput('490');
    } else if (sampleType === 'duplicate') {
      setUploadedFileName('slip_scb_duplicate_attack.jpg');
      setTransRefInput('DUP_SLIP_TEST_999');
      setAmountInput('490');
      setExpectedAmountInput('490');
    } else {
      setUploadedFileName('slip_promptpay_underpaid.jpg');
      setTransRefInput(`PP${Date.now().toString().slice(-6)}`);
      setAmountInput('290');
      setExpectedAmountInput('490');
    }
    setVerifyResult(null);
  };

  const filteredLeads = leadsList.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.note.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleQuickAction = (leadId: string, actionName: string) => {
    setActionNotice(`ดำเนินการ "${actionName}" สำเร็จเรียบร้อย`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="กลับหน้าแรก"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 font-extrabold text-base shadow-sm">
              AB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg text-white">AutoBiz Hub</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Live System
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="text-right text-xs hidden sm:block">
              <p className="font-semibold text-slate-200">Good Day Store (สาขาหลัก)</p>
              <p className="text-emerald-400 font-medium">Tenant ID: TNT-88210</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-xs">
              GD
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Quick Notice Banner */}
        {actionNotice && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs flex items-center gap-2 shadow-lg animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* KPI Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">ยอดขายที่ยืนยันแล้ว</span>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">฿148,500</p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-medium">
              <TrendingUp className="w-3.5 h-3.5" /> +18.4% จากเดือนที่แล้ว
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">สลิปที่ตรวจผ่าน</span>
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">312 <span className="text-sm font-normal text-slate-400">รายการ</span></p>
            <p className="text-xs text-slate-400 mt-2">อัตราตรวจสำเร็จ 99.4%</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">สลิปปลอม/ซ้ำที่สกัดได้</span>
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-rose-400">4 <span className="text-sm font-normal text-slate-400">รายการ</span></p>
            <p className="text-xs text-rose-300/80 mt-2">ป้องกันความเสียหาย ฿5,800</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">ลีดลูกค้าจาก LINE</span>
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">86 <span className="text-sm font-normal text-slate-400">ราย</span></p>
            <p className="text-xs text-amber-400 mt-2">รอติดตามและออกใบเสนอราคา</p>
          </div>
        </div>

        {/* Tab Navigation with Enhanced Touch Targets */}
        <div className="flex border-b border-slate-800 gap-2 sm:gap-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('verifier')}
            className={`py-3 px-4 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap min-h-[44px] ${
              activeTab === 'verifier'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> ระบบทดสอบตรวจสลิปสด (Live Engine)
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`py-3 px-4 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap min-h-[44px] ${
              activeTab === 'leads'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" /> ฐานข้อมูลลูกค้า & Leads (LINE CRM)
          </button>
        </div>

        {/* Tab 1: Live Verifier with Drag & Drop Simulation */}
        {activeTab === 'verifier' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-base font-bold text-white">ทดสอบเครื่องมือตรวจสลิป (Anti-Fraud Verifier)</h2>
                <p className="text-xs text-slate-400 mt-1">
                  จำลองการอัปโหลดภาพสลิป หรือกรอกข้อมูล TransRef เพื่อทดสอบกลไกสกัดสลิปซ้ำ
                </p>
              </div>

              {/* Upload Dropzone Simulator */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  จำลองการส่งภาพสลิปจาก LINE OA
                </label>
                <div className="p-4 border-2 border-dashed border-slate-700 hover:border-emerald-500/50 rounded-xl bg-slate-950 flex flex-col items-center justify-center text-center space-y-2 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-emerald-400">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    {uploadedFileName ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                        <FileImage className="w-4 h-4" /> {uploadedFileName}
                      </span>
                    ) : (
                      'ลากไฟล์สลิปมาวางที่นี่ หรือกดเลือกตัวอย่างด้านล่าง'
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    <button
                      type="button"
                      onClick={() => handleSimulateUpload('valid')}
                      className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-[11px] font-medium transition-colors"
                    >
                      สลิปปกติ (฿490)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSimulateUpload('duplicate')}
                      className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg text-[11px] font-medium transition-colors"
                    >
                      สลิปซ้ำ (สกัดจับ)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSimulateUpload('amount_mismatch')}
                      className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-[11px] font-medium transition-colors"
                    >
                      ยอดโอนไม่ตรง (฿290/฿490)
                    </button>
                  </div>
                </div>
              </div>

              {/* Form Input */}
              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    รหัสอ้างอิงธุรกรรมธนาคาร (TransRef / PromptPay QR Data)
                  </label>
                  <input
                    type="text"
                    value={transRefInput}
                    onChange={(e) => setTransRefInput(e.target.value)}
                    placeholder="เช่น 2026091012345678 (เว้นว่างเพื่อสุ่ม)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      ยอดเงินในสลิป (บาท)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={amountInput}
                      onChange={(e) => setAmountInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      ยอดที่ต้องชำระ (บาท)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={expectedAmountInput}
                      onChange={(e) => setExpectedAmountInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 min-h-[44px]"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <ShieldCheck className="w-4 h-4" />
                    )}
                    เริ่มตรวจสอบสลิปทันที
                  </button>
                </div>
              </form>
            </div>

            {/* Verification Result Output */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center justify-between">
                  <span>ผลการตรวจสอบธุรกรรม (Audit Result)</span>
                  {verifyResult && (
                    <span className="text-[10px] text-slate-400 font-mono">Response: 0.24s</span>
                  )}
                </h3>

                {!verifyResult ? (
                  <div className="h-64 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-xl text-slate-500 text-xs p-6 text-center space-y-2">
                    <ShieldCheck className="w-10 h-10 opacity-30 text-emerald-400" />
                    <p className="font-medium text-slate-400">ยังไม่มีการประมวลผล</p>
                    <p className="text-[11px] text-slate-500 max-w-xs">
                      เลือกตัวอย่างสลิปด้านซ้าย หรือกรอกข้อมูลแล้วกดปุ่มตรวจสอบเพื่อดูการสกัดสลิปแบบเรียลไทม์
                    </p>
                  </div>
                ) : (
                  <div
                    className={`p-5 rounded-xl border ${
                      verifyResult.valid
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                        : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                    } space-y-4 text-xs shadow-lg`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-sm">
                        {verifyResult.valid ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-rose-400" />
                        )}
                        <span>สถานะ: {verifyResult.status.toUpperCase()}</span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          verifyResult.valid
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-rose-500 text-white'
                        }`}
                      >
                        {verifyResult.valid ? 'อนุมัติยอดขาย' : 'ปฏิเสธสลิป'}
                      </span>
                    </div>

                    <p className="text-sm font-semibold leading-relaxed">{verifyResult.message}</p>

                    <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-slate-400">
                      <div>
                        TransRef: <span className="text-slate-200 font-mono font-medium">{verifyResult.transRef}</span>
                      </div>
                      <div>
                        ยอดเงิน: <span className="text-slate-200 font-bold">฿{verifyResult.amount?.toLocaleString()}</span>
                      </div>
                      <div className="col-span-2 break-all">
                        Image/Data Hash: <span className="text-slate-400 font-mono text-[10px]">{verifyResult.slipHash}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 leading-relaxed space-y-1">
                <p className="font-semibold text-slate-300">กลไก Anti-Fraud อัตโนมัติ:</p>
                <p>
                  ระบบจะทำการตรวจสอบ 3 ชั้น (1. รหัส TransRef 2. Checksum/Hash ป้องกันรูปวน 3. ยอดเงินกับ Order ID) หากผ่านเกณฑ์ ระบบจะส่งคำสั่งสร้างใบเสร็จ PDF และส่งเข้า LINE ลูกค้าทันที
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Leads CRM with Search & Filter */}
        {activeTab === 'leads' && (
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-white">ฐานข้อมูลลูกค้า & Leads จาก LINE OA</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  เก็บบัญชีผู้ติดต่อจากช่องทางแชท บันทึกโน้ต และจัดการการขาย
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700">
                  ซิงค์ Real-time: LINE Webhook ✓
                </span>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="ค้นหาชื่อลูกค้า, เบอร์โทร..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    statusFilter === 'all'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  ทั้งหมด ({leadsList.length})
                </button>
                <button
                  onClick={() => setStatusFilter('waiting_quote')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    statusFilter === 'waiting_quote'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  รอใบเสนอราคา
                </button>
                <button
                  onClick={() => setStatusFilter('closed')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    statusFilter === 'closed'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  ปิดการขายแล้ว
                </button>
                <button
                  onClick={() => setStatusFilter('new')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    statusFilter === 'new'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  ลูกค้าใหม่
                </button>
              </div>
            </div>

            {/* CRM Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3.5">ชื่อลูกค้า / องค์กร</th>
                    <th className="p-3.5">เบอร์โทร</th>
                    <th className="p-3.5">แท็กความสนใจ</th>
                    <th className="p-3.5">สถานะ</th>
                    <th className="p-3.5">บันทึกล่าสุด</th>
                    <th className="p-3.5">เวลา</th>
                    <th className="p-3.5 text-right">ดำเนินการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/40">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-500 text-xs">
                        ไม่พบข้อมูลลูกค้าที่ตรงกับคำค้นหา
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5 font-bold text-white">{lead.name}</td>
                        <td className="p-3.5 font-mono text-slate-300">{lead.phone}</td>
                        <td className="p-3.5">
                          <span className="bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded text-[11px]">
                            {lead.tag}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                              lead.status === 'closed'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                                : lead.status === 'waiting_quote'
                                ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                                : 'bg-slate-800 text-slate-300 border border-slate-700'
                            }`}
                          >
                            {lead.statusText}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-400 max-w-xs truncate">{lead.note}</td>
                        <td className="p-3.5 text-slate-500 whitespace-nowrap">{lead.time}</td>
                        <td className="p-3.5 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleQuickAction(lead.id, `ส่งใบเสร็จ/ข้อความหา ${lead.name}`)}
                            className="bg-slate-800 hover:bg-slate-700 text-emerald-400 px-2.5 py-1 rounded border border-slate-700 font-medium text-[11px] inline-flex items-center gap-1 transition-colors"
                          >
                            <Send className="w-3 h-3" /> ทักแชท
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
