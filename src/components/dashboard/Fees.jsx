"use client";

import { motion } from 'framer-motion';
import { 
  CreditCard, Download, Clock, CheckCircle2, 
  AlertCircle, History, Landmark, ArrowUpRight
} from 'lucide-react';
import { TiltCard } from '@/components/ui/tilt-card';

export const FeesAndPayments = () => {
  return (
    <div className="space-y-12 pb-12">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Status & Quick Pay */}
        <div className="xl:col-span-2 space-y-8">
            <TiltCard className="p-10 rounded-[3rem] bg-gradient-to-br from-primary/10 to-purple-600/10 border border-card-border relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
                
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">Account Balance</p>
                            <h2 className="text-5xl font-black tracking-tight">PKR 15,000</h2>
                            <p className="text-foreground/40 text-xs mt-2 font-medium flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5" /> Next Installment Due: 05 June, 2024
                            </p>
                        </div>
                        <button className="px-12 py-5 rounded-2xl bg-primary text-background font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_30px_var(--primary)]/30 hover:scale-105 active:scale-95 transition-all">
                            Pay Installment
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-card-border">
                        <div className="space-y-1">
                            <p className="text-[9px] font-black uppercase tracking-widest text-foreground/20">Total Course Fee</p>
                            <p className="text-sm font-bold tracking-wide">PKR 45,000</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[9px] font-black uppercase tracking-widest text-foreground/20">Paid Amount</p>
                            <p className="text-sm font-bold tracking-wide text-emerald-500">PKR 30,000</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[9px] font-black uppercase tracking-widest text-foreground/20">Scholarship Applied</p>
                            <p className="text-sm font-bold tracking-wide text-purple-600">15% Discount</p>
                        </div>
                    </div>
                </div>
            </TiltCard>

            <div className="space-y-6">
                <h3 className="text-xl font-bold tracking-tight flex items-center gap-3">
                    <History className="w-5 h-5 text-primary" />
                    Transaction Repository
                </h3>
                
                <div className="space-y-4">
                    {[
                        { id: 'TXN-9982', date: '05 May, 2024', amount: '15,000', method: 'Online Transfer', status: 'verified' },
                        { id: 'TXN-8812', date: '05 April, 2024', amount: '15,000', method: 'Bank Deposit', status: 'verified' },
                    ].map((txn, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-card border border-card-border flex items-center justify-between group hover:bg-card/80 transition-all">
                            <div className="flex items-center gap-6">
                                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm mb-1">Fee Payment - Installment {2-i}</h4>
                                    <p className="text-[9px] font-bold text-foreground/20 uppercase tracking-widest">{txn.date} • {txn.method}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-8">
                                <div className="text-right">
                                    <div className="text-sm font-black text-foreground">PKR {txn.amount}</div>
                                    <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{txn.status}</div>
                                </div>
                                <button className="p-3 rounded-xl bg-card border border-card-border hover:text-primary transition-all">
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Payment Reminders & Cards */}
        <div className="space-y-8">
            <TiltCard className="p-8 rounded-[2.5rem] bg-card border border-card-border">
                <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-8">
                    <Landmark className="w-4 h-4 text-primary" />
                    Saved Nodes
                </h3>
                <div className="space-y-4">
                    <div className="p-5 rounded-2xl bg-card border border-card-border relative overflow-hidden group cursor-pointer">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                            <Landmark className="w-6 h-6" />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-4">HBL Bank Limited</p>
                        <p className="text-sm font-bold tracking-[0.2em] mb-4">**** **** **** 8821</p>
                        <div className="flex justify-between items-center">
                            <span className="text-[8px] font-bold text-foreground/20 uppercase">Zainab S.</span>
                            <span className="text-[8px] font-bold text-foreground/20 uppercase">Exp: 09/26</span>
                        </div>
                    </div>
                    <button className="w-full py-4 rounded-2xl border border-dashed border-card-border text-[9px] font-black uppercase tracking-widest text-foreground/20 hover:text-foreground hover:border-foreground/30 transition-all flex items-center justify-center gap-2">
                        + Add Payment Method
                    </button>
                </div>
            </TiltCard>

            <div className="p-8 rounded-[2.5rem] bg-amber-500/5 border border-amber-500/10">
                 <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-6 text-amber-500">
                    <AlertCircle className="w-4 h-4" />
                    Important Protocol
                </h3>
                <p className="text-[11px] text-foreground/60 leading-relaxed font-light italic mb-6">
                    "Late submissions of fee installments may lead to temporary suspension of neural course access nodes."
                </p>
                <button className="w-full py-3 rounded-xl bg-card border border-card-border text-[9px] font-black uppercase tracking-widest hover:bg-card/80 transition-all">
                    View Fee Policy
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
