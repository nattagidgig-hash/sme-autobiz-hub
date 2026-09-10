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
} from 'lucide-react';
import { VerifyResult } from '@/lib/verifier';

export default function DashboardPage() {
  const [transRefInput, setTransRefInput] = useState('');
  const [amountInput, setAmountInput] = useState('490');
  const [expectedAmountInput, setExpectedAmountInput] = useState('490');
  const [verifyResult, setVerifyResult] = useState<VerifyResult | null>(null);
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<'verifier' | 'leads'>('verifier');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg">
              AB
            </div>
            <div>
              <span className="font-semibold text-lg text-white">AutoBiz Hub</span>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 ml-2 px-2 py-0.5 rounded-full border border-emerald-500/30">
                Live System
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              กลับหน้าหลัก
            </Link>
            <div className="text-right text-xs">
              <p className="font-medium text-slate-200">Good Day Store (Demo Tenant)</p>
              <p className="text-slate-400">Plan: Pro Business</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">ยอดขายที่ยืนยันแล้ว</span>
              <CreditCard className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-white">฿148,500</p>
            <div className="flex items-center gap-1 text-xs text-emerald-400 mt-2">
              <TrendingUp className="w-3.5 h-3.5" /> +18.4% จากเดือนที่แล้ว
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">สลิปที่ตรวจผ่าน</span>
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-2xl font-bold text-white">312 รายการ</p>
            <p className="text-xs text-slate-400 mt-2">อัตราตรวจสำเร็จ 99.4%</p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">สลิปซ้ำ/สลิปปลอมที่สกัดได้</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <p className="text-2xl font-bold text-rose-400">4 รายการ</p>
            <p className="text-xs text-rose-300/80 mt-2">ป้องกันความเสียหาย ฿5,800</p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">ลีดลูกค้าจาก LINE</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-bold text-white">86 ราย</p>
            <p className="text-xs text-slate-400 mt-2">รอติดตาม 5 รายการ</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 gap-6">
          <button
            onClick={() => setActiveTab('verifier')}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'verifier'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> ระบบทดสอบตรวจสลิปสด
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'leads'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" /> ฐานข้อมูลลูกค้า & Leads (LINE CRM)
          </button>
        </div>

        {/* Tab 1: Live Verifier */}
        {activeTab === 'verifier' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-base font-semibold text-white">ทดสอบเครื่องมือตรวจสลิป (Live Verifier Engine)</h2>
                <p className="text-xs text-slate-400 mt-1">
                  ระบบจะตรวจ TransRef ป้องกันสลิปซ้ำ และเช็คความตรงกันของยอดเงินแบบ Real-time
                </p>
              </div>

              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    รหัสอ้างอิงธุรกรรมธนาคาร (TransRef / PromptPay QR Data)
                  </label>
                  <input
                    type="text"
                    value={transRefInput}
                    onChange={(e) => setTransRefInput(e.target.value)}
                    placeholder="เช่น 2026091012345678 (เว้นว่างเพื่อสุ่ม)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      ยอดเงินในสลิป (บาท)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={amountInput}
                      onChange={(e) => setAmountInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      ยอดที่ต้องชำระ (บาท)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={expectedAmountInput}
                      onChange={(e) => setExpectedAmountInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <ShieldCheck className="w-4 h-4" />
                    )}
                    ประมวลผลและตรวจสอบสลิป
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTransRefInput('DUP_SLIP_TEST_999');
                      setAmountInput('490');
                      setExpectedAmountInput('490');
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-2 rounded-lg border border-slate-700"
                  >
                    โหลดตัวอย่างสลิปซ้ำ
                  </button>
                </div>
              </form>
            </div>

            <div className="lg:col-span-6 p-6 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-200 mb-2">ผลการตรวจสอบ (Audit Result)</h3>
                {!verifyResult ? (
                  <div className="h-56 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-lg text-slate-500 text-xs">
                    <ShieldCheck className="w-8 h-8 mb-2 opacity-30" />
                    กดปุ่มตรวจสอบด้านซ้ายเพื่อทดสอบระบบ
                  </div>
                ) : (
                  <div
                    className={`p-4 rounded-lg border ${
                      verifyResult.valid
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                        : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                    } space-y-3 text-xs`}
                  >
                    <div className="flex items-center gap-2 font-semibold text-sm">
                      {verifyResult.valid ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-rose-400" />
                      )}
                      <span>สถานะ: {verifyResult.status.toUpperCase()}</span>
                    </div>

                    <p className="text-sm font-medium">{verifyResult.message}</p>

                    <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-slate-400">
                      <div>TransRef: <span className="text-slate-200">{verifyResult.transRef}</span></div>
                      <div>ยอดเงิน: <span className="text-slate-200">฿{verifyResult.amount?.toLocaleString()}</span></div>
                      <div className="col-span-2 break-all">
                        Hash: <span className="text-slate-400 font-mono text-[10px]">{verifyResult.slipHash}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400 mt-4">
                Anti-Fraud Engine: เมื่อสลิปถูกส่งเข้า LINE OA บอทจะถอดรหัส QR อัตโนมัติแล้วยิงเช็คกับ API ภายใน 0.8 วินาที หากมีการส่งซ้ำจะถูกปฏิเสธทันที
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Leads CRM */}
        {activeTab === 'leads' && (
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-white">รายชื่อลูกค้า & ลีดอัตโนมัติจาก LINE OA</h2>
                <p className="text-xs text-slate-400">ดูดข้อมูลชื่อ เบอร์ และบันทึกแท็กสถานะการขายลงฐานข้อมูลอัตโนมัติ</p>
              </div>
              <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-md border border-slate-700">
                ซิงค์ล่าสุด: Real-time
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3">ชื่อลูกค้า / องค์กร</th>
                    <th className="p-3">เบอร์โทร</th>
                    <th className="p-3">แท็ก</th>
                    <th className="p-3">สถานะ</th>
                    <th className="p-3">บันทึกล่าสุด</th>
                    <th className="p-3">เวลา</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr>
                    <td className="p-3 font-medium text-white">คุณสมชาย (คลินิกทันตกรรม)</td>
                    <td className="p-3">081-234-5678</td>
                    <td className="p-3"><span className="bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded">สนใจ On-premise</span></td>
                    <td className="p-3"><span className="bg-amber-950 text-amber-300 px-2 py-0.5 rounded">รอใบเสนอราคา</span></td>
                    <td className="p-3 text-slate-400">ขอใบเสนอราคาแพ็กเกจติดตั้งระบบดูแล 1 ปี</td>
                    <td className="p-3 text-slate-500">10 นาทีที่แล้ว</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">คุณณัฐพร (ร้านเสื้อผ้าออนไลน์)</td>
                    <td className="p-3">089-876-5432</td>
                    <td className="p-3"><span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded">ลูกค้าสมาชิก</span></td>
                    <td className="p-3"><span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded">ปิดการขายแล้ว</span></td>
                    <td className="p-3 text-slate-400">ชำระค่าสมาชิกรายเดือน Starter ฿290</td>
                    <td className="p-3 text-slate-500">1 ชม. ที่แล้ว</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">คุณวีระศักดิ์ (ศูนย์อะไหล่ยนต์)</td>
                    <td className="p-3">095-111-2233</td>
                    <td className="p-3"><span className="bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded">สอบถามทั่วไป</span></td>
                    <td className="p-3"><span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded">ลูกค้าใหม่</span></td>
                    <td className="p-3 text-slate-400">สอบถามเรื่องระบบสร้างใบเสร็จ PDF ส่งเข้า LINE</td>
                    <td className="p-3 text-slate-500">3 ชม. ที่แล้ว</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
